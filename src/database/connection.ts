import mongoose, { Schema, Connection, ConnectOptions } from "mongoose";
import { IMedia } from "../models/IMedia";
import {writeFileSync} from 'fs';

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

const mongoConnect = () => {
  return new Promise((resolve, rejects) => {
    const connectionOptions: ConnectOptions = {};
    mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.chpgraa.mongodb.net/?retryWrites=true&w=majority`,
      connectionOptions
    );

    const db = mongoose.connection;

    db.on("error", (error) => {
      console.error("MongoDB connection error:", error);
      rejects(error);
    });

    db.once("open", () => {
      console.log("Connected to MongoDB");
      resolve(db);
    });
  });
};

const mongoSave = async (db: Connection, data: IMedia) => {
  let start = performance.now();
  const newData = new DataModel(data);
  let timeTaken = performance.now() - start;
  console.log('Save time taken: ', timeTaken);
  await newData.save();
//   db.close();
};

const mongoView = async (db: Connection) => {
  let start = performance.now();
  const filteredData = await DataModel.find();
  let timeTaken = performance.now() - start;
  console.log('View time taken: ', timeTaken);
  console.log('Record count ', filteredData.length);
  writeFileSync('data.txt', JSON.stringify(filteredData));
  db.close();
};

export { mongoConnect, mongoSave, mongoView };
