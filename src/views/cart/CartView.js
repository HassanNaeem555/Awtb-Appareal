import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  procedureToUpdateIncrementInCart,
  procedureToUpdateDecrementInCart,
} from "../../utils/genericFunction";
import { toggleAuthModal } from "../../store/action/webSettingAction";
import CommonBanner from "../../components/commonBanner";
import {
  updateCart,
  deleteProductFromCart,
} from "../../store/action/cartAction";
import { ImageURL } from "../../utils/custom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user_authenticate = useSelector(({ user_authenticate }) => {
    return user_authenticate.userLogin;
  });
  const user_cart = useSelector(({ user_cart }) => {
    return user_cart.cart;
  });
  const updateMaxExistingCart = (e, product) => {
    e.preventDefault();
    const cartData = procedureToUpdateIncrementInCart(
      user_cart,
      product?.selectedVarientId
    );
    dispatch(updateCart(cartData));
  };
  const updateMinExistingCart = (e, product) => {
    e.preventDefault();
    const cartData = procedureToUpdateDecrementInCart(
      user_cart,
      product?.selectedVarientId
    );
    dispatch(updateCart(cartData));
  };
  const deleteFromCart = (e, id) => {
    e.preventDefault();
    dispatch(deleteProductFromCart(id));
  };
  const toggleLogin = () => {
    toast.warn("Please Login First To Proceed Checkout");
    dispatch(toggleAuthModal());
  };
  const total = user_cart.reduce(function (previousValue, currentValue) {
    return previousValue + currentValue.quantity * currentValue.product_price;
  }, 0);
  return (
    <>
      <CommonBanner img={"cart-sec1"} name={"CART"} />
      <section className="cart-sec-2">
        <div className="container">
          <div className="row">
            <div
              className={
                user_cart.length > 0
                  ? "col-lg-8 col-md-12 col-sm-12 mb-4"
                  : "col-lg-12 col-md-12 col-sm-12 mb-4"
              }
            >
              <div className="cart-list">
                {user_cart.length > 0 ? (
                  user_cart.map((item, index) => {
                    return (
                      <div className="cart-list-item" key={index}>
                        <div className="product-img">
                          <img
                            src={`${ImageURL}product/${item?.product_image}`}
                            className="img-fluid"
                            alt="product"
                          />
                        </div>
                        <div className="product-name">
                          <p className="name">{item?.product_name}</p>
                          <p className="customized-own">
                            {item?.selectedVarientName}
                          </p>
                          <p className="price">${item?.product_price}</p>
                        </div>
                        <div className="product-quantity-wrap y-center">
                          <div className="quaitity-box">
                            <form>
                              <div className="plus-minus">
                                {user_cart.filter(
                                  (e) =>
                                    e?.selectedVarientId ===
                                    item?.selectedVarientId
                                ) &&
                                  user_cart.filter(
                                    (e) =>
                                      e?.selectedVarientId ===
                                      item?.selectedVarientId
                                  )[0]?.quantity > 1 && (
                                    <span
                                      className="minus"
                                      onClick={(e) => {
                                        updateMinExistingCart(e, item);
                                      }}
                                    >
                                      <i className="fa fa-minus"></i>
                                    </span>
                                  )}
                                <input
                                  type="tel"
                                  className="count"
                                  name="qty"
                                  value={item?.quantity}
                                  disabled={true}
                                />
                                {user_cart.length > 0 &&
                                  user_cart.filter(
                                    (e) =>
                                      e?.selectedVarientId ===
                                      item?.selectedVarientId
                                  ) && (
                                    <span
                                      className="plus"
                                      onClick={(e) => {
                                        updateMaxExistingCart(e, item);
                                      }}
                                    >
                                      <i className="fa fa-plus"></i>
                                    </span>
                                  )}
                              </div>
                            </form>
                          </div>
                        </div>
                        <div className="product-action-price y-center">
                          <p>${item?.total_price}.00</p>
                          <button
                            className="remove-cart-item"
                            onClick={(e) => {
                              deleteFromCart(e, item?.selectedVarientId);
                            }}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <section className="section_not_found">
                    <div className="not_fount_content">
                      <h2>We can't find anything</h2>
                      <p className="paragraph mb-4">
                        We're fairly sure that nothing is present in your
                        cart,please buy something and come back here.
                      </p>
                    </div>
                    <button
                      className="cta-btn"
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      BACK TO HOME
                    </button>
                  </section>
                )}
              </div>
            </div>
            {user_cart.length > 0 ? (
              <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="order-summary-card">
                  <div className="summary-group">
                    <p className="title">Order Summary</p>
                  </div>
                  <div className="summary-group">
                    <ul>
                      <li>
                        <span>Subtotal</span>
                        <span>${total}.00</span>
                      </li>
                      <li>
                        <span>Delivery</span>
                        <span>$0.00</span>
                      </li>
                    </ul>
                  </div>
                  <div className="summary-group">
                    <ul>
                      <li>
                        <span className="total">Total (incl VAT)</span>
                        <span>${total}.00</span>
                      </li>
                    </ul>
                    <button
                      className="cta-btn text-center mt-3 w-100"
                      onClick={() => {
                        user_authenticate
                          ? navigate("/checkout")
                          : toggleLogin();
                      }}
                    >
                      Checkout<i className="ms-3 fa fa-chevron-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
