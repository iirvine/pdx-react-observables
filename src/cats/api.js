function url(term) {
  return `http://edgecats.net`;
}

export default {
  query(term) {
    return fetch(url(term));
  }
} 