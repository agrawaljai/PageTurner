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
        <div className="container mt-5">
            <h1>Orders</h1>
            
                {
                    orders.map(order => {
                        const data = order.data();
                        
                        return (
                            <div className="container mt-3" key={order.id} style={{border: "1px solid", borderRadius: "10px"}}>
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