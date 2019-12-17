import * as express from "express";
import { Request, Response } from "express";
import MiddleWare from "../middleware/middleware";
import { IAgeGroups, IRidersAgeResponse, RIDER_AGE_GROUPS, RidersAgeResponse } from "../models/rider";
import { GeneralUtils } from "../utils/generalUtils";
import { ITrip, TRIP_DEATILS } from "./../models/trip";
import TripsService from "./../services/tripsService";

// Given one or more stations, return the number of riders in the following age groups,
// [0-20,21-30,31-40,41-50,51+, unknown], who ended their trip at that station for a given
// day.
export default class RiderController {
  public router = express.Router();
  private tripsService: TripsService;
  private middleware: MiddleWare;

  constructor() {
    this.tripsService = new TripsService();
    this.middleware = new MiddleWare();
    this.initRoutes();
  }

  public initRoutes(): any {
    this.router.get("/", this.middleware.authHandler, this.middleware.idHandler, this.index);
    this.router.get(
      "/:id",
      this.middleware.authHandler,
      this.middleware.idHandler,
      this.middleware.dateHandler,
      this.index
    );
    this.router.get(
      "/:id/:date",
      this.middleware.authHandler,
      this.middleware.idHandler,
      this.middleware.dateHandler,
      this.middleware.cacheHandler,
      this.index
    );
  }

  private index = async (req: Request, res: Response) => {
    const stationIDs = req.params.id.split(",");
    const date = GeneralUtils.getDate(req.params.date);
    try {
      const stations = await this.getRidersAgeRange(stationIDs, date);
      res.send({ stations });
    } catch (error) {
      res.status(500).send({ message: `Internal Server Erorr: ${error}` });
    }
  }

  private async getRidersAgeRange(ids: string[], endDate: string): Promise<IRidersAgeResponse[]> {
    const tripDetails = await this.tripsService.getTrips();
    if (tripDetails) {
      const selectedTrips: IRidersAgeResponse[] = [];

      // loop through the array of ids
      ids.forEach((id: string) => {
        const agesGroups = this.processTripsList(id, endDate, tripDetails);
        selectedTrips.push(agesGroups);
      });
      return selectedTrips;
    }
  }

  private processTripsList(station: string, endDate: string, trips: ITrip[]): IRidersAgeResponse {
    // tslint:disable-next-line:prefer-const
    const ages: IAgeGroups = {
      [RIDER_AGE_GROUPS.UNDER21]: 0,
      [RIDER_AGE_GROUPS.FROM21TO30]: 0,
      [RIDER_AGE_GROUPS.FROM31TO40]: 0,
      [RIDER_AGE_GROUPS.FROM41TO50]: 0,
      [RIDER_AGE_GROUPS.OVER50]: 0,
      [RIDER_AGE_GROUPS.UNKONWN]: 0
    };
    const groupAgeList = new RidersAgeResponse(station, ages);
    const currentYear = new Date().getFullYear();

    // loop through the array of trips to determine valid trip and update age group
    trips.forEach((trip: any) => {
      const tripEndDate = GeneralUtils.getDate(trip[TRIP_DEATILS.LOCAL_END_TIME]);
      if (station === trip[TRIP_DEATILS.END_STATION_ID] && endDate === tripEndDate) {
        const approxAge = currentYear - trip[TRIP_DEATILS.MEMBER_BIRTH_YEAR];
        if (approxAge < 21) {
          groupAgeList.ages[RIDER_AGE_GROUPS.UNDER21]++;
        } else if (approxAge > 20 || approxAge < 30) {
          groupAgeList.ages[RIDER_AGE_GROUPS.FROM21TO30]++;
        } else if (approxAge > 30 || approxAge < 40) {
          groupAgeList.ages[RIDER_AGE_GROUPS.FROM31TO40]++;
        } else if (approxAge > 40 || approxAge < 50) {
          groupAgeList.ages[RIDER_AGE_GROUPS.FROM41TO50]++;
        } else if (approxAge > 50) {
          groupAgeList.ages[RIDER_AGE_GROUPS.OVER50]++;
        } else {
          groupAgeList.ages[RIDER_AGE_GROUPS.UNKONWN]++;
        }
      }
    });
    return groupAgeList;
  }
}
