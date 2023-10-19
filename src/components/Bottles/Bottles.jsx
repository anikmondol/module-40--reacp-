import { useEffect, useState } from "react";
import Bottle from "../Bottle/Bottle";
import './Bottles.css'
import { addToLS, getStoredCart, removeFromLS } from "../../utilites/localstorage";
import Cart from "../Cart/Cart";


const Bottles = () => {
    const [bottles, setBottles] = useState([]);
    const [cart, setCart] = useState([])
    useEffect(() => {
        fetch(`bottles.json`)
            .then(res => res.json())
            .then(data => setBottles(data))
    }, [])

    // load cart from local storage
    useEffect(() => {
        // console.log('called th useEffect', bottles.length);
        if (bottles.length){
            const storedCart = getStoredCart();
            // console.log(storedCart, bottles);

            const saveCart = [];

            for(const id of storedCart){
                // console.log(id);
                const bottle = bottles.find(bottle => bottle.id === id);
                if(bottle){
                    saveCart.push(bottle)
                }
            }
            // console.log('save cart',saveCart);
            setCart(saveCart);
        }
    }, [bottles]);


    const handleAddToCart = bottle => {
        setCart([...cart, bottle]);
        addToLS(bottle.id)
    }

    const handleRemoveFromCart = id =>{
        
        // visual cart remove 
        const remainingCart = cart.filter(bottle => bottle.id !== id);
        setCart(remainingCart)
        // remove from Ls
        removeFromLS(id)
    }


    return (
        <div>
            <h3>Bottles Available: {bottles.length}</h3>
            

            <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart}></Cart>

            <div className="bottle-container">
                {
                    bottles.map((bottle, idx) => <Bottle bottle={bottle} key={idx} handleAddToCart={handleAddToCart}></Bottle>)
                }
            </div>
        </div>
    );
};

export default Bottles;