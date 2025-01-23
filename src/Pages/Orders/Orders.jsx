import React, { useContext, useEffect, useState } from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import { db } from '../../Utility/fireBase'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import classes from './Order.module.css';
import ProductCard from '../../Components/Product/ProductCard';

function Orders() {

    const [{ user }, dispatch] = useContext(DataContext);
    const [orders, setOrders] = useState([])

    useEffect(() => {
        if (user) {
            db.collection("users")
                .doc(user.uid)
                .collection("orders")
                .orderBy("created", "desc")
                .onSnapshot((snapshot) => {
                    setOrders(
                        snapshot.docs.map((doc) => ({
                            id: doc.id
                            ,
                            data: doc.data(),
                        }))
                    )
                });
        } else {
            setOrders([])
        }
    }, [user]);

    return (
        <LayOut>
            <section className={classes.container}>
                <div className={classes.orders_container}>
                    <h2>Your Orders</h2>

                    {
                        orders?.length == 0 && <div style={{ padding: "20px" }}>
                            You don't have orders yet.
                        </div>
                    }

                    <div>
                        {orders?.map((eachOrder, i) => {
                            return (
                                <div>
                                    <hr />
                                    <p>Orders ID:{eachOrder?.id}</p>
                                    {eachOrder?.data?.basket?.map((order) => (
                                        <ProductCard flex={true} product={order} key={order.id} />
                                    ))}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </LayOut >
    )
}

export default Orders