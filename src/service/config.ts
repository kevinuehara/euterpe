import { Db } from "mongodb";

export default class ConfigService {
  private static ID_CONFIG_COLLECTION = "collection_config";

  constructor() {}

  static async getConfig(db: Db) {
    return await db
      .collection("config")
      .findOne({ id: ConfigService.ID_CONFIG_COLLECTION });
  }

  static async updateConfig(db: Db) {
    const { lastDate } = await ConfigService.getConfig(db);
    let dateToUpdate = this.incrementOneDay(lastDate);
    dateToUpdate = new Date(dateToUpdate);

    const response = await db
      .collection("config")
      .updateOne(
        { id: ConfigService.ID_CONFIG_COLLECTION },
        { $set: { lastDate: dateToUpdate.toDateString() } }
      );

    return { status: response, dateToUpdate, lastDate };
  }

  static incrementOneDay(lastDate: string): Date {
    const newDate = new Date(lastDate);
    return new Date(newDate.setDate(newDate.getDate() + 1));
  }
}
