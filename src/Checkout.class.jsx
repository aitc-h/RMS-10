import React from 'react';
import { saveShippingAddress } from './services/shippingService';

export const STATUS = {
  IDLE: 'IDLE',
  SUBMITTED: 'SUBMITTED',
  SUBMITTING: 'SUBMITTING',
  COMPLETED: 'COMPLETED',
};
const COUNTRIES = ['China', 'India', 'United Kingdom', 'USA'];
const emptyAddress = {
  city: '',
  country: '',
};

export default class Checkout extends React.Component {
  state = {
    address: emptyAddress,
    status: STATUS.IDLE,
    saveError: null,
    touched: {},
  };

  getErrors() {
    const result = {};
    if (!this.state.address.city) result.city = 'City is required';
    if (!this.state.address.country) result.country = 'Country is required';
    return result;
  }

  isValid() {
    const errors = this.getErrors(this.state.address);
    return Object.keys(errors).length === 0;
  }

  onAddressChange = (event) => {
    event.persist();
    this.setState((state) => {
      return {
        address: { ...state.address, [event.target.id]: event.target.value },
      };
    });
  };

  onAddressBlur = (event) => {
    event.persist();
    // this binding issue
    this.setState((state) => {
      return {
        touched: { ...state.touched, [event.target.id]: true },
      };
    });
  };

  onAddressSubmit = async (event) => {
    event.preventDefault();
    this.setState({ status: STATUS.SUBMITTING });
    if (this.isValid()) {
      try {
        await saveShippingAddress(this.state.address);
        this.props.dispatch({ type: 'empty' });
        this.setState({ status: STATUS.COMPLETED });
      } catch (e) {
        this.setState({ saveError: e });
      }
    } else {
      this.setState({ status: STATUS.SUBMITTED });
    }
  };

  render() {
    const { saveError, status, touched, address } = this.state;
    const errors = this.getErrors(address);

    if (saveError) throw saveError;

    if (status === STATUS.COMPLETED) {
      return <h1>Order completed</h1>;
    }

    const ErrorsAlert = () => {
      return !this.isValid() && status === STATUS.SUBMITTED ? (
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
        <form onSubmit={this.onAddressSubmit}>
          <div>
            <label htmlFor="city">City</label>
            <br />
            <input
              id="city"
              type="text"
              value={address.city}
              onBlur={this.onAddressBlur}
              onChange={this.onAddressChange}
            />
            <Error field="city" />
          </div>

          <div>
            <label htmlFor="country">Country</label>
            <br />
            <select
              id="country"
              value={address.country}
              onBlur={this.onAddressBlur}
              onChange={this.onAddressChange}
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
}
