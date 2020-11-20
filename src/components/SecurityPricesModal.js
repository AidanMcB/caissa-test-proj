import React, { useState, useEffect } from 'react';

export default function SecurityPricesModal(props) {

    const [editable, setEditable] = useState(false)
    const [newPrice, setNewPrice] = useState({
        date: '',
        amount: 0
    })
    const [addPriceDisplay, setAddPriceDisplay] = useState(false)
    const [clickedPrice, setClickPrice] = useState({
        price: {},
    })

    const [myPrices, setPrices] = useState(props.children.prices)
    useEffect(() => {
        setPrices(props.children.prices)
    }, [props])

    //replaces selected date with new date
    const handleDateInput = (e, selectedPrice, newDate) => {
        let priceIndex = myPrices.findIndex(price => myPrices.indexOf(price) === myPrices.indexOf(selectedPrice))
        myPrices[priceIndex].date = newDate
    }
    //replaces selected amount with new amount
    const handleAmountInput = (e, selectedPrice, newAmount) => {
        let priceIndex = myPrices.findIndex(price => myPrices.indexOf(price) === myPrices.indexOf(selectedPrice))
        myPrices[priceIndex].amount = parseInt(newAmount)
    }
    //validation for only numbers in amount
    const numbersOnly = (e) => {
        if (e.charCode < 48 || e.charCode > 57) {
            e.preventDefault()
            return false;
        }
    }
    //validation for only numbers and / in date
    const datesOnly = (e) => {
        if (e.charCode < 47 || e.charCode > 57) {
            e.preventDefault()
            return false;
        }
    }
    
    //updates the state in the parent component when modal is closed
    const handleClose = (e) => {
        props.editPrice(e, props.security, myPrices)
        props.closePricesModal(e)
        setAddPriceDisplay(false)
    }

    //selects price to be edited, only one can be edited at a time
    const handleEditClick = (price) => {
        setAddPriceDisplay(false)
        setClickPrice({
            price: price,
        })
        setEditable(true)
    }

    //passed the new price to the parent and closes the input
    const handleAddPrice = (e) => {
        props.addPrice(e, props.security, newPrice)
        setAddPriceDisplay(false)
    }

    //only show this component if it is set to show = true
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
                                <p suppressContentEditableWarning={true}
                                    onKeyPress={(e) => datesOnly(e)}
                                    contentEditable={editable && clickedPrice.price === price}
                                    onInput={(e) => handleDateInput(e, price, e.target.innerText)}
                                >{price.date}</p>
                                <p suppressContentEditableWarning={true}
                                    onKeyPress={(e) => numbersOnly(e)}
                                    contentEditable={editable && clickedPrice.price === price}
                                    onInput={(e) => handleAmountInput(e, price, e.target.innerText)}
                                >{price.amount}</p>
                                <button onClick={() => handleEditClick(price)}>Edit</button>
                                <button onClick={(e) => props.deletePrice(e, props.security, price)}>x</button>
                            </div>
                        ))}
                    </div>
                    {addPriceDisplay === false ?
                        <button className="conditional-btn" onClick={() => setAddPriceDisplay(true)}>+ Add</button>
                        :
                        <div className="add-price-row">
                            <input
                                required
                                placeholder="date"
                                onKeyPress={(e) => datesOnly(e)}
                                contentEditable={true}
                                onChange={(e) => setNewPrice({ ...newPrice, date: e.target.value })}
                            ></input>
                            <input
                                required
                                placeholder="price"
                                onKeyPress={(e) => numbersOnly(e)}
                                contentEditable={true}
                                onChange={(e) => setNewPrice({ ...newPrice, amount: e.target.value })}
                            ></input>
                            <button onClick={(e) => handleAddPrice(e)}>+ Add</button>
                        </div>
                    }
                </div>
                <div className="prices-close-div">
                    <button className="prices-close-btn" onClick={(e) => handleClose(e)}>Close</button>
                </div>
            </div>
        </div>
    )
}
