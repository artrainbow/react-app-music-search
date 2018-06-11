class Service {
  static getData(url) {
    return fetch(url).then(res => res.json());
  }
}


export default Service;
