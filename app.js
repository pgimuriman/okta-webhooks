// Okta Event Hooks utility

////////////////////////////////////////////////////

require('dotenv').config()

const bodyParser = require('body-parser')

const express = require('express')

const fs = require('fs')

const request = require('request')

///////////////////////////////////////////////////

const verification_header = "X-Okta-Verification-Challenge"

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

// Verify an event hook
app.get('/event_hooks', function (req, res) {
	console.log("received a verification request from okta")

	console.log("the header is: " + req.header(verification_header))

	var response_obj = {}

	response_obj["verification"] = req.header(verification_header)

	res.json(response_obj)

})

// Receive an event hook
app.post('/event_hooks', function (req, res) {

	const hook_obj = req.body

	console.dir(JSON.stringify(hook_obj))

	// sends a POST to HOOK_TEST_URI
	test_request()

	// sends a POST to HOOK_TEST_URI with the hook payload
	test_request_with_payload(hook_obj)

	// parses okta org and events arr from hook and passes them to 
	// the handle_request function
	route_request(hook_obj)

	res.sendStatus(200)

})

function get_okta_org(hook_obj, callback) {
	const source = hook_obj.source

	var arr = source.split(".com/")

	const okta_org = arr[0] + ".com"

	console.log("the Okta org is: " + okta_org)

	return callback(null, okta_org)
}

function handle_event(okta_org, event) {

	if (okta_org === process.env.OKTA_ORG_01) {

		if (event.eventType === "user.session.start") {
			console.log("the event type is: " + event.eventType)
			console.log("and the okta org is: " + okta_org)
		}
	}
}

function route_request(hook_obj) {

	get_okta_org(hook_obj, function(err, okta_org) {

		for (var i = 0; i < hook_obj.data.events.length; i++) {
			handle_event(okta_org, hook_obj.data.events[i])
		}
	})
}

function test_request() {
	request.post(process.env.HOOK_TEST_URI, {form:{msg:'got an event hook from Okta!'}})
}

function test_request_with_payload(hook_obj) {
	request.post(process.env.HOOK_TEST_URI, {form: hook_obj})
}
