import React, { useState, useEffect } from 'react';

export default function SecurityPricesModal(props) {

    const [editable, setEditable] = useState(false)
    const [clickedPrice, setClickPrice] = useState({
        price: {},
        style: {
            color: ''
        }
    })
    //consider adding useEffect to rerender updated prices
    const [myPrices, setPrices] = useState(props.children.prices)
    useEffect(() => {
        setPrices(props.children.prices)
    }, [props])

    //updates the entire array of prices
    const handleDateInput = (e, selectedPrice, newDate) => {
        let priceIndex = myPrices.findIndex(price => myPrices.indexOf(price) === myPrices.indexOf(selectedPrice))
        myPrices[priceIndex].date = newDate
    }
    const handleAmountInput = (e, selectedPrice, newAmount) => {
        let priceIndex = myPrices.findIndex(price => myPrices.indexOf(price) === myPrices.indexOf(selectedPrice))
        myPrices[priceIndex].amount = parseInt(newAmount)
    }
    const numbersOnly = (e) => {
        if (e.charCode < 48 || e.charCode > 57) {
            e.preventDefault()
            return false;
        }
    }
    //submits that array when the modal is closed 
    const handleClose = (e) => {
        props.editPrice(e, props.security, myPrices)
        props.addPrice(e, props.security, myPrices)
        props.closePricesModal(e)
    }

    const handleEditClick = (price) => {
        setClickPrice({
            price: price,
            style: {
                color: "blue"
            }
        })
        setEditable(true)
    }

    if (props.show === false) {
        return null;
    }
    return (
        <div className="prices-modal">
            <div className="modal-content">
                <div className="top-modal-wrapper">
                    <header>Prices</header>
                    <div className="prices-div">
                        {myPrices.map((price, index) => (
                            <div key={index} className="price-row">
                                <p
                                    onKeyPress={(e) => numbersOnly(e)}
                                    contentEditable={editable && clickedPrice.price === price}
                                    onInput={(e) => handleDateInput(e, price, e.target.innerText)}
                                >{price.date}</p>
                                <p
                                    onKeyPress={(e) => numbersOnly(e)}
                                    contentEditable={editable && clickedPrice.price === price}
                                    onInput={(e) => handleAmountInput(e, price, e.target.innerText)}
                                >{price.amount}</p>
                                <button onClick={() => handleEditClick(price)}>Edit</button>
                                <button onClick={(e) => props.deletePrice(e, props.security, price)}>x</button>
                            </div>
                        ))}
                    </div>
                    <button onClick={(e) => handleClose(e)}>+ Add</button>
                </div>
                <div className="prices-close-div">
                    <button className="prices-close-btn" onClick={(e) => handleClose(e)}>Close</button>
                </div>
            </div>
        </div>
    )
}
