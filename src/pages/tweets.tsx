import React, { useState } from "react";

const Tweets = () => {
  const [tweets, setTweets] = useState([
    {
      id: 1,
      username: "ram",
      content: "Learning React is fun 🚀",
    },
    {
      id: 2,
      username: "patil",
      content: "Hooks make state management easy!",
    },
  ]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Tweets</h2>

      {tweets.map((tweet) => (
        <div
          key={tweet.id}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <h4>@{tweet.username}</h4>
          <p>{tweet.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Tweets;
