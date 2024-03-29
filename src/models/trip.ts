export enum TRIP_DEATILS {
  RENTAL_ID = "01 - Rental Details Rental ID",
  LOCAL_START_TIME = "01 - Rental Details Local Start Time",
  LOCAL_END_TIME = "01 - Rental Details Local End Time",
  BIKE_ID = "01 - Rental Details Bike ID",
  DURATION_IN_SECONDS = "01 - Rental Details Duration In Seconds Uncapped",
  START_STATION_ID = "03 - Rental Start Station ID",
  START_STATION_NAME = "03 - Rental Start Station Name",
  END_STATION_ID = "02 - Rental End Station ID",
  END_STATION_NAME = "02 - Rental End Station Name",
  MEMBER_TYPE = "User Type",
  MEMBER_GENDER = "Member Gender",
  MEMBER_BIRTH_YEAR = "05 - Member Details Member Birthday Year"
}

export interface ITrip {
  [TRIP_DEATILS.RENTAL_ID]: string;
  [TRIP_DEATILS.LOCAL_START_TIME]: string;
  [TRIP_DEATILS.LOCAL_END_TIME]: string;
  [TRIP_DEATILS.BIKE_ID]: string;
  [TRIP_DEATILS.DURATION_IN_SECONDS]: string;
  [TRIP_DEATILS.START_STATION_ID]: string;
  [TRIP_DEATILS.START_STATION_NAME]: string;
  [TRIP_DEATILS.END_STATION_ID]: string;
  [TRIP_DEATILS.END_STATION_NAME]: string;
  [TRIP_DEATILS.MEMBER_TYPE]: string;
  [TRIP_DEATILS.MEMBER_GENDER]: string;
  [TRIP_DEATILS.MEMBER_BIRTH_YEAR]: string;
}

export class RecentTripsResponse {
  constructor(public stationId: string, public trips: ITrip[]) { }
}

export interface IRecentTrips {
  stationId: string;
  trips: ITrip[];
}
