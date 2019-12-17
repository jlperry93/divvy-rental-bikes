// Station - Where the bikes can originate and end
export interface IStation {
  station_id: string;
  external_id: string;
  name: string;
  short_name: string;
  lat: number;
  lon: number;
  rental_methods: string[];
  capacity: number;
  electric_bike_surcharge_waiver: boolean;
  eightd_has_key_dispenser: boolean;
  has_kiosk: boolean;
}

export interface IStationAPI {
  stations: IStation[];
}
