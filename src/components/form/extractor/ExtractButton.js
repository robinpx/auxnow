import React from 'react';
import Button from '../../Button';

let intervalId = null;

class ExtractButton extends React.Component {
    constructor() {
        super();

        this.state = {
            intervalId: null,
            count: 0,
            likedSongs: [],
            scrapedData : { genreByArtist : {}, artistByGenre : {}, genreByTrack : {} },
            isFinished: false,
            isDoing : false,
            retrieved: [],
            display: 'show'
        }
        
        this.getLikedSongs = this.getLikedSongs.bind(this);
        this.getArtistInfo = this.getArtistInfo.bind(this);
        this.extract = this.extract.bind(this);  
    }


    // Get liked songs
    getLikedSongs(off) {
        let trackArtistIds = [];
        this.props.spotify.getMySavedTracks({ limit: 50, offset: off })
        .then((response) => {
            for (let i=0; i < response['items'].length;i++) {
            let elem = response['items'][i];
            let artistInfo = this.getArtistInfo(elem['track']['artists'][0]['id']);
            trackArtistIds.push([artistInfo, elem['track']['uri']]);
            }
            this.setState({ retrieved : trackArtistIds });
        }).catch(err => {
            let status = JSON.parse(err.response)['error']['status'];
            window.location.assign('./error?response=' + status);
        });
    }

    // Get artist info
    getArtistInfo(id) {
        let info = [];
        this.props.spotify.getArtist(id)
        .then((response) => {
        info.push({ 'artist' : response['name'], 'genres' : response['genres'] }); 
        }).catch(err => {
            console.log(err);
        });
        return info;
    }

    // Scrape through the data and organize it to how it will be utilized 
    organizeMap(list) {
    for (let i=0; i < list.length;i++) {
        let genres = list[i][0][0].genres, artist = list[i][0][0].artist, track = list[i][1];
        let gBa = this.state.scrapedData.genreByArtist;
        let aBg = this.state.scrapedData.artistByGenre;
        let gBt = this.state.scrapedData.genreByTrack;
        for (let j=0;j < genres.length;j++) {
            try {
                let g = genres[j], a = artist;
                if (!gBa[g]) {
                gBa[g] = []
                }
                if (!aBg[a]) {
                aBg[a] = []
                }
                if (!gBt[g]) {
                gBt[g] = []
                }
                if (!gBa[g].includes(artist)) {
                gBa[g].push(artist);
                }
                if (!aBg[a].includes(g)) {
                aBg[a].push(g);
                }
                if (!gBt[g].includes(g)) {
                gBt[g].push(track);
                }
                this.setState({ scrapedData: {
                    genreByArtist : gBa,
                    artistByGenre :aBg,
                    genreByTrack: gBt
                }});
            }
            catch(err) {
                continue;
            }
        }
    }
    }

    // Button invokes extraction process 
    extract() {
        this.setState({ display: 'hide', isDoing : true }, () => {
            intervalId = setInterval(() => {
                try {  
                    this.getLikedSongs(this.state.count);
                    this.organizeMap(this.state.retrieved);
    
                    this.setState({ 
                        count : this.state.count+50, 
                        likedSongs : this.state.likedSongs.concat(this.state.retrieved) }, () => {
                        
                        let myData = { 
                            intervalId : intervalId, 
                            total: this.state.count-50,
                            likedSongs: this.state.likedSongs,
                            extractBehavior : { isFinished : this.state.isFinished, isDoing : this.state.isDoing },
                            scrapedData : this.state.scrapedData
                        }
                        this.props.getExtractData(myData);
                    });
                    
                    if (this.state.retrieved.length === 0 && this.state.count > 50) { // no retrievals 
                        this.setState({ isFinished : true });
                    }
                }
                catch(err) {
                    console.log(err);
                    this.setState({ isFinished : true });
                }
            }, 3000); 
        });
    }

    render() {
        return (
            <Button state={this.state.display} action={this.extract} buttonName={'Begin'} />
        );
    }
}

export default ExtractButton;
