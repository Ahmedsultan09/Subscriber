import React, { useEffect, useState } from "react";
import classes from "./Form.module.css";
import { useDispatch } from "react-redux";
import { packageAction } from "../store";

function Form() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState(NaN);
  const [nameIsShort, setNameIsShort] = useState(false);
  const [nameAlert, setNameAlert] = useState(false);
  const [emailAlert, setEmailAlert] = useState(false);
  const [numberAlert, setNumberAlert] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [numberIsValid, setNumberIsValid] = useState(false);

  function handleName(e) {
    setName(e.target.value);
  }
  function handleEmail(e) {
    setEmail(e.target.value);
  }
  function handleNumber(e) {
    setNumber(e.target.value);
  }

  function validateForm() {
    if (nameIsShort) {
      setNameAlert(true);
    } else {
      setNameAlert(false);
    }
    if (!emailIsValid) {
      setEmailAlert(true);
    } else {
      setEmailAlert(false);
    }
    if (numberIsValid) {
      setNumberAlert(false);
    } else {
      setNumberAlert(true);
    }
  }

  useEffect(() => {
    if (!nameIsShort && emailIsValid && numberIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [nameIsShort, emailIsValid, numberIsValid]);

  useEffect(() => {
    const nameArray = name.split("");
    if (nameArray.length > 8) {
      setNameIsShort(false);
    } else {
      setNameIsShort(true);
    }
  }, [name]);

  useEffect(() => {
    const emailArray = email.split("");
    const atChar = emailArray.filter((char) => {
      return char === "@";
    });
    if (atChar.length > 0) {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
  }, [email]);

  useEffect(() => {
    const numberArray = number.toString().split("").map(Number);
    const numberCheck = numberArray.filter((num) => {
      return typeof num === "number";
    });
    if (numberCheck.includes(NaN)) {
      setNumberIsValid(false);
    } else {
      setNumberIsValid(true);
    }
    console.log(numberCheck);
  }, [number]);

  function handleNext() {
    if (formIsValid) {
      dispatch(packageAction.handleNext());
    } else {
      validateForm();
    }
  }

  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <div className={classes.title}>
          <h1 className={classes.header}>Personal info</h1>
          <p className={classes.light}>
            Please provide your name, email address, and phone number.
          </p>
        </div>
        <form>
          <div className={classes.input}>
            <label htmlFor="name">Name</label>
            <input
              className={classes.field}
              type="text"
              id="name"
              placeholder="e.g. Stephen King"
              onChange={handleName}
            />
            {nameAlert && (
              <div className={classes.alert}>Name is too short</div>
            )}{" "}
          </div>
          <div className={classes.input}>
            <label htmlFor="email">Email Address</label>
            <input
              className={classes.field}
              type="email"
              id="email"
              placeholder="e.g. stephenKing@lorem.com"
              onChange={handleEmail}
            />
            {emailAlert && (
              <div className={classes.alert}>This email is not valid</div>
            )}
          </div>
          <div className={classes.input}>
            <label htmlFor="phone-number">Phone Number</label>
            <input
              className={classes.field}
              type="text"
              id="phone-number"
              placeholder="e.g. +1 234 567 890"
              onChange={handleNumber}
            />
            {numberAlert && (
              <div className={classes.alert}>This number is not valid</div>
            )}
          </div>
        </form>
        <div className={classes.footer}>
          <button className={classes.btn} onClick={handleNext}>
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
}

export default Form;
