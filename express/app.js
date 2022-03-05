const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const passport = require('passport')

dotenv.config();
const authRouter = require('./routes/auth');
const url = (process.env.NODE_ENV === 'production') ? "http://15.164.45.134:80" : "http://127.0.0.1:800"

const app = express();

app.use(cors(url));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  }
}))
app.use(passport.initialize());
app.use(passport.session());

const { sequelize, User } = require('./models');
const passportConfig = require('./passport');


passportConfig();
app.set('port', process.env.PORT || 3080);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

app.use('/auth', authRouter);

app.set("port", process.env.PORT || 3080);

app.get("/", (req, res) => {
  res.send("Hello Express");
});


app.listen(app.get("port"), () => {
  console.log(process.env.PORT)
  console.log("http://127.0.0.1:3080");
});