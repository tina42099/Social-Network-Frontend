const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../app/models/config');

router.get('/', (req, res, next) => {
    return res.render('register');
});

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

router.get('/profile', (req, res, next) => {
	return res.render('profile', {
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        age: req.body.age,
        gender: req.body.gender
     })
})

// router.get('/profile', (req, res, next) => {
// 	request.get({ 
// 		url: config.apiUrl + '/users'
// 	}).pipe(res)
// })

router.get('/profile/:id', (req, res, next) => {
	request.get({ 
		url: config.apiUrl + '/profile/' + req.params.value,
		headers: { 'x-access-token': req.headers['x-access-token']}
	}).pipe(res)
	// res.render('profile', {
	//     name: data.name,
	//     email: data.email,
	//     address: data.address,
	//     age: data.age,
	//     gender: data.gender
	//   })
})

router.get('/map', (req, res, next) => {
	return res.render('map')
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

router.post('/addFriend', (req, res, next) => {
	request.post({
		url: config.apiUrl + '/users/addFriend',
		headers: { 'x-access-token': req.headers['x-access-token']}
		//form: req.body
	}).pipe(res)
})

router.post('/addInterests', (req, res, next) => {
	request.post({
		url: config.apiUrl + '/users/addInterests',
		headers: { 'x-access-token': req.headers['x-access-token']}
		//form: req.body
	}).pipe(res)
})

router.get('/search/:value', (req, res, next) => {
	request.get({ 
		url: config.apiUrl + '/search/' + req.params.value,
		headers: { 'x-access-token': req.headers['x-access-token']}
	}).pipe(res)
})

module.exports = router;