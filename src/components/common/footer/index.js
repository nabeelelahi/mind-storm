import React from 'react'

function Footer() {
    return (
        <div className="bg-light w-100 d-flex justify-content-center align-items-center border-top mt-5" style={{ height: '8vh' }}>
            <p className="pt-3 text-secondary"> Copyright. All rights reserved <a href="#home" className="fw-bold text-primary">Mindstorm</a> {new Date().getFullYear()}</p>
        </div>
    )
}

export default Footer
