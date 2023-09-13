import mongoose, { Schema, Connection, ConnectOptions } from "mongoose";
import { IMedia } from "../models/IMedia";

const dataSchema = new Schema<IMedia>({
  uuid: String,
  title: String,
  cast: [String],
  description: String,
  tags: [String],
  genres: [String],
  urls: [String],
  thumbnail: String,
  mediaLabel: String,
  duration: Number,
});

const DataModel = mongoose.model<IMedia>("Data", dataSchema);

const connection = () => {
  const connectionOptions: ConnectOptions = {};
  mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.chpgraa.mongodb.net/?retryWrites=true&w=majority`,
    connectionOptions
  );

  const db = mongoose.connection;

  db.on("error", (error) => {
    console.error("MongoDB connection error:", error);
  });

  db.once("open", () => {
    console.log("Connected to MongoDB");
  });

  return db;
};

const saveData = (db: Connection, data: IMedia) => {
  db.once("open", async () => {
    console.log("Connected to MongoDB");

    const newData = new DataModel(data);
    await newData.save();

    const filteredData = await DataModel.find();
    console.log("Filtered Data:", filteredData);

    db.close();
  });
};

export { connection, saveData };
