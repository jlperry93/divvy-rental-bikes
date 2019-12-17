import bodyParser from "body-parser";
import express from "express";
// controllers
import RiderController from "./controllers/riderController";
import StationController from "./controllers/stationController";
import TripController from "./controllers/tripController";

export default class Server {

  public app = express();
  public riderController = new RiderController();
  public stationController = new StationController();
  public tripController = new TripController();

  constructor() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  // tslint:disable-next-line:no-unused-expression
  public start(port: number): void {
    // GET age ranges for given station(s) on given day
    this.app.use("/riders", this.riderController.router);
    // GET information for given stations
    this.app.use("/stations", this.stationController.router);
    // GET request recent trips for given station(s)
    this.app.use("/recentTrips", this.tripController.router);

    this.app.listen(port, () => {
      // tslint:disable-next-line:no-console
      console.log(`App listening on port ${port}`);
    });
  }
}
