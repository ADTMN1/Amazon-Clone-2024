import React, { useContext } from 'react';
import LayOut from '../../Components/LayOut/LayOut';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/Product/ProductCard';
import CurrenceFormat from '../../Components/CurrenceFormat/CurrenceFormat';
import { Link } from 'react-router-dom';
import classes from './Cart.module.css'

function Cart() {
    const [{ basket, user }, dispatch] = useContext(DataContext);
    const total = basket.reduce((amount, item) => {
        return item.price * item.amount + amount
    }, 0)

    return (
        <LayOut>
            <section className={classes.container}>
                <div className={classes.cart_container}>
                    <h2>Hello</h2>
                    <h3>Your shopping basket</h3>
                    <hr />
                    {
                        basket?.length === 0 ? (
                            <p>Oops! No item in your cart</p>
                        ) : (
                            basket.map((item, i) => (
                                <ProductCard
                                    key={i}
                                    product={item}
                                    renderDescription={true}
                                    flex={true}
                                    renderAdd={false}
                                />
                            ))
                        )
                    }
                </div>
                {basket?.length !== 0 && (
                    <div className={classes.subtotal}>
                        <div>
                            <p>Subtotal ({basket.length} items)</p>
                            <CurrenceFormat amount={total} />
                        </div>
                        <span>
                            <input type="checkbox" />
                            <small>This order contains a gift</small>
                        </span>

                        <Link to="/payments">Continue to Checkout</Link>
                    </div>
                )}
            </section>
        </LayOut>
    );
}

export default Cart;
