import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage'

const REQUEST_REST_MUTATION =gql`
  mutation REQUEST_REST_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`

class RequestReset extends Component {
  state = {
    email: '',
  }
  
  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    return (
      <Mutation 
        mutation={REQUEST_REST_MUTATION}
        variables={this.state}
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

export default RequestReset;