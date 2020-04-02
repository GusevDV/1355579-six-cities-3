import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {authType} from '../../types/user-types.js';
import {getAuthStatus} from '../../reducer/user/selectors.js';
import {ApiCall as UserApiCall} from '../../reducer/user/user.js';
import history from '../../history.js';

import Header from '../header/header.jsx';

class SignIn extends React.PureComponent {

  constructor(props) {
    super(props);
    this.inputEmail = React.createRef();
    this.inputPassword = React.createRef();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.isAuthorized) {
      history.push(`/`);
    }
  }

  componentDidUpdate() {
    if (this.props.isAuthorized) {
      history.push(`/`);
    }
  }
  handleFormSubmit(e) {
    e.preventDefault();
    this.props.onSignIn(this.inputEmail.current.value, this.inputPassword.current.value);
  }

  render() {
    return (
      <div className="page page--gray page--login">
        <Header />
        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form className="login__form form" action="#" method="post" onSubmit={this.handleFormSubmit}>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input className="login__input form__input" type="email" name="email" placeholder="Email" required ref={this.inputEmail} autoComplete="on" />
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input className="login__input form__input" type="password" name="password" placeholder="Password" required ref={this.inputPassword} autoComplete="on" />
                </div>
                <button className="login__submit form__submit button" type="submit">Sign in</button>
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>Amsterdam</span>
                </a>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }
}

SignIn.propTypes = {
  isAuthorized: authType.isRequired,
  onSignIn: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isAuthorized: getAuthStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  onSignIn: (email, password) => dispatch(UserApiCall.signIn(email, password))
});

export {SignIn};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

