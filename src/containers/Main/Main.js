import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      item: [],
    };
  }

  componentDidMount() {
    fetch('https://api.mcmakler.de/v1/advertisements')
      .then(res => res.json())
      .then((data) => {
        const item = data.data.map(item => {
          return (
            <div key={item._id.$id}>
              <img src={
                (item.advertisementAssets['0']) ? item.advertisementAssets['0'].advertisementThumbnails.inventory_m.url : item.advertisementAssets.advertisementThumbnails.inventory_m.url
              }/>
              <div>{item.title}</div>
              <div>
                <span>{item.realestateSummary.address.city}</span>/<span>{item.realestateSummary.address.street}</span>
              </div>

              <div>
                <span>{(item.advertisementPrice.sellPrice) ? item.advertisementPrice.sellPrice : item.advertisementPrice.baseRent}</span>
                <span>€</span>
              </div>
              <div>
                <span>{item.realestateSummary.numberOfRooms}</span>
                <span>Zimmer</span>
                <span>|</span>
                <span>ab</span>
                <span>{item.realestateSummary.space.toFixed(0)}</span>
                <span>m<sup>2</sup></span>
              </div>
            </div>
          )
        });

        this.setState({
          item: item.slice(0, 10),
        });

      });
  }

  render() {
    return (
      <div style={{width: 900}}>
        {this.state.item}
      </div>
    );
  }
}


if (document.getElementById('root')) {
  ReactDOM.render(<Main/>, document.getElementById('root'));
}

export default Main;
