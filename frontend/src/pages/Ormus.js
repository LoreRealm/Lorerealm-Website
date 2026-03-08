import { useState, useEffect } from "react";
import "./Page.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  const [isDark] = useState(() => {
    return localStorage.getItem("lore-dark") === "true";
  });

  const [heroPoints] = useState([false, false, false]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("lore-dark", isDark);
  }, [isDark]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window.reinitLoreRealm === "function") {
        console.log("Reinitializing character page");
        window.reinitLoreRealm();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />
      <div className="character-page">
        <Link to="/" className="back-link">
          ← Back
        </Link>
        <div className="character-switcher">
          <h4 className="character-title">
            Ormus <span className="switcher-caret">▾</span>
          </h4>
          <div className="party-dropdown">
            <Link to="/Ormus" className="party-link active">
              Ormus
            </Link>
            <Link to="/Cyril" className="party-link">
              Cyril
            </Link>
            <Link to="/Noor" className="party-link">
              Noor
            </Link>
          </div>
        </div>

        <div className="character-sheet">
          <fieldset className="sheet-background">
            <legend className="basics">Info</legend>
            <fieldset className="ancestry">Ancestry</fieldset>
            <dt>Minotaur</dt>
            <dd>Slabsoul Minotaur</dd>
            <fieldset className="background">Background</fieldset>
            <dt>Artisan</dt>
            <fieldset className="class">Class</fieldset>
            <dt>Inventor</dt>
          </fieldset>
          <fieldset className="sheet-stats">
            <legend className="sheet-attributes">Attributes</legend>
            <dl>
              <div>
                <dt>Strength</dt>
                <dd>+3</dd>
              </div>
              <div>
                <dt>Dexterity</dt>
                <dd>+2</dd>
              </div>
              <div>
                <dt>Constitution</dt>
                <dd>+3</dd>
              </div>
              <div>
                <dt>Intelligence</dt>
                <dd>+4</dd>
              </div>
              <div>
                <dt>Wisdom</dt>
                <dd>+1</dd>
              </div>
              <div>
                <dt>Charisma</dt>
                <dd>-1</dd>
              </div>
            </dl>
          </fieldset>
          <fieldset className="sheet-defensive">
            <legend>Defense &amp; Senses</legend>
            <div className="def-section">
              <h6>Defenses</h6>
              <dl>
                <div>
                  <dt>Armor Class</dt>
                  <dd>24</dd>
                </div>
                <div>
                  <dt>Shield</dt>
                  <dd>+2</dd>
                </div>
                <div>
                  <dt>Fortitude</dt>
                  <dd>
                    14<span className="proficiency">E</span>
                  </dd>
                </div>
                <div>
                  <dt>Reflex</dt>
                  <dd>
                    13<span className="proficiency">E</span>
                  </dd>
                </div>
                <div>
                  <dt>Will</dt>
                  <dd>
                    12<span className="proficiency">E</span>
                  </dd>
                </div>
              </dl>
            </div>
            <div className="def-section def-section--senses">
              <h6>Senses</h6>
              <dl>
                <div>
                  <dt>Language</dt>
                  <dd>Common, Draconic, Dwarvn, Elven, Fey</dd>
                </div>
                <div>
                  <dt>Perception</dt>
                  <dd>
                    10<span className="proficiency">T</span>
                  </dd>
                </div>
                <div>
                  <dt>Speed</dt>
                  <dd>25 Ft</dd>
                </div>
              </dl>
            </div>
          </fieldset>
          <fieldset className="sheet-skills">
            <legend>Skills</legend>
            <dl>
              <dt>Acrobatics</dt>
              <dd>
                11<span className="proficiency">T</span>
              </dd>
              <dt>Arcana</dt>
              <dd>4</dd>
              <dt>Athletics</dt>
              <dd>
                12<span className="proficiency">T</span>
              </dd>
              <dt>Crafting</dt>
              <dd>
                17<span className="proficiency">M</span>
              </dd>
              <dt>Deception</dt>
              <dd>-1</dd>
              <dt>Medicine</dt>
              <dd>10</dd>
              <dt>Diplomacy</dt>
              <dd>
                10<span className="proficiency">E</span>
              </dd>
              <dt>Intimidation</dt>
              <dd>-1</dd>
              <dt>Guild Lore</dt>
              <dd>
                13<span className="proficiency">T</span>
              </dd>
              <dt>Nature</dt>
              <dd>
                10<span className="proficiency">T</span>
              </dd>
              <dt>Occultism</dt>
              <dd>4</dd>
              <dt>Performance</dt>
              <dd>
                8<span className="proficiency">T</span>
              </dd>
              <dt>Religion</dt>
              <dd>1</dd>
              <dt>Society</dt>
              <dd>17</dd>
              <dt>Stealth</dt>
              <dd>
                11<span className="proficiency">T</span>
              </dd>
              <dt>Survival</dt>
              <dd>
                10<span className="proficiency">T</span>
              </dd>
            </dl>
          </fieldset>
          <fieldset className="hero-points">
            <legend className="hero-points-sheet">Hero Points</legend>
            <div className="hero-points-icons">
              <fieldset className="hero-points">
                <div className="hero-points-icons">
                  <svg
                    className={`hero-point-icon ${heroPoints[0] ? "spent" : ""}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 792 612"
                    role="button"
                    tabIndex="0"
                    aria-pressed="false"
                    aria-label="Hero Point"
                  >
                    <g>
                      <path
                        className="st7"
                        d="M507.15,437.85l-68.5-26.56,21.09-172.38,64.77-53.41c.25-.4,1.39-.16,1.77.06.34.19-.2.93.84,1.78-8.31,83.95-9.01,169.07-19.98,250.51Z"
                      />
                      <path
                        className="st6"
                        d="M288.12,466.8c-.95-.21-3.02-.7-4.44-2.3-4.47-87.45-16.39-174.58-18.35-260.11l51.89,61.76,35.67,210.07-64.77-9.41Z"
                      />
                      <path
                        className="st0"
                        d="M405.04,50.8l53.26,179.2,62.77-50.52c.31,2.44,2.82,3.71,3.45,6.02l-64.77,53.41-21.09,172.38,68.5,26.56c-.39,2.88-2.76,3.18-3.66,5.86l-66.67-24.58-33.14,140.46c-2.5.24-5.11.48-7.6.09l31.11-134.02-64.98,56.54,31.59,78.53c-3.06.5-6.28.86-8.75-1.4l-29.99-74.41-61.03-9.6c-3.73-4.2-7.35-2.36-5.9-8.52l64.77,9.41-35.67-210.07-51.89-61.76c-.06-2.64.61-5.37,3.61-6.17l50.5,58.2,28.77-89.05-79.16,26.53c-.3-2.7.34-5.91,2.18-8.28l80-27.36,34.7-105.08c1.86-1.6,5.65-1.04,7.85-1.2l-35.05,108.18,90.56,66.83-51.99-177.16c2.33.1,5.73-.88,7.72.98ZM430.77,411.59l21.34-173.24-95.83-70.86-31.57,97.4,35.41,208.73,70.66-62.04Z"
                      />
                      <path
                        className="st2"
                        d="M521.06,179.48l-62.77,50.52-53.26-179.2c40.94,38.35,78.13,82.67,119.24,123.93-1.39,3.01-2.84,3.59-3.21,4.75Z"
                      />
                      <path
                        className="st8"
                        d="M397.32,49.82l51.99,177.16-90.56-66.83,35.05-108.18c0-.87.87-1.34,1.36-1.99.57-.76,1.4-.2,2.17-.16Z"
                      />
                      <path
                        className="st6"
                        d="M503.49,443.71c.66.24,1.97,1.27,1.83,1.96-.12.6-93.18,108.45-101.64,113.92l33.14-140.46,66.67,24.58Z"
                      />
                      <path
                        className="st4"
                        d="M385.94,53.18l-34.7,105.08-80,27.36c34.29-44.12,75.22-89.59,114.7-132.45Z"
                      />
                      <path
                        className="st3"
                        d="M396.07,559.68c.15.72-.5.73-.89,1.71-.24.61-1-.39-1.4-.66l-31.59-78.53,64.98-56.54-31.11,134.02Z"
                      />
                      <path
                        className="st5"
                        d="M268.95,198.22c-.8-1.02-1.69-3.65.12-4.32l79.16-26.53-28.77,89.05-50.5-58.2Z"
                      />
                      <path
                        className="st1"
                        d="M385.04,559.34c-.38-.09-1.86.66-2.63-.12-28.9-29.48-62.17-54.39-88.38-83.9l61.03,9.6,29.99,74.41Z"
                      />
                      <polygon
                        className="st2"
                        points="430.77 411.59 360.11 473.63 324.71 264.9 356.28 167.5 452.11 238.35 430.77 411.59"
                      />
                    </g>
                  </svg>
                  <svg
                    className={`hero-point-icon ${heroPoints[1] ? "spent" : ""}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 792 612"
                    role="button"
                    tabIndex="0"
                    aria-pressed="false"
                    aria-label="Hero Point"
                  >
                    <g>
                      <path
                        className="st7"
                        d="M507.15,437.85l-68.5-26.56,21.09-172.38,64.77-53.41c.25-.4,1.39-.16,1.77.06.34.19-.2.93.84,1.78-8.31,83.95-9.01,169.07-19.98,250.51Z"
                      />
                      <path
                        className="st6"
                        d="M288.12,466.8c-.95-.21-3.02-.7-4.44-2.3-4.47-87.45-16.39-174.58-18.35-260.11l51.89,61.76,35.67,210.07-64.77-9.41Z"
                      />
                      <path
                        className="st0"
                        d="M405.04,50.8l53.26,179.2,62.77-50.52c.31,2.44,2.82,3.71,3.45,6.02l-64.77,53.41-21.09,172.38,68.5,26.56c-.39,2.88-2.76,3.18-3.66,5.86l-66.67-24.58-33.14,140.46c-2.5.24-5.11.48-7.6.09l31.11-134.02-64.98,56.54,31.59,78.53c-3.06.5-6.28.86-8.75-1.4l-29.99-74.41-61.03-9.6c-3.73-4.2-7.35-2.36-5.9-8.52l64.77,9.41-35.67-210.07-51.89-61.76c-.06-2.64.61-5.37,3.61-6.17l50.5,58.2,28.77-89.05-79.16,26.53c-.3-2.7.34-5.91,2.18-8.28l80-27.36,34.7-105.08c1.86-1.6,5.65-1.04,7.85-1.2l-35.05,108.18,90.56,66.83-51.99-177.16c2.33.1,5.73-.88,7.72.98ZM430.77,411.59l21.34-173.24-95.83-70.86-31.57,97.4,35.41,208.73,70.66-62.04Z"
                      />
                      <path
                        className="st2"
                        d="M521.06,179.48l-62.77,50.52-53.26-179.2c40.94,38.35,78.13,82.67,119.24,123.93-1.39,3.01-2.84,3.59-3.21,4.75Z"
                      />
                      <path
                        className="st8"
                        d="M397.32,49.82l51.99,177.16-90.56-66.83,35.05-108.18c0-.87.87-1.34,1.36-1.99.57-.76,1.4-.2,2.17-.16Z"
                      />
                      <path
                        className="st6"
                        d="M503.49,443.71c.66.24,1.97,1.27,1.83,1.96-.12.6-93.18,108.45-101.64,113.92l33.14-140.46,66.67,24.58Z"
                      />
                      <path
                        className="st4"
                        d="M385.94,53.18l-34.7,105.08-80,27.36c34.29-44.12,75.22-89.59,114.7-132.45Z"
                      />
                      <path
                        className="st3"
                        d="M396.07,559.68c.15.72-.5.73-.89,1.71-.24.61-1-.39-1.4-.66l-31.59-78.53,64.98-56.54-31.11,134.02Z"
                      />
                      <path
                        className="st5"
                        d="M268.95,198.22c-.8-1.02-1.69-3.65.12-4.32l79.16-26.53-28.77,89.05-50.5-58.2Z"
                      />
                      <path
                        className="st1"
                        d="M385.04,559.34c-.38-.09-1.86.66-2.63-.12-28.9-29.48-62.17-54.39-88.38-83.9l61.03,9.6,29.99,74.41Z"
                      />
                      <polygon
                        className="st2"
                        points="430.77 411.59 360.11 473.63 324.71 264.9 356.28 167.5 452.11 238.35 430.77 411.59"
                      />
                    </g>
                  </svg>
                  <svg
                    className={`hero-point-icon ${heroPoints[2] ? "spent" : ""}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 792 612"
                    role="button"
                    tabIndex="0"
                    aria-pressed="false"
                    aria-label="Hero Point"
                  >
                    <g>
                      <path
                        className="st7"
                        d="M507.15,437.85l-68.5-26.56,21.09-172.38,64.77-53.41c.25-.4,1.39-.16,1.77.06.34.19-.2.93.84,1.78-8.31,83.95-9.01,169.07-19.98,250.51Z"
                      />
                      <path
                        className="st6"
                        d="M288.12,466.8c-.95-.21-3.02-.7-4.44-2.3-4.47-87.45-16.39-174.58-18.35-260.11l51.89,61.76,35.67,210.07-64.77-9.41Z"
                      />
                      <path
                        className="st0"
                        d="M405.04,50.8l53.26,179.2,62.77-50.52c.31,2.44,2.82,3.71,3.45,6.02l-64.77,53.41-21.09,172.38,68.5,26.56c-.39,2.88-2.76,3.18-3.66,5.86l-66.67-24.58-33.14,140.46c-2.5.24-5.11.48-7.6.09l31.11-134.02-64.98,56.54,31.59,78.53c-3.06.5-6.28.86-8.75-1.4l-29.99-74.41-61.03-9.6c-3.73-4.2-7.35-2.36-5.9-8.52l64.77,9.41-35.67-210.07-51.89-61.76c-.06-2.64.61-5.37,3.61-6.17l50.5,58.2,28.77-89.05-79.16,26.53c-.3-2.7.34-5.91,2.18-8.28l80-27.36,34.7-105.08c1.86-1.6,5.65-1.04,7.85-1.2l-35.05,108.18,90.56,66.83-51.99-177.16c2.33.1,5.73-.88,7.72.98ZM430.77,411.59l21.34-173.24-95.83-70.86-31.57,97.4,35.41,208.73,70.66-62.04Z"
                      />
                      <path
                        className="st2"
                        d="M521.06,179.48l-62.77,50.52-53.26-179.2c40.94,38.35,78.13,82.67,119.24,123.93-1.39,3.01-2.84,3.59-3.21,4.75Z"
                      />
                      <path
                        className="st8"
                        d="M397.32,49.82l51.99,177.16-90.56-66.83,35.05-108.18c0-.87.87-1.34,1.36-1.99.57-.76,1.4-.2,2.17-.16Z"
                      />
                      <path
                        className="st6"
                        d="M503.49,443.71c.66.24,1.97,1.27,1.83,1.96-.12.6-93.18,108.45-101.64,113.92l33.14-140.46,66.67,24.58Z"
                      />
                      <path
                        className="st4"
                        d="M385.94,53.18l-34.7,105.08-80,27.36c34.29-44.12,75.22-89.59,114.7-132.45Z"
                      />
                      <path
                        className="st3"
                        d="M396.07,559.68c.15.72-.5.73-.89,1.71-.24.61-1-.39-1.4-.66l-31.59-78.53,64.98-56.54-31.11,134.02Z"
                      />
                      <path
                        className="st5"
                        d="M268.95,198.22c-.8-1.02-1.69-3.65.12-4.32l79.16-26.53-28.77,89.05-50.5-58.2Z"
                      />
                      <path
                        className="st1"
                        d="M385.04,559.34c-.38-.09-1.86.66-2.63-.12-28.9-29.48-62.17-54.39-88.38-83.9l61.03,9.6,29.99,74.41Z"
                      />
                      <polygon
                        className="st2"
                        points="430.77 411.59 360.11 473.63 324.71 264.9 356.28 167.5 452.11 238.35 430.77 411.59"
                      />
                    </g>
                  </svg>
                </div>
              </fieldset>
            </div>
          </fieldset>
        </div>

        <h5 id="backstory-tab">Backstory</h5>
        <div className="backstory-body">
          <div>
            <p>
              Ormus is a minotaur who's learning everything he can about
              building from other races. He continues to put his skills to the
              test daily, mainly focused on improving his craft. His family has
              always been a long line of workers focused in construction and he
              continued the line with a fascination for building things with his
              hands. After learning everything he could from his village he went
              and studied with dwarves and elves, learning many different types
              of building. Once he returned from his journey of education, he
              displayed all his newly acquired techniques with his village.
              Fascinated, many women tried to garner his affection knowing he
              would make a reliable husband. Ormus was troubled, as he
              continuously found himself looking at men more than women. His
              parents told him that when he was of age he would be expected to
              partner with a 'lovely' lady. This was the standard of their tribe
              in order to encourage increasing the population. He did as
              expected and soon had a child with a kind minotaur from his tribe.
              He treasured his boy from the moment he was born. He began raising
              the kid with his mate, but he felt no passion behind their
              relationship. As his reputation continued to grow as an amazing
              craftsman he began to focus on a special project of his — an
              autonomous creation that would follow his orders, all to protect
              his child. He spent well over four years working on this project
              and his wife steadily grew unhappy with him. They never spent time
              together unless it was related to their child, Jeffersonius Rupert
              Paul Magnus the Third, named after Ormus's grandfather, whom they
              nicknamed Jeff for short. As time passed they started to get into
              more and more fights. Ormus found himself wishing he could've been
              bonded with a man. One day his wife discovered him in bed with a
              male. Word spread quickly amongst the others. Criticized and
              banished from his village for his disgusting and impure ways, he
              decided to leave to a foreign wild land with no known civilization
              in order to build a home where he could simply keep his child safe
              and happy. And so began his journey with his son Jeffersonius
              Rupert Paul Magnus the Third, whom the wife was more than happy to
              leave behind.
            </p>
          </div>
        </div>
      </div>

      <footer></footer>
    </>
  );
}
