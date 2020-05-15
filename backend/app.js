var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors")
const app = express()
const https = require("http")
const server = https.createServer(app);
var io = require('socket.io')(server)

const twitterWebhooks = require('twitter-webhooks');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const session = require("express-session")
var passport = require("passport")
const TwitterStrategy = require("passport-twitter").Strategy

app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: "adasdiasdhasndkjansdsjd",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60,
      path: "/",
      httpOnly: true
    },
    rolling: true
  })
);
const userActivityWebhook = twitterWebhooks.userActivity({
  serverUrl: 'https://5dd1e7dc.ngrok.io',
  route: '/webhook', //default : '/'
  consumerKey: "RKoBdgHFyKWHoc12H7BavcHyk",
  consumerSecret: "YzNCLE8hJ7KG6v0Hu4roFvBZaqDcxrqZyIP0GhLKLkakCcwdHY",
  accessToken: '562217539-I6LNmUjUGoyKCRFbTDEFEMO3XB7Z6w3PkJrybeGZ',
  accessTokenSecret: '5EvUKQ3fju2c304gri4wb6W6sbe4obIrseknjSE1bVeN4',
  environment: 'dev', //default : 'env-beta'
  app
});

// userActivityWebhook.register();
async function getHooks() {
  const hooks = await userActivityWebhook.getWebhooks()
  console.log(hooks.environments[0].webhooks)
}
getHooks()
passport.use(new TwitterStrategy({
  consumerKey: "RKoBdgHFyKWHoc12H7BavcHyk",
  consumerSecret: "YzNCLE8hJ7KG6v0Hu4roFvBZaqDcxrqZyIP0GhLKLkakCcwdHY",
  callbackURL: "http://localhost:3001/login/callback"
},
  function (token, tokenSecret, profile, cb) {
    // console.log(token, tokenSecret, profile._json, cb)
    const { id } = profile._json
    subscribe(id, token, tokenSecret)
    return cb(null, { token, tokenSecret, id })
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log(user)
  done(null, user);
});

async function subscribe(userId, accessToken, accessTokenSecret) {

  const userActivity = await userActivityWebhook.subscribe({
    userId,
    accessToken,
    accessTokenSecret
  })

  // userActivity
  //   .on('favorite', (data) => console.log(userActivity.id + ' - favorite'))
  //   .on('tweet_create', (data) => console.log(userActivity.id + ' - tweet_create'))
  //   .on('follow', (data) => console.log(userActivity.id + ' - follow'))
  //   .on('mute', (data) => console.log(userActivity.id + ' - mute'))
  //   .on('revoke', (data) => console.log(userActivity.id + ' - revoke'))
  // .on('direct_message', (data) => console.log(userActivity.id + ' - direct_message'))
  //   .on('direct_message_indicate_typing', (data) => console.log(userActivity.id + ' - direct_message_indicate_typing'))
  //   .on('direct_message_mark_read', (data) => console.log(userActivity.id + ' - direct_message_mark_read'))
  //   .on('tweet_delete', (data) => console.log(userActivity.id + ' - tweet_delete'))

}

io.on("connection", socket => {
  console.log("New client connected");
})

app.use(passport.initialize())
app.use(passport.session())

app.get('/login',
  passport.authenticate('twitter'));
// app.use('/', indexRouter);
// app.use('/users', usersRouter);



app.get("/login/callback", passport.authenticate('twitter'), (req, res) => {

  const { token, tokenSecret } = req.session.passport.user

  res.redirect(`http://localhost:3000?&${token}&${tokenSecret}`)

})
userActivityWebhook.on('event', (event, userId, data) => {
  console.log(data)
  if (true) {
    io.emit("mention", data);

  }
});
// userActivityWebhook.on('unknown-event', (rawData) => console.log(rawData));

server.listen(3001);
// module.exports = app;
