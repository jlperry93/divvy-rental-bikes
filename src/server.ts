import bodyParser from "body-parser";
import express from "express";
const app = express();
const port = 8080;

// controllers
import { RiderController } from "./controllers/riderController";
import StationController from "./controllers/stationController";
import { TripController } from "./controllers/tripController";

app.use(bodyParser.json());

// GET information for given stations
const stationController = new StationController();
app.use("/stations", stationController.router);

// GET age ranges for given station(s) on given day
const riderController = new RiderController();
app.use("/riders", riderController.router);

// GET request recent trips for given station(s)
const tripController = new TripController();
app.use("/recentTrip", tripController.router);

app.get("/", (req, res) => res.send("Welcome to Jordan's Divvy Coding Challenge"));

app.use(express.static("data"));

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`App listening on port ${port}`);
});
