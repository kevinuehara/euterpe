import { Document } from "mongodb";
import { OptionModel } from "./option";

export interface TrackingModel {
    _id: string;
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