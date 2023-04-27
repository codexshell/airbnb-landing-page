import PropTypes from "prop-types";

import { useState, useEffect } from "react";

import "./index.css";

export function ImageMasonryList() {
  const [imageList, setImageList] = useState([]);
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    fetchImages();

    async function fetchImages() {
      setStatus("loading");

      const response = await fetch(
        `https://picsum.photos/v2/list?page=2&limit=15`
      );
      const data = await response.json();
      setImageList(() => data.slice(6));
      setStatus("loaded");
    }
  }, []);
}
