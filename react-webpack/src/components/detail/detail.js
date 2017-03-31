import React, {Component} from 'react';
import './detail.scss';

import Actions from '../../actions/index.js';
import Tools from '../../tools/index.js';

class Detail extends Component{
  constructor(props){
    super(props);
    this.state = {
      _id: this.props.params.id,
      film: {},
      actors: [],
      imgUrl: ''
    };
  }
  componentDidMount(){
    Actions._getFilmDetail(this.state._id, true, function(data){
      this.setState({
        film: data.data.film, 
        imgUrl: data.data.film.cover.origin,
        actors: data.data.film.actors
      });
    }.bind(this));
  }
  render(){
    let {name, director, nation, language, category, premiereAt, synopsis} = this.state.film;
    let imgUrl = this.state.imgUrl;
    let actors = this.state.actors;
    console.log(this.state.film);
    return (
      <div className="detailWrapper">
        <img src={imgUrl} width="100%" />
        <h2>影片简介</h2>
        <p>导演: {director}</p>
        <p>主演: 
          {
            actors.map((item, i) => {
              return <span key={item.name}>{item.name}</span>
            })
          }
        </p>
        <p>地区语言: {nation}({language})</p>
        <p>类&nbsp;&nbsp;型: {category}</p>
        <p>上映时间: { Tools.formatTime( premiereAt ).year }年{ Tools.formatTime( premiereAt ).month }月</p>
        <p>{synopsis}</p>
      </div>
    )
  }
}

export default Detail;