import React, { useContext, useState } from 'react';
import LayOut from '../../Components/LayOut/LayOut'
import classes from "./Payment.module.css"
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/Product/ProductCard';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CurrenceFormat from '../../Components/CurrenceFormat/CurrenceFormat';

function Payment() {
    const [{ user, basket }, dispatch] = useContext(DataContext)
    const totalItem = basket?.reduce((amount, item) => {
        return item.amount + amount
    }, 0)

    const total = basket.reduce((amount, item) => {
        return item.price * item.amount + amount
    }, 0)

    const [cardError, setcardError] = useState(null)
    const stripe = useStripe();
    const elements = useElements();

    const handlechange = (e) => {
        e?.error?.message ? setcardError(e?.error?.message) : setcardError("")
    }

    return (
        <LayOut>
            <div className={classes.payment_header}>
                Checkout ({totalItem}) items
            </div>
            <section className={classes.payment}>

                <div className={classes.flex}>
                    <h3>  Delivery Address</h3>
                    <div>
                        <h3>{user?.email}</h3>
                        <h3>bole,01 street</h3>
                        <h3>Addis Ababa</h3>
                    </div>
                </div>
                <hr />
                <div className={classes.flex}>
                    <h3>Review items and Delivery</h3>
                    <div>
                        {basket?.map((item) => (
                            <ProductCard key={item.id} product={item} flex={true} />
                        ))};

                    </div>
                </div>
                <hr />

                <div className={classes.flex}>
                    <h3>Payment method</h3>

                    <div className={classes.payment_card_container}>
                        <div className={classes.payment__details}>
                            <form action="">
                                {cardError && <small style={{ color: "red" }}>{cardError}</small>}
                                <CardElement onChange={
                                    handlechange
                                } />
                                <div className={classes.payment__price}>
                                    <div>
                                        <span style={{ display: "flex", gap: "10px" }}>
                                            <p> Total Order |</p> <CurrenceFormat amount={total} />
                                        </span>
                                    </div>
                                    <button>Pay Now</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>


            </section>

        </LayOut >
    )
}

export default Payment