import { useContext, useEffect, useState } from 'react';
import './Home.css';
import { KeycloakContext } from '../../providers/KeycloakContext';

interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

export const Home = () => {
    const [forecasts, setForecasts] = useState<Forecast[]>();
    const { keycloakInstance, authenticated } = useContext(KeycloakContext);

    useEffect(() => {
        console.log(authenticated);
        populateWeatherData();
    }, []);

    async function populateWeatherData() {
        const response = await fetch('http://localhost:5080/api/weatherforecast', {
            headers: {
                Authorization: `Bearer ${keycloakInstance?.token}`,
            },
        });
        if (response.ok) {
            const data = await response.json();
            setForecasts(data);
        }
    }

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.date}>
                        <td>{forecast.date}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tableLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );
};