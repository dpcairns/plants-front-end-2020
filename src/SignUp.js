import React, { Component } from 'react'
import request from 'superagent';

export default class Signup extends Component {
    state = {
        email: '',
        password: '',
        loading: false,
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        console.log(this.state);

        this.setState({ loading:true })
        const user = await request
            .post('https://plant-dani-plant-2020.herokuapp.com/auth/signup')
            .send(this.state); // we can send state because the keys are the same on the front and back end


        console.log(user.body, 'sending you to todos');
        this.setState({ loading: false })
        
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
                    {
                        this.state.loading 
                        ? 'Spinnerrrr'
                        : <button>
                            Sign up!
                        </button>
                    }
                </form>
            </div>
        )
    }
}
