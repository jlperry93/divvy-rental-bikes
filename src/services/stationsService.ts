import https from "https";
import { IStationAPI } from "../models/station";

export default class StationsService {
  private static HOSTNAME = "gbfs.divvybikes.com";
  private static PATH = "/gbfs/en/station_information.json";
  private static METHOD = "GET";

  public async getStations(): Promise<IStationAPI> {
    return new Promise<IStationAPI>((resolve, reject) => {
      const request = https.request({
        hostname: StationsService.HOSTNAME,
        method: StationsService.METHOD,
        path: StationsService.PATH,
      }, (response) => {
        response.setEncoding("utf8");
        let responseBody = "";

        response.on("data", (data) => {
          responseBody += data;
        });

        response.on("end", () => {
          if (responseBody != null) {
            const body = JSON.parse(responseBody);
            resolve(body.data);
          } else {
            resolve(null);
          }
        });
        response.on("error", (error) => {
          reject(`Failed to retrieve stations, error: ${error}`);
        });
      });
      request.on("error", (error) => {
        reject(`Failed to retrieve stations, error: ${error}`);
      });
      request.end();
    });
  }
}
