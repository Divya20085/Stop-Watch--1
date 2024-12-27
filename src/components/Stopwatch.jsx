import React, { useState, useEffect } from "react";
import "./Stopwatch.css";

function Stopwatch() {
  const [time, setTime] = useState(0); // Stopwatch time in milliseconds
  const [countdown, setCountdown] = useState(0); // Countdown time in milliseconds
  const [isRunning, setIsRunning] = useState(false); // To track stopwatch state
  const [isCountdown, setIsCountdown] = useState(false); // To track countdown state
  const [laps, setLaps] = useState([]);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    let interval;
    if (isRunning) {
      if (isCountdown) {
        interval = setInterval(() => {
          setCountdown((prevCountdown) => {
            if (prevCountdown <= 100) {
              clearInterval(interval); // Stop countdown when time is up
              setIsRunning(false);
              return 0;
            }
            return prevCountdown - 100;
          });
        }, 100);
      } else {
        interval = setInterval(() => {
          setTime((prevTime) => prevTime + 100); // Increment stopwatch time
        }, 100);
      }
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, isCountdown]);

  // Format time in HH:MM:SS
  const formatTime = (ms) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 100);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds}`;
  };

  // Start/Stop button handler
  const handleStartStop = () => {
    if (isCountdown && countdown <= 0) return; // Prevent starting countdown at 0
    setIsRunning((prev) => !prev);
  };

  // Reset button handler
  const handleReset = () => {
    setTime(0);
    setCountdown(0);
    setIsRunning(false);
    setLaps([]);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  // Lap button handler
  const handleLap = () => {
    if (isRunning && !isCountdown) {
      setLaps([...laps, time]);
    }
  };

  // Set countdown time
  const handleSetCountdown = () => {
    const countdownTime =
      hours * 3600000 + minutes * 60000 + seconds * 1000; // Convert input to ms
    setCountdown(countdownTime);
  };

  // Start countdown
  const handleStartCountdown = () => {
    if (countdown > 0) {
      setIsCountdown(true);
      setIsRunning(true);
    }
  };

  // Toggle mode
  const toggleMode = () => {
    setIsCountdown((prev) => !prev);
    setIsRunning(false);
    setTime(0);
    setCountdown(0);
    setLaps([]);
  };

  return (
    <div className="stopwatch-container">
      <h1>Stopwatch & Countdown Timer</h1>

      {/* Mode Toggle */}
      <button onClick={toggleMode}>
        {isCountdown ? "Switch to Stopwatch" : "Switch to Countdown"}
      </button>

      {/* Countdown Inputs */}
      {isCountdown ? (
        <div>
          <h3>Set Countdown Time</h3>
          <input
            type="number"
            placeholder="Hours"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Minutes"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Seconds"
            value={seconds}
            onChange={(e) => setSeconds(Number(e.target.value))}
          />
          <button onClick={handleSetCountdown}>Set Countdown</button>
          <button onClick={handleStartCountdown} disabled={countdown === 0}>
            Start Countdown
          </button>
        </div>
      ) : (
        <h2>{formatTime(time)}</h2>
      )}

      {/* Stopwatch & Countdown Display */}
      <h2>{isCountdown ? formatTime(countdown) : formatTime(time)}</h2>

      {/* Buttons */}
      <div>
        <button onClick={handleStartStop}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button onClick={handleReset} disabled={!isRunning && time === 0 && countdown === 0}>
          Reset
        </button>
        <button onClick={handleLap} disabled={!isRunning || isCountdown}>
          Lap
        </button>
      </div>

      {/* Lap List */}
      {!isCountdown && (
        <div>
          <h3>Laps</h3>
          <ol>
            {laps.map((lap, index) => (
              <li key={index}>{formatTime(lap)}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default Stopwatch;
