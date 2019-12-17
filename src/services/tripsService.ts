import csvParser from "csv-parser";
import fs from "fs";
import * as path from "path";
import { ITrip } from "../models/trip";

export default class TripsService {
  private static filepath = __dirname;

  public async getTrips(): Promise<any> {
    const list: any[] = [];
    return new Promise<ITrip[]>((resolve, reject) => {
      fs
        .createReadStream(path.join(TripsService.filepath, "../../data/Divvy_Trips_2019_Mock"))
        .pipe(csvParser())
        .on("data", (row: any) => {
          list.push(row);
        })
        .on("end", () => {
          resolve(list);
        })
        .on("error", (err: any) => {
          reject(`Error: Failed to process CSV file, error: ${err}`);
        });
    });
  }
}
