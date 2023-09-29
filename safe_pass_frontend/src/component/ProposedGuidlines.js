import React from "react";
import Header from "./Header";
import Footer from "./Footer";
function WildlifeDrivingPage() {
  return (
    <div style={{ backgroundColor: "white" }}>
      <Header />
      <div style={{ marginLeft: "20px" }}>
        <h1>Wildlife Driving Tips</h1>
        <ul>
          <li>Keep Calm & quiet.</li>
          <li>
            Drive slowly where markings of wildlife crossing are displayed.
          </li>
          <li>Just reverse and keep a safe distance.</li>
          <li>
            Switch off your main headlamps, leaving the parking lights on so
            that the lights do not irritate the animals.
          </li>
          <li>
            Turn off your ICE, especially the SUBs as elephants are very
            sensitive to low frequency sounds.
          </li>
          <li>
            No honking. Honking at them will only make them irritated or angry.
          </li>
          <li>Keep your engine idling and NOT revving.</li>
          <li>
            Never use your camera with Flash. It will make them curious about
            you and attract unwanted attention.
          </li>
          <li>
            Do not even think of getting down from the vehicle to have a closer
            look.
          </li>
          <li>
            Try to follow bigger vehicles like trucks if possible, especially if
            you do not know your way around comfortably.
          </li>
          <li>
            After passing the animal, use headlights to warn the other drivers.
          </li>
        </ul>
        <p>Have a safe drive.</p>
        <br />
        <ul>
          <li>සන්සුන්ව සහ නිහඬව සිටින්න.</li>
          <li>
            වනජීවී හරස් මාර්ග සලකුණු ප්‍රදර්ශනය කර ඇති ස්ථානවල සෙමින් ධාවනය
            කරන්න.
          </li>
          <li>ආරක්ෂිත දුරක් තබා ගන්න.</li>
          <li>ඔබේ ප්‍රධාන ලාම්පු නිවා දමන්න.</li>
          <li>
            SUBs අඩු සංඛ්‍යාත ශබ්දවලට අලි ඉතා සංවේදී බැවින්, ඔබේ ICE ක්‍රියා
            විරහිත කරන්න.
          </li>
          <li>නලාව නාද කිරීමෙන් වලකින්න.</li>
          <li>
            විශේෂයෙන් ඔබ සුවපහසු ලෙස ගමන් කරන මාර්ගය නොදන්නේ නම්, හැකි නම්
            ට්‍රක් රථ වැනි විශාල වාහන පසුපස යාමට උත්සාහ කරන්න.
          </li>
          <li>
            සතා පසුකර ගිය පසු අනෙකුත් රියදුරන්ට අනතුරු ඇඟවීමට ප්‍රධාන ලාම්පු
            භාවිතා කරන්න.
          </li>
        </ul>
        <p>ආරක්ෂිතව ධාවනය කරන්න.</p>
        <Footer />
      </div>
    </div>
  );
}
export default WildlifeDrivingPage;
