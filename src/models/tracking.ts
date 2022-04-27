import { Document } from "mongodb";
import { OptionModel } from "./option";

export interface TrackingModelMongo {
  _id: string;
}

export interface TrackingModel extends TrackingModelMongo {
  trackId: string;
  answers: OptionModel[];
  gameDate: string;
  createdAt: string;
}

export interface TrackingModelResponse {
  trackId: string;
  answers: OptionModel[];
  gameDate: string;
  createdAt: string;
}

export interface DailyTrackingResponse extends TrackingModel {
  previewUrl: string;
  artistName: string;
  musicName: string;
  previewCoverAlbumImage: string;
}
