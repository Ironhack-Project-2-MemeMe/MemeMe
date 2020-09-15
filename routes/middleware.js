const User = require('../models/User'); 
 
function loginCheck (req, callback)  {
  if (req.isAuthenticated()) {
    console.log('Current user', req.session.passport.user);
    User.findOne({ _id: req.session.passport.user })
    .then(found => {
      if (found !== null) {
        req.mememeIsUserLoggedIn = true;
        req.mememeUser = found;
        callback(true);
      } else {
        console.log("Authenticated user missing in DB. This error should really never happen :3");
        req.mememeIsUserLoggedIn = false;
        callback(false);
      }
    });
  } else {
    req.mememeIsUserLoggedIn = false;
    callback(false);
  }
}

function loggedInOnly (req, res, next)  {
  loginCheck(req, (isAuthenticated) => {
    if(isAuthenticated) {
      next();
    } else {
      res.redirect('/login');
    }
  });
}

function loggedInMaybe (req, res, next)  {
  loginCheck(req, () => {
      next();
  });
}

module.exports = {
  loggedInOnly,
  loggedInMaybe
};