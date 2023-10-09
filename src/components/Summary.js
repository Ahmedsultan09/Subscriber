import React, { useEffect } from "react";
import classes from "./Summary.module.css";
import { useDispatch, useSelector } from "react-redux";
import { packageAction } from "../store";
function Summary() {
  const type = useSelector((state) => state.package.type);
  const addons = useSelector((state) => state.package.addOns);
  const plan = useSelector((state) => state.package.plan);
  const totalPrice = useSelector((state) => state.package.totalPrice);
  const dispatch = useDispatch();
  function handleBack() {
    dispatch(packageAction.handleBack());
  }

  useEffect(() => {
    // dispatch(packageAction.setTotalPrice());
    dispatch(packageAction.setAddOnsPrices());
    dispatch(packageAction.setTotalPrice());
  }, [dispatch]);

  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <div className={classes.title}>
          <h1 className={classes.header}>Finishing up</h1>
          <div className={classes.light}>
            Double-check everything looks OK before confirming
          </div>
        </div>
        <div className={classes.summary}>
          <div className={classes.plan}>
            <span className={classes.column}>
              <div>
                <span>
                  {plan.name} {type === "m" ? "(Monthly)" : "(Yearly)"}
                </span>
              </div>
              <button className={classes.change}>Change</button>
            </span>
            {type === "m" && (
              <span className={classes.column}>{plan.priceMonthly}$/mo</span>
            )}
            {type === "y" && (
              <span className={classes.column}>{plan.priceYearly}$/yr</span>
            )}
          </div>
          <div className={classes.addsOn}>
            {type === "m" &&
              addons.map((item) => {
                return (
                  <div className={classes.extra} key={item.name}>
                    <span className={classes.light}>{item.name}</span>
                    <span className={classes.addsPrice}>
                      +{item.priceMonthly}/mo
                    </span>
                  </div>
                );
              })}
            {type === "y" &&
              addons.map((item) => {
                return (
                  <div className={classes.extra} key={item.name}>
                    <span className={classes.light}>{item.name}</span>
                    <span className={classes.addsPrice}>
                      +{item.priceYearly}/yr
                    </span>
                  </div>
                );
              })}
          </div>
        </div>

        {type === "m" && (
          <div className={classes.total}>
            <span className={classes.light}>Total (Per month)</span>
            <span className={classes.totalPrice}>{totalPrice}$/mo</span>
          </div>
        )}
        {type === "y" && (
          <div className={classes.total}>
            <span className={classes.light}>Total (Per year)</span>
            <span className={classes.totalPrice}>{totalPrice}$/yr</span>
          </div>
        )}

        <div className={classes.footer}>
          <button className={classes.back} onClick={handleBack}>
            Go Back
          </button>
          <button className={classes.next}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

export default Summary;
