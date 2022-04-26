import { Db, WithId } from "mongodb";
import { OptionModel } from "../models/option";
import { TrackingModel } from "../models/tracking";

export default class AlbumService {
  constructor() {}

  static async saveAlbum(db: Db) {
    return await db.collection("albums").insertOne({
      name: "kevin",
      age: 22,
      createdAt: new Date().toISOString(),
    });
  }

  static async getDailyAlbum(db: Db): Promise<TrackingModel> {
    // 2022-04-26T00:00:00.000Z
    const today = new Date(new Date().setUTCHours(0, 0, 0, 0));
    const response = await db
      .collection("albums")
      .findOne({ gameDate: today.toISOString() });
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
