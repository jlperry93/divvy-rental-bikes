import * as express from "express";
import { Request, Response } from "express";
import IControllerBase from "../models/controllerBase";
import { IAgeGroups, IRidersAgeResponse, RIDER_AGE_GROUPS, RidersAgeResponse } from "../models/rider";
import { TRIP_DEATILS } from "./../models/trip";
import { TripsService } from "./../services/tripsService";

// Given one or more stations, return the number of riders in the following age groups,
// [0-20,21-30,31-40,41-50,51+, unknown], who ended their trip at that station for a given
// day.
export class RiderController implements IControllerBase {
  public router = express.Router();
  private tripsService: TripsService;

  constructor() {
    this.initRoutes();
    this.tripsService = new TripsService();
  }

  public initRoutes(): any {
    this.router.get("/", this.index);
    this.router.get("/:id", this.index);
    this.router.get("/:id/:date", this.index);
  }

  private index = async (req: Request, res: Response) => {
    if (!req.params.id) {
       res.status(500).send({ message: "Invalid Request: Include station ID(s)"});
    } else if (!req.params.date) {
      res.status(500).send({ message: "Invalid Request: Include date"});
    } else {
      const stationIDs = req.params.id.split(",");
      const date = this.getDate(req.params.date);
      const stations = await this.getRidersAgeRange(stationIDs, date);
      res.send({ stations });
    }
  }

  private async getRidersAgeRange(ids: string[], endDate: string): Promise<IRidersAgeResponse[]> {
    const tripDetails = await this.tripsService.getTrips();
    if (tripDetails) {
      const selectedTrips: IRidersAgeResponse[] = [];
      ids.forEach((id: string) => {
        const selectedStationTrips: any[] = [];
        tripDetails.forEach((trip: any) => {
          const tripEndDate = this.getDate(trip[TRIP_DEATILS.LOCAL_END_TIME]);
          if (id === trip[TRIP_DEATILS.END_STATION_ID] && endDate === tripEndDate) {
            selectedStationTrips.push(trip);
          }
        });
        const ageResponse = this.processBirthYear(id, selectedStationTrips);
        selectedTrips.push(ageResponse);
      });
      return selectedTrips;
    }
  }

  private processBirthYear(station: string, trips: any[]): IRidersAgeResponse {
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
    trips.forEach((trip: any) => {
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
    });
    return groupAgeList;
  }

  private getDate(date: string): string {
    const partialDate = date.split("-");
    const year = partialDate[0];
    const month = partialDate[1];
    const day = new Date(date).getDay();
    const fullDate = `${year}-${month}-${day}`;
    return fullDate;
  }
}
