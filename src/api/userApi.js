import 'whatwg-fetch'; //package import so that browsers can run
import getBaseUrl from './baseUrl';

const baseUrl = getBaseUrl();

// public functions
export function deleteUser(id) {
    return del(`users/${id}`)
}

export function getUsers() { // only make this "public" (export)
    return get('users');
}

// private functions
function get(url) { // this function is using fetch
    return fetch(baseUrl + url).then(onSuccess, onError);
}

// Can't call fun delete since reserved word, therefore "del"
function del(url) {
    const request = new Request(baseUrl + url, {
        method: 'DELETE'
    });
    return fetch(request).then(onSuccess, onError);
}


function onSuccess(response) {
    return response.json();
}

function onError(error) {
    console.log(error); // eslint-disable-line no-console
}