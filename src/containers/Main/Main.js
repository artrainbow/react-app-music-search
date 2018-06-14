import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
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
                    <Typography variant={'title'} style={{padding: 8}}>
                      {item.advertisementPrice.sellPrice ? 'kaufen' : 'mieten'}
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
                    <CardContent>
                      <Typography gutterBottom variant="headline" component="h2">
                        {item.title}
                      </Typography>
                      <Typography component="span">
                        {item.realestateSummary.address.postalCode}
                      </Typography>
                      <Typography component="span">
                        {item.realestateSummary.address.city}
                      </Typography>
                      <Typography component="span">
                        {item.realestateSummary.address.street}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        Share
                      </Button>
                      <Button size="small" color="primary">
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>















                  {/*<img src={*/}
                    {/*item.advertisementAssets['0'] ? item.advertisementAssets['0'].advertisementThumbnails.inventory_m.url : item.advertisementAssets.advertisementThumbnails.inventory_m.url*/}
                  {/*}/>*/}
                  {/*<Card>*/}
                    {/*<Typography variant={'Display 1'} align={'center'}>*/}
                      {/*{item.title}*/}
                    {/*</Typography>*/}
                  {/*</Card>*/}

                  {/*<div>*/}
                    {/*<span>{item.realestateSummary.address.postalCode}</span>*/}
                    {/*<span>{item.realestateSummary.address.city}</span>*/}
                    {/*<span>/</span>*/}
                    {/*<span>{item.realestateSummary.address.street}</span>*/}
                  {/*</div>*/}
                  {/*<div>*/}
                    {/*<span>{(item.advertisementPrice.sellPrice) ? item.advertisementPrice.sellPrice : item.advertisementPrice.baseRent}</span>*/}
                    {/*<span>€</span>*/}
                  {/*</div>*/}
                  {/*<div>*/}
                    {/*<span>{item.realestateSummary.numberOfRooms}</span>*/}
                    {/*<span>Zimmer</span>*/}
                    {/*<span>|</span>*/}
                    {/*<span>ab</span>*/}
                    {/*<span>{item.realestateSummary.space.toFixed(0)}</span>*/}
                    {/*<span>m<sup>2</sup></span>*/}
                  {/*</div>*/}


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
