import React, { useState } from 'react'
// Components
import SecurityPricesModal from './SecurityPricesModal'
import SecurityModal from './SecurityModal'

export default function Security(props) {

    const [isEditModalOpen, setEditModal] = useState(false)
    const closeEditModal = () => {
        setEditModal(false)
    }

    const [isPricesModalOpen, setPricesModal] = useState(false)
    const closePricesModal = () => {
        setPricesModal(false)
    }
    const security = props.security


    return (
        <div className="security-card">
            <h3>{security.name}</h3>
            <p>{security.ISIN}</p>
            <p>{security.country}</p>
            <button className="prices-link" onClick={() => setPricesModal(true)}>Prices</button>
            <button className="edit-link" onClick={() => setEditModal(true)}>Edit</button>
            <SecurityPricesModal show={isPricesModalOpen}
                security={security}
                addPrice={props.addPrice}
                deletePrice={props.deletePrice}
                editPrice={props.editPrice}
                closePricesModal={closePricesModal}>
                {security}
            </SecurityPricesModal>
            <SecurityModal 
                editASecurity={props.editASecurity}
                deleteASecurity={props.deleteASecurity}
                showEdit={isEditModalOpen}
                closeEditModal={closeEditModal}>
                {security}
            </SecurityModal>
        </div>
    )
}