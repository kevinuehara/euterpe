import { Db } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import connect from "../../repository/database";
import AlbumService from "../../service/album";
import ConfigService from "../../service/config";

const ID_CONFIG_COLLECTION = 'collection_config';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<any>
): Promise<void> => {
  const { db } = await connect();

    if (req.method === 'POST') {
      const updatedStatus = await ConfigService.updateConfig(db);
      
      if (updatedStatus && updatedStatus.status?.acknowledged) {
        const response = await AlbumService.saveAlbum(db);

        /** TODO: pegar dados do body para inserir no banco */

        res.status(200).json(response);
        return;
      } else {
        res.status(500).json({ message: 'Some error ocurred on process data' });
        return;
      }

    } else {
      res.status(404).json({message: 'Error'});
    }
};






