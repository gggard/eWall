'use strict';
import React from 'react';


import UserActions from '../../../../actions/UserActions'

import UserStore from '../../../../stores/UserStore'

import ToolbarComponent from './ToolbarComponent'
import Slider from 'react-slick';

import NetworkErrorComponent from './widgets/NetworkErrorComponent'

import { browserHistory } from 'react-router'

require('styles/ewall/main/components/Rooms.sass');

class RoomsComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = UserStore.getState();
    this.onChange = this.onChange.bind(this);


    this.handleOnClick = this.handleOnClick.bind(this);

    UserActions.fetch();

  }

  componentDidMount() {
    UserStore.listen(this.onChange);
    }

  componentWillUnmount() {
    UserStore.unlisten(this.onChange);
  }

  onChange(state) {
    console.log('RoomsComponent onChange', state)
    this.setState(state);
  }

  handleOnClick(room) {
    // this and room set by bind
    console.log('Handle room click ', room._id);
    browserHistory.push('/rooms/'+room._id);
  }

  render() {
    console.log('render carousel', this.state);
    var settings = {
          dots: true,
          infinite: false,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 1
        };


    return (
       <div className="rooms-component">

       { (this.state.error) && (typeof this.state.error != 'undefined') ? <NetworkErrorComponent error={this.state.error}/> : null }


      <ToolbarComponent/>
      <h1>Your rooms</h1>
      <div className='carousel'>
      <Slider {...settings}>
      {
        this.state.user.accessibleRooms.map((room) => {
        return <div key={room.id}><a onClick={()=>this.handleOnClick(room)}><h3>{room.name}</h3></a></div>;
      })
      }
      </Slider>
      </div>
      </div>
    );
  }
}

export default RoomsComponent
