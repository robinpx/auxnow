import React from 'react';
import GenreMap from './genremap/GenreMap';
import GenrePicked from './genremap/GenrePicked';
import Input from '../Input';
import Button from '../Button';

class Section3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            maps : {},
            sifted: {},
            selectedGenres: [],
            songs : [],
            features: {}, 
            display: 'hide',
            notif: 'There are 0 songs in total'
        }

        this.getSelectedGenres = this.getSelectedGenres.bind(this);
        this.getChange = this.getChange.bind(this);
        this.siftArtistToGenre = this.siftArtistToGenre.bind(this);
        this.siftGenres = this.siftGenres.bind(this);
        this.getSongs = this.getSongs.bind(this);
        this.getTrackFeatures = this.getTrackFeatures.bind(this);
        this.getFeatures = this.getFeatures.bind(this);
    }

    componentDidUpdate() {
        if (this.props.objects !== undefined) {
            if (this.state.maps !== this.props.objects.maps && this.props.objects.maps.genreByArtist !== undefined) {
                this.setState({
                    maps : this.props.objects.maps,
                    sifted: this.props.objects.maps.genreByArtist
                });
            }
        }
    }

    getSelectedGenres(genres) {
        this.setState({ selectedGenres : genres }, () => {
            let s = this.getSongs();
            let d = 'hide';
            if (s.length > 24) {
                d = 'show';
            }
            this.setState({ songs : s, notif : 'There are ' + s.length + ' songs in total', display: d });
        });
    }

    getChange(v) {
        let siftedGenres = this.siftGenres(v);
        let siftedArtbyGen = this.siftArtistToGenre(v);
        if (Object.keys(siftedGenres).length > 0) {
            this.setState({ sifted : siftedGenres });
        }
        if (Object.keys(siftedArtbyGen).length > 0) { // this is only true if exact artist entered
            this.setState({ sifted : siftedArtbyGen });
        }
    }

    siftArtistToGenre(v) {
        let val = v.toLowerCase();
        let artMap = JSON.parse(JSON.stringify(this.props.objects.maps.artistByGenre)); 
        let genMap = JSON.parse(JSON.stringify(this.props.objects.maps.genreByArtist)); 
        let cleanMap = {};
        let artKeys = Object.keys(artMap);
        for (let i=0; i < artKeys.length;i++) {
            let a = artKeys[i].toString().toLowerCase();
            if (val === a) {
                let genre = artMap[artKeys[i]];
                for (let j=0;j < genre.length;j++) {
                    let g = genre[j];
                    cleanMap[g] = genMap[g];
                }
            }
        }
        return cleanMap;
    }

    siftGenres(v) {
        let val = v.toLowerCase();
        let cleanMap = JSON.parse(JSON.stringify(this.props.objects.maps.genreByArtist)); 
        let keys = Object.keys(cleanMap);
        for (let i=0;i < keys.length;i++) {
            if (keys[i].indexOf(val) <= -1) {
                delete cleanMap[keys[i]];
            }
        }
        return cleanMap;
    }

    getSongs() {
        let arr=[]
        for (let i=0;i < this.state.selectedGenres.length;i++) {
            arr = arr.concat(this.props.objects.maps.genreByTrack[this.state.selectedGenres[i]]);
        }
        arr = new Set(arr);
        arr = [...arr];
        return arr;
    }

    getFeatures() {
        for (let i=0; i < Math.ceil(this.state.songs.length/50); i++) {
            let subset = this.state.songs.slice(i*50,(i*50)+50);
            for (let j=0;j < subset.length;j++) {
                let ind = subset[j].indexOf(':', subset[j].indexOf(':')+1);
                subset[j] = subset[j].slice(ind+1, subset[j].length);
            }
            this.getTrackFeatures(subset); // some audio tracks don't have features, so we must sift through one by one
        }
        this.props.getFeatures(this.state.songs, this.state.features);
    }


    getTrackFeatures(track) {
        const attr = ['danceability','energy','instrumentalness','liveness','acousticness','speechiness'];
        this.props.objects.spotify.getAudioFeaturesForTracks(track)
        .then((response) => {
            let audioarr = response['audio_features'];
            let feat = this.state.features;
            for (let i=0; i < audioarr.length;i++) {
                for (let j=0; j < attr.length;j++) {
                    if (!feat[attr[j]]) {
                        feat[attr[j]] = [];
                    }
                    feat[attr[j]].push([audioarr[i][attr[j]], audioarr[i]['uri']]);
                }
            }
            // add to features 
            for (let j=0;j < attr.length;j++) {
                feat[attr[j]].sort((a,b) => a[0] - b[0]);
            }
            this.setState({ features : feat });
        }).catch(e => {
            console.log(e);
        });
    }
    
    render() {
        return (
            <section id='section3' className={this.props.sectionState}>
                <div className='section-wrap'>
                    <div id='left-block'>
                        <Input type={1} getChange={this.getChange} handleSubmit={this.getChange} placeholderText={'Search by genre or artist'} />
                        <div id='genre-picked'>
                        <b>Chosen Target Genres</b>
                        <GenrePicked chosenGenres={this.state.selectedGenres} />
                        </div>
                        <div id='genre-next'>
                            <Button action={this.getFeatures} state={this.state.display} buttonName={'Next'} />
                            <div id='total'>{this.state.notif}</div>
                        </div>
                    </div>
                    <div id='right-block'>
                        <GenreMap genres={this.state.sifted} getSelectedGenres={this.getSelectedGenres} />
                    </div>
                </div>
            </section>
        );
    }
}

export default Section3;
