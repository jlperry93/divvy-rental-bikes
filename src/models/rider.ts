export enum RIDER_AGE_GROUPS {
  UNDER21 = "0-20",
  FROM21TO30 = "21-31",
  FROM31TO40 = "31-40",
  FROM41TO50 = "41-50",
  OVER50 = "51+",
  UNKONWN = "unknown"
}

export class RidersAgeResponse {
  constructor(public stationId: string, public ages: IAgeGroups) { }
}

// 0-20,21-30,31-40,41-50,51+, unknown
export interface IRidersAgeResponse {
  stationId: string;
  ages: IAgeGroups;
}

export interface IAgeGroups {
  [RIDER_AGE_GROUPS.UNDER21]: number;
  [RIDER_AGE_GROUPS.FROM21TO30]: number;
  [RIDER_AGE_GROUPS.FROM21TO30]: number;
  [RIDER_AGE_GROUPS.FROM31TO40]: number;
  [RIDER_AGE_GROUPS.FROM41TO50]: number;
  [RIDER_AGE_GROUPS.OVER50]: number;
  [RIDER_AGE_GROUPS.UNKONWN]: number;
}
