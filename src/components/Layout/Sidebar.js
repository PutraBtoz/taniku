// import logo200Image from 'assets/img/logo/logo_200.png';
import logo100Image from 'assets/img/logo/logo_100.png';
import sidebarBgImage from 'assets/img/sidebar/sidebar-3.jpg';
import SourceLink from 'components/SourceLink';
import React from 'react';
import { FaGithub } from 'react-icons/fa';
import {
  MdAccountCircle,
  MdArrowDropDownCircle,
  MdBorderAll,
  MdBrush,
  MdChromeReaderMode,
  MdDashboard,
  MdExtension,
  MdGroupWork,
  MdInsertChart,
  MdKeyboardArrowDown,
  MdNotificationsActive,
  MdPages,
  MdRadioButtonChecked,
  MdSend,
  MdStar,
  MdTextFields,
  MdViewCarousel,
  MdViewDay,
  MdViewList,
  MdWeb,
  MdWidgets,
  MdQuestionAnswer,
  MdSchedule,
  MdLiveHelp,
  MdHealing,
  MdApps,
  MdEventAvailable,
  MdAssignment,
  MdInfo,
  MdMonetizationOn,
  MdBook,
  MdLibraryBooks,
  MdCollectionsBookmark,
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import {
  // UncontrolledTooltip,
  Collapse,
  Nav,
  Navbar,
  NavItem,
  Label,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from 'utils/bemnames';
import { getUser } from '../../utils/Common';


const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const navComponents = [
  { to: '/buttons', name: 'buttons', exact: false, Icon: MdRadioButtonChecked },
  {
    to: '/button-groups',
    name: 'button groups',
    exact: false,
    Icon: MdGroupWork,
  },
  { to: '/forms', name: 'forms', exact: false, Icon: MdChromeReaderMode },
  { to: '/input-groups', name: 'input groups', exact: false, Icon: MdViewList },
  {
    to: '/dropdowns',
    name: 'dropdowns',
    exact: false,
    Icon: MdArrowDropDownCircle,
  },
  { to: '/badges', name: 'badges', exact: false, Icon: MdStar },
  { to: '/alerts', name: 'alerts', exact: false, Icon: MdNotificationsActive },
  { to: '/progress', name: 'progress', exact: false, Icon: MdBrush },
  { to: '/modals', name: 'modals', exact: false, Icon: MdViewDay },
];

const navContents = [
  { to: '/typography', name: 'typography', exact: false, Icon: MdTextFields },
  { to: '/tables', name: 'tables', exact: false, Icon: MdBorderAll },
];

const pageContents = [
  // { to: '/login', name: 'login / signup', exact: false, Icon: MdAccountCircle },
  // {
  //   to: '/login-modal',
  //   name: 'login modal',
  //   exact: false,
  //   Icon: MdViewCarousel,
  // },
  { to: '/users', name: 'pengguna taniku', exact: false, Icon: MdAccountCircle },
  { to: '/konsultasi', name: 'konsulasi taniku', exact: false, Icon: MdAssignment },
  // { to: '/agenda-admin', name: 'agenda taniku', exact: false, Icon: MdEventAvailable },
  { to: '/admin-komoditi', name: 'komoditi taniku', exact: false, Icon: MdCollectionsBookmark },
  { to: '/admin-hama', name: 'hama taniku', exact: false, Icon: MdCollectionsBookmark },
  { to: '/admin-penyakit', name: 'penyakit taniku', exact: false, Icon: MdCollectionsBookmark },
  { to: '/admin-pupuk', name: 'pupuk taniku', exact: false, Icon: MdCollectionsBookmark },
  // { to: '/login', name: 'lapor taniku', exact: false, Icon: MdAccountCircle },
  // {
  //   to: '/login-modal',
  //   name: 'login modal',
  //   exact: false,
  //   Icon: MdViewCarousel,
  // },
];

const pageContentsBuku = [
  { to: '/list-komoditi', name: 'list komoditi', exact: false, Icon: MdCollectionsBookmark },
  { to: '/list-pupuk', name: 'list pupuk', exact: false, Icon: MdCollectionsBookmark },
  { to: '/list-hama', name: 'list hama', exact: false, Icon: MdCollectionsBookmark },
  { to: '/list-penyakit', name: 'list penyakit', exact: false, Icon: MdCollectionsBookmark },
  // {
];

const navItems = [
  { to: '/', name: 'dashboard', exact: true, Icon: MdDashboard },
  { to: '/sultanku', name: 'sultanku', exact: false, Icon: MdQuestionAnswer },
  { to: '/agenda', name: 'agenda taniku', exact: false, Icon: MdSchedule },
  { to: '/harga', name: 'harga taniku', exact: false, Icon: MdMonetizationOn },
  // { to: '/sigap', name: 'sigap taniku', exact: false, Icon: MdHealing },
  // { to: '/lapor', name: 'buku taniku', exact: false, Icon: MdLiveHelp },
  { to: '/kelola', name: 'kelola taniku', exact: false, Icon: MdEventAvailable },
  { to: '/berita', name: 'berita taniku', exact: false, Icon: MdAssignment },
  // { to: '/cards', name: 'mimin taniku', exact: false, Icon: MdWeb },
  // { to: '/cards', name: 'card', exact: false, Icon: MdWeb },
  // { to: '/charts', name: 'charts', exact: false, Icon: MdInsertChart },
  // { to: '/widgets', name: 'widgets', exact: false, Icon: MdWidgets },
];

const onlyAdmin = [
  { to: '/', name: 'dashboard', exact: true, Icon: MdDashboard },
  // { to: '/pakarku', name: 'pakar sultanku', exact: false, Icon: MdWeb },
];

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenComponents: true,
    isOpenContents: true,
    isOpenPages: true,
  };

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  render() {
    const user = getUser();
    return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Navbar>
            <SourceLink className="navbar-brand d-flex pl-4 ">
              <img
                src={logo100Image}
                width="140"
                height="150"
                className="pr-2"
                alt=""
              />
            </SourceLink>
            <Label className="text-white d-flex" style={{paddingLeft: 60}}>
              SultanKu
            </Label>
          </Navbar>
          <Nav vertical>
            {user.isAdmin === 0 && navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}
            {user.isAdmin === 0 && 
            <React.Fragment>
              <NavItem
                className={bem.e('nav-item')}
                onClick={this.handleClick('Pages')}
              >
                <BSNavLink className={bem.e('nav-item-collapse')}>
                  <div className="d-flex">
                    <MdBook className={bem.e('nav-item-icon')} />
                    <span className="">BUKU TANIKU</span>
                  </div>
                  <MdKeyboardArrowDown
                    className={bem.e('nav-item-icon')}
                    style={{
                      padding: 0,
                      transform: this.state.isOpenPages
                        ? 'rotate(0deg)'
                        : 'rotate(-90deg)',
                      transitionDuration: '0.3s',
                      transitionProperty: 'transform',
                    }}
                  />
                </BSNavLink>
              </NavItem>
              <Collapse isOpen={this.state.isOpenPages}>
                {pageContentsBuku.map(({ to, name, exact, Icon }, index) => (
                  <NavItem key={index} className={bem.e('nav-item')}>
                    <BSNavLink
                      id={`navItem-${name}-${index}`}
                      className="text-uppercase"
                      tag={NavLink}
                      to={to}
                      activeClassName="active"
                      exact={exact}
                    >
                      <Icon className={bem.e('nav-item-icon')} />
                      <span className="">{name}</span>
                    </BSNavLink>
                  </NavItem>
                ))}
              </Collapse>
            </React.Fragment>
            }

            {/* <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Components')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdExtension className={bem.e('nav-item-icon')} />
                  <span className=" align-self-start">Components</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenComponents
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenComponents}>
              {navComponents.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>

            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Contents')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdSend className={bem.e('nav-item-icon')} />
                  <span className="">Contents</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenContents
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenContents}>
              {navContents.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse> */}
            {user.isAdmin === 1 &&
            <div>
            {onlyAdmin.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}
            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Pages')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdPages className={bem.e('nav-item-icon')} />
                  <span className="">MIMIN TANIKU</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenPages
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenPages}>
              {pageContents.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>
            </div>
            }
          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
