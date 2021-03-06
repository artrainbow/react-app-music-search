import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SvgIcon from '@material-ui/core/SvgIcon';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

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
            isFetched: false,
            isPlaying: true,
            name: 'type a singer',
        };
    }

    componentDidMount() {
        const {name} = this.state;

        fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${name}`, {
            'method': 'GET',
            'headers': {
                'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
                'x-rapidapi-key': 'fd9b15ae79mshccc19dbccbef94ep17f3e6jsn377328e6e83e',
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    items: data,
                    isFetched: true,
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        const {
            name,
            items,
        } = this.state;

        const handleChange = (event) => {
            this.setState({name: event.target.value});

            setTimeout(() => {
                if (name.length > 2) this.componentDidMount();
            }, 0);
        };

        return (
            <Grid container className={classes.container} spacing={0}>
                <Grid container
                      style={{
                          marginTop: 10,
                          position: 'sticky',
                          top: 0,
                          backgroundColor: 'white',
                          zIndex: 1,
                      }}>
                    <FormControl
                        style={{
                            marginLeft: 30,
                        }}
                        className={classes.formControl}>
                        <InputLabel htmlFor="name-simple">Search</InputLabel>
                        <Input id="name-simple" value={name} onChange={handleChange}/>
                    </FormControl>
                </Grid>

                <Items data={items}/>
            </Grid>
        );
    }
}

class Items extends Main {
    constructor(props) {
        super(props);

        this.player = element => {
            this.playerData = element || '';
        };
    }

    static preLoader(id) {
        document.getElementById(id).removeAttribute('class');
    }

    static addEqualizer(id) {
        [...document.getElementsByClassName('equalizer')].forEach((item) => {
            item.classList.remove('equalizer');
        });
        document.getElementById('eq' + id).classList.add('equalizer');
    }

    static removeEqualizer(id) {
        document.getElementById('eq' + id).classList.remove('equalizer');
    }

    render() {
        const {
            isFetched,
            isPlaying,
        } = this.state;

        if (isFetched && this.props.data) {
            const play = (url, itemId) => {
                if (this.playerData.src === url) {
                    if (isPlaying) {
                        this.playerData.pause();
                        this.setState({isPlaying: false});
                        Items.removeEqualizer(itemId);
                    } else {
                        this.playerData.play();
                        this.setState({isPlaying: true});
                        Items.addEqualizer(itemId);
                    }
                } else {
                    this.playerData.src = url;
                    this.playerData.play();
                    this.setState({isPlaying: true});
                    Items.addEqualizer(itemId);
                }
            };

            return this.props.data.data.map(item => {
                return (
                    <Grid key={item.id} item xs={3} className={classes.containerItem}>
                        <div className={classes.containerItemWrapper}>
                            <div>
                                <Card className={classes.card}>
                                    <div id={'eq' + item.id}>
                                        <div className="square">
                                            <span className="bar2 b1"/>
                                            <span className="bar1 b2"/>
                                            <span className="bar2 b3"/>
                                            <span className="bar1 b4"/>
                                            <span className="bar2 b5"/>
                                        </div>
                                    </div>
                                    <CardMedia
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        className={classes.media}
                                        image={item.album.cover_big}
                                        title={item.title}>
                                        <SvgIcon
                                            onClick={() => {
                                                play(item.preview, item.id);
                                            }}
                                        >
                                            <path
                                                fill="#FFFFFF"
                                                d="M2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12M10,17L15,12L10,7V17Z"/>
                                        </SvgIcon>
                                        <audio ref={this.player} onCanPlay={() => {
                                            Items.preLoader(item.id);
                                        }}>
                                            <source src={item.preview}/>
                                        </audio>
                                        <div id={item.id} className={'spinner'}/>
                                    </CardMedia>
                                    <CardContent style={{padding: '30'}}>
                                        <Typography gutterBottom variant="headline" component="h1">
                                            {item.title}
                                        </Typography>
                                        <Typography component="h2">
                                            {item.album.title}
                                        </Typography>
                                        <Typography component="span"
                                                    style={{
                                                        marginTop: 5,
                                                        color: 'rgba(0, 0, 0, 0.6)',
                                                    }}>
                                            {item.artist.name}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </Grid>
                );
            });
        } else {
            return null;
        }
    }
}

ReactDOM.render(<Main/>, document.getElementById('root'));

export default Main;
