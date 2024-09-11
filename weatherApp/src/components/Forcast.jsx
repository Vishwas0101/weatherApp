import React, { useEffect, useState } from "react";
import { apiKeys } from "../utils/apiKeys";
import axios from "axios";


const Forcast = (props) => {
    const [query, setQuery] = useState("");
    const [error, setError] = useState("");
    const [weather, setWeather] = useState({});
    const [suggestions, setSuggestions] = useState([]);
    const [forcast, setForcast] = useState([]);
    console.log(forcast);


    const fetchCitysuggestions = async (city) => {
        if (city.length > 2) {
            await axios.get(
                `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKeys.key}`
            ).then((response) => {
                console.log(response);
                setSuggestions(response.data)
            }).catch((error) => {
                console.log(error);
                setError({ message: "Not Found", query: query })
            })
        }
    }

    const forcastData = (data) => {
        const dailyForcast = data.filter(item => item.dt_txt.includes("12:00:00"));
        setForcast(dailyForcast)
    }

    const fetchWeather = async (cityName) => {

        try {

            const weatherResponse = await axios.get(
                `${apiKeys.base}weather?q=${cityName}&units=metric&APPID=${apiKeys.key}`
            );
            setWeather(weatherResponse.data);

            const forcastResponse = await axios.get(
                `${apiKeys.base}forecast?q=${cityName}&units=metric&APPID=${apiKeys.key}`
            );
            forcastData(forcastResponse.data.list)
            setQuery("");
            setSuggestions([]);

        } catch (error) {
            console.log("Error fetching weather data:", error);
            setWeather({});
            setQuery("")
            setError({ message: "City not found", query: cityName });
        }

        await axios.get(
            `${apiKeys.base}weather?q=${cityName}&units=metric&APPID=${apiKeys.key}`
        ).then((response) => {
            console.log(response);

            setWeather(response.data);
            setQuery("");
            setSuggestions([]);
        }).catch((error) => {

        })

    }

    const inputSearch = (e) => {
        const city = e.target.value;
        setQuery(city);
        if (city === "") {
            setSuggestions([]);
        } else {
            fetchCitysuggestions(city);
        }
    }

    const handleCitySelect = (cityName) => {
        setQuery(cityName);
        fetchWeather(cityName)
    }

    // const search = (city) => {
    //     axios.get(
    //         `${apiKeys.base}weather?q=${city != "[object Object]" ? city : query
    //         }&units=metric&APPID=${apiKeys.key}`
    //     ).then((response) => {
    //         setWeather(response.data);
    //         setQuery("")
    //     }).catch((error) => {
    //         console.log(error);
    //         setWeather("");
    //         setQuery("")
    //         setError({ message: "Not Found", query: query })
    //     });
    // };


    useEffect(() => {
        fetchWeather("Delhi")
    }, [])

    return (
        <>
            <div className="flex flex-col items-start p-4 sm:p-8 w-full max-w-md mx-auto ">
                {/* Search Bar */}
                <div className="flex items-center relative z-[2] space-x-3 mb-10 w-full">
                    <input
                        type="text"
                        placeholder="Search any city"
                        onChange={inputSearch}
                        value={query}
                        className="border-b-2 border-transparent focus:border-b-blue-300 placeholder-white text-white px-4 py-2 bg-transparent outline-none transition-all duration-300 w-64 sm:w-80"
                    />

                    {suggestions.length > 0 && query !== "" && (
                        <ul className="absolute top-full left-0 w-full bg-neutral-900 text-white border border-gray-700 mt-2 z-10">
                            {suggestions.map((city, index) => (
                                <li
                                    key={index}
                                    className="cursor-pointer px-4 py-2 hover:bg-neutral-700"
                                    onClick={() => handleCitySelect(city.name)}
                                >
                                    {city.name}, {city.country}
                                </li>
                            ))}
                        </ul>
                    )}
                    <div
                        className="bg-blue-500 hover:bg-blue-600 rounded-full h-10 w-10 flex items-center justify-center cursor-pointer transition-all duration-300"
                    >
                        <img
                            src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
                            alt="search"
                            className="w-5"
                        />
                    </div>
                </div>

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
                        {forcast.length > 0 && (
                            <div className="w-full mt-8">
                                <h3 className="text-white text-xl font-semibold mb-4">5-Day Forecast</h3>
                                <div className="flex space-x-2 overflow-x-auto w-full">
                                    {forcast.map((day, index) => (
                                        <div
                                            key={index}
                                            className="text-center text-white min-w-[120px] bg-blue-900 p-4 rounded-lg"
                                        >
                                            <p className="font-medium">{new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                                            <img
                                                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                                                alt={day.weather[0].description}
                                                className="w-12 h-12 mx-auto"
                                            />
                                            <p className="text-lg">{Math.round(day.main.temp)}°C</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

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