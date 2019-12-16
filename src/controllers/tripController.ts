import * as express from "express";
import { Request, Response } from "express";
import IControllerBase from "../models/controllerBase";
import { TRIP_DEATILS } from "../models/trip";
// import { ITrips, IRecentTrips, TRIP_DEATILS } from "../models/trip";
import { TripsService } from "./../services/tripsService";

// // Given one or more stations, return the last 20 trips that ended at each station for a single
// // day.
export class TripController implements IControllerBase {
  public router = express.Router();
  private tripsService: TripsService;

  constructor() {
    this.initRoutes();
    this.tripsService = new TripsService();
  }

  public initRoutes(): any {
    this.router.get("/", this.index);
    this.router.get("/:id", this.index);
  }

  private index = async (req: Request, res: Response) => {
    if (!req.params.id) {
       res.status(500).send({ message: "Invalid Request: Include station ID"});
    } else if (req.params.date) {
      res.status(500).send({ message: "Invalid Request: Include date"});
    } else {
      const stationIDs = req.params.id.split(",");
      const stations = await this.getRecentTrips(stationIDs);
      res.send({ stations });
    }
  }

  private async getRecentTrips(ids: string[]): Promise<void> {
    const tripDetails = await this.tripsService.getTrips();
    if (tripDetails) {
      ids.forEach((id: string) => {
        const selectedStationTrips = [];
        tripDetails.forEach((trip: any) => {
          if (id === trip[TRIP_DEATILS.END_STATION_ID]) {
            selectedStationTrips.push(trip);
          }
        });
      });
    }
  }

  private processRecentTrips(trips: any): any {
    const now = new Date();
    return now;
    // for (let i = 0; i < trips.length; i++) {
    // }
    // trips.forEach(trip => {
    //   const difference = new Date() -
    //   if () {

    //   }
    // });
  }
}
