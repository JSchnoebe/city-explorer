import axios from 'axios';
import './App.css';
import React from 'react';
// import Main from './components/main';

const apiURL = process.env.REACT_APP_API_URL;


class App extends React.Component {

  state = {
    q: null,
    location: null,
  };

  handleSearch = async event => {
    event.preventDefault();

    let form = event.target;
    let input = form.elements.search;
    let q = input.value;
    console.log(q);

    this.setState({ q, location: null });

    const url = `https://us1.locationiq.com/v1/search.php`;
    const response = await axios.get(url, {
      params: {
        key: process.env.REACT_APP_LOCATION_KEY,
        q,
        format: 'json',
      }
    });

    const location = response.data[0];
    this.setState({ location });

    this.getWeather(location);
  };

  getWeather = async (location) => {
    const response = await axios.get(`${apiURL}/weather`, {
      params: {
        lat: location.lat,
        lon: location.lon,
      },
    });
    console.log(response);
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSearch}>
          <label>
            Search for location:
            {' '} {}
            <input type="text" name="search" placeholder="Location" />
          </label>
          <div>
            <button type="submit">Explore!</button>
          </div>
        </form>

        {this.state.q &&
        <>
          <h2>Search: {this.state.q}</h2>
          {this.state.location ?
            <p>Display Name: {this.state.location.display_name}
            ({this.state.location.lat},{this.state.location.lon})</p>
            : <p>Loading...</p>
          }
          </>
        }
      </div>
    );
  }
}

export default App;
