import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Route} from '../../../const.js';
import {authType} from '../../types/user-types.js';
import {getAuthStatus} from '../../reducer/user/selectors.js';

const Header = React.memo(function Header(props) {
  const {isAuthorized, email} = props;
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to="/" className="header__logo-link header__logo-link--active">
              <img
                className="header__logo"
                src="/img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link className="header__nav-link header__nav-link--profile" to={isAuthorized ? Route.FAVORITES : Route.LOGIN}>
                  {isAuthorized ? (
                    <>
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">{email}</span>
                    </>
                  ) : (
                    <span className="header__user-name user__name">Sign In</span>
                  )}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
});

Header.propTypes = {
  isAuthorized: authType.isRequired,
  email: PropTypes.string
};

const mapStateToProps = (state) => ({
  isAuthorized: getAuthStatus(state),
  email: state.user.data.email
});

export {Header};
export default connect(mapStateToProps)(Header);
