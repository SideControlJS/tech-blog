require("dotenv").config();

//required packages
const express = require("express");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const routes = require("./controllers");
const path = require("path");
const helpers = require("./utils/helpers");
const exphbs = require("express-handlebars");
const session = require("express-session");
const hbs = exphbs.create({ helpers });
const app = express();
const PORT = process.env.PORT || 3001;

//set up sessions
const sess = {
  secret: process.env.SECRET,
  cookie: { maxAge: 36000 },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

//set up handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//set up sessions
app.use(session(sess));

//set up express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//set up routes
app.use(routes);

//set up sequelize
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});

// Path: controllers/index.js
const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");
const dashboardRoutes = require("./dashboardRoutes");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;