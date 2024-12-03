// SuccessPage.js
import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import '../styles/SuccessPage.css'; 
import { emptyCart } from '../redux/cartAction';

const SuccessPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(emptyCart());
        }, [dispatch]);

    return (
        <div className="success-page">
            <img src="success.png" alt="Success" className="success-icon" />
            <h2 className="success-title">Success!</h2>
            <p>Your order was sent to processing!<br/> Check your email box for further information.</p>
            <button onClick={() => navigate('/catalog')} className="back-to-catalog-btn">Go back to Catalog</button>
        </div>
    );
};

export default SuccessPage;
