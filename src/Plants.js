import React, { Component } from 'react'
import request from 'superagent';

export default class Plants extends Component {
    state = {
        plants: [],
        plantName: '',
        coolFactor: '',
        loading: false
    }
    
    componentDidMount = async () => {
        await this.fetchPlants()
    }

    fetchPlants = async () => {
        await this.setState({ loading: true });
        const response = await request.get('https://plant-dani-plant-2020.herokuapp.com/api/plants')
        .set('Authorization', this.props.token)

        await this.setState({ plants: response.body, loading: false })
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const newPlant = {
            name: this.state.plantName,
            cool_factor: this.state.coolFactor,
        };
        
        await this.setState({ loading: true });

        await request.post('https://plant-dani-plant-2020.herokuapp.com/api/plants')
        .send(newPlant)
        .set('Authorization', this.props.token)  ;

        await this.fetchPlants();
    }

    handleWaterClick = async (someId) => {
        // let's update a particular plant (we'll need its id)
        await request.put(`https://plant-dani-plant-2020.herokuapp.com/api/plants/${someId}`)
        .set('Authorization', this.props.token)  ;

        await this.fetchPlants();
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
                    this.state.loading 
                        ? 'LOADING!!!!!' 
                        : this.state.plants.map(plant => <div key={`${plant.name}${plant.id}${Math.random()}`} style={{ 
                            textDecoration: plant.is_watered ? 'line-through' : 'none' }
                        }>
                        name: {plant.name}
                        {
                            plant.is_watered ? '' : <button 
                            // if you're ever onClicking inside of a map, you might need to make an anonymous function like this:
                                onClick={() => this.handleWaterClick(plant.id)}>
                                Water plant
                            </button>
                        }
                        </div>)
                }
            </div>
        )
    }
}
