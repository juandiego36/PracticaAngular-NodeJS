var auth = require('../models/auth')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const SECRET_KEY = 'secretkey1234'

module.exports.createUser = (req, res, next) => { //req contiene los parametros
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
      }
    
      auth.save(newUser, (err, user) => {
        if (err && err.code === 11000) return res.status(409).send('Email already exists');
        if (err) return res.status(500).send('Server error');
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id },
          SECRET_KEY, {
            expiresIn: expiresIn
          });
        const dataUser = {
          name: user.name,
          email: user.email,
          accessToken: accessToken,
          expiresIn: expiresIn
        }
        // response 
        res.send({ dataUser });
      });
}

 exports.loginUser = (req, res)=>{
    const userData = {
        email: req.body.email,
        password: req.body.password
      }
      auth.findOne({ email: userData.email }, (err, user) => {
        if (err) return res.status(500).send('Server error!');
    
        if (!user) {
          // email does not exist
          res.status(409).send({ message: 'Something is wrong' });
        } else {
          const resultPassword = bcrypt.compareSync(userData.password, user.password);
          if (resultPassword) {
            const expiresIn = 24 * 60 * 60;
            const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });
    
            const dataUser = {
              name: user.name,
              email: user.email,
              accessToken: accessToken,
              expiresIn: expiresIn
            }
            res.send({ dataUser });
          } else {
            // password wrong
            res.status(409).send({ message: 'Something is wrong' });
          }
        }
      });
}



