import React from "react";
import { useDispatch } from "react-redux";
import { Control, Form, Errors, actions } from "react-redux-form";
import { required, validEmail } from "../../../utils/custom";

const Subscribe = () => {
  const dispatch = useDispatch();
  const handleSubscribe = (values) => {
    console.log("values", values);
    dispatch(actions.reset("subscribe"));
  };
  return (
    <section className="index-sec-8">
      <img
        src="assets/images/cloud-1.png"
        className="img-fluid cloud-first"
        alt="cloud-1"
      />
      <img
        src="assets/images/cloud-2.png"
        className="img-fluid cloud-second"
        alt="cloud-2"
      />
      <div className="indexsec-8-wrap">
        <p className="black-heading text-center">Keep In Touch</p>
        <p className="paragraph text-center">
          We promise we won't write to you often
        </p>
        <Form
          model="subscribe"
          className="subscribe_form"
          onSubmit={(values) => handleSubscribe(values)}
        >
          <div className="sec-8-input-wrap">
            <Control
              type="email"
              model=".subscribe_email"
              name="subscribe_email"
              placeholder="Your Email"
              className="subscribe-input"
              validators={{
                required,
                validEmail,
              }}
            />
            <span className="btn-sec-8-wrap">
              <button className="btn-sec-8" type="submit">
                Subscribe
              </button>
            </span>
            <Errors
              className="text-danger mt-1"
              model=".subscribe_email"
              show="touched"
              messages={{
                required: "Required! ",
                validEmail: "Invalid Email Address",
              }}
            />
          </div>
        </Form>
      </div>
    </section>
  );
};

export default Subscribe;
