import React, { useEffect, useState } from "react";
import { apiKeys } from "../utils/apiKeys";
import axios from "axios";


const Forcast = (props) => {
    const [query, setQuery] = useState("");
    const [error, setError] = useState("");
    const [weather, setWeather] = useState({});
    console.log(weather);

    const search = (city) => {
        axios.get(
            `${apiKeys.base}weather?q=${city != "[object Object]" ? city : query
            }&units=metric&APPID=${apiKeys.key}`
        ).then((response) => {
            setWeather(response.data);
            setQuery("")
        }).catch((error) => {
            console.log(error);
            setWeather("");
            setQuery("")
            setError({ message: "Not Found", query: query })
        });
    };

    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    useEffect(() => {
        search("Delhi")
    }, [])

    return (
        <>
            <div className="flex flex-col items-center p-4 sm:p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
                {/* Search Bar */}
                <div className="flex items-center justify-center relative z-[2] space-x-3 mb-10 w-full">
                    <input
                        type="text"
                        placeholder="Search any city"
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                        className="border-b-2 border-transparent focus:border-b-blue-300 placeholder-white text-white px-4 py-2 bg-transparent outline-none transition-all duration-300 w-64 sm:w-80"
                    />
                    <div
                        className="bg-blue-500 hover:bg-blue-600 rounded-full h-10 w-10 flex items-center justify-center cursor-pointer transition-all duration-300"
                        onClick={search}
                    >
                        <img
                            src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
                            alt="search"
                            className="w-5"
                        />
                    </div>
                </div>

                {/* Weather Information */}
                {typeof weather.main != "undefined" ? (
                    <div className="w-full text-center text-white">
                        <h3 className="text-4xl font-semibold mb-0 border-b border-white pb-3">
                            {weather.name}, {weather.sys.country}
                        </h3>
                        <img
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt={weather.weather[0].description}
                            className="w-40 h-40 mx-auto mb-4 filter invert"
                        />
                        <p className="text-2xl font-medium">
                            {Math.round(weather.main.temp)}°C - {weather.weather[0].main}
                        </p>
                        <ul className="mt-6 space-y-2 text-lg">
                            <li>
                                <span className="font-semibold">Humidity: </span>
                                {Math.round(weather.main.humidity)}%
                            </li>
                            <li>
                                <span className="font-semibold">Visibility: </span>
                                {weather.visibility / 1000} km
                            </li>
                            <li>
                                <span className="font-semibold">Wind Speed: </span>
                                {weather.wind.speed} km/h
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div className="text-red-500 mt-4">
                        <p>{error.query} {error.message}</p>
                    </div>
                )}
            </div>

        </>
    );
}

export default Forcast;