import React from 'react'
import Rating from '@mui/material/Rating';
import CurrenceFormat from '../CurrenceFormat/CurrenceFormat';
import classes from './Product.module.css'
import { Link } from 'react-router-dom'
function ProductCard({ product }) {
    const { image, title, id, rating, price } = product;
    return (
        <div className={classes.card_container}>
            <Link to={`/products/${id}`}>
                <img src={image} alt="" />
            </Link>
            <div>
                <h3>{title}</h3>

                <div className={classes.rating}>
                    <Rating value={rating?.rate || 0} precision={0.1} />
                    <small>{rating?.count || 0}</small>
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