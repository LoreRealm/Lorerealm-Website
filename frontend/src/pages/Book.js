import { useState, useEffect } from "react";
import "./Page.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import DiceOverlay from "../components/DiceOverlay";

export default function Home() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("lore-dark") === "true";
  });

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isDiceOverlayVisible, setIsDiceOverlayVisible] = useState(false);

  useEffect(() => {
    const initializeInkFunctions = () => {
      if (typeof window.reinitLoreRealm === "function") {
        console.log("Reinitializing ink.js functions");
        try {
          window.reinitLoreRealm();
        } catch (error) {
          console.warn("Error initializing ink.js:", error);
        }
      } else {
        console.error("window.reinitLoreRealm is not found");
      }
    };

    const timer = setTimeout(initializeInkFunctions, 50);

    return () => clearTimeout(timer);
  }, []);

  const handleDiceClick = () => {
    const roll = Math.floor(Math.random() * 20) + 1;
    document.getElementById("dice-number").textContent = roll;

    setIsDiceOverlayVisible(!isDiceOverlayVisible);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
    );
  };

  return (
    <>
      <Navbar />
      <DiceOverlay />
      <div className="book-page">
        <div className="Campaigns">
          <h4>Campaigns</h4>
          <p>
            Path of the Gleaming Crystal — In an age of decay and ruin, your
            kingdom has crumbled. Galarion is no more, at least in most regions.
            Desperation breeds hope as the last remnants of the Glorious
            kingdom: Balaral flee aboard a great ship, setting sail toward
            uncharted waters and unclaimed lands. The promise of a new
            beginning, a fresh chance for survival, redemption, and a home
            drives many forward, away from the familiar ruins of Balaral's past
            greatness and toward the unknown. The objective is clear: establish
            a new civilization in a land full of mystery, wonder, and danger.
            This is a world where magic pulses in every tree, stone, and stream.
            The plants glow with ethereal light, strange creatures roam the
            untouched wilderness, crystals float about the skies and the soil
            hums with an ancient energy that no one truly understands. The
            expedition is not only one of survival and desperation but of
            discovery — uncovering new magics, unraveling the secrets of the
            land, and ultimately crafting a future from the ashes of the past.
          </p>
        </div>

        <div className="tabs-row">
          <div className="timeline-c1">
            <h5 id="timeline-tab">Timeline</h5>
            <div className="timeline-tree">
              <div className="timeline-inner">
                <div className="timeline-entry">
                  <span className="timeline-label">Before the Clash</span>
                  <p className="before">
                    Before the Clash between Realms, the Adamans and other gods
                    waged a hidden war that lasted centuries. Mortals felt its
                    effects in shifting seasons, rising heat, melting ice, and
                    bitter cold cycles. The Ascended were taken first—drawn into
                    a secret realm of fractured reflections of their past and
                    future, a truth many could not endure. That realm was born
                    from a single banished being of crystal origin, once mortal,
                    whose power was confined but whose vision reached the
                    overworld. Driven by revenge, they battled the gods for
                    eons.
                  </p>
                </div>
                <div className="timeline-entry">
                  <span className="timeline-label">The Merchants Ship</span>
                  <p className="End">
                    The Boat itself was a merchant ship commandeered by the
                    remaining government on the North Galarion post; those
                    inside the merchant ship were not already allowed on the
                    boat. Mercenaries forced their way in and the incompetent
                    captain of the merchant vessel didn't ever leave his
                    quarters. Only a few are able to get on, including our
                    heroes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="Pathfinders">
            <h5 id="pathfinders-tab">Meet Your Pathfinders</h5>
            <div className="pathfinders-grid">
              <div className="pathfinders-inner">
                <div className="pathfinder-card">
                  <Link to="/Cyril">
                    <div className="pathfinder-portrait-wrap">
                      <img
                        src="/cyril.gif"
                        alt="Cyril"
                        className="pathfinder-portrait"
                      />
                      <div className="pathfinder-name-band">Cyril</div>
                    </div>
                  </Link>
                  <div className="pathfinder-bio">
                    Cyril is a young Athamaru and self-proclaimed entomologist.
                    He grew up in the heart of a reef trade outpost but moved
                    inland to explore the world, where he discovered his love
                    for nature and insects. After having visions of the world's
                    end, he became obsessed and fearful of a possible doomsday.
                    He believed that living underground would save him from
                    destruction on the surface and spent years digging bunkers
                    to live in. Of course, in the end, his efforts were not
                    enough when the earth itself began crumbling.
                  </div>
                </div>

                <div className="pathfinder-card">
                  <a href="/Noor">
                    <div className="pathfinder-portrait-wrap">
                      <img
                        src="/noor.gif"
                        alt="Noor"
                        className="pathfinder-portrait"
                      />
                      <div className="pathfinder-name-band">Noor</div>
                    </div>
                  </a>
                  <div className="pathfinder-bio">
                    As a Samsaran, they remember all their past lives, having
                    countless memories and knowledge from hundreds of lives
                    lived. They remember their past more strongly and vividly
                    than the average Samsaran. Very trusting and very naive, and
                    they are often wrong about the "facts" and knowledge they
                    have. A simple person, loving nature and its gifts, enjoying
                    the experience of life as a whole — the good and the bad of
                    it. They are a haunted soul — the amalgamation of memories
                    and different personalities causing psychological damage.
                  </div>
                </div>

                <div className="pathfinder-card">
                  <Link to="/Ormus">
                    <div className="pathfinder-portrait-wrap">
                      <img
                        src="/ormus.gif"
                        alt="Ormus"
                        className="pathfinder-portrait"
                      />
                      <div className="pathfinder-name-band">Ormus</div>
                    </div>
                  </Link>
                  <div className="pathfinder-bio">
                    Ormus is a minotaur who's learning everything he can about
                    building from other races. He continues to put his skills to
                    the test daily, mainly focused on improving his craft. His
                    family has always been a long line of workers focused in
                    construction and he continued the line with a fascination
                    for building things with his hands. He studied with dwarves
                    and elves. He treasured his son, Jeffersonius Rupert Paul
                    Magnus the Third, from the moment he was born.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="schedule-section">
          <h5 id="schedule-tab" className="open">
            Stream Schedule
          </h5>
          <div className="schedule-body open">
            <div className="cal-nav">
              <button
                className="cal-nav-btn"
                id="cal-prev"
                onClick={handlePrevMonth}
              >
                &#x2039;
              </button>
              <span id="cal-month-label">
                {currentMonth.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <button
                className="cal-nav-btn"
                id="cal-next"
                onClick={handleNextMonth}
              >
                &#x203a;
              </button>
            </div>
            <div id="calendar-grid" className="calendar-grid">
              <div className="cal-loading">Consulting the stars&#x2026;</div>
            </div>
            <div id="upcoming-events" className="upcoming-events"></div>
          </div>
        </div>
      </div>
      <footer></footer>
    </>
  );
}
