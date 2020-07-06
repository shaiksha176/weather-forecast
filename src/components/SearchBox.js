import React, { useState } from "react";
import axios from "axios";

import SearchResult from "./SearchResult";

function SearchBox() {
  let [val, setVal] = useState("");
  const [place, setPlace] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  function showData() {
    console.log(val);
    setVal("");
  }
  const getData = () => {
    console.log(val);
    const params = {
      access_key: process.env.REACT_APP_POSITION_STACK_API_KEY,
      query: val,
    };
    axios
      .get("http://api.positionstack.com/v1/forward", { params })
      .then((response) => {
        console.log(response.data.data);
        const data = response.data.data[0];
        setLat(data.latitude);
        setLong(data.longitude);
        setPlace(data.name);
        console.log("latitude " + data.latitude);
        setVal("");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <section className="search-box">
        <input
          type="search"
          name="life works"
          id=""
          placeholder="New York"
          onChange={(e) => setVal(e.target.value)}
          value={val}
        />
        <span className="material-icons" onClick={getData}>
          search
        </span>
      </section>
      <SearchResult latitude={lat} longitude={long} name={place} />
    </>
  );
}

export default SearchBox;
