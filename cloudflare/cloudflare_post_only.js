addEventListener('fetch', event => {
  event.respondWith(fetchAndApply(event.request))
})

async function fetchAndApply(request) {
  try {
    const postData = await request.json();
    console.log("the post data is: " + postData)

    console.log("the uuid is: " + postData.events[0].uuid)

    return new Response("hello uuid " + postData.events[0].uuid) 
    
  } catch (err) {
    return new Response('could not unbundle post data')
  }
}