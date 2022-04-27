import { NextApiRequest, NextApiResponse } from "next";
import connect from "../../repository/database";
import AlbumService from "../../service/album";
import ConfigService from "../../service/config";

export default async function album(
  req: NextApiRequest,
  res: NextApiResponse<any>
): Promise<void> {
  const { db } = await connect();

  try {
    if (req.method === "POST") {
      const updatedStatus = await ConfigService.updateConfig(db);

      if (updatedStatus && updatedStatus.status?.acknowledged) {
        const response = await AlbumService.saveAlbum(db, req);
        res.status(200).json(response);
        return;
      } else {
        res.status(500).json({ message: "Some error ocurred on process data" });
        return;
      }
    } else {
      res.status(404).json({ message: "Error" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
