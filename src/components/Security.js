import React, { useState } from 'react'
import SecurityPrices from './SecurityPrices'

export default function Security() {

    const [isModalOpen, setModal] = useState(false)

    const closeModal = () => {
        setModal(false)
    }

    const sampleSecurity = {
        name: 'Apple',
        ISIN: 'US0004026250',
        country: 'Sweden',
        prices: [
            { date: "01/01/19", amount: 900, id: 1 },
            { date: "01/02/19", amount: 700, id: 2 },
            { date: "01/03/19", amount: 500, id: 3 },
            { date: "01/04/19", amount: 600, id: 4 },
            { date: "01/05/19", amount: 600, id: 5 },
            { date: "01/06/19", amount: 400, id: 6 },
            { date: "01/01/19", amount: 900, id: 7 },
            { date: "01/02/19", amount: 700, id: 8 },
            { date: "01/03/19", amount: 500, id: 9 },
            { date: "01/04/19", amount: 600, id: 10 },
            { date: "01/05/19", amount: 600, id: 11 },
            { date: "01/06/19", amount: 400, id: 12 }
        ]
    }



    return (
        <div className="security-card">
            <h3>{sampleSecurity.name}</h3>
            <p>{sampleSecurity.ISIN}</p>
            <p>{sampleSecurity.country}</p>
            <p className="prices-link" onClick={() => setModal(true)}>Prices</p>
            <p><a href="#">Edit</a></p>
            <SecurityPrices show={isModalOpen}
                closeModal={closeModal}>
                {sampleSecurity}
            </SecurityPrices>
        </div>
    )
}