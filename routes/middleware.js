const User = require('../models/User'); 
 
function loginCheck (req, res, next)  {
  if (req.isAuthenticated()) {
    console.log('Current user', req.session.passport.user);
    User.findOne({ _id: req.session.passport.user })
    .then(found => {
      if (found !== null) {
        req.mememeUser = found;
        next();
      } 
    });
  } else {
    res.redirect('/login');
  }
}

module.exports = {
  loginCheck: loginCheck
};