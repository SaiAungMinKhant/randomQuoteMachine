import React, { useEffect, useState, useRef } from "react";
import "./App.scss";
import { FaQuoteLeft, FaFacebookSquare} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const App = () => {
  const [quotes, setQuotes] = useState({});
  const [color, setColor] = useState("#000000");
  const Website_URL = "https://random-quote-machine-rouge.vercel.app/";
  const Share_Text = quotes.content;
  const HASHTAGS_TO_INCLUDE = quotes.author;

  const twitterShareURL =
    "https://twitter.com/intent/tweet?url=" +
    encodeURIComponent(Website_URL) +
    "&text=" +
    encodeURIComponent(Share_Text) +
    "&hashtags=" +
    encodeURIComponent(HASHTAGS_TO_INCLUDE);

  const fbShareURL =
    "https://www.facebook.com/dialog/share?" +
    "app_id=1093372268341863" +
    "&display=popup" +
    "&href=" + encodeURIComponent(Website_URL);

  const buttonRef = useRef(null);

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
      <div className="box">
        <FaQuoteLeft />
        <p>{quotes.content}</p>
        <span>-{quotes.author}</span>
        <div className="group">
          <div className="icon" style={{ color: color }}>
            <FaSquareXTwitter className="icons" href={twitterShareURL} onClick={tweet} />
            <FaFacebookSquare className="icons" href={fbShareURL} onClick={shareOnFacebook} />
          </div>
          <button
            ref={buttonRef}
            onClick={handleClick}
            style={{ backgroundColor: color }}>
            Next Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
