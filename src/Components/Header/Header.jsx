import React, { useContext } from 'react'
import { BsSearch } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { BiCart } from "react-icons/bi";
import classes from "./Header.module.css"
import LowerHeader from './LowerHeader';
import { Link } from 'react-router-dom'
import { DataContext } from '../DataProvider/DataProvider';
import { auth } from '../../Utility/fireBase';
function Header() {

    const [{ user, basket }, dispatch] = useContext(DataContext)
    const totalItem = basket?.reduce((amount, item) => {
        return item.amount + amount
    }, 0)

    return (
        <section className={classes.fixed}>

            <section>
                <div className={classes.header_container}>
                    <div className={classes.logo_container} >
                        <Link to="/">
                            <img src="https://pngimg.com/uploads/amazon/amazon_PNG25.png" alt="amazon logo" />
                        </Link>

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
                        {<BsSearch size={42} />}
                    </div>

                    <div className={classes.order_container}>
                        <Link to="" className={classes.language}>
                            <img src="https://st2.depositphotos.com/8451324/42301/i/450/depositphotos_423018560-stock-photo-flag-united-states-america.jpg" alt="" />
                            <select name="" id=""><option value="">EN</option></select>

                        </Link>

                        <Link to={!user && "/auth"} className={classes.account}>
                            <div>
                                {

                                    user ? (
                                        <>
                                            <p>Hello {user?.email?.split('@')[0]}</p>
                                            <span onClick={() => auth.signOut()}>Sign Out</span>

                                        </>
                                    ) : (
                                        <>

                                            <p>Hello Sign In</p>
                                            <span>Account & Lists</span>
                                        </>

                                    )

                                }
                            </div>

                        </Link>

                        <Link to="/orders" className={classes.return}>
                            <p>Return</p>
                            <span>& Orders</span>

                        </Link>

                        <Link to="/cart" className={classes.cart}>
                            {<BiCart size={35} />}
                            <span>{totalItem}</span>
                        </Link>

                    </div>
                </div>
                <LowerHeader />
            </section >

        </section>

    )
}

export default Header