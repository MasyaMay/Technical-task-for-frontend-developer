import React from 'react';
import img from './error.jpg'

const ErrorMessage = () => {
    return (
        <div className="alert alert-danger w-100" role="alert">
            <img src={img} alt='error' className="w-100 p-4"></img>
            <div className="mx-auto d-table">Это уведомление об <span href="#" className="alert-link">ошибке</span>.</div>
        </div>
    )
}

export default ErrorMessage;