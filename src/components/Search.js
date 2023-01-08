import React from "react";
import { useState } from "react";
import axios from "axios";
import Weather from "./Weather";
import { Dimmer, Loader } from "semantic-ui-react";

const Search = () => {
  const [data, setData] = useState([]);
  const [isDataVisible, setIsDataVisible] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const handleChange = () => {
    setisLoading(true);
    const city = document.getElementById("city").value;
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((result) => {
        setData(result?.data);
        console.log(result);
      })
      .finally(() => {
        setIsDataVisible(true);
        setisLoading(false);
      });
  };
  const fetchCurrentCityData = () => {
    setisLoading(true);
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&APPID=${process.env.REACT_APP_API_KEY}`
        )
        .then((result) => {
          setData(result?.data);
          console.log(result);
        })
        .finally(() => {
          setIsDataVisible(true);
          setisLoading(false);
        });
    });
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Enter a city"
        name="city"
        id="city"
        onChange={() => {
          setIsDataVisible(false);
        }}
      ></input>
      <button
        type="submit"
        onClick={() => {
          handleChange();
        }}
      >
        Submit
      </button>
      <button
        type="submit"
        onClick={() => {
          fetchCurrentCityData();
          setIsDataVisible(true);
        }}
      >
        Current City
      </button>
      {isLoading ? (
        <div>
          <Dimmer active>
            <Loader>Loading..</Loader>
          </Dimmer>
        </div>
      ) : isDataVisible ? (
        <Weather weatherData={data} />
      ) : null}
    </div>
  );
};

export default Search;
