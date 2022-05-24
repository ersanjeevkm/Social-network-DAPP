import { useState, useEffect, useContext } from "react";
import { Context } from "../context/Context";

import Center, { Page } from "../components/Layout";
import {
  getLatestTweetIds,
  getTweetInfo,
  loadTweetsFromTweetPromises,
} from "../web3/tweets";

import TweetList from "../components/TweetList";

export default () => {
  const [tweets, setTweeets] = useState([]);
  const { syncTweets } = useContext(Context);

  useEffect(() => {
    const loadLatestTweets = async () => {
      const tweetIds = await getLatestTweetIds();

      const tweetPromises = tweetIds.map((tweetId) => {
        return getTweetInfo(tweetId);
      });

      const allTweets = await loadTweetsFromTweetPromises(tweetPromises);

      setTweeets(allTweets);
    };

    loadLatestTweets();
  }, [syncTweets]);

  return (
    <Page>
      <Center>
        <h2>Latest tweets</h2>

        <TweetList tweets={tweets} />
      </Center>

      <style jsx>{`
        h2 {
          font-size: 16px;
          color: white;
          letter-spacing: 0.5px;
          text-align: center;
          text-transform: uppercase;
          margin-bottom: 16px;
          margin-top: 4px;
        }
      `}</style>
    </Page>
  );
};
