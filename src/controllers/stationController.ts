import * as express from "express";
import { Request, Response } from "express";
import MiddleWare from "../middleware/middleware";
import IControllerBase from "../models/controllerBase";
import { IStation } from "../models/station";
import StationsService from "../services/stationsService";

class StationController implements IControllerBase {
  public router = express.Router();
  private stationStation: StationsService;
  private middleware: MiddleWare;

  constructor() {
    this.middleware = new MiddleWare();
    this.stationStation = new StationsService();
    this.initRoutes();
  }

  public initRoutes(): any {
    this.router.get("/", this.middleware.authHandler, this.middleware.idHandler, this.index);
    this.router.get(
      "/:id",
      this.middleware.authHandler,
      this.middleware.idHandler,
      this.middleware.cacheHandler,
      this.index
    );
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

  private async getStationsWithID(stationIDs: any): Promise<IStation[]> {
    const stationsList = await this.stationStation.getStations();
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
  }

  private findStation(id: string, stations: IStation[]): IStation {
    return stations.find((station: IStation) => station.station_id.toString() === id);
  }
}

export default StationController;
