import {Outlet, Link } from "react-router-dom";
import { Fragment } from "react";
import { ReactComponent as CrownLogo } from '../../assets/crown.svg'
import './navigation.styles.scss'
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
        <div className='navigation'>
            <Link className="logo-container" to='/'>
              <CrownLogo className="logo"/>
            </Link>
          <div className="nav-links-container">
            <Link className="nav-link" to='/shop'>
                Shop
            </Link>
            {
              currentUser ? (
                <span className="'nav-link" onClick={signOutUser}>Sign Out</span>
              ) : (
                <Link className="nav-link" to='/authentication'>
                    Sign In
                </Link>
              )
            }
            <CartIcon/>
          </div>
          {isCartOpen && <CartDropdown />}
        </div>
        <Outlet />
      </Fragment>
    )
  }

  export default Navigation