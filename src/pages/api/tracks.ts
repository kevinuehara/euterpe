import { NextApiRequest, NextApiResponse } from "next";
import { MessageError } from "../../models/messageError";
import { DailyTrackingResponse } from "../../models/tracking";
import TrackService from "../../service/track";

export default async function track (
    req: NextApiRequest,
    res: NextApiResponse<DailyTrackingResponse | MessageError>
  ): Promise<void>  {
  
    try {
        const trackService = new TrackService();
        const dailyTrack = await trackService.getAlbumTrack();
        return res.status(200).json(dailyTrack)

    } catch(e) {
        return res.status(500).json({ message: e });
    }
};