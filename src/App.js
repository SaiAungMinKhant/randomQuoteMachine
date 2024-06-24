import React, { useEffect, useState, useRef } from "react";
import "./App.scss";
import { FaQuoteLeft, FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const App = () => {
  const [quotes, setQuotes] = useState({});
  const [color, setColor] = useState("#000000");
  const [isLarge, setIsLarge] = useState(false); // State to control box size
  const Website_URL = "https://random-quote-machine-rouge.vercel.app/";
  const Share_Text = quotes.content;
  const HASHTAGS_TO_INCLUDE = "#" + quotes.author;

  const twitterShareURL =
    "https://twitter.com/intent/tweet?url=" +
    encodeURIComponent(Website_URL) +
    "&text=" +
    encodeURIComponent(Share_Text) +
    encodeURIComponent(HASHTAGS_TO_INCLUDE);

  const fbShareURL =
    "https://www.facebook.com/dialog/share?" +
    "app_id=1093372268341863" +
    "&display" +
    "&href=" +
    encodeURIComponent(Website_URL);

  const buttonRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((data) => {
        setQuotes(data);
        setIsLarge(true); // Make the box large when new quote is fetched
      });
  }

  function handleClick() {
    fetchData();
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    setColor(randomColor);
    buttonRef.current.blur(); // removing focus
  }

  function tweet() {
    window.open(twitterShareURL, "_blank");
  }

  function shareOnFacebook() {
    window.open(fbShareURL, "_blank");
  }

  return (
    <div className="app" style={{ backgroundColor: color }}>
      <div
        className={`box ${isLarge ? "large" : "small"}`}
        data-href="https://www.facebook.com/20531316728/posts/10154009990506729/"
        data-width="500"
        data-show-text="true"
      >
        <FaQuoteLeft />
        <p>{quotes.content}</p>
        <span>-{quotes.author}</span>
        <div className="group">
          <div className="icon" style={{ color: color }}>
            <FaSquareXTwitter className="icons" onClick={tweet} />
            <FaFacebookSquare className="icons" onClick={shareOnFacebook} />
          </div>
          <button
            ref={buttonRef}
            onClick={handleClick}
            style={{ backgroundColor: color }}
          >
            Next Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
