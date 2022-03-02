import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store, { persistor } from "./store/index";
import { PersistGate } from "redux-persist/integration/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import "./index.css";

const stripePromise = loadStripe(
  "pk_test_51JUed2HunsRRB5CfTroEB34d9nTzUT8cwYa9HKCChJYfEKPUb3aZ4scBw1TDWJxGuy6cKtarZ2xebtocbTqvEKjM00t3k8M23G"
);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
