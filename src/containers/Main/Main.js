import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Service from '../../services/service';

class Main extends Component {
  constructor() {
    super();
    Service.getData();
  }


  render() {
    return (
      <div>
        Hello!
        {setTimeout(function () {
          return Service.data;
        }, 2000)}
      </div>
    );
  }
}


// setTimeout(function () {
//   console.log(Service.data);
// }, 5000);
if (document.getElementById('create-article-form')) {
  ReactDOM.render(<Main/>, document.getElementById('create-article-form'));
}

export default Main;
