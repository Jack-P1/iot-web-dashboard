const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  try{

    const token = req.headers['authorization'];

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, 'secret')

    req.id = decoded.id
    req.role = decoded.role

    next()

  } catch(err){
    return res.status(401).json({ error: 'Unauthorized' });
  }
};