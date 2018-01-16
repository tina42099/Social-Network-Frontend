const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../app/models/config');

router.get('/', (req, res, next) => {
    return res.render('register');
});

router.get('/login', (req, res, next) => {
	return res.render('login')
})

router.get('/profile', (req, res, next) => {
	return res.render('profile')
})

router.get('/map', (req, res, next) => {
	return res.render('map')
})

router.post('/register', (req, res, next) => {
	request.post({
		url: config.apiUrl + '/users',
		form: req.body
	}).pipe(res)
})

module.exports = router;