const Router = require('./router')

/**
 * Example of how router can be used in an application
 *  */
addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

function handler(request) {
    const init = {
        headers: { 'content-type': 'application/json' },
    }
    const body = JSON.stringify({ some: 'json' })
    return new Response(body, init)
}
/**
 * readRequestBody reads in the incoming request body
 * Use await readRequestBody(..) in an async function to get the string
 * @param {Request} request the incoming request to read from
 */
async function readRequestBody(request) {
    const { headers } = request
    const contentType = headers.get("content-type") || ""

    if (contentType.includes("application/json")) {
        return await request.json();
    }
    else if (contentType.includes("application/text")) {
        return await request.text()
    }
    else if (contentType.includes("text/html")) {
        return await request.text()
    }
    else if (contentType.includes("form")) {
        const formData = await request.formData()
        const body = {}
        for (const entry of formData.entries()) {
            body[entry[0]] = entry[1]
        }
        return JSON.stringify(body)
    }
    else {
        const myBlob = await request.blob()
        return URL.createObjectURL(myBlob)
    }
}
async function handlerGraphql(request) {
    const init = {
        headers: {
            "content-type": "application/json;charset=UTF-8"
        },
    }
    const reqBody = await readRequestBody(request);
    console.log(reqBody);
    const body = JSON.stringify(reqBody, null, 2);
    return new Response(body, init);
}

function createDestination (destination, prefix, request) {
    const url = new URL(request.url);
    let path = url.pathname;
    path = path.replace(prefix,"")
    if (path) {
        destination = destination+path
    }
    let query =  (request.url).split('?')[1];
    if (query) {
        destination = destination+'?'+query;
    }
    return destination;
}

async function handleRequest(request) {
    const r = new Router()
    r.get('.*/homepage-builder.*', async (request) => {
        const destination = createDestination('https://homepage-builder-staging.appspot.com', '/homepage-builder', request);
        return await fetch (destination, request);
    })
    r.put('.*/homepage-builder.*', async (request) => {
        const destination = createDestination('https://homepage-builder-staging.appspot.com', '/homepage-builder', request);
        return await fetch (destination, request);
    })
    r.post('.*/homepage-builder.*', async (request) => {
        const destination = createDestination('https://homepage-builder-staging.appspot.com', '/homepage-builder', request);
        return await fetch (destination, request);
    })
    r.delete('.*/homepage-builder.*', async (request) => {
        const destination = createDestination('https://homepage-builder-staging.appspot.com', '/homepage-builder', request);
        return await fetch (destination, request);
    })
    r.get('.*/giftwrap.*', async (request) => {
        const destination = createDestination('https://giftwrap-staging-pern43sgsa-ew.a.run.app', '/giftwrap', request);
        return await fetch (destination, request);
    })
    r.post('.*/giftwrap.*', async (request) => {
        const destination = createDestination('https://giftwrap-staging-pern43sgsa-ew.a.run.app', '/giftwrap', request);
        return await fetch (destination, request);
    })
    r.put('.*/giftwrap.*', async (request) => {
        const destination = createDestination('https://giftwrap-staging-pern43sgsa-ew.a.run.app', '/giftwrap', request);
        return await fetch (destination, request);
    })
    r.delete('.*/giftwrap.*', async (request) => {
        const destination = createDestination('https://giftwrap-staging-pern43sgsa-ew.a.run.app', '/giftwrap', request);
        return await fetch (destination, request);
    })
    r.post('.*/graphql', async (request) => {
        return await fetch ("https://teeela-algolia-graphql.oa.r.appspot.com/graphql", request);
    })
    return r.route(request)
}
