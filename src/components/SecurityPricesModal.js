import React, { useState } from 'react';
import PriceModal from './PriceModal'

export default function SecurityPricesModal(props) {

    const [selectedPrice, setPrice] = useState({})
    const [showAddPrice, setAddPrice] = useState(false)
    const [showEditPrice, setEditPrice] = useState(false)
    const closePrice = () => {
        setAddPrice(false)
        setEditPrice(false)
    }

    const handleEditClick = (price) => {
        setPrice(price)
        setEditPrice(true)
    }


    const prices = props.children.prices
    
    if (props.show === false) {
        return null;
    }
    return (
        <div className="prices-modal">
            <div className="modal-content">
                <div className="top-modal-wrapper">
                    <header>Prices</header>
                    <div className="prices-div">
                        {prices.map((price, index) => (
                            <div key={index} className="price-row">
                                <p>{price.date}</p>
                                <p>{price.amount}</p>
                                <p onClick={() => handleEditClick(price)}>Edit</p>
                                <p onClick={(e) => props.deletePrice(e, props.security, price)}>x</p>
                            </div>
                        ))}
                    </div>
                    <p onClick={() => setAddPrice(true)}>+ Add</p>
                </div>
                <div className="prices-close-div">
                    <p className="prices-close-btn" onClick={() => props.closePricesModal()}>Close</p>
                </div>
            </div>
            <PriceModal 
                price={selectedPrice}
                security={props.security}
                showAddPrice={showAddPrice}
                showEditPrice={showEditPrice}
                addPrice={props.addPrice}
                editPrice={props.editPrice}
                closePrice={closePrice}
                >{selectedPrice}</PriceModal>

        </div>
    )
}
