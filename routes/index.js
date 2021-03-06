const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../app/models/config');

router.get('/register', (req, res, next) => {
    return res.render('register');
})

router.get('/', (req, res, next) => {
	return res.render('map')
})

router.post('/register', (req, res, next) => {
  request.post({
    url: config.apiUrl + '/users',
    form: req.body
  }).pipe(res)
})

router.get('/login', (req, res, next) => {
  return res.render('login')
})

router.post('/login', (req, res, next) => {
  request.post({
    url: config.apiUrl + '/auth/login',
    form: req.body
  }).pipe(res)
})

// router.get('/profile', (req, res, next) => {
// 	return res.render('profile')
// })


// router.get('/profile/:id', (req, res, next) => {
// 	request.get({ 
// 		url: config.apiUrl + '/profile/' + req.params.value,
// 		headers: { 'x-access-token': req.headers['x-access-token']}
// 	}).pipe(res)
//   	return res.render('profile')
// })
router.get('/map', (req, res, next) => {
  return res.render('map')
})

router.get('/map/:userId', (req, res, next) => {
  request.get({ 
    url: config.apiUrl + '/users/seeFriends/' + req.params.userId,
    headers: { 'x-access-token': req.headers['x-access-token']}
  }, (err, response, body) => {
    if (err) return next(err)
    if (!body) return next(new Error('Missing body ' + body))
    friends = JSON.parse(body)
    console.log("here are my friends", friends)
    return res.render('map', { friends: JSON.stringify(friends) })
  })
  //return res.render('map')
})

router.post('/map', (req, res, next) => {
	request.post({
		url: config.apiUrl + '/users/checkIn',
		form: req.body
	}).pipe(res)
})

router.put('/map', (req, res, next) => {
  request.put({
    url: config.apiUrl + '/users/checkOut',
    form: req.body
  }).pipe(res)
})

router.get('/city', (req, res, next) => {
  return res.render('city')
})

router.get('/test', (req, res, next) => {
  return res.render('test')
})

router.post('/register', (req, res, next) => {
  request.post({
    url: config.apiUrl + '/users',
    form: req.body
  }).pipe(res)
})

router.get('/addFriend', (req, res, next) => {
  return res.render('addFriend')
})

router.post('/users/:userId/id', (req, res, next) => {
  request.post({
    url: config.apiUrl + '/users/' + req.params.userId + '/addFriend',
    headers: { 'x-access-token': req.headers['x-access-token'] },
    form: req.body
  }).pipe(res)
})

router.get('/interests', (req, res, next) => {
  return res.render('interests')
})

router.post('/addInterests', (req, res, next) => {
  request.post({
    url: config.apiUrl + '/users/addInterests',
    headers: { 'x-access-token': req.headers['x-access-token'] },
    form: req.body
  }).pipe(res)
})

router.get('/search/:value', (req, res, next) => {
  request.get({ 
    url: config.apiUrl + '/search/' + req.params.value,
    headers: { 'x-access-token': req.headers['x-access-token'] }
  }).pipe(res)
})

router.get('/users/:userId/id', (req, res, next) => {
  request.get({ 
    url: config.apiUrl + '/users/' + req.params.userId + '/id',
  }, (err, response, body) => {
    if (err) return next(err)
    if (!body) return next(new Error('Missing body ' + body))
    user = JSON.parse(body)
    return res.render('profile', { user: user })
  })
})

module.exports = router;