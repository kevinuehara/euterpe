import { Db, WithId } from "mongodb";
import { OptionModel } from "../models/option";
import { TrackingModel } from "../models/tracking";

export default class AlbumService {
  constructor() {}

  static async saveAlbum(db: Db) {
    return await db.collection("albums").insertOne({
      name: "kevin",
      age: 22,
      createdAt: new Date().toDateString(),
    });
  }

  static async getDailyAlbum(db: Db): Promise<TrackingModel> {
    const today = new Date().toDateString();
    const response = await db
      .collection("albums")
      .findOne({ gameDate: today });
    return AlbumService.transformToObject(response);
  }

  static transformToObject(doc: any): TrackingModel {
    const { _id, trackId, gameDate, createdAt } = doc;

    const answers: OptionModel[] = doc.answers.map((option) => {
      return { artist: option.artist, isCorrect: option.isCorrect, songName: option.songName };
    });

    const trackingModel: TrackingModel = {
      _id,
      trackId,
      gameDate,
      createdAt,
      answers,
    };

    return trackingModel;
  }
}
