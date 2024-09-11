import React, { useEffect, useState } from "react";
import { apiKeys } from "../utils/apiKeys";
import loader from "../assets/WeatherIcons.gif";
import Forecast from "./Forcast";

const dateBuilder = (d) => {

    let months = ["January", "February", "March", "April", "May", "June", "July", "August",
        "September", "October", "November", "December",];
    let days = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;

};

const defaults = {
    color: "white",
    size: 112,
    animate: true,
};

const CurrentLocation = () => {

    const [lat, setLat] = useState();
    const [lon, setLon] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [tempC, setTempC] = useState();
    const [tempF, setTempF] = useState();
    const [city, setCity] = useState();
    const [country, setCountry] = useState();
    const [humidity, setHumidity] = useState();
    const [description, setDescription] = useState();
    const [icon, setIcon] = useState("CLEAR_DAY");
    const [main, setMain] = useState();

    useEffect(() => {
        if (navigator.geolocation) {
            getPosition()
                .then((poistion) => {
                    getWeather(poistion.coords.latitude, poistion.coords.longitude)
                })
        }
    }, [])

    const getPosition = (options) => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, options)
        })
    }

    const getWeather = async (latitude, longitude) => {
        const apiCall = await fetch(
            `${apiKeys.base}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${apiKeys.key}`
        )

        const data = await apiCall.json();
        setLat(latitude);
        setLon(longitude);
        setCity(data.name);
        setTempC(Math.round(data.main.temp));
        setTempF(Math.round(data.main.temp * 1.8 + 32));
        setHumidity(data.humidity);
        setMain(data.weather[0].main);
        setCountry(data.sys.country);

        switch (data.weather[0].main) {
            case "Haze":
                setIcon(data.weather[0].icon);
                break;
            case "Clouds":
                setIcon(data.weather[0].icon);
                break;
            case "Rain":
                setIcon(data.weather[0].icon);
                break;
            case "Snow":
                setIcon(data.weather[0].icon);
                break;
            case "Dust":
                setIcon(data.weather[0].icon);
                break;
            case "Drizzle":
                setIcon(data.weather[0].icon);
                break;
            case "Fog":
            case "Smoke":
                setIcon(data.weather[0].icon);
                break;
            case "Tornado":
                setIcon(data.weather[0].icon);
                break;
            default:
                setIcon(data.weather[0].icon);
        }
    };

    if (tempC) {
        return (
            <>
                <div className="h-full w-full bg-[#0F172A] flex items-center justify-center bg-opacity-60 mt-10">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full p-4 sm:p-8">

                        {/* Live Weather Data Widget - Compact */}
                        <div className="bg-[#1E293B] bg-opacity-90 rounded-lg shadow-lg p-2 h-52">
                            {/* Main weather description and location */}
                            <div className="flex items-center text-[#E5E7EB] text-3xl sm:text-4xl justify-between">
                                <div className="flex-col">
                                    {main}
                                    <img
                                        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                                        alt={main || "Weather icon"}
                                        className="w-16 h-16 sm:w-20 sm:h-20 inline-block ml-4"
                                    />
                                </div>
                                <div className="text-[#A5F3FC] mt-0 text-lg sm:text-xl">
                                    <h2>{city}</h2>
                                    <h3>{country}</h3>
                                </div>
                            </div>

                            {/* Date and Temperature Row */}
                            <div className="flex justify-between items-center mt-10">
                                <div className="text-s sm:text-3xl text-[#E5E7EB]">
                                    {dateBuilder(new Date())}
                                </div>
                                <div className="text-[#e9a472] text-3xl sm:text-4xl md:text-6xl">
                                    {tempC}°C
                                </div>
                            </div>
                        </div>

                        {/* Search City Widget - Larger */}
                        <div className="sm:col-span-1 bg-[#1E293B] bg-opacity-90 rounded-lg shadow-lg p-4 sm:p-6">
                            <div className="text-[#E5E7EB]">
                                {/* Search City Component */}
                                <Forecast />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="flex flex-col items-center justify-center mt-10 h-full space-y-4 ">
                    <div className="w-full sm:w-1/2 p-4 text-left flex flex-col items-center space-x-4 justify-center  bg-neutral-900 bg-opacity-30">
                        <div>
                            <img src={loader} className="w-12 h-12 sm:w-96 sm:h-96" alt="Loading" />
                        </div>
                        <div className="text-center text-white text-xs sm:text-sm md:text-base">
                            <h3 className="font-semibold">
                                Detecting your location
                            </h3>
                            <h3>
                                Your current location will be displayed on the App <br />
                                and used for calculating real-time weather.
                            </h3>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default CurrentLocation;