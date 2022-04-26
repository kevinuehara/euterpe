import { Db } from "mongodb";
import { DailyTrackingResponse } from "../models/tracking";

import AlbumService from "./album";
import { getTrackById } from "../../utils/spotify";
import connect from "../repository/database";

export default class TrackService {
  constructor() {}

  async getAlbumTrack(): Promise<DailyTrackingResponse> {
    const { db } = await connect();

    const dailyAlbum = await AlbumService.getDailyAlbum(db);
    const { trackId } = dailyAlbum;

    const response = await getTrackById(trackId);
    const {
      name: musicName,
      album,
      artists,
      preview_url,
    } = await response.json();
    const { images } = album;
    const imageCover = images[0].url;
    const { name: artistName } = artists[0];

    return {
      ...dailyAlbum,
      previewUrl: preview_url,
      artistName,
      musicName,
      previewCoverAlbumImage: imageCover,
    };
  }
}
