import { Db } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import ConfigModel from "../../models/config";
import { MessageError } from "../../models/messageError";
import { TrackingModel } from "../../models/tracking";
import connect from "../../repository/database";
import AlbumService from "../../service/album";
import ConfigService from "../../service/config";


export default async (
  req: NextApiRequest,
  res: NextApiResponse<TrackingModel | MessageError>
): Promise<void> => {
  const { db } = await connect();

    if(req.method === 'GET') {
      const response = await AlbumService.getDailyAlbum(db); 
      res.status(200).json(response);
      return;

    } else {
      res.status(404).json({message: 'Error'});
    }
};
