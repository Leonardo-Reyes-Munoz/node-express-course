const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const dateObj = new Date();
  const time = dateObj.toTimeString();
  console.log(method, url, time);

  next();
};

module.exports = logger;
