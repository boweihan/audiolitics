import React, { PureComponent } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

class NavBar extends PureComponent {
  render() {
    return (
      <div>
        <Navbar dark expand="md">
          <NavbarBrand
            href="javascript:void(0)"
            onClick={() => this.props.setRoute('main')}
          >
            Audiolitics
          </NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink onClick={() => this.props.setRoute('main')}>
                Analyze
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => this.props.setRoute('login')}>
                Login
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

NavBar.propTypes = {
  setRoute: PropTypes.func.isRequired,
};

export default NavBar;
