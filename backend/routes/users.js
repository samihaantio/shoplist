const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const Item = require('../models/item');

const router = express.Router();

router.post('/register', (req, res, next) => {
  
  const newUser = new User(req.body);

  // Save, via Passport's "register" method, the user
  User.register(newUser, req.body.password, (err, user) => {
    // If there's a problem, send back a JSON object with the error
    if (err) {
      return res.send(JSON.stringify({ error: err }));
    }
    // Otherwise, for now, send back a JSON object with the new user's info
    return res.send(JSON.stringify(user));
  });

});

// POST to /login
router.post('/login', (req, res) => {
  passport.authenticate('local')(req, res, () => {
    // If logged in, we should have user info to send back
    if (req.user) {
      return res.send(JSON.stringify({success: true, userdata: req.user}));
    }

    // Otherwise return error
    return res.send(JSON.stringify({ error: 'There was an error logging in' }));
  });
});

// GET to /logout
router.get('/logout', (req, res) => {
  req.logout();
  return res.send(JSON.stringify(req.user));
});


router.get('/items', (req, res, next) => {

  Item.find({}, (err, items) => {
    if (err) console.log(err);
    res.send({'success': true, 'items': items});
  });

});

router.post('/items', (req, res, next) => {
  
  var item = req.body.item;
  var currentTime = new Date();
  //var newItem = {name: item, date: currentTime};

  const newItem = new Item({ 
    name: item,
    date: currentTime
  });
  newItem.save((err) => {
    if (err) console.log(err);
    res.send({'success': true});
  });


});

router.delete('/items/delete', (req, res, next) => {
  
  var deleteId = req.body.id;
  var deleteItem = {id: deleteId};

  Item.find({ _id:deleteId }).remove( (err) => {
    if (err) console.log(err);
    res.send({'success': true});
  });

});


module.exports = router;
