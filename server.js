require("dotenv").config();

//required packages
const express = require("express");
const sequelize = require("./config/connection");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const routes = require("./controllers");
const path = require("path");
const helpers = require("./utils/helpers");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers });
const app = express();
const PORT = process.env.PORT || 3300;

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
  app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
});


