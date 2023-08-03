import React, { useEffect, useState } from "react";
import "./App.scss";
import { FaTwitterSquare, FaQuoteLeft } from "react-icons/fa";

const App = () => {
  const [quotes, setQuotes] = useState({});
  const [color, setColor] = useState("#415E54");
  const Website_URL = "http://localhost:3000/";
  const Tweet_Text = quotes.content;
  const HASHTAGS_TO_INCLUDE = quotes.author;
  const url =
    "https://twitter.com/intent/tweet?url=" +
    encodeURIComponent(Website_URL) +
    "&text=" +
    encodeURIComponent(Tweet_Text) +
    "&hashtags=" +
    encodeURIComponent(HASHTAGS_TO_INCLUDE);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    fetch("https://api.quotable.io/random")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setQuotes(data);
      });
  }

  function handleClick() {
    fetchData();
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    setColor(randomColor);
  }

  function tweet() {
    window.open(url, "_blank");
  }

  return (
    <div className="app" style={{ backgroundColor: color }}>
      <div className="box">
        <FaQuoteLeft />
        <p>{quotes.content}</p>
        <span>-{quotes.author}</span>
        <div className="group">
          <div href={url} onClick={tweet} style={{ color: color }}>
            <FaTwitterSquare style={{ height: "48px", width: "48px" }} />
          </div>
          <button onClick={handleClick} style={{ backgroundColor: color }}>
            Next Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
