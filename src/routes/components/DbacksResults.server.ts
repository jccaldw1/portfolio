// async function getDbacksResults() {
//     let api_key = "a7bed7c9f0c169dbd916902217e294f4f8bfa9d978e59233ff5ca8c872246543";

//     console.log('getdbacksresults is being called');

//     try {
//         let result = await fetch(`https://serpapi.com/search?q="dbacks%20game%20today&location=phoenix%2C%20arizona%2C%20united%20states&api_key=${api_key}`, {
//             method: 'GET',
//             mode: 'no-cors',
//             headers: {
//                 'content-type':'application/json'
//             }
//         });

//         console.log(result);

//         return result;
//     } catch(e) {
//         console.error('err' + e);
//     }
// }

/** @type {import('./$types').RequestHandler} */
async function GET({ fetch }) {
    // return await getDbacksResults();
    return await fetch('https://random-data-api.com/api/v2/users?size=2&is_xml=true', {method: 'GET'});
}

// /** @type {import('./$types').PageServerLoad} */
// async function load({ params }) {
//     const post = await getDbacksResults(params.slug);

//     if (post) {
//         return post;
//     }

//     throw error(404, 'Not found');
// }

export {GET};