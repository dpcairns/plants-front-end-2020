import React, { Component } from 'react'
import request from 'superagent';

export default class Plants extends Component {
    state = {
        plants: []
    }
    
    componentDidMount = async () => {
        const response = await request.get('https://plant-dani-plant-2020.herokuapp.com/api/plants')
        .set('Authorization', this.props.token)

        this.setState({ plants: response.body })
    }

    render() {
        return (
            <div>
                Welcome to plants!
                {
                    Boolean(this.state.plants.length) && this.state.plants.map(plant => <div>
                        name: {plant.name}; watered: {plant.is_watered}
                        </div>)
                }
            </div>
        )
    }
}
