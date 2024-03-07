import "./BlogStyles.css";
import "./ResponsiveBlog.css";
import React, { useState } from 'react';
import { PostBlog } from "./PostBlog/PostBlog";


import Slider from "react-slick";

import ProfilePic from "../../assets/profile.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Review = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const posts = [
    {
      alt: "alimento1",
      review: "I can't say enough good things about this courierbote. They've always been super fast and reliable whenever I've needed to send something out. Their team is really friendly and helpful, and they go above and beyond to make sure everything gets where it needs to go on time. Seriously, I highly recommend them for all your shipping needs!",
      profile: ProfilePic,
      name: "Karthik",
      author: "Karthik Ranganathan"
    },
    {
      alt: "alimento2",
      review: "Courierbote is hands down the best courier service I've used!. Living in Coimbatore, Tamil Nadu, I've relied on them countless times for their prompt and reliable service.",
      profile: ProfilePic,
      name: "Arjun",
      author: "Arjun Kumar"
    },
    {
      alt: "alimento3",
      review: "As someone who relies heavily on courier services, Courierbote has been a game-changer for me. Their door-to-door service, makes sending packages from Coimbatore, Tamil Nadu, a breeze",
      profile: ProfilePic,
      name: "Priya",
      author: "Priya Venkatesh"
    },
    {
      alt: "alimento4",
      review: "I've tried many courier services, but none come close to Courierbote. Their door-to-door service is fantastic, but what really impressed me was their attention to detail when handling sensitive documents. Trustworthy, efficient, and always on time!",
      profile: ProfilePic,
      name: "Vivek",
      author: "Vivek Mani"
    },
    {
      alt: "alimento5",
      review: "Courierbote has consistently delivered exceptional service, ensuring prompt and secure deliveries every time. Whether it's urgent parcels or delicate items, their door-to-door service is efficient and reliable. Highly recommended for all your courier needs",
      profile: ProfilePic,
      name: "Ganesh",
      author: "Ganesh Subramanian"
    },
    {
      "alt": "alimento6",
      "review": "I've tried several courier companies, but none compare to Courierbote. Their door-to-door service is not only convenient but also consistently punctual. Whether it's a small package or a bulk shipment, they handle it with professionalism and care.",
      "profile": ProfilePic,
      "name": "Aswin",
      "author": "Aswin Baskar"
    },
    {
      "alt": "alimento7",
      "review": "The courier service provided by you has been exceptional. Their attention to detail and prompt deliveries make them stand out. I highly recommend them for all your shipping needs.",
      "profile": ProfilePic,
      "name": "Vijayalakshmi",
      "author": "Vijayalakshmi Kumar"
    }
    
    
  ];

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % posts.length);
  };

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + posts.length) % posts.length);
  };

  const displayedPosts = [
    posts[currentIndex],
    posts[(currentIndex + 1) % posts.length],
    posts[(currentIndex + 2) % posts.length]
  ];
  const settings = {
    className: "center",
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll:1,
    responsive: [
      {
        breakpoint:1700,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          dots: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false
        }
      }
    ]
  };
  return (
    <section className="blog">
      <div className="blogWrapper">
        <div className="topInfo">
          <h2>Customer Review</h2>
          <p>

            Explore the resounding satisfaction shared by our esteemed clientele.
          </p>
        </div>

        <div className="postsWrapper">
          {/* <div className="postBtn">
            <button className="left" onClick={handlePrev}>←</button>
          </div> */}
          <Slider
            {...settings}>
            {posts.map((post, index) => (
              <PostBlog
                key={index}
                alt={post.alt}
                review={post.review}
                profile={post.profile}
                name={post.name}
                author={post.author}
              />
            ))}
          </Slider>
          {/* <div className="postBtn">
            <button className="right" onClick={handleNext}>→</button>
          </div> */}
        </div>
      </div>
    </section>
  );
};
