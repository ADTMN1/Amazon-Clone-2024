import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './Pages/Landing/Landing';
import Payment from './Pages/Payment/Payment';
import Orders from './Pages/Orders/Orders';
import Cart from './Pages/Cart/Cart';
import Results from './Pages/Results/Results';
import ProductDetail from './Pages/ProductDetail/ProductDetail';
import Auth from './Pages/Auth/Auth';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
const stripePromise = loadStripe('pk_test_51QhtETAHN6T75PjPTetCuIUwpRpsECZvrUAJzgyU9YrVbaVbC7uzUcr6Lsc62PgryfxL0qNIGMcESPVGuHf9xXYm00RxLRiAK0');

function Routing() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/auth' element={<Auth />} />
                <Route path='/payment' element={

                    <ProtectedRoute redirect="/orders"
                        msg="You must log in to access your orders">
                        <Elements stripe={stripePromise}>
                            <Payment />
                        </Elements>
                    </ProtectedRoute>

                } />
                <Route path='/orders' element={<Orders />} />
                <Route path='/category/:categoryName' element={<Results />} />
                <Route path='/products/:productId' element={<ProductDetail />} />
                <Route path='/cart' element={<Cart />} />

            </Routes>
        </Router>
    )
}

export default Routing