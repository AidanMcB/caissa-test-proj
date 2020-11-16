import React, { useState } from 'react';

export default function PriceModal(props) {

    //state to capture form data 
    const [formData, setFormData] = useState({
        date: `${props.children.date}`,
        amount: props.price.amount,

    })
    const setValue = (key, value) => {
        setFormData({ ...formData, [key]: value })
    }

    const handleAddPrice = (e, security, newPrice) => {
        props.addPrice(e, security, newPrice)
        props.closePrice()
    }

    console.log(props.children.date)
    console.log(formData.date)
    //define ADD or EDIT mode 
    let display = {}
    let addOrEdit = null;
    let closeModal = null;
    if (props.showEditPrice === true) {
        display = {
            title: `Edit Price`,
        }
        // addOrEdit = ((e) => editAndClose(e, formData, props.children ))
    } else if (props.showAddPrice === true) {
        display = {
            title: 'Add Price',
        }
        addOrEdit = ((e) => handleAddPrice(e, props.security, formData))
    }

    if (props.showAddPrice === false && props.showEditPrice === false) {
        return null;
    }
    return (
        <div className="prices-modal">
            <div className="modal-content">
                <h1>{display.title}</h1>
                <form onSubmit={(e) => addOrEdit(e, props.security, formData)}>
                    <div className="name-input">
                        <label htmlFor="date">Date</label>
                        <br />
                        <input type="text" id="date" name="date" value={formData.date}
                            onChange={(e) => setValue("date", e.target.value)}></input>
                    </div>
                    <div className="ISIN-input">
                        <label htmlFor="amount">Amount</label>
                        <br />
                        <input type="number" id="amount" name="amount" min="1" value={formData.amount}
                            onChange={(e) => setValue("amount", e.target.value)}></input>
                    </div>
                    <button type="submit">Submit</button>
                </form>
                <button onClick={() => props.closePrice()}>Close</button>
            </div>
        </div>
    )
}
