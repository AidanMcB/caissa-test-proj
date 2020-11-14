import React, { useState } from 'react';
import Security from './Security'
import SecurityModal from './SecurityModal'

export default function SecuritiesList() {

    const [isAddModalOpen, setAddModal] = useState(false)
    const closeAddModal = () => {
        setAddModal(false)
    }

    //write add func here

    // where do securities come from?
    //10

    return (
        <div className="securities-list">
            <Security />
            <Security />
            <Security />
            <Security />
            <Security />
            <button className="add-security-btn"
                onClick={() => console.log("add security")}>Add
            </button>
            <SecurityModal 
                showAdd={isAddModalOpen}
                closeAddModal={closeAddModal}>
            </SecurityModal>

        </div>
    )
}