import dotenv from "dotenv";
import { mongoConnect, mongoSave, mongoView } from "./database/connection2";

dotenv.config();
const sampleMediaItem: any = {
  uuid: "abcde-12345",
  title: "Sample Media",
  cast: ["Actor 1", "Actress 2"],
  description: "A sample media item with random values",
  tags: ["Tag1", "Tag2", "Tag3"],
  genres: ["Genre1", "Genre2"],
  urls: ["https://example.com/media1", "https://example.com/media2"],
  thumbnail: "https://example.com/thumbnail.jpg",
  mediaLabel: "Sample Label",
  duration: 120,
};

const main = async () => {
  const mongoConn: any = await mongoConnect();
  // mongoSave(mongoConn, sampleMediaItem);
  mongoView(mongoConn);
};

main();
