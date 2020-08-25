import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Form from "./styles/Form";
import Error from "./styles/ErrorMessage";
import { SIGN_UP_MUTATION } from "./queries/SIGN_UP_MUTATION";

class SignUp extends Component {
  state = {
    email: "",
    name: "",
    password: "",
  };
  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Mutation mutation={SIGN_UP_MUTATION} variables={this.state}>
        {(signUp, { error, loading }) => {
          return (
            <Form
              method="POST"
              onSubmit={async (e) => {
                e.preventDefault();
                const response = await signUp();
                console.log(response);
              }}>
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Sign Up for an account!</h2>
                <Error error={error} />
                <label htmlFor="email">
                  Email
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor="name">
                  Name
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor="password">
                  Password
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </label>
              </fieldset>
              <button type="submit">Sign Up!</button>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default SignUp;
