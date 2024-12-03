// CheckoutPage.js
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import ErrorMessages from '../components/ErrorMassages';
import '../styles/CheckoutPage.css';

const validationSchema = Yup.object({
    firstName: Yup.string()
        .max(20, 'Maximum 20 characters')
        .matches(/^[a-zA-Z]+$/, 'Only letters allowed')
        .required('First name is required'),
    lastName: Yup.string()
        .max(20, 'Maximum 20 characters')
        .matches(/^[a-zA-Z]+$/, 'Only letters allowed')
        .required('Last name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .test(
            'is-valid-domain',
            'Invalid email domain format',
            (value) => {
                if (!value) return false;
                const domainRegex = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
                const domain = value.split('@')[1]; 
                return domainRegex.test(domain);
            }
        )
        .required('Email is required'),
    phone: Yup.string()
        .matches(/^[0-9]+$/, 'Only numbers allowed')
        .required('Phone number is required'),
    address: Yup.string()
        .max(50, 'Maximum 50 characters')
        .required('Address is required'),
});

const CheckoutPage = () => {
    const navigate = useNavigate();

    return (
        <div className="checkout-page">
            <h2 className="checkout-title">Checkout</h2>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    address: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    navigate('/success');
                }}
            >
                {({ errors, touched }) => (
                    <Form className="checkout-form">
                        <div className="form-group">
                            <Field name="firstName" type="text" placeholder="First Name" />
                            <ErrorMessages message={touched.firstName && errors.firstName} />
                        </div>

                        <div className="form-group">
                            <Field name="lastName" type="text" placeholder="Last Name" />
                            <ErrorMessages message={touched.lastName && errors.lastName} />
                        </div>

                        <div className="form-group">
                            <Field name="email" type="email" placeholder="Email" />
                            <ErrorMessages message={touched.email && errors.email} />
                        </div>

                        <div className="form-group">
                            <Field name="phone" type="text" placeholder="Phone" />
                            <ErrorMessages message={touched.phone && errors.phone} />
                        </div>

                        <div className="form-group">
                            <Field name="address" type="text" placeholder="Address" />
                            <ErrorMessages message={touched.address && errors.address} />
                        </div>

                        <div className="checkout-buttons">
                            <button type="button" onClick={() => navigate(-1)} className="go-back-btn">Go Back</button>
                            <button type="submit" className="continue-btn">Continue</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CheckoutPage;
