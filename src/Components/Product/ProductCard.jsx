import React from 'react'
import Rating from '@mui/material/Rating';
import CurrenceFormat from '../CurrenceFormat/CurrenceFormat';
import classes from './Product.module.css'
function ProductCard({ product }) {
    const { image, title, id, price, rating } = product;
    return (
        <div className={classes.card_container}>
            <a href="">
                <img src={image} alt="" />
            </a>
            <div>
                <h3>{title}</h3>

                <div className={classes.rating}>
                    <Rating value={rating.rate} precision={0.1} />
                    <small>{rating.count}</small>
                </div>
                <div>
                    <CurrenceFormat amount={price} />
                </div>
                <button className={classes.button}>
                    add to cart
                </button>
            </div>
        </div>
    )
}

export default ProductCard