import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const CURRENT_USER_QUERY = gql`
  me {
    id
    email
    name
    permissions
  }
`;

const User = props => (
  <Query query={CURRENT_USER_QUERY}> 
    {payload => props.children(payload)}
  </Query>
)

User.PropTypes = {
  children: PropTypes.func.isRequired,
}

export {CURRENT_USER_QUERY};
export default User;