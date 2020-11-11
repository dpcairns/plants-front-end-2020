import React, { Component } from 'react'

export default class Signup extends Component {
    state = {
        email: '',
        password: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();

        console.log(this.state);
        // TODO make a new account, then take the user to the todo page (they'll need the token)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Email:
                        <input 
                        onChange={(e) => this.setState({ email: e.target.value })}
                        value={this.state.email} />
                    </label>
                    <label>
                        Password:
                        <input 
                        onChange={(e) => this.setState({ password: e.target.value })}
                        value={this.state.password} type="password"/>
                    </label>
                    <button>
                        Sign up!
                    </button>
                </form>
            </div>
        )
    }
}
