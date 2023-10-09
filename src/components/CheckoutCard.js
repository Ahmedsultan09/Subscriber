import React, { useState } from "react";
import Steps from "./Steps";
import Form from "./Form";
import classes from "./CheckoutCard.module.css";
import Plan from "./Plan";
import AddOns from "./AddOns";
import Summary from "./Summary";
import { useSelector } from "react-redux";

function CheckoutCard() {
  const stepNum = useSelector((state) => state.package.stepNum);

  return (
    <div className={classes.main}>
      <Steps />
      {stepNum === 1 && <Form />}
      {stepNum === 2 && <Plan />}
      {stepNum === 3 && <AddOns />}
      {stepNum === 4 && <Summary />}
    </div>
  );
}

export default CheckoutCard;
