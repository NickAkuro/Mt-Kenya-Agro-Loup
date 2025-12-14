import { useState, useEffect } from 'react';
import { getAgroEntries, createAgroEntry, updateAgroEntry, deleteAgroEntry } from '../lib/api';
import './FarmerDashboard.css';

function FarmerDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    userId: 'farmer123',
    Name: '',
    Email: '',
    cropType: '',
    quantity: '',
    location: '',
    harvestDate: ''
  });

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await updateAgroEntry(editingProduct._id, formData);
      } else {
        await createAgroEntry(formData);
      }
      fetchProducts();
      resetForm();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product. Please try again.');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      userId: product.userId,
      Name: product.Name,
      Email: product.Email,
      cropType: product.cropType,
      quantity: product.quantity,
      location: product.location,
      harvestDate: product.harvestDate.split('T')[0]
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteAgroEntry(id);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      userId: 'farmer123',
      Name: '',
      Email: '',
      cropType: '',
      quantity: '',
      location: '',
      harvestDate: ''
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="farmer-dashboard">
      <div className="dashboard-header">
        <h1>Farmer Dashboard</h1>
        <button className="btn-add" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add New Product'}
        </button>
      </div>

      {showForm && (
        <div className="product-form-container">
          <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
          <form onSubmit={handleSubmit} className="product-form">
            <div className="form-group">
              <label>Farmer Name *</label>
              <input
                type="text"
                name="Name"
                value={formData.Name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Crop Type *</label>
              <input
                type="text"
                name="cropType"
                value={formData.cropType}
                onChange={handleInputChange}
                placeholder="e.g., Tomatoes, Potatoes, Maize"
                required
              />
            </div>

            <div className="form-group">
              <label>Quantity (kg) *</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                min="1"
                required
              />
            </div>

            <div className="form-group">
              <label>Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Nanyuki, Meru"
                required
              />
            </div>

            <div className="form-group">
              <label>Harvest Date *</label>
              <input
                type="date"
                name="harvestDate"
                value={formData.harvestDate}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-submit">
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
              <button type="button" className="btn-cancel" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="products-section">
        <h2>Your Listed Products</h2>
        {products.length === 0 ? (
          <div className="no-products">
            <p>You haven't listed any products yet. Click "Add New Product" to get started!</p>
          </div>
        ) : (
          <div className="products-table">
            <table>
              <thead>
                <tr>
                  <th>Crop Type</th>
                  <th>Quantity (kg)</th>
                  <th>Location</th>
                  <th>Harvest Date</th>
                  <th>Farmer</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product._id}>
                    <td>{product.cropType}</td>
                    <td>{product.quantity}</td>
                    <td>{product.location}</td>
                    <td>{new Date(product.harvestDate).toLocaleDateString()}</td>
                    <td>{product.Name}</td>
                    <td className="actions">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(product)}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default FarmerDashboard;
