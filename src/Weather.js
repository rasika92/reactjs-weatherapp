import React, {Component} from 'react';
import DisplayWeather from './DisplayWeather';
import moment from 'moment';
import './DisplayWeather.css';

class Weather extends Component {
    constructor(props) {
        super(props);
        // Define state.
        this.state = {
            cityName: '',
            items: []
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.fetchWeather = this.fetchWeather.bind(this);
    }

    handleInputChange(e) {
        var cityName = e.target.value;
        this.setState({cityName: cityName});
    }

    fetchWeather(e) {
        e.preventDefault();
        var formattedDate;
        var weatherArray = [];
        const apiKey = '78b0d1030212d1a010ab037078c582a4';
        fetch("http://api.openweathermap.org/data/2.5/forecast?q=" + this.state.cityName + "&appid=" + apiKey)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.cod == 200) {
                        result.list.map((item, index) => (
                            formattedDate = moment.unix(item.dt).format('dddd MMMM DD'),
                            weatherArray[formattedDate] = item.weather[0],
                            weatherArray[formattedDate]['temp'] = item.main.temp
                        ));
                        this.setState({
                            items: weatherArray
                        });
                    }
                    else {
                        this.setState({
                            items: []
                        });
                    }
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }

    componentDidMount(){
        console.log('hello');
        //this.fetchWeather();
    }

    render() {
        return (
            <React.Fragment>
                <div className="weather-app-container">
                    <div className="section-top">
                        <span>weather-app</span>
                        <form>
                            <input type="text" name="city-name" onChange={this.handleInputChange}
                                   value={this.state.cityName} placeholder="Enter the city"/>
                            <button onClick={this.fetchWeather}>Submit</button>
                        </form>
                    </div>
                    <DisplayWeather items={this.state.items} cityName={this.state.cityName}/>
                </div>
            </React.Fragment>
        );
    }
}

export default Weather;