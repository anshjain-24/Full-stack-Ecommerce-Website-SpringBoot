import React from 'react'
import './style_for_this.css'

const PageNoFound = () => {
    return (
        <div className="not-found-container">
            <h1 className="not-found-title">404 - Page Not Found</h1>
            <p className="not-found-message">The page you are looking for does not exist.</p>
        </div>
    )
}

export default PageNoFound