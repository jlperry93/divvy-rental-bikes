import bodyParser from "body-parser";
import express from "express";
const app = express();
const port = 8080;

// controllers
import { RiderController } from "./controllers/riderController";
import StationController from "./controllers/stationController";
import { TripController } from "./controllers/tripController";

const riderController = new RiderController();
const stationController = new StationController();
const tripController = new TripController();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GET age ranges for given station(s) on given day
app.use("/riders", riderController.router);

// GET information for given stations
app.use("/stations", stationController.router);

// GET request recent trips for given station(s)
app.use("/recentTrips", tripController.router);

app.get("/", (req, res) => res.send("Welcome to Jordan's Divvy Coding Challenge"));

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`App listening on port ${port}`);
});
