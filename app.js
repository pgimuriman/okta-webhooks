// Okta + TrustedKey integration

////////////////////////////////////////////////////

require('dotenv').config()

const bodyParser = require("body-parser")

const express = require('express')

const fs = require('fs')

const request = require("request")

///////////////////////////////////////////////////

// SET UP WEB SERVER
const app = express()

var port = process.env.PORT

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit: '50mb', type: 'application/json'}));

app.use(express.static('public'))

app.listen(port, function () {
	console.log('App listening on port ' + port + '...');
})

//////////////////////////////////////////////////

app.post('/webhook', function (req, res) {
	console.dir(req.body)

	console.dir(JSON.stringify(req.body))

	res.json(req.body)

})

app.get('/webhook', function (req, res) {
	console.log("received a request from okta")

	console.log("the header is: " + req.header("X-Okta-Verification-Token"))

	var jsonToken = {}
	jsonToken["verificationToken"] = req.header("X-Okta-Verification-Token")

	res.json(jsonToken)

})
