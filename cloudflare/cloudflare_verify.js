addEventListener('fetch', event => {
	console.log(event.request)

	if (event.request.method === "GET") {
		console.log("this is a verification request.")

		if (event.request.headers.has('X-Okta-Verification-Token')) {
			console.log("found the verification token header.")

			var myHeaders = new Headers()

			myHeaders.set('Content-Type', 'application/json')

			let responseInit = {
				status: 200,
				statusText: "OK",
				headers: myHeaders
			}

			var myResponse = new Response(
				JSON.stringify(
					{verificationToken: event.request.headers.get('X-Okta-Verification-Token')}
				), responseInit
			)
			event.respondWith(myResponse)
		}
		else {
			console.log("could not find the right header for verification.")
		}
	}
})
