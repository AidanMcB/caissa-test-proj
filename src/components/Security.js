import React from 'react'

export default function Security() {

    const sampleSecurity = {
        name: 'Apple',
        ISIN: 'US0004026250',
        country: 'Sweden'
    }

    return (
        <div className="security-card">
            <h3>{sampleSecurity.name}</h3>
            <p>{sampleSecurity.ISIN}</p>
            <p>{sampleSecurity.country}</p>
            <p><a href="#">Prices</a></p>
            <p><a href="#">Edit</a></p>
        </div>
    )
}