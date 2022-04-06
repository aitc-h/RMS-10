import React from 'react';
import { useCart } from './state/cartContext';
import useCheckout, { STATUS } from './state/useCheckout';

const COUNTRIES = ['China', 'India', 'United Kingdom', 'USA'];

export default function Checkout() {
  const { dispatch } = useCart();
  const {
    address,
    status,
    saveError,
    touched,
    onAddressChange,
    onAddressBlur,
    onAddressSubmit,
    errors,
    isValid,
  } = useCheckout(dispatch);

  if (saveError) throw saveError;

  if (status === STATUS.COMPLETED) {
    return <h1>Order completed</h1>;
  }

  const ErrorsAlert = () => {
    return !isValid && status === STATUS.SUBMITTED ? (
      <div role="alert">
        <p>Please fix the following errors:</p>
        <ul>
          {Object.keys(errors).map((key) => (
            <li key={key}>{errors[key]}</li>
          ))}
        </ul>
      </div>
    ) : null;
  };

  const Error = ({ field }) => (
    <p role="alert">
      {(touched[field] || status === STATUS.SUBMITTED) && errors[field]}
    </p>
  );

  return (
    <>
      <h1>Shipping Info</h1>
      <ErrorsAlert />
      <form onSubmit={onAddressSubmit}>
        <div>
          <label htmlFor="city">City</label>
          <br />
          <input
            id="city"
            type="text"
            value={address.city}
            onBlur={onAddressBlur}
            onChange={onAddressChange}
          />
          <Error field="city" />
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <br />
          <select
            id="country"
            value={address.country}
            onBlur={onAddressBlur}
            onChange={onAddressChange}
          >
            <option value="">Select Country</option>
            {COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          <Error field="country" />
        </div>

        <div>
          <input
            type="submit"
            className="btn btn-primary"
            value="Save Shipping Info"
            disabled={status === STATUS.SUBMITTING}
          />
        </div>
      </form>
    </>
  );
}
