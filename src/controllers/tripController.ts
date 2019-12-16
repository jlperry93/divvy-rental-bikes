import * as express from "express";
import { Request, Response } from "express";
import MiddleWare from "../middleware/middleware";
import IControllerBase from "../models/controllerBase";
import { IRecentTrips, ITrip, RecentTripsResponse, TRIP_DEATILS } from "../models/trip";
import { GeneralUtils } from "../utils/generalUtils";
import TripsService from "./../services/tripsService";

// // Given one or more stations, return the last 20 trips that ended at each station for a single
// // day.
export class TripController implements IControllerBase {
  public router = express.Router();
  private tripsService: TripsService;
  private middleware: MiddleWare;

  constructor() {
    this.middleware = new MiddleWare();
    this.tripsService = new TripsService();
    this.initRoutes();
  }

  public initRoutes(): any {
    this.router.get("/", this.middleware.authHandler, this.middleware.idHandler, this.index);
    this.router.get("/:id",
      this.middleware.authHandler,
      this.middleware.idHandler,
      this.middleware.dateHandler,
      this.index);
    this.router.get(
      "/:id/:date",
      this.middleware.authHandler,
      this.middleware.idHandler,
      this.middleware.dateHandler,
      this.middleware.cacheHandler,
      this.index)
      ;
  }

  private index = async (req: Request, res: Response) => {
    const stationIDs = req.params.id.split(",");
    const date = GeneralUtils.getDate(req.params.date);
    try {
      const stations = await this.getRecentTrips(stationIDs, date);
      res.send({ stations });
    } catch (error) {
      res.status(500).send({ message: `Internal Server Erorr: ${error}` });
    }
  }

  private async getRecentTrips(ids: string[], endDate: string): Promise<IRecentTrips[]> {
    const tripDetails = await this.tripsService.getTrips();
    if (tripDetails) {
      const recentTrips: IRecentTrips[] = [];
      ids.forEach((id: string) => {
        const processedTrips = this.processRecentTrips(id, endDate, tripDetails);
        recentTrips.push(processedTrips);
      });
      return recentTrips;
    }
  }

  private processRecentTrips(id: string, endDate: string, trips: ITrip[]): IRecentTrips {
    // tslint:disable-next-line:prefer-const
    let processedTrips: IRecentTrips = new RecentTripsResponse(id, []);
    const selectedTrips: ITrip[] = [];
    trips.forEach((trip: ITrip) => {
      const tripEndDate = GeneralUtils.getDate(trip[TRIP_DEATILS.LOCAL_END_TIME]);
      if (id === trip[TRIP_DEATILS.END_STATION_ID] && endDate === tripEndDate) {
        selectedTrips.push(trip);
      }
    });

    // sort in descrending order
    const sortedTrips = selectedTrips.sort((a: any, b: any) => {
      return a[TRIP_DEATILS.LOCAL_END_TIME] - b[TRIP_DEATILS.LOCAL_END_TIME];
    }).reverse();

    // return last 20 trips
    processedTrips.trips = sortedTrips.splice(0, 20);
    return processedTrips;
  }
}
