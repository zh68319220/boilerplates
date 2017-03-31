import React, {Component} from 'react';
import Detail from '../components/detail/detail.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class DetailPage extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return(
      <ReactCSSTransitionGroup
        component="div"
        className='page-content'
        transitionName="page-ani"
        transitionAppear={true}
        transitionAppearTimeout={500}>
        <Detail {...this.props}/>
      </ReactCSSTransitionGroup>
    );
  }
}

export default DetailPage;