import { Content } from 'components/Layout';
import sidebarBgImage from 'assets/img/sidebar/sidebar-3.jpg';
import React from 'react';

const sidebarBackground = {
  background: `url("${sidebarBgImage}")`,
  backgroundImage: `linear-gradient(to bottom, #6a82fb, #36ce7a), url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
};

const EmptyLayout = ({ children, ...restProps }) => (
  <main className="cr-app bg-light" style={sidebarBackground} {...restProps}>
    <Content fluid>{children}</Content>
  </main>
);

export default EmptyLayout;
