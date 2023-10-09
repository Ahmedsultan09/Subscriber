import { useEffect, useState } from "react";
import classes from "./Plan.module.css";
import { useDispatch } from "react-redux";
import { packageAction } from "../store";
function Plan() {
  const [yearly, setYearly] = useState(false);
  const [arcade, setArcade] = useState(false);
  const [advanced, setAdvanced] = useState(false);
  const [pro, setPro] = useState(false);
  const dispatch = useDispatch();
  function handleNext() {
    dispatch(packageAction.handleNext());
  }
  function handleBack() {
    dispatch(packageAction.handleBack());
  }
  let prev = null;
  let arcadeRefrence = document.getElementById("1");
  let advancedRefrence = document.getElementById("2");
  let proRefrence = document.getElementById("3");

  useEffect(() => {
    if (arcade) {
      arcadeRefrence.classList.add(classes.active);
      advancedRefrence.classList.remove(classes.active);
      proRefrence.classList.remove(classes.active);
    } else if (advanced) {
      arcadeRefrence.classList.remove(classes.active);
      advancedRefrence.classList.add(classes.active);
      proRefrence.classList.remove(classes.active);
    } else if (pro) {
      arcadeRefrence.classList.remove(classes.active);
      advancedRefrence.classList.remove(classes.active);
      proRefrence.classList.add(classes.active);
    }
  }, [arcade, advanced, pro]);

  useEffect(() => {
    if (yearly) {
      dispatch(packageAction.setType("y"));
    } else {
      dispatch(packageAction.setType("m"));
    }
  }, [yearly, dispatch]);

  function handleToggle(e) {
    setYearly((prev) => !prev);
  }

  function handleArcade() {
    setArcade((prev) => !prev);
    setAdvanced(false);
    setPro(false);
    dispatch(packageAction.setPlan("arcade"));
  }

  function handleAdvanced() {
    setAdvanced((prev) => !prev);
    setArcade(false);
    setPro(false);
    dispatch(packageAction.setPlan("advanced"));
  }

  function handlePro() {
    setPro((prev) => !prev);
    setArcade(false);
    setAdvanced(false);
    dispatch(packageAction.setPlan("pro"));
  }
  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <div className={classes.title}>
          <h1 className={classes.header}>Select your plan</h1>
          <p className={classes.light}>
            You have the option of monthly or yearly billing.
          </p>
        </div>
        <div className={classes.plans}>
          <div
            className={classes.card}
            tabIndex="0"
            onClick={handleArcade}
            id="1"
          >
            <div className={classes.icon} id={classes.first}>
              <i className="fa-solid fa-table-tennis-paddle-ball"></i>
            </div>
            <div>
              <div className={classes.description}>Arcade</div>
              {!yearly && <p className={classes.light}>$9/mo</p>}{" "}
              {yearly && <p className={classes.light}>$90/yr</p>}{" "}
              {yearly && <p className={classes.offer}>2 months free</p>}{" "}
            </div>
          </div>
          <div
            className={classes.card}
            tabIndex="0"
            onClick={handleAdvanced}
            id="2"
          >
            <div className={classes.icon} id={classes.second}>
              <i className="fa-solid fa-gamepad"></i>
            </div>
            <div>
              {" "}
              <div className={classes.description}>Advanced</div>
              {!yearly && <p className={classes.light}>$12/mo</p>}{" "}
              {yearly && <p className={classes.light}>$120/yr</p>}{" "}
              {yearly && <p className={classes.offer}>2 months free</p>}{" "}
            </div>
          </div>
          <div className={classes.card} tabIndex="0" onClick={handlePro} id="3">
            <div className={classes.icon} id={classes.third}>
              <i className="fa-solid fa-chess-queen"></i>
            </div>
            <div>
              <div className={classes.description}>Pro</div>
              {!yearly && <p className={classes.light}>$15/mo</p>}{" "}
              {yearly && <p className={classes.light}>$150/yr</p>}{" "}
              {yearly && <p className={classes.offer}>2 months free</p>}{" "}
            </div>
          </div>
        </div>
        <div className={classes.toggle}>
          <span>Monthly</span>
          {yearly && (
            <span
              onClick={() => handleToggle(prev)}
              className={classes.icon}
              tabIndex="0"
            >
              <i className="fa-solid fa-toggle-on"></i>
            </span>
          )}
          {!yearly && (
            <span onClick={handleToggle} className={classes.icon} tabIndex="0">
              <i className="fa-solid fa-toggle-off"></i>
            </span>
          )}
          <span>Yearly</span>
        </div>
        <div className={classes.footer}>
          <button className={classes.back} onClick={handleBack}>
            Go Back
          </button>
          <button className={classes.next} onClick={handleNext}>
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
}

export default Plan;
