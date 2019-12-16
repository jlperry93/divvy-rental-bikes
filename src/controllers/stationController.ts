import * as express from "express";
import { Request, Response } from "express";
import IControllerBase from "../models/controllerBase";
import { IStation } from "../models/station";
import { StationsService } from "../services/stationsService";

class StationController implements IControllerBase {
  public router = express.Router();
  private stationStation: StationsService;

  constructor() {
    this.initRoutes();
    this.stationStation = new StationsService();
  }

  public initRoutes(): any {
    this.router.get("/", this.index);
    this.router.get("/:id", this.index);
  }

  private index = async (req: Request, res: Response) => {
    if (!req.params.id) {
       res.status(500).send({ message: "Invalid Request: Include station ID"});
    } else {
      const stationIDs = req.params.id.split(",");
      const stations = await this.getStationsWithID(stationIDs);
      res.send({ stations });
    }
  }

  private async getStationsWithID(stationIDs: any): Promise<IStation[]> {
    const stationsList = await this.stationStation.getStationsList();
    const selectedStations: IStation[] = [];
    stationIDs.forEach((stationID: string) => {
      const selected = this.findStation(stationID, stationsList.stations);
      if (selected) {
        selectedStations.push(selected);
      }
    });
    return selectedStations;
  }

  private findStation(id: string, stations: IStation[]): IStation {
    return stations.find((station: IStation) => station.station_id.toString() === id);
  }
}

export default StationController;
