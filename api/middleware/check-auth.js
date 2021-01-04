const config = require("../../config/server");


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    /* Check Access Start */
    if (token == req.session.token) next();
    else return res.status(401).json({
      message: 'Unauthorised Access'
    });
    /* Check Access End */

  } catch (error) {
    return res.status(401).json({
      message: 'Unauthorised Access'
    });
  }
};
