import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Fetch } from './hooks/useFetch';
import Spinner from './common/Spinner';
import PageNotFound from './common/PageNotFound';
import { CartContext } from './context/cart';

export default function DetailWrapper() {
  const { id } = useParams();
  return <Detail id={id} navigate={useNavigate()} />;
}

class Detail extends React.Component {
  state = {
    sku: '',
  };

  // static contextType = CartContext;

  render() {
    const { id, navigate } = this.props;
    const { sku } = this.state;

    return (
      <CartContext.Consumer>
        {({ dispatch }) => (
          <Fetch url={`products/${id}`}>
            {(product, loading, error) => {
              if (loading) return <Spinner />;
              if (!product) return <PageNotFound />;
              if (error) throw error;
              return (
                <div id="detail">
                  <h1>{product.name}</h1>
                  <p>{product.description}</p>
                  <p id="price">${product.price}</p>
                  <select
                    title="Size"
                    id="size"
                    value={this.state.sku}
                    onChange={(e) => this.setState({ sku: e.target.value })}
                  >
                    <option value="">Select size</option>
                    {product.skus.map(({ sku, size }) => (
                      <option key={sku} value={sku}>
                        {size}
                      </option>
                    ))}
                  </select>
                  <p>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        this.context.dispatch({ type: 'add', id, sku });
                        navigate('/cart');
                      }}
                      disabled={!this.state.sku}
                    >
                      Add to cart
                    </button>
                  </p>
                  <img
                    src={`/images/${product.image}`}
                    alt={product.category}
                  />
                </div>
              );
            }}
          </Fetch>
        )}
      </CartContext.Consumer>
    );
  }
}
