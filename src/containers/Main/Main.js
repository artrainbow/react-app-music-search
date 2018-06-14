import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './main.scss';

const classes = {
  container: 'container',
  containerItem: 'container-item',
  containerItemWrapper: 'container-item-wrapper',
  media: 'media',
  card: 'card',
};


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
            <Grid key={item._id.$id} item xs={4} className={classes.containerItem}>
              <div className={classes.containerItemWrapper}>
                <div>
                  <Paper
                    elevation={4}
                    style={{
                      position: 'absolute',
                      marginTop: 25,
                      marginLeft: 25,
                    }}>
                    <Typography variant={'title'}
                                style={{
                                  padding: '8px 10px 8px 10px',
                                  fontWeight: 600,
                                  fontSize: '100%',
                                  color: 'rgba(0, 0, 0, 0.3)'
                                }}>
                      {item.advertisementPrice.sellPrice ? 'Kaufen' : 'Mieten'}
                    </Typography>
                  </Paper>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.media}
                      image={
                        item.advertisementAssets['0'] ? item.advertisementAssets['0'].advertisementThumbnails.inventory_m.url : item.advertisementAssets.advertisementThumbnails.inventory_m.url
                      }
                      title={item.title}
                    />
                    <CardContent
                      style={{
                        padding: '45px 50px 20px 50px',
                      }}>
                      <Typography gutterBottom variant="headline" component="h2"
                                  style={{
                                    fontWeight: 600,
                                    fontSize: 20,
                                    height: 52,
                                    color: 'rgba(0, 0, 0, 0.6)',
                                    overflow: 'hidden',
                                  }}>
                        {item.title}
                      </Typography>
                      <Typography component="span"
                                  style={{
                                    paddingTop: 10,
                                    color: 'rgba(0, 0, 0, 0.3)',
                                    fontWeight: 800,
                                    fontSize: 16,
                                    height: 24,
                                    overflow: 'hidden',
                                  }}>
                        {item.realestateSummary.address.postalCode}
                        <span> / </span>
                        {item.realestateSummary.address.city}
                        {item.realestateSummary.address.street}
                      </Typography>
                      <Typography component="span"
                                  style={{
                                    marginTop: 56,
                                    color: 'rgba(0, 0, 0, 0.6)',
                                    fontWeight: 700,
                                    fontSize: 22,
                                    float: 'left',
                                  }}>
                        {(item.advertisementPrice.sellPrice) ? item.advertisementPrice.sellPrice : item.advertisementPrice.baseRent}
                        <span> €</span>
                      </Typography>
                      <Typography component="span"
                                  style={{
                                    marginTop: 52,
                                    color: 'rgba(0, 0, 0, 0.6)',
                                    fontSize: 19,
                                    float: 'right',
                                  }}>
                        {item.realestateSummary.numberOfRooms}
                        <span> Zimmer</span>
                        <span
                          style={{
                            display: 'inline-block',
                            height: 40,
                            marginRight: 20,
                            marginLeft: 32,
                            verticalAlign: 'top',
                            borderRight: '1px solid rgba(0, 0, 0, 0.6)'
                          }}/>
                        <span>ab </span>
                        {item.realestateSummary.space.toFixed(0)}
                        <span> m<sup style={{fontSize: '60%', fontWeight: 600}}>2</sup></span>
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </Grid>
          )
        });

        this.setState({
          item: item.slice(0, 10),
        });
      });
  }

  render() {
    return (
      <Grid container className={classes.container} spacing={0}>
        {this.state.item}
      </Grid>
    );
  }
}

ReactDOM.render(<Main/>, document.getElementById('root'));


export default Main;
