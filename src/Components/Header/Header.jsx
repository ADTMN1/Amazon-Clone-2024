import React from 'react'
import { BsSearch } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { BiCart } from "react-icons/bi";
import classes from "./Header.module.css"
import LowerHeader from './LowerHeader';


function Header() {
    return (
        <section>
            <div className={classes.header_container}>
                <div className={classes.logo_container} >
                    <a href="#">
                        <img src="https://pngimg.com/uploads/amazon/amazon_PNG25.png" alt="amazon logo" />
                    </a>

                    <div className={classes.delivery}>
                        <span>
                            {<SlLocationPin />}
                        </span>


                        <div>
                            <p>Deliver to</p>
                            <span>Ethiopia</span>
                        </div>
                    </div>
                </div>

                <div className={classes.search}>
                    <select name="" id=""><option value="">All</option></select>
                    <input type="text" name='' id='' placeholder='search product' />
                    {<BsSearch size={25} />}
                </div>

                <div className={classes.order_container}>
                    <a href="#" className={classes.language}>
                        <img src="https://st2.depositphotos.com/8451324/42301/i/450/depositphotos_423018560-stock-photo-flag-united-states-america.jpg" alt="" />
                        <select name="" id=""><option value="">EN</option></select>

                    </a>

                    <a href="#" className={classes.account}>

                        <p>sign in</p>
                        <span>Account & Lists</span>

                    </a>

                    <a href="#" className={classes.return}>
                        <p>Return</p>
                        <span>& Orders</span>

                    </a>

                    <a href="#" className={classes.cart}>
                        {<BiCart size={35} />}
                        <span>0</span>
                    </a>

                </div>
            </div>
            <LowerHeader />
        </section >


    )
}

export default Header