import classes from "./App.module.css";
import CheckoutCard from "./components/CheckoutCard";

function App() {
  return (
    <div className={classes.main}>
      <CheckoutCard />
    </div>
  );
}

export default App;
