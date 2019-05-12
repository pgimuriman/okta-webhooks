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

	// comment / uncomment these as you progress thru testing

	// sends a POST to HOOK_TEST_URI
	test_request()

	// sends a POST to HOOK_TEST_URI with the hook payload
	test_request_with_payload(hook_obj)

	// routes to HOOK_TEST_URI based on Okta org and type of event
	test_request_with_routing(hook_obj)

	// stub function to handle routing based on Okta org and type of event
	route_request(hook_obj)
})

function test_request() {
	request.post(process.env.HOOK_TEST_URI, {form:{msg:'got an event hook from Okta!'}})
}

function test_request_with_payload(hook_obj) {
	request.post(process.env.HOOK_TEST_URI, {form: hook_obj})
}

function test_request_with_routing(hook_obj) {

	const source = hook_obj.source

	var arr = source.split(".com/")

	const okta_org = arr[0] + ".com"

	console.log("the Okta org is: " + okta_org)

	// "source":"https://dev-443137.okta.com/api/v1/eventHooks/whokycl89tUFGPMXA356"

	// request.post(process.env.HOOK_DEST_01, {form: hook_obj})

	return

	// request.post('http://service.com/upload', {form:{key:'value'}})


}
