import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import './LatestNews.css'
const LatestNews = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLatestNews = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/news/latest/"
      );
      setLatestNews(response.data);
    } catch (error) {
      console.error("Error fetching latest news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestNews();
  }, []);

  const handleLike = async (id) => {
    setLatestNews((prevNews) =>
      prevNews.map((item) =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      )
    );

    try {
      await axios.post(`http://127.0.0.1:8000/api/news/${id}/like/`);
    } catch (error) {
      console.error("Error liking the news:", error);
    }
  };

  const handleDislike = async (id) => {
    setLatestNews((prevNews) =>
      prevNews.map((item) =>
        item.id === id ? { ...item, dislikes: item.dislikes + 1 } : item
      )
    );

    try {
      await axios.post(`http://127.0.0.1:8000/api/news/${id}/dislike/`);
    } catch (error) {
      console.error("Error disliking the news:", error);
    }
  };

  const handleViews = async (id) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/news/${id}/view/`);
    } catch (error) {
      console.error("Error viewing news:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ textAlign: "center" }}>
        <h1>Latest News</h1>
      </div>
      <div className="adjust">
        {/* <h1>Latest News</h1> */}
        {loading ? (
          <p>Loading...</p>
        ) : latestNews.length === 0 ? (
          <p>No latest news available.</p>
        ) : (
          latestNews.map((news) => (
            <div key={news.id} className="news-item">
              <h2 style={{ marginBlock: "30px" }}>{news.title}</h2>

              {news.image && (
                <img
                  style={{ marginBlock: "30px" }}
                  src={
                    news.image.startsWith("http")
                      ? news.image
                      : `http://127.0.0.1:8000${news.image}`
                  }
                  alt={news.title}
                  width={600}
                  height={400}
                />
              )}
              <p style={{ marginBlock: "20px" }}>
                {/* <b>Tags</b>:{" "}
                {news.tags && Array.isArray(news.tags)
                  ? news.tags.join(", ")
                  : "No tags"} */}
              </p>
              <div style={{ width: "600px", marginBlock:'20px' }}>
                <p> {news.description}</p>
              </div>
              
              <Link
                onClick={() => handleViews(news.id)}
                style={{
                  textDecoration: "none",
                  border: "2px solid black",
                  paddingInline: "10px",
                  paddingBlock: "5px",
                  color: "white",
                  background: "black",
                  marginBlock: "20px",
                }}
                to={`/news/${news.id}`}
              >
                Read more
              </Link>

              <p style={{ marginBlock: "10px" }}>
                <div className="but">
                  <VisibilityIcon style={{ color: "grey" }} /> Views:{" "}
                  {news.views}
                </div>
              </p>
              <div className="but">
                <ThumbUpIcon
                  style={{ cursor: "pointer", color: "grey" }}
                  onClick={() => handleLike(news.id)}
                />{" "}
                Likes: {news.likes}
                <ThumbDownIcon
                  style={{ cursor: "pointer", color: "grey" }}
                  onClick={() => handleDislike(news.id)}
                />{" "}
                Dislikes: {news.dislikes}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LatestNews;
