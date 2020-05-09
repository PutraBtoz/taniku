import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from './Common';

// handle the public routes
const PublicRoute = ({ component: Component, layout: Layout, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => !getToken() ? 
        <Layout>
          <Component {...props} />
        </Layout> : 
      <Redirect to={{ pathname: '/' }} />}
    />
  )
}

export default PublicRoute;