import React, { PureComponent } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

class Home extends PureComponent {
  render() {
    return (
      <div>
        <Navbar dark expand="md">
          <NavbarBrand href="/">Audiolitics</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Analyze</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/components/">Login</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default Home;
