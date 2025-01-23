import React, { useContext, useState } from 'react';
import LayOut from '../../Components/LayOut/LayOut';
import classes from "./Payment.module.css";
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/Product/ProductCard';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CurrenceFormat from '../../Components/CurrenceFormat/CurrenceFormat';
import { axiosInstance } from '../../Api/Axios';
import { ClipLoader } from 'react-spinners'
import { db } from '../../Utility/fireBase';
import { useNavigate } from 'react-router-dom';
import { Type } from '../../Utility/action.type';

function Payment() {
    const [{ user, basket }, dispatch] = useContext(DataContext);
    const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);
    const total = basket.reduce((amount, item) => item.price * item.amount + amount, 0);
    const [cardError, setCardError] = useState(null);
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
    };
    const handlePayment = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axiosInstance({
                method: "POST",
                url: `/payment/create?total=${total * 100}`,
            });
            const clientSecret = response?.data?.clientSecret;

            if (!clientSecret) {
                setIsLoading(false);
                return;
            }
            const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });
            if (paymentIntent.error) {
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }

            await db.collection("users").doc(user.uid).collection("orders").doc(paymentIntent.id).set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created,
            })

            dispatch({ type: Type.EMPTY_BASKET })

            navigate("/orders", { state: { msg: "you have placed new order" } })
        } catch (error) {
            setIsLoading(false);
        }
    }
    return (
        <LayOut>
            <div className={classes.payment_header}>
                Checkout ({totalItem}) items
            </div>
            <section className={classes.payment}>
                <div className={classes.flex}>
                    <h3>Delivery Address</h3>
                    <div>
                        <h3>{user?.email}</h3>
                        <h3>bole, 01 street</h3>
                        <h3>Addis Ababa</h3>
                    </div>
                </div>
                <hr />
                <div className={classes.flex}>
                    <h3>Review items and Delivery</h3>
                    <div>
                        {basket?.map((item) => (
                            <ProductCard key={item.id} product={item} flex={true} />
                        ))}
                    </div>
                </div>
                <hr />
                <div className={classes.flex}>
                    <h3>Payment method</h3>
                    <div className={classes.payment_card_container}>
                        <div className={classes.payment__details}>
                            <form onSubmit={handlePayment}>
                                {cardError && <small style={{ color: "red" }}>{cardError}</small>}
                                <CardElement onChange={handleChange} />
                                <div className={classes.payment__price}>
                                    <div>
                                        <span style={{ display: "flex", gap: "10px" }}>
                                            <p>Total Order |</p> <CurrenceFormat amount={total} />
                                        </span>
                                    </div>
                                    <button type='submit' disabled={!stripe}>
                                        {
                                            isLoading ? (
                                                <div className={classes.loading}>
                                                    <ClipLoader color='#000' size={15} />
                                                    <p>Please wait...</p>
                                                </div>) :
                                                "Pay Now"
                                        }

                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </LayOut>
    );
}

export default Payment;
