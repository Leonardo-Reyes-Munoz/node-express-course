const jwt = require('jsonwebtoken');
const { BadRequestError } = require('../errors');

const login = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    throw new BadRequestError('User name and password must be included');
  }

  const token = jwt.sign({ name }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });

  console.log('You have reached the logon route. Generated token:', token);
  res.status(200).json({ msg: 'Login/register request successful', token });
};

const dashboard = async (req, res) => {
  console.log('You have reached the hello route');
  const { name } = req.user;

  res.status(200).json({
    msg: `Dashboard login request successful. Welcome: ${name}`,
  });
};

module.exports = { login, dashboard };
