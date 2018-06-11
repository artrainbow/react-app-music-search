class Service {
  constructor() {
    this.data = {};
  }

  static getData() {
    return fetch('https://api.mcmakler.de/v1/advertisements')
      .then(res => res.json())
      .then((data) => {
        this.data = data.data.slice(0, 10);
      });
  }
}

export default Service;
