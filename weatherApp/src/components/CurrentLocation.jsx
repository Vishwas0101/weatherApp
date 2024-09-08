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
                <div className="flex items-center justify-center mt-10 h-full">
                    <div className="flex flex-col sm:flex-row w-full sm:w-2/3 h-auto">
                        {/* Left side (weather details) */}
                        <div className="w-full sm:w-1/2 p-4 bg-[#1E293B] bg-opacity-90 flex flex-col border-r border-[#38BDF8]">
                            <div className="flex-1 text-[#E5E7EB] text-start text-3xl font-oxygen">
                                {/* Main weather description and location */}
                                <div className="mb-10 md:mb-6 lg:mb-64 text-3xl">
                                    {main}
                                    <img
                                        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                                        alt={main || "Weather icon"}
                                        className="w-30 h-30 inline-block ml-4"
                                    />
                                </div>
                                <div className="text-2xl font-bold">
                                    <h2 className="text-[#A5F3FC]">{city}</h2>
                                    <h3 className="text-[#A5F3FC]">{country}</h3>
                                </div>
                            </div>
                            {/* Footer: Date and Temperature */}
                            <div className="flex justify-between items-center text-[#E5E7EB] text-lg md:text-2xl lg:text-3xl font-oxygen mt-auto pt-6 border-t border-[#38BDF8]">
                                <div>{dateBuilder(new Date())}</div>
                                <div className="text-[#e9a472] text-6xl md:text-8xl">{tempC}°C</div>
                            </div>
                        </div>

                        {/* Right side (Forecast component) */}
                        <div className="w-full sm:w-1/2 p-4 bg-[#1E293B] bg-opacity-90 text-center">
                            <div className="flex-1">
                                <Forecast weather={main} />
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