import React, {Component} from 'react';
import { Link } from 'react-router';
import './list.scss';

import Actions from '../../actions/index.js';

class List extends Component{
  constructor(props){
    super(props);
    this.state = {
      list: []
    }
  }
  componentDidMount(){
    Actions._getFilms(true, function(data){
      this.setState({ list: data.data.films });
    }.bind(this));
  }
	render(){
    let films = this.state.list;
		return(
      <ul className="listWrapper">
        {
          films.map((item, index) => {
            return <ListItem key={item.id} {...item} />
          })
        }
      </ul>
		);
	}
}

class ListItem extends Component{
	render() {
		let {id, name, cover} = this.props;
		return(
			<li>
        <Link to={{pathname: '/detail/'+ id}}>
          <img src={cover.origin} width="100%" />
          <p>{name}</p>
        </Link>
			</li>
		)
	}
}

export default List;