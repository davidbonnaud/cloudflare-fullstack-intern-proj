addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  let variantUrls, randomNum = Math.round(Math.random());

  await fetch('https://cfw-takehome.developers.workers.dev/api/variants').then((response) => {
    return response.json();
  }).then((data) => {
    variantUrls = data;
    return data;
  });

  return new Response(
    await fetch(`${variantUrls.variants[randomNum]}`, {
      redirect: `follow`,
    }).then((response) => {
      return response;
    })
  )
}

