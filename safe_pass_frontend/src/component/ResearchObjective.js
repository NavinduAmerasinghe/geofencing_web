import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const ResearchObjective = () => {
  return (
    <div>
      <Header />
      <div
        id="intro"
        className="p-5 text-center bg-image shadow-1-strong"
        style={{
          backgroundImage: "url('/images/backgroundImage.jpeg')",
          height: "100vh",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          // className="mask"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        >
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white px-4">
              <h1 className="mb-3 mt-4" style={{ color: "white" }}>
                FOR A BETTER TOMMOROW
              </h1>

              <p>
                In Sri-Lanka, animal-vehicle collisions (AVCs) are caused by the
                close interaction of human and wildlife habitats. AVCs are
                intricate and difficult to predict due to the large number of
                accidents and the variety of environmental impacts. As a result,
                AVCs are one of the most serious threats to biodiversity. AVCs
                are not only a concern for biological conservation; they are
                also a threat to human safety and have high economic costs.
                These types of collisions have increased significantly over the
                last few decades, both during the day and at night. Every year,
                an estimated 26,489 motor vehicle and animal accidents occur in
                Sri Lanka, resulting in human deaths, injuries, property damage,
                and other costs. The cost to wildlife is also substantial. Road
                networks are frequently responsible for the fragmentation of
                animal habitats and home ranges, which ultimately leads to a
                reduction in animal population size due to various behavioral
                changes. Only the "A" and "B" class roadways in Sri-Lanka cover
                approximately 13,000 kilometers. Other minor roads scattered
                throughout the rural sector are expected to cover a similar
                length. Thus, animals ranging in size from an ant to an elephant
                have been involved in road accidents, and these incidents have
                received less attention from the general public and relevant
                authorities due to a lack of awareness and negligence. Vehicles
                must be properly identified to reduce animal collisions. The
                majority of these accidents are avoidable, so it is critical to
                identify high-traffic areas. Finally, animal-vehicle collisions
                (AVCs) pose a serious risk to both wildlife and drivers. To
                effectively address the issue of AVCs, a comprehensive and
                integrated approach must be implemented. This could include
                installing a wildlife detection system, identifying animal
                habitat for preservation and restoration, improving vehicle
                technology, driver education, and implementing wildlife
                monitoring programs.
              </p>

              <p>
                The government and conservation organizations are working to
                reduce conflicts between wildlife and vehicles by implementing
                measures such as wildlife crossings and raising awareness about
                road safety. A knowledge-based study is being conducted to
                identify animal habitats and behaviors in different locations.
                Data will be gathered using crowd-sourcing technologies, news
                feeds, and weather information to identify animal-vehicle
                collisions and notify passengers about the conflicts before they
                can happen within a certain distance in real-time. The study
                will use both seen and unseen identification methods to detect
                wildlife. The seen identification method will rely on image
                processing to detect animals and their behavior, while the
                unseen identification method will use frequency signals to
                detect animals at a distance. The study will propose enhanced
                solutions for animal-vehicle collision mitigation, including
                guidelines for drivers and notifications of mitigation efforts.
                It will also gather feedback from users on their experiences
                with these solutions.
              </p>
              <br />
              <br />
              <a
                className="btn btn-outline-light btn-lg m-4"
                href=""
                role="button"
                rel="nofollow"
                target="_blank"
              >
                GITHUB REF
              </a>
              <a
                className="btn btn-outline-light btn-lg m-4"
                href=""
                target="_blank"
                role="button"
              >
                Download our Mobile Application Now !
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResearchObjective;
