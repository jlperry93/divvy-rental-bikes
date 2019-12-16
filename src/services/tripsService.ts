import csvParser from "csv-parser";
import fs from "fs";
import * as path from "path";

export class TripsService {
  private static filepath = __dirname;
  private trips: any[];

  public async getTrips(): Promise<any> {
    const list: any[] = [];
    const trips = new Promise<any[]>((resolve, reject) => {
      fs
      .createReadStream(path.join(TripsService.filepath, "../../data/Divvy_Trips_2019_Q2"))
      .pipe(csvParser())
      .on("data", (row: any) => {
        list.push(row);
      })
      .on("end", (row: any) => {
        resolve(list);
      })
      .on("error", (err: any) => {
        reject(`Error: Failed to process CSV file, error: ${err}`);
      });
    });
    return trips;
  }
}
