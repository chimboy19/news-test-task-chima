import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Newslist.css' 
import Navbar from '../Navbar/Navbar';
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Newslist = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

    
const fetchNews = async () => {
  setLoading(true);
  try {
    const response = await axios.get(`/api/news/?page=${page}`);
    console.log(response.data); // Log the response to verify
    // Check if response.data is an array or contains an array
    const newsData = Array.isArray(response.data) ? response.data : response.data.results || [];
    setNews([...news, ...newsData]); // Add the data to the state
  } catch (error) {
    console.error('Error fetching news:', error);
  } finally {
    setLoading(false);
  }
};
    

  useEffect(() => {
    fetchNews();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 10 // Add a small threshold
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


    const handleLike = async (id) => {
      // Optimistic UI update: increment the like count immediately
      setNews((prevNews) =>
        prevNews.map((item) =>
          item.id === id ? { ...item, likes: item.likes + 1 } : item
        )
      );

      try {
        await axios.post(`http://127.0.0.1:8000/api/news/${id}/like/`);
      } catch (error) {
        console.error("Error liking the news:", error);
        // If the request fails, revert the optimistic update
        setNews((prevNews) =>
          prevNews.map((item) =>
            item.id === id ? { ...item, likes: item.likes - 1 } : item
          )
        );
      }
    };

const handleDislike = async (id) => {
    // Optimistic UI update
    setNews((prevNews) =>
      prevNews.map((item) =>
        item.id === id ? { ...item, dislikes: item.dislikes + 1 } : item
      )
    );

    try {
      await axios.post(`http://127.0.0.1:8000/api/news/${id}/dislike/`);
    } catch (error) {
      console.error("Error disliking the news:", error);
      // If the request fails, revert the optimistic update
      setNews((prevNews) =>
        prevNews.map((item) =>
          item.id === id ? { ...item, dislikes: item.dislikes - 1 } : item
        )
      );
    }
  };
    

  
    const handleViews = async (id) => {
        try {
          await axios.post(`/api/news/${id}/view/`)
        } catch (error) {
            console.error("Error views news:",error)
      }
  }
  return (
    <div>
      <Navbar />
      <div style={{ textAlign: "center" }}>
        <h1> News List</h1>
      </div>
      {news.map((item) => (
        <div className="adjust">
          <div key={item.id} className="news-item">
            <h2 style={{ marginBlock: "30px" }}>{item.title}</h2>
            {/* <p>{item.text}</p> */}

            {item.image && (
              <img src={`http://127.0.0.1:8000${item.image}`} alt={""} />
            )}
            {item.image && (
              <img
                style={{ marginBlock: "30px" }}
                src={
                  item.image.startsWith("http")
                    ? item.image
                    : `http://127.0.0.1:8000${item.image}`
                }
                alt={item.title}
                width={600}
                height={400}
              />
            )}
            <div style={{ width: "600px" }}>
              <p> {item.description}</p>
            </div>

            <p style={{ marginBlock: "20px" }}>
              <b>Tags</b>:{" "}
              {item.tags && Array.isArray(item.tags)
                ? item.tags.join(", ")
                : "No tags"}
            </p>
            <Link
              onClick={() => handleViews(item.id)}
              style={{
                textDecoration: "none",
                border: "2px solid black",
                paddingInline: "10px",
                paddingBlock: "5px",
                color: "white",
                background: "black",
                marginBlock: "20px",
              }}
              to={`/news/${item.id}`}
            >
              Read more
            </Link>

            <p style={{ marginBlock: "10px" }}>
              {/* Likes: {item.likes} | Dislikes: {item.dislikes} | */}
              <div className="but">
                <VisibilityIcon style={{ color: "grey" }} /> Views: {item.views}
              </div>
            </p>
            <div className="but">
              <ThumbUpIcon
                style={{ cursor: "pointer", color: "grey" }}
                onClick={() => handleLike(item.id)}
              />{" "}
              Likes: {item.likes}
              <ThumbDownIcon
                style={{ cursor: "pointer", color: "grey" }}
                onClick={() => handleDislike(item.id)}
              />{" "}
              Dislikes: {item.dislikes}
            </div>
          </div>
        </div>
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default Newslist;