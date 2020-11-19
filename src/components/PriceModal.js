import React, { useEffect, useState } from 'react';

export default function PriceModal(props) {

    //state to capture form data 
    const [formData, setFormData] = useState({
        date: '',
        amount: 0,
    })
    // Depending on Edit or Add, change the form data
    useEffect(() => {
        if (props.showEditPrice) {
            setFormData({
                date: `${props.children.date}`,
                amount: props.price.amount,
            })
        } else {
            setFormData({
                date: '',
                amount: 0
            })
        }
    }, [props])

    const setValue = (key, value) => {
        setFormData({ ...formData, [key]: value })
    }

    const handleAddPrice = (e, security, newPrice) => {
        props.addPrice(e, security, newPrice)
        props.closePrice()
    }

    const handleEditPrice = (e, selectedSecurity, selectedPrice, newPrice) => {
        props.editPrice(e, selectedSecurity, selectedPrice, newPrice)
        props.closePrice()
    }

    //define ADD or EDIT mode 
    let display = {}
    let addOrEdit = null;
    if (props.showEditPrice === true) {
        display = {
            title: `Edit Price`,
        }
        addOrEdit = ((e) => handleEditPrice(e, props.security, props.children,formData))
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
                <form onSubmit={(e) => addOrEdit(e)}>
                    <div className="name-input">
                        <label htmlFor="date">Date</label>
                        <br />
                        <input required type="text" id="date" name="date" value={formData.date}
                            onChange={(e) => setValue("date", e.target.value)}></input>
                    </div>
                    <div className="ISIN-input">
                        <label htmlFor="amount">Amount</label>
                        <br />
                        <input required type="number" id="amount" name="amount" min="1" value={formData.amount}
                            onChange={(e) => setValue("amount", parseInt(e.target.value))}></input>
                    </div>
                    <button type="submit">Submit</button>
                </form>
                <button onClick={() => props.closePrice()}>Close</button>
            </div>
        </div>
    )
}
{/* <PriceModal
price={selectedPrice}
security={props.security}
showAddPrice={showAddPrice}
showEditPrice={showEditPrice}
addPrice={props.addPrice}
editPrice={props.editPrice}
closePrice={closePrice}
></PriceModal> */}
// $("#myeditablediv").keypress(function(e) {
//     if (isNaN(String.fromCharCode(e.which))) e.preventDefault();
// });
