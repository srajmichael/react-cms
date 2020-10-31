import React from 'react';
import {connect} from 'react-redux';

import Navigation from './Navigation';

const Header = (props) => {
   console.log(props)
   return (
      <header>
         <Navigation/>
   <p>{props.counter}</p>
      </header>
   )
}

const mapStateToProps = (state) => {
   return ({
      counter: state.counter
   })
}

export default connect(mapStateToProps)(Header);