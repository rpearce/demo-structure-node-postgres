import React, { Component } from 'react';

class SignIn extends Component {
  render() {
    return (
      <main role="main" aria-labelledby="title">
        <header>
          <h1 id="title">Sign In or Sign Up</h1>
        </header>
        <section>
          <form action="/signin" method="POST">
            <div>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" maxLength="254" name="email" placeholder="you@example.com" />
            </div>
            <div>
              <button type="submit">Sign In or Sign Up</button>
            </div>
          </form>
        </section>
      </main>
    );
  }
}

SignIn.meta = {
  title: 'Sign In or Sign Up',
  description: 'Sign in or Sign Up'
};

export default SignIn;
