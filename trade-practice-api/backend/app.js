let express = require("express"),
  cors = require("cors"),
  bodyParser = require("body-parser");
let routeService = require("../backend/routes/route.helper");
// Connect mongoDB
// mongoose.connect(database.db, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log("Database connected")
//   },
//   error => {
//     console.log("Database could't be connected to: " + error)
//   }
// )

// const studentAPI = require('../backend/routes/student.route')
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());

// API
// app.use('/api', studentAPI)
app.get("/health", (req, res) => {
  res.send({ live: true });
});

app.get("/chartData", routeService.getChartData);
app.get("/getStocks", routeService.getStocks);

// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});

// Find 404
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
