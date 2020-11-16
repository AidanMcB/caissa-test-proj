import React, { useState } from 'react';
import PriceModal from './PriceModal'

export default function SecurityPricesModal(props) {

    
    const [isPriceOpen, setPriceOpen] = useState(false)
    const closePrice = () => {
        setPriceOpen(false)
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
                                <p>Edit</p>
                                <p onClick={(e) => props.deletePrice(e, props.security, price)}>x</p>
                            </div>
                        ))}
                    </div>
                    <p onClick={() => setPriceOpen(true)}>+ Add</p>
                </div>
                <div className="prices-close-div">
                    <p className="prices-close-btn" onClick={() => props.closePricesModal()}>Close</p>
                </div>
            </div>
            <PriceModal 
                security={props.security}
                showPrice={isPriceOpen}
                addPrice={props.addPrice}
                closePrice={closePrice}
                ></PriceModal>

        </div>
    )
}
