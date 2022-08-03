import React, { useEffect, useState } from "react";
import isEqual from 'lodash/isEqual';

const emptyForecast = { wind: {}, main: {}};
export const Weather = (props) => {
    const  weatherAccessToken  = 'f2285e40e5f4452c908f83f9e0c9fa4e';
    const [weatherForecast, setWeatherForecast ] = useState(emptyForecast);
    const [zip, setZip] = useState('04345');

    // Initial UseEffect to fetch the weather information.
    useEffect(()=>{
        if(zip && zip.length === 5){
            fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${weatherAccessToken}`).then(response => response.text()).then((response) => {
                let json;
                try{
                    json = JSON.parse(response);
                }catch (e){
                    console.log(`Invalid Response: ${response}`);
                }
            if(json.message){
                console.log(`Recieved an error during API Call: ${json.message}`);
                setWeatherForecast(emptyForecast);
            }else{
                setWeatherForecast(json);
            }
    });
        }
        
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [zip]);

    // const getWeather = () => (weatherForecast.weather || []).map(forecast => <Card><Card.Header>{forecast.id} - {forecast.main}</Card.Header><Card.Body>Description: {forecast.description}</Card.Body></Card>);

    console.log(weatherForecast);
    const { name, main: { feels_like, temp, temp_max, temp_min } } = weatherForecast;

    return (<div>
        <h2>Todays Weather in your area</h2>
        <input autocomplete="off" 
            onChange={({ target: { value }}) => setZip(value)} 
            name="zipValue" 
            label="ZIP" 
            placeholder="Enter zip here" 
            defaultValue={zip} 
        />
       
        <div className="card">
            <div className="card-header">
            <p>Your Area: {name}</p>
            </div>
            <div className="card-body">
                <p>Feels Like: {feels_like}</p>
                <p>Max Temp: {temp_max}</p>
                <p>Min Temp: {temp_min}</p>
                <p>Average Temp: {temp}</p>
            </div>
            <div className="card-footer">
                <p>Rest of the information</p>
                {!isEqual(emptyForecast, weatherForecast) && Object.keys(weatherForecast).map(key => (<div className="row"><div className="col-6">{key}</div><div className="col-6">{typeof weatherForecast[key] === 'object' ? JSON.stringify(weatherForecast[key]) : weatherForecast[key]}</div></div>))}
            </div>
        </div>
    </div>);
};

export default Weather;