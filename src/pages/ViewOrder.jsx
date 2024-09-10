import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";


const OrderDetailsPage = () => {
    const params = useParams();
    const firebase = useFirebase();

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        firebase.getOrders(params.bookId).then(orders => setOrders(orders.docs));
    });




    return (
        <div className="orders mt-5">
            <h2 style={{textAlign: 'center', fontWeight: 'bolder'}}>Orders</h2>
            
                {
                    orders.map(order => {
                        const data = order.data();
                        
                        return (
                            <div className="container mt-3" key={order.id} style={{border: "1px solid", borderRadius: "10px", backgroundColor: 'white', padding: '2%', color: 'black', boxShadow: 'rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset'}}>
                                <h5>Order By: {data.displayName}</h5>
                                <h6>Quantity: {data.qty}</h6>
                                <h6>Price: {data.price}</h6>
                                <h6>Customer Email: {data.userEmail}</h6>
                            </div>
                        )
                    })
                }
            
        </div>
    );
}

export default OrderDetailsPage;