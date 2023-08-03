import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './contextReducer';

export default function Card(props) {

    const data = useCart();
    const priceref = useRef();
    const dispatch = useDispatchCart();

    let options = props.options[0];
    let priceOption = Object.keys(options);

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");

    const handleAddtoCart = async () => {
        await dispatch({
            type: "ADD",
            img:props.fooditem.img,
            id: props.fooditem._id,
            name: props.fooditem.name,
            price: finalprice,
            qty: qty,
            size: size
        })
        console.log(data);
    }

    let finalprice = qty*parseInt(options[size]);
    useEffect(()=>{
        setSize(priceref.current.value)
    },[])
    return (
        <div>
            <div className="card mt-2" style={{ "width": "18rem", "maxHeight": "500px" }}>
                <img src={props.fooditem.img} className="card-img-top" alt="..." style={{ height: "200px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.fooditem.name}</h5>
                    <p className="card-text">This is content.</p>
                    <div className='w-100'>
                        <select className='m-2 h-100 bg-success rounded' onClick={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>
                        <select className='m-2 h-100 bg-success rounded' ref={priceref} onClick={(e) => setSize(e.target.value)}>
                            {
                                priceOption.map((data) => {
                                    return <option key={data} value={data}>{data}</option>
                                })
                            }
                        </select>
                        <div className='d-inline h-100 fs-5'>
                            ₹{finalprice}/-
                        </div>
                        <hr />
                        <button className='btn btn-success justify-center ms-2' onClick={handleAddtoCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
