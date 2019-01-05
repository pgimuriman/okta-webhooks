addEventListener('fetch', event => {
  event.respondWith(fetchAndApply(event.request))
})

// POST to tray.io
async function fetchAndApply(request) {

  const postData = await request.json();

  let headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }

  const init = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(postData)
  }

  const url = "https://a4f5ce35-e604-45d8-bbc3-a64e9483479b.trayapp.io"

  const response = await fetch(url, init)

  console.log('Got response', response)
  return response
}