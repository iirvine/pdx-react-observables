import fetch from 'whatwg-fetch';

function url(x, y) {
  return `http://some-url.com/${x}/${y}`;
}

export function query(x, y) {
  return fetch(url(x, y));
}