import React from "react";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import "./NotAuthorized.css";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="container pt-5 pb-5">
        <div class="scene">
          <div class="overlay"></div>
          <div class="overlay"></div>
          <div class="overlay"></div>
          <div class="overlay"></div>
          <span class="bg-403">403</span>
          <div class="text">
            <span class="hero-text"></span>
            <span class="msg">
              can't let <span>you</span> in.
            </span>
            <span class="support">
              <span>unexpected?</span>
              <a href="/signin">Go To Home Page ➡️</a>
            </span>
          </div>
          <div class="lock"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
