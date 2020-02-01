import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage'

const REST_MUTATION =gql`
  mutation REST_MUTATION($resetToken: String!, $password: String!, $confirmPassword: String!) {
    resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
      id
      email
      name
    }
  }
`

class Reset extends Component {
  static propTypes = {
    resetToken: PropTypes.string.isRequired
  };
  state = {
    password: '',
    confirmPassword: '',
  }
  
  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    return (
      <Mutation 
        mutation={REST_MUTATION}
        variables={{
          resetToken: this.props.resetToken,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword
        }}
      >
        {(reset, { error, loading, called }) => (
          <Form method="post" onSubmit={async (e) => {
            e.preventDefault();
            const res = await reset()
            this.setState({
              email: ''
            })
          }}>
            <fieldset disabled={loading} aria-busy={loading}>
              <p>Request a password reset.</p>
              <Error error={error} />
              {!error && !loading && called && <p>Success! Check your email for a reset link!</p>}
              <label htmlFor="email">
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={this.saveToState}
                  />
              </label>
              <button type="submit">Request Reset!</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}

export default Reset;