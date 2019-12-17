// tslint:disable:object-literal-sort-keys
import StationController from "./stationController";

describe("StationsService", () => {
  const mockData = {
    last_updated: 1576429871,
    ttl: 2,
    data: {
      stations: [{
        station_id: "2",
        external_id: "a3a36d9e-a135-11e9-9cda-0a87ae2ba916",
        name: "Buckingham Fountain",
        short_name: "15541",
        lat: 41.87651122881695,
        lon: -87.62054800987242,
        rental_methods: [
          "CREDITCARD",
          "TRANSITCARD",
          "KEY"],
        capacity: 39,
        electric_bike_surcharge_waiver: false,
        eightd_has_key_dispenser: false,
        has_kiosk: true
      }, {
        station_id: "3",
        external_id: "a3a37378-a135-11e9-9cda-0a87ae2ba916",
        name: "Shedd Aquarium",
        short_name: "15544",
        lat: 41.86722595682,
        lon: -87.6153553902,
        rental_methods: [
          "CREDITCARD",
          "TRANSITCARD",
          "KEY"
        ],
        capacity: 55,
        electric_bike_surcharge_waiver: false,
        eightd_has_key_dispenser: false,
        has_kiosk: true
      }]
    }
  };

  const mockStationController = new StationController();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get one station from stations api", async () => {
    const expectedResult = [{
      station_id: "2",
      external_id: "a3a36d9e-a135-11e9-9cda-0a87ae2ba916",
      name: "Buckingham Fountain",
      short_name: "15541",
      lat: 41.87651122881695,
      lon: -87.62054800987242,
      rental_methods: [
        "CREDITCARD",
        "TRANSITCARD",
        "KEY"],
      capacity: 39,
      electric_bike_surcharge_waiver: false,
      eightd_has_key_dispenser: false,
      has_kiosk: true
    }];

    expect.assertions(2);
    const result = await mockStationController.getStationsWithID(["2"]);
    expect(result.length).toEqual(1);
    expect(result).toEqual(expectedResult);
  });

  it("should get two stations from stations api", async () => {
    const expectedResult = [{
      station_id: "2",
      external_id: "a3a36d9e-a135-11e9-9cda-0a87ae2ba916",
      name: "Buckingham Fountain",
      short_name: "15541",
      lat: 41.87651122881695,
      lon: -87.62054800987242,
      rental_methods: [
        "CREDITCARD",
        "TRANSITCARD",
        "KEY"],
      capacity: 39,
      electric_bike_surcharge_waiver: false,
      eightd_has_key_dispenser: false,
      has_kiosk: true
    }, {
      station_id: "3",
      external_id: "a3a37378-a135-11e9-9cda-0a87ae2ba916",
      name: "Shedd Aquarium",
      short_name: "15544",
      lat: 41.86722595682,
      lon: -87.6153553902,
      rental_methods: [
        "CREDITCARD",
        "TRANSITCARD",
        "KEY"],
      capacity: 55,
      electric_bike_surcharge_waiver: false,
      eightd_has_key_dispenser: false,
      has_kiosk: true
    }];

    expect.assertions(2);
    const result = await mockStationController.getStationsWithID(["2", "3"]);
    expect(result.length).toEqual(2);
    expect(result).toEqual(expectedResult);
  });
});
