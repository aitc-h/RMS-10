import { useState } from 'react';
import { useCart } from './cartContext';
import { saveShippingAddress } from '../services/shippingService';

const emptyAddress = {
  city: '',
  country: '',
};

export const STATUS = {
  IDLE: 'IDLE',
  SUBMITTED: 'SUBMITTED',
  SUBMITTING: 'SUBMITTING',
  COMPLETED: 'COMPLETED',
};

export function useCheckout() {
  const { dispatch } = useCart();
  const [address, setAddress] = useState(emptyAddress);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [saveError, setSaveError] = useState(null);
  const [touched, setTouched] = useState([]);

  const getErrors = () => {
    const result = {};
    if (!address.city) result.city = 'City is required';
    if (!address.country) result.country = 'Country is required';
    return result;
  };

  function isValid() {
    const errors = getErrors(address);
    return Object.keys(errors).length === 0;
  }

  const onAddressChange = (event) => {
    event.persist();
    setAddress((address) => {
      return { ...address, [event.target.id]: event.target.value };
    });
  };

  const onAddressBlur = (event) => {
    event.persist();
    setTouched((state) => {
      return { ...state, [event.target.id]: true };
    });
  };

  const onAddressSubmit = async (event) => {
    event.preventDefault();
    setStatus(STATUS.SUBMITTING);
    if (isValid()) {
      try {
        await saveShippingAddress(address);
        dispatch({ type: 'empty' });
        setStatus(STATUS.COMPLETED);
      } catch (e) {
        setSaveError(e);
      }
    } else {
      setStatus(STATUS.SUBMITTED);
    }
  };

  return {
    address,
    status,
    saveError,
    touched,
    onAddressChange,
    onAddressBlur,
    onAddressSubmit,
    getErrors,
    isValid,
  };
}

export default useCheckout;
