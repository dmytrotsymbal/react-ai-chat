import "./index.scss";
import React, { useState, useEffect } from "react";

const App = () => {
  const [value, setValue] = useState("");

  const [message, setMessage] = useState("");

  const getMessages = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        "http://localhost:8000/completions",
        options
      );
      const data = await response.json();
      console.log(data);
      // setMessage(data.choices[0].message.content);
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  // console.log(message);

  return (
    <div className="App">
      <section className="sideBar">
        <button>+ New chat!</button>

        <ul className="history">
          <li>Chat 1</li>
          <li>Chat 2</li>
          <li>Chat 3</li>
          <li>Chat 4</li>
        </ul>

        <div className="lower">
          <p>Later</p>
        </div>
      </section>

      <section className="mainChat">
        <h1>Chat</h1>

        <ul className="messages"></ul>

        <div className="bottomSection">
          <div className="inputContainer">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="text"
              placeholder="Send a message"
            />
            <div id="submit" onClick={getMessages}>
              send
            </div>

            <p className="info">
              Free Research Preview. ChatGPT may produce inaccurate information
              about people, places, or facts. ChatGPT August 3 Version
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
