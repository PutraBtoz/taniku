// import logo200Image from 'assets/img/logo/logo_200.png';
import logo100Image from 'assets/img/logo/logo_100.png';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';
import { setUserSession } from '../utils/Common';

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: false,
      username: '',
      password: '',
      email: '',
    };
  }

  get isLogin() {
    return this.props.authState === STATE_LOGIN;
  }

  get isSignup() {
    return this.props.authState === STATE_SIGNUP;
  }

  changeAuthState = authState => event => {
    event.preventDefault();

    this.props.onChangeAuthState(authState);
  };

  handleSubmit = event => {
    event.preventDefault();
    if(this.isSignup){
      this.handleRegister();
    }else{
      this.handleLogin();
    }
    // console.log(this.props.usernameInputProps, "OKOK")
  };

  renderButtonText() {
    const { buttonText } = this.props;

    if (!buttonText && this.isLogin) {
      return 'Login';
    }

    if (!buttonText && this.isSignup) {
      return 'Signup';
    }

    return buttonText;
  }

  handleChange = (name, event) => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleLogin = () => {
    this.setState({error: null, loading: true});
    axios.post('http://localhost:4000/users/signin', { username: this.state.username, password: this.state.password }).then(response => {
      this.setState({loading: false});
      setUserSession(response.data.token, response.data.user);
      this.props.history.push('/');
    }).catch(error => {
      this.setState({loading: false});
      console.log(error.response)
      if (error.response.status === 401) this.setState({error: error.response.data.message});
      else this.setState({error: "Something went wrong. Please try again later."});
    });
  }

  handleRegister = () => {
    this.setState({error: null, loading: true});
    axios.post('http://localhost:4000/users/register', { username: this.state.username, password: this.state.password, email: this.state.email }).then(response => {
      this.setState({loading: false});
      this.props.history.push('/login');
    }).catch(error => {
      this.setState({loading: false});
      console.log(error.response)
      if (error.response.status === 401) this.setState({error: error.response.data.message});
      else this.setState({error: "Something went wrong. Please try again later."});
    });
  }

  render() {
    const {
      showLogo,
      usernameLabel,
      usernameInputProps,
      emailLabel,
      emailInputProps,
      passwordLabel,
      passwordInputProps,
      confirmPasswordLabel,
      confirmPasswordInputProps,
      children,
      onLogoClick,
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        {showLogo && (
          <div className="text-center pb-4">
            <img
              src={logo100Image}
              className="rounded"
              style={{ width: 200, height: 200, cursor: 'pointer' }}
              alt="logo"
              onClick={onLogoClick}
            />
          </div>
        )}
        <FormGroup>
          <Label for={usernameLabel}>{usernameLabel}</Label>
          <Input onChange={(event) => this.handleChange('username', event)} value={this.state.username} {...usernameInputProps} />
        </FormGroup>
        {this.isSignup && (
          <FormGroup>
            <Label for={emailLabel}>{emailLabel}</Label>
            <Input onChange={(event) => this.handleChange('email', event)} value={this.state.email} {...emailInputProps} />
          </FormGroup>
        )}
        <FormGroup>
          <Label for={passwordLabel}>{passwordLabel}</Label>
          <Input onChange={(event) => this.handleChange('password', event)} value={this.state.password} {...passwordInputProps} />
        </FormGroup>
        {this.isSignup && (
          <FormGroup>
            <Label for={confirmPasswordLabel}>{confirmPasswordLabel}</Label>
            <Input {...confirmPasswordInputProps} />
          </FormGroup>
        )}
        <FormGroup check>
          <Label check>
            <Input type="checkbox" />{' '}
            {this.isSignup ? 'Agree the terms and policy' : 'Remember me'}
          </Label>
        </FormGroup>
        <hr />
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          type='submit'>
          {this.renderButtonText()}
        </Button>

        <div className="text-center pt-1">
          <h6>or</h6>
          <h6>
            {this.isSignup ? (
              <a href="#login" onClick={this.changeAuthState(STATE_LOGIN)}>
                Login
              </a>
            ) : (
              <a href="#signup" onClick={this.changeAuthState(STATE_SIGNUP)}>
                Signup
              </a>
            )}
          </h6>
        </div>

        {children}
      </Form>
    );
  }
}

export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';

AuthForm.propTypes = {
  authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]).isRequired,
  showLogo: PropTypes.bool,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  emailLabel: PropTypes.string,
  emailInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
};

AuthForm.defaultProps = {
  authState: 'LOGIN',
  showLogo: true,
  usernameLabel: 'Username',
  usernameInputProps: {
    type: 'text',
    placeholder: 'username',
  },
  emailLabel: 'Email',
  emailInputProps: {
    type: 'email',
    placeholder: 'your@email.com',
  },
  passwordLabel: 'Password',
  passwordInputProps: {
    type: 'password',
    placeholder: 'your password',
  },
  confirmPasswordLabel: 'Confirm Password',
  confirmPasswordInputProps: {
    type: 'password',
    placeholder: 'confirm your password',
  },
  onLogoClick: () => {},
};

export default AuthForm;
