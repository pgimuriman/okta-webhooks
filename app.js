// Okta Event Hooks utilities

////////////////////////////////////////////////////

require('dotenv').config()

const bodyParser = require('body-parser')

const express = require('express')

const fs = require('fs')

const request = require('request')

///////////////////////////////////////////////////

// SET UP WEB SERVER
const app = express()

var port = process.env.PORT || 3020

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit: '50mb', type: 'application/json'}));

app.use(express.static('public'))

app.listen(port, function () {
	console.log('App listening on port ' + port + '...');
})

//////////////////////////////////////////////////

app.post('/event_hooks', function (req, res) {
	console.dir(req.body)

	console.dir(JSON.stringify(req.body))

	route_request(req.body)

	// res.json(req.body)

})

app.get('/event_hooks', function (req, res) {
	console.log("received a verification request from okta")

	const verification_header = "X-Okta-Verification-Challenge"

	console.log("the header is: " + req.header(verification_header))

	var response_obj = {}

	response_obj["verification"] = req.header(verification_header)

	res.json(response_obj)

})

function route_request(hook_obj) {

	// const url = "https://webhook.site/8a1c25d1-2a62-4864-8a02-bf5c74d72dc4"

	request.post(process.env.HOOK_DEST_01, {form:{msg:'got an event hook from Okta!'}})

	return

	// request.post('http://service.com/upload', {form:{key:'value'}})


}
