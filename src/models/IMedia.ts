import { Number } from "mongoose";

// Define a MongoDB schema for your data
export interface IMedia extends Document {
  uuid: string;
  title: string;
  cast: string[];
  description: string;
  tags: string[];
  genres: string[];
  urls: string[];
  thumbnail: string;
  mediaLabel: string;
  duration: number;
}
