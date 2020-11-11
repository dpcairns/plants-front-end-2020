import React, { Component } from 'react'
import request from 'superagent';

export default class Plants extends Component {
    state = {
        plants: [],
        plantName: '',
        coolFactor: ''
    }
    
    componentDidMount = async () => {
        const response = await request.get('https://plant-dani-plant-2020.herokuapp.com/api/plants')
        .set('Authorization', this.props.token)

        this.setState({ plants: response.body })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        
        const newPlant = {
            name: this.state.plantName,
            cool_factor: this.state.coolFactor,
        };
        
        // optimistic updates
        const plantsCopy = this.state.plants.slice();
        const newPlants = plantsCopy.push(newPlant);
        // code golf version:
        // const newPlants = [...this.state.plants, newPlant];
        
        
        this.setState({ plants: newPlants })

        await request.post('https://plant-dani-plant-2020.herokuapp.com/api/plants')
        .send(newPlant)
        .set('Authorization', this.props.token)  
    }

    render() {
        return (
            <div>
                Welcome to plants!
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Add a plant:
                        <input 
                            value={this.state.plantName} 
                            onChange={(e) => this.setState({ plantName: e.target.value })}
                        />
                    </label>
                    <label>
                        Cool factor:
                        <input 
                            type="number"
                            value={this.state.coolFactor} 
                            onChange={(e) => this.setState({ coolFactor: e.target.value })}
                        />
                    </label>
                        <button>
                            Add plant
                        </button>
                </form>
                {
                    Boolean(this.state.plants.length) && this.state.plants.map(plant => <div>
                        name: {plant.name}; watered: {plant.is_watered}
                        </div>)
                }
            </div>
        )
    }
}
