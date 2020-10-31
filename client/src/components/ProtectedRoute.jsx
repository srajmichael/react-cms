import React from 'react';
import {Route} from 'react-router-dom';

const ProtectedRoute = ({Component, ..rest}) => {
   return(
      <Route {...rest} render={(props)=>{
         return <Component {...props}/>
      }}/>  
   )
}