/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import SearchBox from "./components/SearchBox";

function App() {
  // console.log("partly-cloudy-night".toUpperCase());
  return (
    <>
      <Header />
      <SearchBox />
    </>
  );
}

export default App;
