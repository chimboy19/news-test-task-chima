import React from 'react'
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from '../../Navbar/Navbar';
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
// import VisibilityIcon from "@mui/icons-material/Visibility";

import './Newsdetails.css'

const Newsdetails = () => {
    const { id } = useParams();
    const [newsItem, setNewsItem] = useState(null);

    useEffect(() => {
      const fetchNewsdetails = async () => {
        try {
          const response = await axios.get(`/api/news/${id}/`);
          setNewsItem(response.data);
        } catch (error) {
          console.error("Error fetching news details:", error);
        }
      };

      fetchNewsdetails();
    }, [id]);

    if (!newsItem) return <p>Loading...</p>;
  return (
    <div>
      <Navbar />
      <div className="adjus">
        <h1 style={{ textAlign: "center", marginBlock: "40px" }}>
          {newsItem.title}
        </h1>
        <div style={{ textAlign: "center" }}>
          {newsItem.image && (
            <img
              width={600}
              height={400}
              style={{ marginBottom: "20px" }}
              src={
                newsItem.image.startsWith("http")
                  ? newsItem.image
                  : `http://127.0.0.1:8000${newsItem.image}`
              }
              alt={newsItem.title}
            />
          )}
        </div>

        <div style={{ width: "100%", paddingInline: "20px" }}>
          <p>{newsItem.text}</p>
        </div>
        <p>
          <b>Tags:</b>{" "}
          {newsItem.tags && Array.isArray(newsItem.tags)
            ? newsItem.tags.join(", ")
            : "No tags"}
        </p>
        {/* <p>
          Likes: {newsItem.likes} | Dislikes: {newsItem.dislikes}
        </p> */}
        <div className="but">
          <ThumbUpIcon
            style={{ cursor: "pointer", color: "grey" }}
            // onClick={() => handleLike(item.id)}
          />{" "}
          Likes: {newsItem.likes}
          <ThumbDownIcon
            style={{ cursor: "pointer", color: "grey" }}
            // onClick={() => handleDislike(item.id)}
          />{" "}
          Dislikes: {newsItem.dislikes}
        </div>
      </div>
    </div>
  );
}

export default Newsdetails
