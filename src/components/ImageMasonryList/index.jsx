import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Skeleton } from "@mui/material";

import "./index.css";

function MasonryItem({ item }) {
  const itemWidth = item.width;
  const newWidth = 73;
  const aspectRatio = itemWidth / newWidth;
  const itemHeight = item.height;
  const newHeight = itemHeight / aspectRatio;

  return (
    <li className="item-wrapper">
      <img
        className={"item"}
        height={newHeight}
        width={newWidth}
        src={item.download_url}
        alt=""
      />
    </li>
  );
}

MasonryItem.propTypes = {
  item: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    download_url: PropTypes.string.isRequired,
  }).isRequired,
};

export function ImageMasonryList() {
  const [imageList, setImageList] = useState([]);
  const [status, setStatus] = useState("unloaded");

  useMemo(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    setStatus("loading");

    const response = await fetch(
      `https://picsum.photos/v2/list?page=2&limit=15`
    );
    const data = await response.json();
    setImageList(() => data);
    setStatus("loaded");
  }

  return (
    <ul className={"container"}>
      {status === "loaded" ? (
        imageList.map((item) => <MasonryItem key={item.id} item={item} />)
      ) : (
        <>
          {Array.from({ length: 15 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              width={73}
              height={73}
              className={"item-wrapper"}
            />
          ))}
        </>
      )}
    </ul>
  );
}
