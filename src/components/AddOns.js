import React, { useEffect, useState } from "react";
import classes from "./AddOns.module.css";
import { useDispatch, useSelector } from "react-redux";
import { packageAction } from "../store";

function AddOns() {
  const [online, setOnline] = useState(false);
  const [storage, setStorage] = useState(false);
  const [profile, setProfile] = useState(false);
  const type = useSelector((state) => state.package.type);
  const onlineAdd = useSelector((state) => state.package.online);
  const storageAdd = useSelector((state) => state.package.storage);
  const profileAdd = useSelector((state) => state.package.profile);
  const dispatch = useDispatch();
  function handleNext() {
    dispatch(packageAction.handleNext());
  }
  function handleBack() {
    dispatch(packageAction.handleBack());
  }
  function handleOnline() {
    setOnline((prev) => !prev);
    dispatch(packageAction.setAddOns("Online"));
  }
  function handleStorage() {
    setStorage((prev) => !prev);
    dispatch(packageAction.setAddOns("Larger"));
  }
  function handleProfile() {
    setProfile((prev) => !prev);
    dispatch(packageAction.setAddOns("Customize"));
  }

  useEffect(() => {
    dispatch(packageAction.resetAddOns());
  }, [dispatch]);

  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <div className={classes.title}>
          <h1 className={classes.header}>Pick add-ons</h1>
          <div className={classes.light}>
            add-ons help enhance your gaming experience
          </div>
        </div>
        <div className={classes.adds}>
          <div className={classes.option} onClick={handleOnline}>
            {online && (
              <div className={classes.icon}>
                <i className="fa-solid fa-square-check"></i>
              </div>
            )}
            {!online && <div className={classes.unchecked}></div>}{" "}
            <div className={classes.description}>
              <div className={classes.large}>Online Service</div>
              <div className={classes.light}>Acces to multiplayer games</div>
            </div>
            {type === "m" && (
              <div className={`${classes.price} ${classes.light}`}>
                <span>+{onlineAdd.priceMonthly}</span>$/mo
              </div>
            )}
            {type === "y" && (
              <div className={`${classes.price} ${classes.light}`}>
                <span>+{onlineAdd.priceYearly}</span>$/yr
              </div>
            )}
          </div>
          <div className={classes.option} onClick={handleStorage}>
            {storage && (
              <div className={classes.icon}>
                <i className="fa-solid fa-square-check"></i>
              </div>
            )}
            {!storage && <div className={classes.unchecked}></div>}{" "}
            <div className={classes.description}>
              <div className={classes.large}>Larger storage</div>
              <div className={classes.light}>Extra 1TB of cloud save</div>
            </div>
            {type === "m" && (
              <div className={`${classes.price} ${classes.light}`}>
                +<span>{storageAdd.priceMonthly}</span>$/mo
              </div>
            )}
            {type === "y" && (
              <div className={`${classes.price} ${classes.light}`}>
                <span>+{storageAdd.priceYearly}</span>$/yr
              </div>
            )}
          </div>
          <div className={classes.option} onClick={handleProfile}>
            {profile && (
              <div className={classes.icon}>
                <i className="fa-solid fa-square-check"></i>
              </div>
            )}
            {!profile && <div className={classes.unchecked}></div>}{" "}
            <div className={classes.description}>
              <div className={classes.large}>Customizable Profile</div>
              <div className={classes.light}>Custom theme on your profile</div>
            </div>
            {type === "m" && (
              <div className={`${classes.price} ${classes.light}`}>
                +<span>{profileAdd.priceMonthly}</span>$/mo
              </div>
            )}
            {type === "y" && (
              <div className={`${classes.price} ${classes.light}`}>
                <span>+{profileAdd.priceYearly}</span>$/yr
              </div>
            )}{" "}
          </div>
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

export default AddOns;
