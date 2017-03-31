import React, {Component} from 'react';
import List from '../components/list/list.js';
import Slide from '../components/slide/slide.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Main extends Component {
	render() {
		return(
      <ReactCSSTransitionGroup
        component="div"
        className="page-content"
        transitionName="page-ani"
        transitionAppear={true}
        transitionAppearTimeout={500}>
        <Slide/>
        <List/>
      </ReactCSSTransitionGroup>
		);
	}
}

export default Main;