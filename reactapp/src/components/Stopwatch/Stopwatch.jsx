import React, { useState, useRef } from 'react';

const Stopwatch = () => {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0); // 0 = initial, 1 = started, 2 = paused
  const [resumeDisabled, setResumeDisabled] = useState(true);
  const [resetDisabled, setResetDisabled] = useState(true);
  let updatedH = time.h,
    updatedM = time.m,
    updatedS = time.s;

  const start = () => {
    run();
    setStatus(1);
    setResumeDisabled(true);
    setResetDisabled(false);
  };

  const pause = () => {
    clearInterval(interv);
    setStatus(2);
    setResumeDisabled(false);
  };

  const resume = () => {
    run();
    setStatus(1);
    setResumeDisabled(true);
    setResetDisabled(false);
  };

  const reset = () => {
    clearInterval(interv);
    setStatus(0);
    setResumeDisabled(true);
    setResetDisabled(true);
    setTime({ h: 0, m: 0, s: 0 });
  };

  const run = () => {
    clearInterval(interv);
    setInterv(
      setInterval(() => {
        if (updatedM === 60) {
          updatedH++;
          updatedM = 0;
        }
        if (updatedS === 60) {
          updatedM++;
          updatedS = 0;
        }
        updatedS++;
        return setTime({ h: updatedH, m: updatedM, s: updatedS });
      }, 1000)
    );
  };

  return (
    <div className="main-section">
      <div className="clock-holder">
        <div className="stopwatch">
          <div className="stopwatch-time" data-testid="time">
            {time.h < 10 ? '0' + time.h : time.h}:
            {time.m < 10 ? '0' + time.m : time.m}:
            {time.s < 10 ? '0' + time.s : time.s}
          </div>
          <div className="stopwatch-controls">
            {status === 0 && (
              <button className="stopwatch-btn stopwatch-btn-green" onClick={start} data-testid="start">
                Start
              </button>
            )}
            {status === 1 && (
              <div>
                <button className="stopwatch-btn stopwatch-btn-red" onClick={pause} data-testid="pause">
                  Pause
                </button>
                <button
                  className="stopwatch-btn stopwatch-btn-yellow"
                  onClick={resume}
                  disabled={resumeDisabled}
                  data-testid="resume"
                >
                  Resume
                </button>
              </div>
            )}
            <button
              className="stopwatch-btn stopwatch-btn-blue"
              onClick={reset}
              disabled={resetDisabled}
              data-testid="reset"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;