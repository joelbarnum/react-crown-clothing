import {Outlet, Link } from "react-router-dom";
import { Fragment } from "react";
import { ReactComponent as CrownLogo } from '../../assets/crown.svg'

import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles';
import { useContext } from "react";
import { UserContext } from "../../contexts/usesr.context";
import { CartContext } from "../../contexts/cart.context";
import { signOutUser } from './../../utils/firebase/firebase.utils'
import CartIcon from './../../components/cart-icon/cart-icon.component';
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } =useContext(CartContext); 

    return(
      <Fragment>
        <NavigationContainer>
            <LogoContainer to='/'>
              <CrownLogo className="logo"/>
            </LogoContainer>
          <NavLinks>
            <NavLink to='/shop'>
                Shop
            </NavLink>
            {
              currentUser ? (
                <NavLink as="span" onClick={signOutUser}>
                  Sign Out
                  </NavLink>
              ) : (
                <NavLink to='/authentication'>
                    Sign In
                </NavLink>
              )
            }
            <CartIcon/>
          </NavLinks>
          {isCartOpen && <CartDropdown />}
        </NavigationContainer>
        <Outlet />
      </Fragment>
    )
  }

  export default Navigation