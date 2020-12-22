import React from 'react';
import Section0 from '../form/Section0';
import Section1 from '../form/Section1';
import Section2 from '../form/Section2';
import Section3 from '../form/Section3';
import Section4 from '../form/Section4';
import Section5 from '../form/Section5';

class Form extends React.Component {
  constructor(props) {
    super(props);

    let arr = [];
    arr.push('show-section');
    for (let i=0; i < 7;i++) {
      arr.push('hide-section');
    }
    this.state = {
      sectionState: arr,
      nameOfPlaylist : 'My Playlist',
      ifRecs : false,
      limit : 25,
      maps : {},
      features : {},
      finalSongs: [],
      playlistId: '',
      playlistURL: '',
      playlistImage: ''
    }

    this.changeSection = this.changeSection.bind(this);
    this.getPlaylistName = this.getPlaylistName.bind(this);
    this.getLimitRecData = this.getLimitRecData.bind(this);
    this.getExtractedData = this.getExtractedData.bind(this);
    this.getFeatures = this.getFeatures.bind(this);
    this.getPlaylist = this.getPlaylist.bind(this);
    this.getRecs = this.getRecs.bind(this);
    this.pushToPlaylist = this.pushToPlaylist.bind(this);
  }

  getExtractedData(map, l) {
    console.log(l + " songs extracted");
    this.setState({ 
      maps : map
    }, () => {
      this.changeSection(0,1);
    });
  }
 
  getPlaylistName(name) {
    this.setState({ nameOfPlaylist : name }, () => {
      this.changeSection(1,2);
    });
  }

  getLimitRecData(bool,lim) {
    this.setState({ ifRecs : bool, limit: lim }, () => {
      console.log(this.state.ifRecs);
      console.log(this.state.limit, ' songs')
      this.changeSection(2,3);
    });
  }

  getFeatures(songs, feat) {
    this.setState({ features : feat, finalSongs: songs }, () => {
      this.changeSection(3,4);
    });
  }

  getPlaylist(songs) {
    this.setState({ finalSongs : songs }, () => {
      this.submitForm();
    });
  }


  createPlaylist(callback) {
    let id = this.props.userId;
    let options = {
      name : this.state.nameOfPlaylist,
      description : 'Created with AuxNow',
      public : false
    }

    this.props.spotify.createPlaylist(id, options)
    .then((response) => {
      this.setState({ playlistId : response.id, playlistURL: response.external_urls.spotify }, () => {
        callback();
      });
    }).catch(err => {
      let status = JSON.parse(err.response)['error']['status'];
      window.location.assign('./error?response=' + status);
    });

  }

  getRecs(songs, callback) {
    let fiveSongs = [];
    for (let i=0;i < 5;i++) {
      let s = songs[i];
      let ind = s.indexOf(':', s.indexOf(':')+1);
      fiveSongs.push(s.slice(ind+1, s.length));
    }
    this.props.spotify.getRecommendations({ seed_tracks : fiveSongs })
    .then((response) => {
      let tr = response["tracks"];
      let freq = 3;
      if (songs.length > this.state.limit) {
        if (Math.floor(songs.length / tr.length) >= 3) {
          freq = Math.floor(songs.length / tr.length);
        }
      }
      else {
        if (Math.floor(this.state.limit / tr.length) >= 3) {
          freq = Math.floor(this.state.limit / tr.length);
        }
      }

      for (let i=0; i < tr.length;i++) {
        songs[i*freq] = tr[i]['uri'];
      }
      callback(songs);
    }).catch(err => {
      let status = JSON.parse(err.response)['error']['status'];
      window.location.assign('./error?response=' + status);
    });
  }

  pushToPlaylist(songs) {
    let limit = this.state.limit;
    if (songs.length > limit) {
      songs = songs.slice(0,limit);
    }
    let add = () => {
      this.props.spotify.addTracksToPlaylist(this.state.playlistId, songs)
      .then((response) => {
        console.log(response);
        this.props.spotify.getPlaylistCoverImage(this.state.playlistId)
        .then((response) => {
          this.setState({ playlistImage : response[0]['url'], finalSongs : songs }, () => {
            this.changeSection(4,5);
          });
        }).catch(err => {
          let status = JSON.parse(err.response)['error']['status'];
          window.location.assign('./error?response=' + status);
          return false;
        });
        return true;
      }).catch(err => {
        let status = JSON.parse(err.response)['error']['status'];
        window.location.assign('./error?response=' + status);
        return false;
      });
    };
    this.createPlaylist(add);
  }

  submitForm() {
    let songs = this.state.finalSongs;
    // shuffle songs
    for (let i=0; i < songs.length;i++) {
      const j = Math.floor(Math.random() * i);
      let temp = songs[i];
      songs[i] = songs[j];
      songs[j] = temp;
    }
    if (this.state.ifRecs) {
      songs = this.getRecs(songs, (s) => { this.pushToPlaylist(s)});
    } 
    else {
      this.pushToPlaylist(songs);
    }
  }

  changeSection(i,i2) {
    console.log('changing...')
    let arr = this.state.sectionState;
    arr[i] = 'hide-section';
    arr[i2] = 'show-section';
    this.setState({ sectionState : arr });
  }

  render() {
    return (
      <div id='form'>
        <Section0 sectionState={this.state.sectionState[0]} 
        spotify={this.props.spotify} getExtractedData={this.getExtractedData}
         />
        <Section1 sectionState={this.state.sectionState[1]} getPlaylistName={this.getPlaylistName} />
        <Section2 sectionState={this.state.sectionState[2]} getLimitRecData={this.getLimitRecData} />
        <Section3 sectionState={this.state.sectionState[3]} objects = {{ maps: this.state.maps, spotify: this.props.spotify}} getFeatures={this.getFeatures} /> 
        <Section4 sectionState={this.state.sectionState[4]} objects = {{ features: this.state.features, finalSongs: this.state.finalSongs }} 
        getPlaylist={this.getPlaylist}
        />
        <Section5 sectionState={this.state.sectionState[5]} objects={{ url: this.state.playlistURL, 
          songLength: this.state.finalSongs.length, 
          nameOfPlaylist : this.state.nameOfPlaylist,
          playlistImage: this.state.playlistImage }} />
      </div>
    );
  }
}

export default Form;
