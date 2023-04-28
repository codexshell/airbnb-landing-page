import { useEffect, useMemo, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import star from "@/assets/star.svg";
import ellipse from "@/assets/ellipse.svg";
import "./index.css";

export function Slider() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updatedImages, setUpdatedImage] = useState([]);

  useEffect(() => {
    updateImages();

    function updateImages() {
      const newImages = images.map((image) => {
        // available or sold out
        const randomNumber = Math.floor(Math.random() * 10);
        const status = randomNumber % 2 === 0 ? "sold out" : "online";
        // rating - between 3 and 5
        const rating = (Math.random() * (4 - 3 + 1) + 3).toFixed(1);
        // number of ratings
        const numberOfRatings = Math.floor(Math.random() * 1000);
        // price - between 50 - 200
        const price = Math.floor(Math.random() * (200 - 50 + 1) + 50);

        return { ...image, status, rating, numberOfRatings, price };
      });
      setUpdatedImage(() => newImages);
    }
  }, [images]);

  useMemo(() => {
    setIsLoading(true);
    fetch("https://picsum.photos/v2/list")
      .then((response) => response.json())
      .then((data) => {
        setImages(() => data);
        setIsLoading(false);
      });
  }, []);

  return (
    <Swiper className="swiper" slidesPerView={2.5}>
      {isLoading ? (
        <>
          {Array.from({ length: 5 }).map((_, index) => (
            <SwiperSlide key={index} className="slide">
              <Skeleton
                variant="rectangular"
                width={176}
                height={235}
                className="slide-skeleton"
              />
              <Skeleton
                variant="rectangular"
                width={176}
                height={58}
                style={{ marginTop: 8 }}
              />
            </SwiperSlide>
          ))}
        </>
      ) : (
        <>
          {updatedImages.map((image) => (
            <SwiperSlide className="slide" key={image.id}>
              <img
                className="slide-image"
                src={image.download_url}
                alt={image.author}
              />
              <div className="availability-container">
                <span className="availability-status">{image.status}</span>
              </div>
              <div className="experience-description">
                <div className="experience-rating">
                  <img src={star} alt="star" />
                  <span className="experience-rating-number">
                    {image.rating}
                  </span>
                  <span className="experience-total-reviews">
                    ({image.numberOfRatings})
                  </span>
                  <img
                    className="experience-ellipse"
                    src={ellipse}
                    alt="ellipse"
                  />
                  <span className="experience-location">USA</span>
                </div>
                <p className="experience-trainer">
                  Lorem Ipsum with {image.author}
                </p>
                <p className="experience-price">
                  <span className="price-bold">From ${image.price}</span> /
                  person
                </p>
              </div>
            </SwiperSlide>
          ))}
        </>
      )}
    </Swiper>
  );
}
