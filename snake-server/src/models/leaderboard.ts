// External Dependencies
import { ObjectId, Int32 } from "mongodb";

// Class Implementation
export default class Highscore {
  constructor(
    public name: string,
    public score: Int32,
    public createdAt?: Date,
    public updatedAt?: Date,
    public _id?: ObjectId
  ) {}
}
