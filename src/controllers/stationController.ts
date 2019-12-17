import * as express from "express";
import { Request, Response } from "express";
import https from "https";
import MiddleWare from "../middleware/middleware";
import { IStation, IStationAPI } from "../models/station";

class StationController {
  private static HOSTNAME = "gbfs.divvybikes.com";
  private static PATH = "/gbfs/en/station_information.json";
  public router = express.Router();
  private middleware: MiddleWare;

  constructor() {
    this.middleware = new MiddleWare();
    this.initRoutes();
  }

  public async initRoutes(): Promise<any> {
    this.router.get("/", this.middleware.authHandler, this.middleware.idHandler, this.index);
    this.router.get(
      "/:id",
      this.middleware.authHandler,
      this.middleware.idHandler,
      this.middleware.cacheHandler,
      this.index
    );
  }

  public async getStationsWithID(stationIDs: string[]): Promise<IStation[]> {
    try {
      const stationsList = await this.getStations();
      const selectedStations: IStation[] = [];
      if (stationsList != null) {
        stationIDs.forEach((stationID: string) => {
          const selected = this.findStation(stationID, stationsList.stations);
          if (selected) {
            selectedStations.push(selected);
          }
        });
      }
      return selectedStations;
    } catch (error) {
      throw new Error(`Failed to get stations with id(s), error: ${error}`);
    }
  }

  private index = async (req: Request, res: Response) => {
    const stationIDs = req.params.id.split(",");
    try {
      const stations = await this.getStationsWithID(stationIDs);
      return res.send({ stations });
    } catch (error) {
      res.status(500).send({ message: `Internal Server Erorr: ${error}` });
    }
  }

  private findStation(id: string, stations: IStation[]): IStation {
    return stations.find((station: IStation) => station.station_id.toString() === id);
  }

  private async getStations(): Promise<IStationAPI> {
    return new Promise<IStationAPI>((resolve, reject) => {
      const request = https.get({
        hostname: StationController.HOSTNAME,
        path: StationController.PATH,
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
    });
  }
}

export default StationController;
