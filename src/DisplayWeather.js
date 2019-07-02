import React, {Component} from 'react';
import moment from 'moment';

class DisplayWeather extends Component {

    render() {
        let forecast = this.props.items;
        let cityName = this.props.cityName;
        let todaysDate = moment();
        var currentWeatherObject = {};
        const currentWeather = forecast[todaysDate.format('dddd MMMM DD')];
        if (currentWeather !== undefined) {
            delete forecast[todaysDate.format('dddd MMMM DD')];
            currentWeatherObject = {
                'description': currentWeather.description,
                'icon': "http://openweathermap.org/img/wn/" + currentWeather.icon + "@2x.png",
                'temparature': Math.round(currentWeather.temp - 273.15),
            }
        }

        let forecastList, icon;
        console.log(cityName.length);
        if (cityName.length > 0) {
            let keys = Object.keys(forecast);
            if (Object.keys(forecast).length > 0) {
                console.log(Object.keys(forecast).length);
                var values = Object.values(forecast);
                // Loop the items array.
                forecastList = values.map((item, index) => (
                    icon = "http://openweathermap.org/img/wn/" + item.icon + "@2x.png",
                        <span key={index} className="daily-weather">
                    <p><img alt={item.description.replace(/ /g, "-")} src={icon}/></p>
                    <p>{item.main}</p>
                    <span>{keys[index]}</span>
                </span>
                ));
            } else {
                forecastList = <span>Invalid city given as input</span>;
            }
            console.log(forecastList);
        }

        return (
            <React.Fragment>
                <div className="daily-weather-container">
                    {currentWeather !== undefined &&
                    <div className="current-weather-display">
                        <h4>Current Conditions</h4>
                        <p><img alt={currentWeatherObject.description.replace(/ /g, "-")}
                                src={currentWeatherObject.icon}/></p>
                        <span className="display-temp">{currentWeatherObject.temparature}&#8451;</span>
                        <p>Five Day Forecast</p>
                    </div>
                    }

                    <div className="weekly-weather-display">
                        {forecastList}
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default DisplayWeather;