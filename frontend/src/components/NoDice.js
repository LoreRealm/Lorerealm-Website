import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NoDice = () => {
  const [isRolling, setIsRolling] = useState(false);
  const [diceResult, setDiceResult] = useState("?");
  const [promptText, setPromptText] = useState("Rolling for navigation...");

  useEffect(() => {
    const autoRollTimer = setTimeout(() => {
      handleDiceRoll();
    }, 1500);

    return () => clearTimeout(autoRollTimer);
  }, []);

  const handleDiceRoll = () => {
    if (isRolling) return;

    setIsRolling(true);
    let count = 0;

    const interval = setInterval(() => {
      setDiceResult(String(Math.floor(Math.random() * 20) + 1));
      count++;

      if (count >= 15) {
        clearInterval(interval);
        setDiceResult("404");
        setPromptText("Critical failure! Page not found.");
        setIsRolling(false);
      }
    }, 60);
  };

  return (
    <div
      id="dice-overlay"
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div className="dice-inner">
        <h2 className="dice-logo">LoreRealm</h2>
        <p className="intro">You've wandered into uncharted territory...</p>
        <div className="dice-container">
          <div
            id="d20"
            className={`d20 ${isRolling ? "rolling" : ""}`}
            onClick={handleDiceRoll}
            style={{ cursor: isRolling ? "wait" : "pointer" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <defs>
                <style>
                  {`.d20-path {
                    fill: none;
                    stroke: #c9b8e8;
                    stroke-width: 8;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                  }`}
                </style>
              </defs>
              <path
                className="d20-path"
                d="M20.04 317.3C18 317.3 16 315.8 16 313.3V150.5c0-2.351 1.91-4.012 4.001-4.012c.6882 0 1.396 .18 2.062 .5748l76.62 45.1l-75.28 122.3C22.59 316.8 21.31 317.3 20.04 317.3zM231.4 405.2l-208.2-22.06c-4.27-.4821-7.123-4.117-7.123-7.995c0-1.401 .3725-2.834 1.185-4.161L122.7 215.1L231.4 405.2zM31.1 420.1c0-2.039 1.508-4.068 3.93-4.068c.1654 0 .3351 .0095 .5089 .0291l203.6 22.31v65.66C239.1 508.6 236.2 512 232 512c-1.113 0-2.255-.2387-3.363-.7565L34.25 423.6C32.69 422.8 31.1 421.4 31.1 420.1zM33.94 117.1c-1.289-.7641-1.938-2.088-1.938-3.417c0-1.281 .6019-2.567 1.813-3.364l150.8-98.59C185.1 10.98 187.3 10.64 188.6 10.64c4.32 0 8.003 3.721 8.003 8.022c0 1.379-.3788 2.818-1.237 4.214L115.5 165.8L33.94 117.1zM146.8 175.1l95.59-168.4C245.5 2.53 250.7 0 255.1 0s10.5 2.53 13.62 7.624l95.59 168.4H146.8zM356.4 207.1l-100.4 175.7L155.6 207.1H356.4zM476.1 415.1c2.422 0 3.93 2.029 3.93 4.068c0 1.378-.6893 2.761-2.252 3.524l-194.4 87.66c-1.103 .5092-2.241 .7443-3.35 .7443c-4.2 0-7.994-3.371-7.994-7.994v-65.69l203.6-22.28C475.7 416 475.9 415.1 476.1 415.1zM494.8 370.9C495.6 372.3 496 373.7 496 375.1c0 3.872-2.841 7.499-7.128 7.98l-208.2 22.06l108.6-190.1L494.8 370.9zM316.6 22.87c-.8581-1.395-1.237-2.834-1.237-4.214c0-4.301 3.683-8.022 8.003-8.022c1.308 0 2.675 .3411 4.015 1.11l150.8 98.59c1.211 .7973 1.813 2.076 1.813 3.353c0 1.325-.6488 2.649-1.938 3.429L396.5 165.8L316.6 22.87zM491.1 146.5c2.091 0 4.001 1.661 4.001 4.012v162.8c0 2.483-2.016 4.006-4.053 4.006c-1.27 0-2.549-.5919-3.353-1.912l-75.28-122.3l76.62-45.1C490.6 146.7 491.3 146.5 491.1 146.5z"
              />
              <circle
                cx="256"
                cy="256"
                r="50"
                fill="rgba(201,184,232,0.1)"
                stroke="none"
              />
              <text
                x="256"
                y="270"
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="Cinzel Decorative"
                fontSize={diceResult === "404" ? "48" : "72"}
                fontWeight="bold"
                fill="#c9b8e8"
                id="dice-number"
              >
                {diceResult}
              </text>
            </svg>
          </div>
          <p className="dice-prompt">{promptText}</p>
        </div>

        {diceResult === "404" && (
          <div
            style={{
              marginTop: "2rem",
              textAlign: "center",
              opacity: isRolling ? 0 : 1,
              transition: "opacity 0.5s ease",
            }}
          >
            <p
              style={{
                color: "#c9b8e8",
                marginBottom: "1rem",
                fontSize: "1.1rem",
              }}
            >
              The page you're looking for has vanished into the void.
            </p>
            <Link
              to="/"
              style={{
                display: "inline-block",
                padding: "12px 24px",
                background: "linear-gradient(135deg, #6b46c1, #8b5cf6)",
                color: "white",
                textDecoration: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "600",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 20px rgba(107, 70, 193, 0.3)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              Return to Safety
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoDice;
