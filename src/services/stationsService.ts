import fetch from "node-fetch";
import { IStationAPI } from "../models/station";

export class StationsService {
  private static URL = "https://gbfs.divvybikes.com/gbfs/en/station_information.json";
  private stations?: IStationAPI = undefined;

  public async getStationsList(): Promise<IStationAPI> {
    if (this.stations == null) {
      try {
        const response = await fetch(StationsService.URL);
        const json = await response.json();
        if (json && json.data) {
          this.stations = json.data;
        }
      } catch (error) {
        throw new Error(`Failed to retrieve stations, error: ${error}`);
      }
    }
    return this.stations;
  }
}
