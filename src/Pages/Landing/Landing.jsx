import React from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import Carousel from '../../Components/Carousel/CarouselEffect'
import Category from '../../Components/Catagory/Category'
import Product from '../../Components/Product/Product'
function Landing() {
    return (
        <LayOut>
            <Carousel />
            <Category />
            <Product />
        </LayOut>
    )
}

export default Landing