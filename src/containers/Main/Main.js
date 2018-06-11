import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Service from '../../services/service';

class Main extends Component {
  constructor(props) {
    super();
    this.service = Service.getData('https://api.mcmakler.de/v1/advertisements');
  }


  get getData() {
    return this.service.then((data) => {
      console.log(data.data.slice(0, 10));
    });
  }

  render() {
    return (
      <div>
        Hello!
        {JSON.stringify(getData)}
      </div>
    );
  }
}


if (document.getElementById('create-article-form')) ReactDOM.render(
  <Main/>, document.getElementById('create-article-form'));

export default Main;
