import { useState, useEffect } from 'react';
import { getAgroEntries } from '../lib/api';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAgroEntries();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesFilter = filter === 'all' || product.cropType.toLowerCase().includes(filter.toLowerCase());
    const matchesSearch = product.cropType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.Name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const cropTypes = [...new Set(products.map(p => p.cropType))];

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading fresh produce...</p>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Fresh Produce from Local Farmers</h1>
        <p>Browse our selection of farm-fresh products</p>
      </div>

      <div className="products-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by crop, location, or farmer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-buttons">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All Products
          </button>
          {cropTypes.map(type => (
            <button
              key={type}
              className={filter === type ? 'active' : ''}
              onClick={() => setFilter(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <p>No products found matching your criteria.</p>
          </div>
        ) : (
          filteredProducts.map(product => (
            <div key={product._id} className="product-card">
              <div className="product-badge">{product.cropType}</div>
              <div className="product-info">
                <h3>{product.cropType}</h3>
                <p className="farmer-name">👨‍🌾 {product.Name}</p>
                <p className="location">📍 {product.location}</p>
                <p className="quantity">📦 {product.quantity} kg available</p>
                <p className="harvest-date">
                  🗓️ Harvested: {new Date(product.harvestDate).toLocaleDateString()}
                </p>
                <div className="product-actions">
                  <button className="btn-contact">Contact Farmer</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Products;
