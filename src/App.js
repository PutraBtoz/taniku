import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import AuthPage from 'pages/AuthPage';
import React, { useState, useEffect } from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/reduction.scss';

import axios from 'axios';
import PublicRoute from './utils/PublicRoute';
import PrivateRoute from './utils/PrivateRoute';
import { getToken, removeUserSession, setUserSession } from './utils/Common';


const AlertPage = React.lazy(() => import('pages/AlertPage'));
const AuthModalPage = React.lazy(() => import('pages/AuthModalPage'));
const BadgePage = React.lazy(() => import('pages/BadgePage'));
const ButtonGroupPage = React.lazy(() => import('pages/ButtonGroupPage'));
const ButtonPage = React.lazy(() => import('pages/ButtonPage'));
const CardPage = React.lazy(() => import('pages/CardPage'));
const ChartPage = React.lazy(() => import('pages/ChartPage'));
const DashboardPage = React.lazy(() => import('pages/DashboardPage'));
const DropdownPage = React.lazy(() => import('pages/DropdownPage'));
const FormPage = React.lazy(() => import('pages/FormPage'));
const InputGroupPage = React.lazy(() => import('pages/InputGroupPage'));
const ModalPage = React.lazy(() => import('pages/ModalPage'));
const ProgressPage = React.lazy(() => import('pages/ProgressPage'));
const TablePage = React.lazy(() => import('pages/TablePage'));
const TypographyPage = React.lazy(() => import('pages/TypographyPage'));
const WidgetPage = React.lazy(() => import('pages/WidgetPage'));

// New Page
const SultankuPage = React.lazy(() => import('pages/SultankuPage'));
const SultankuResultPage = React.lazy(() => import('pages/SultankuResultPage'));
const PakarSultanku = React.lazy(() => import('pages/PakarSultanku'));
const PakarSultankuResult = React.lazy(() => import('pages/PakarSultankuResult'));
const AgendaPage = React.lazy(() => import('pages/AgendaPage'));
const HargaPage = React.lazy(() => import('pages/HargaPage'));
const HargaResult = React.lazy(() => import('pages/HargaResult'));
const SigapPage = React.lazy(() => import('pages/SigapPage'));
const SigapResult = React.lazy(() => import('pages/SigapResult'));
const LaporPage = React.lazy(() => import('pages/LaporPage'));
const KelolaSultanku = React.lazy(() => import('pages/KelolaSultanku'));
const BeritaSultanku = React.lazy(() => import('pages/BeritaSultanku'));
const UsersSultanku = React.lazy(() => import('pages/UsersSultanku'));
const Konsultasi = React.lazy(() => import('pages/Konsultasi'));

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authLoading: true
    };
  }

  componentDidMount() {
    const token = getToken();
      if (!token) {
        return;
      }
  
      axios.get(`http://localhost:4000/verifyToken?token=${token}`).then(response => {
        setUserSession(response.data.token, response.data.user);
        this.setState({authLoading: false});
      }).catch(error => {
        removeUserSession();
        this.setState({authLoading: false});
      });
    }

  render() {
    if (this.state.authLoading && getToken()) {
      return <div className="content">Checking Authentication...</div>
    }
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <PublicRoute
              exact
              path="/login"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_LOGIN} />
              )}
            />
            <PublicRoute
              exact
              path="/signup"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_SIGNUP} />
              )}
            />
            <PrivateRoute
              layout={EmptyLayout}
              component={props => (
                <MainLayout {...props} breakpoint={this.props.breakpoint}>
                  <React.Suspense fallback={<PageSpinner />}>
                    <Route exact path="/" component={DashboardPage} />
                    <Route exact path="/login-modal" component={AuthModalPage} />
                    <Route exact path="/buttons" component={ButtonPage} />
                    <Route exact path="/cards" component={CardPage} />
                    <Route exact path="/widgets" component={WidgetPage} />
                    <Route exact path="/typography" component={TypographyPage} />
                    <Route exact path="/alerts" component={AlertPage} />
                    <Route exact path="/tables" component={TablePage} />
                    <Route exact path="/badges" component={BadgePage} />
                    {/* New component */}
                    <Route exact path="/sultanku" component={SultankuPage} />
                    <Route exact path="/sultanku-result" component={SultankuResultPage} />
                    <Route exact path="/pakarku" component={PakarSultanku} /> 
                    <Route exact path="/pakarku-result" component={PakarSultankuResult} /> 
                    <Route exact path="/agenda" component={AgendaPage} /> 
                    <Route exact path="/harga" component={HargaPage} /> 
                    <Route exact path="/harga-result" component={HargaResult} /> 
                    <Route exact path="/sigap" component={SigapPage} /> 
                    <Route exact path="/sigap-result" component={SigapResult} /> 
                    <Route exact path="/lapor" component={LaporPage} /> 
                    <Route exact path="/kelola" component={KelolaSultanku} /> 
                    <Route exact path="/berita" component={BeritaSultanku} /> 
                    <Route exact path="/users" component={UsersSultanku} /> 
                    <Route exact path="/konsultasi" component={Konsultasi} /> 
                    <Route
                      exact
                      path="/button-groups"
                      component={ButtonGroupPage}
                    />
                    <Route exact path="/dropdowns" component={DropdownPage} />
                    <Route exact path="/progress" component={ProgressPage} />
                    <Route exact path="/modals" component={ModalPage} />
                    <Route exact path="/forms" component={FormPage} />
                    <Route exact path="/input-groups" component={InputGroupPage} />
                    <Route exact path="/charts" component={ChartPage} />
                  </React.Suspense>
                </MainLayout>
              )}
            />
            <Redirect to="/login" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
