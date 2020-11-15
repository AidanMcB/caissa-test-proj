import React, { useState } from 'react';

export default function PriceModal(props) {
    //should have edit mode or add mode 
    //check if the prop passed was a single security
    //possible by checking for a name attribute
    // console.log(props.closeEditModal)

    //state to capture form data 
    const [formData, setFormData] = useState({
        date: '',
        amount: null,

    })
    const setValue = (key, value) => {
        setFormData({ ...formData, [key]: value })
    }

    const handleSubmit = (e, security, newPrice) => {
        props.addPrice(e, security, newPrice)
        props.closePrice()
    }
    if (props.showPrice === false) {
        return null;
    }
    return (
        <div className="prices-modal">
            <div className="modal-content">
                <h1>Edit/Add Price</h1>
                <form onSubmit={(e) => handleSubmit(e, props.security, formData)}>
                    <div className="name-input">
                        <label htmlFor="date">Date</label>
                        <br />
                        <input type="text" id="date" name="date"
                            onChange={(e) => setValue("date", e.target.value)}></input>
                    </div>
                    <div className="ISIN-input">
                        <label htmlFor="amount">Amount</label>
                        <br />
                        <input type="number" id="amount" name="amount" min="1"
                            onChange={(e) => setValue("amount", e.target.value)}></input>
                    </div>
                    <button type="submit">Submit</button>
                </form>
                <button onClick={() => props.closePrice()}>Close</button>
            </div>
        </div>
    )
}
