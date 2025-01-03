import React, { useState, useEffect } from "react";
import axios from "axios";

const FullSizeImagePreview = ({ redditPostUrl }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);

  const fetchFullSizeImage = async () => {
    try {
      const apiUrl = `${redditPostUrl}.json`; // Append `.json` to get post data
      const response = await axios.get(apiUrl);
      const postData = response.data[0].data.children[0].data;

      // Use the `preview` field to get the source URL for the full-size image
      if (postData.preview && postData.preview.images[0].source.url) {
        const originalImageUrl = postData.preview.images[0].source.url.replace(/&amp;/g, "&"); // Decode URL
        setImageUrl(originalImageUrl);
      } else {
        setError("Full-size image not available.");
      }
    } catch (err) {
      setError("Failed to fetch full-size image.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFullSizeImage();
  }, [redditPostUrl]);

  return (
    <>
      {/* {imageUrl && ( */}
        <img
          src={imageUrl}
          alt="Full-Size Image"
          style={{
            maxWidth: "100%",
            maxHeight: "600px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        />
      {/* )} */}
    </>
  );
};

export default FullSizeImagePreview;
