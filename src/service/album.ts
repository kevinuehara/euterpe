import { Db, WithId } from "mongodb";
import { NextApiRequest } from "next";
import { OptionModel } from "../models/option";
import { TrackingModel } from "../models/tracking";

export default class AlbumService {
  constructor() {}

  static async saveAlbum(db: Db, req: NextApiRequest) {
    const { trackId, answers, gameDate } = req.body;

    if (!trackId) {
      throw new Error('TrackId is required');
    }

    if (!gameDate) {
      throw new Error('Date of this game is required. Format: ');
    } else {
      const response = await db.collection("albums").findOne({ gameDate });
      if (response) {
        throw new Error('This date already contains a song');
      }
    }


    return await db.collection("albums").insertOne({
      trackId,
      answers,
      gameDate,
      createdAt: new Date().toDateString(),
    });
  }

  static async getDailyAlbum(db: Db): Promise<TrackingModel> {
    const today = new Date().toDateString();
    const response = await db.collection("albums").findOne({ gameDate: today });
    return AlbumService.transformToObject(response);
  }

  static transformToObject(doc: any): TrackingModel {
    const { _id, trackId, gameDate, createdAt } = doc;

    const answers: OptionModel[] = doc.answers.map((option) => {
      return {
        artist: option.artist,
        isCorrect: option.isCorrect,
        songName: option.songName,
      };
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
