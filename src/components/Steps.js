import React, { useEffect, useState } from "react";
import classes from "./Steps.module.css";
import { useSelector } from "react-redux";

function Steps() {
  const stepNum = useSelector((state) => state.package.stepNum);

  useEffect(() => {
    let stepBtns = document.querySelectorAll("button");
    stepBtns.forEach((btn) => {
      btn.classList.remove(classes.active);
    });
    if (stepNum === 1) {
      let btn = document.querySelector("#btnOne");
      btn.classList.add(classes.active);
    } else if (stepNum === 2) {
      let btn = document.querySelector("#btnTwo");
      btn.classList.add(classes.active);
    } else if (stepNum === 3) {
      let btn = document.querySelector("#btnThree");
      btn.classList.add(classes.active);
    } else if (stepNum === 4) {
      let btn = document.querySelector("#btnFour");
      btn.classList.add(classes.active);
    }
  }, [stepNum]);

  return (
    <div className={classes.main}>
      <div className={classes.routes}>
        <div className={classes.route}>
          <button className={`${classes.number} ${classes.active}`} id="btnOne">
            1
          </button>
          <div>
            <p className={classes.title}>STEP 1</p>
            <h1 className={classes.description}>YOUR INFO</h1>
          </div>
        </div>
        <div className={classes.route}>
          <button className={classes.number} id="btnTwo">
            2
          </button>
          <div>
            <p className={classes.title}>STEP 2</p>
            <h1 className={classes.description}>SELECT PLAN</h1>
          </div>
        </div>
        <div className={classes.route}>
          <button className={classes.number} id="btnThree">
            3
          </button>
          <div>
            {" "}
            <p className={classes.title}>STEP 3</p>
            <h1 className={classes.description}>ADD-ONS</h1>
          </div>
        </div>
        <div className={classes.route}>
          <button className={classes.number} id="btnFour">
            4
          </button>
          <div>
            <p className={classes.title}>STEP 4</p>
            <h1 className={classes.description}>SUMMARY</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Steps;
