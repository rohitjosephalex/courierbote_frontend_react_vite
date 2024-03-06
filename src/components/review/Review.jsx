import "./BlogStyles.css";
import "./ResponsiveBlog.css";
import React, { useState } from 'react';
import { PostBlog } from "./PostBlog/PostBlog";

// import BlogPic1 from "../../../assets/blog_image_1.svg";
// import BlogPic2 from "../../../assets/bloco_image_2.svg";
// import BlogPic3 from "../../../assets/bloco_image_3.svg";
// import BlogPic4 from "../../../assets/bloco_image_4.svg";
import ProfilePic from "../../assets/profile.jpg";

export const Review = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const posts = [
    {
      alt: "alimento1",
      review: "I can't say enough good things about this courierbote. They've always been super fast and reliable whenever I've needed to send something out. Their team is really friendly and helpful, and they go above and beyond to make sure everything gets where it needs to go on time. Seriously, I highly recommend them for all your shipping needs!",
      profile: ProfilePic,
      name: "fabio",
      author: "Fabio de Andrade"
    },
    {
      alt: "alimento2",
      review: "Courierbote is hands down the best courier service I've used!. Living in Coimbatore, Tamil Nadu, I've relied on them countless times for their prompt and reliable service.",
      profile: ProfilePic,
      name: "Rapha Gama",
      author: "Raphael Gama"
    },
    {
      alt: "alimento3",
      review: "As someone who relies heavily on courier services, Courierbote has been a game-changer for me. Their door-to-door service, reminiscent of a genie's magic, makes sending packages from Coimbatore, Tamil Nadu, a breeze",
      profile: ProfilePic,
      name: "MM",
      author: "Marllon Maia"
    },
    {
      alt: "alimento4",
      review: "I've tried many courier services, but none come close to Courierbote. Their door-to-door service is fantastic, but what really impressed me was their attention to detail when handling sensitive documents. Trustworthy, efficient, and always on time!",
      profile: ProfilePic,
      name: "Will",
      author: "Atevilson Freitas"
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
      <div className="postBtn">
        <button className="left" onClick={handlePrev}>←</button>
      </div>

      {displayedPosts.map((post, index) => (
        <PostBlog
          key={index}
          alt={post.alt}
          review={post.review}
          profile={post.profile}
          name={post.name}
          author={post.author}
        />
      ))}

      <div className="postBtn">
        <button className="right" onClick={handleNext}>→</button>
      </div>
    </div>
      </div>
    </section>
  );
};
