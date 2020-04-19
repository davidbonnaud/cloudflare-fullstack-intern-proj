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

  let randomUrl = variantUrls.variants[randomNum];

  class h1Handler {
    element(element) {
      element.setInnerContent(`Hi this is page ${randomNum + 1}`);
      
    }
  }

  class pHandler {
    element(element) {
      element.setInnerContent('This has been edited! Here is a link to my website:');
    }
  }

  class aHandler {
    element(element) {
      element.setInnerContent('Visit davidbonnaud.com');
      element.setAttribute('href', "http://davidbonnaud.com/");
    }
  }

  return new HTMLRewriter().on('h1', new h1Handler()).on('p', new pHandler()).on('a', new aHandler()).transform(await fetch(randomUrl));
}

