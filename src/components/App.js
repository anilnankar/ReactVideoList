import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import VideoDetail from "./videos/VideoDetail";
import SearchBar from "./videos/SearchBar";
import VideoList from "./videos/VideoList";
import youtube from "../apis/youtube";
import Header from "./Header";
import { useSelector } from "react-redux";

const App = () => {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    onTermSubmit("buildings");
  }, []);

  const onTermSubmit = async (term) => {
    const response = await youtube.get("/search", {
      params: {
        q: term,
      },
    });

    setVideos(response.data.items);
    setSelectedVideo(response.data.items[0]);
  };

  const onVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="ui container">
      {isSignedIn ? (
        <div className="ui container">
          <BrowserRouter>
            <div>
              <Header />
            </div>
          </BrowserRouter>

          <SearchBar onFormSubmit={onTermSubmit} />
          <div className="ui grid">
            <div className="ui row">
              <div className="eleven wide column">
                <VideoDetail video={selectedVideo} />
              </div>
              <div className="five wide column">
                <VideoList onVideoSelect={onVideoSelect} videos={videos} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <BrowserRouter>
          <div>
            <Header />
            <p>User not authenticated</p>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;
