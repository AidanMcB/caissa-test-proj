import React from 'react';

export default function SecurityPrices(props) {

    const prices = props.children.prices
    console.log(prices)
    if (props.show === false) {
        return null;
    }

    return (
        <div className="prices-modal">
            <div className="modal-content">
                <div className="top-modal-wrapper">
                    <header>Prices</header>
                    <div className="prices-div">
                        {prices.map(price => (
                            <div key={price.id} className="price-row">
                                <p>{price.date}</p>
                                <p>{price.amount}</p>
                                <p>Edit</p>
                                <p>x</p>
                            </div>
                        ))}
                    </div>
                    <p>+ Add</p>
                </div>
                <div className="prices-close-div">
                    <p className="prices-close-btn" onClick={() => props.closeModal()}>Close</p>
                </div>
            </div>
        </div>
    )
}
