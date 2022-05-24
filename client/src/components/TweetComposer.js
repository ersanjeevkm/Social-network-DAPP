import { useState, useContext } from "react";
import { createTweet } from "../web3/tweets";
import { Context } from "../context/Context";

import { SyncTweets } from "../context/Actions";

import Button from "./Button";

export default ({ onClose }) => {
  const [text, setText] = useState("");
  const [disabled, setDisabled] = useState(true);

  const { dispatch } = useContext(Context);

  const handleChange = (e) => {
    setText(e.target.value);
    setDisabled(e.target.value === "");
  };

  const post = async () => {
    try {
      const res = await createTweet(text, "");
      if (res.tx !== undefined) {
        alert("Your tweet was posted!");
        dispatch(SyncTweets());
      } else throw res.message;
    } catch (err) {
      alert(`Sorry, we couldn't post your tweet: ${err}`);
    }

    onClose();
  };

  return (
    <div>
      <h3>Post a new tweet</h3>

      <textarea value={text} onChange={handleChange} maxLength={140} />

      <Button
        onClick={post}
        disabled={disabled}
        style={{
          marginTop: 12,
          float: "right",
        }}
      >
        Post tweet
      </Button>

      <style jsx>{`
        textarea {
          box-sizing: border-box;
          margin: 0px;
          margin-top: 10px;
          border: 2px solid rgba(107, 108, 139, 0.58);
          border-radius: 7px;
          width: 100%;
          padding: 11px;
          font-size: 16px;
        }
        textarea:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
};
