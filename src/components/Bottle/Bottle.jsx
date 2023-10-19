import './Bottle.css';
import PropTypes, { func, object } from 'prop-types'


const Bottle = ({bottle, handleAddToCart}) => {
    const {name, img, price} = bottle;
    return (
        <div className="bottle">
            <h3>Bottles: {name}</h3>
            <img src={img} alt="" />
            <p>Price: $${price}</p>
            <button className='button' onClick={()=>handleAddToCart(bottle)}>Perseus</button>
        </div>
    );
};

Bottle.propTypes = {
    bottle: object.isRequired,
    handleAddToCart: func.isRequired
}

export default Bottle;