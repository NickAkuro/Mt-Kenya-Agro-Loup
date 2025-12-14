import axios from 'axios';

const API_BASE_URL = '/api';

const bugService = {
  // Get all bugs
  getAllBugs: async (filters = {}) => {
    try {
      console.log('API: Fetching all bugs with filters:', filters);
      const params = new URLSearchParams(filters);
      const response = await axios.get(`${API_BASE_URL}/bugs?${params}`);
      console.log('API: Received bugs:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error fetching bugs:', error);
      throw error;
    }
  },

  // Get single bug
  getBugById: async (id) => {
    try {
      console.log(`API: Fetching bug ${id}`);
      const response = await axios.get(`${API_BASE_URL}/bugs/${id}`);
      return response.data;
    } catch (error) {
      console.error(`API Error fetching bug ${id}:`, error);
      throw error;
    }
  },

  // Create new bug
  createBug: async (bugData) => {
    try {
      console.log('API: Creating new bug:', bugData);
      const response = await axios.post(`${API_BASE_URL}/bugs`, bugData);
      console.log('API: Bug created:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error creating bug:', error);
      throw error;
    }
  },

  // Update bug
  updateBug: async (id, bugData) => {
    try {
      console.log(`API: Updating bug ${id}:`, bugData);
      const response = await axios.put(`${API_BASE_URL}/bugs/${id}`, bugData);
      console.log('API: Bug updated:', response.data);
      return response.data;
    } catch (error) {
      console.error(`API Error updating bug ${id}:`, error);
      throw error;
    }
  },

  // Update bug status
  updateBugStatus: async (id, status) => {
    try {
      console.log(`API: Updating bug ${id} status to ${status}`);
      const response = await axios.patch(`${API_BASE_URL}/bugs/${id}/status`, { status });
      console.log('API: Bug status updated:', response.data);
      return response.data;
    } catch (error) {
      console.error(`API Error updating bug ${id} status:`, error);
      throw error;
    }
  },

  // Delete bug
  deleteBug: async (id) => {
    try {
      console.log(`API: Deleting bug ${id}`);
      const response = await axios.delete(`${API_BASE_URL}/bugs/${id}`);
      console.log('API: Bug deleted:', response.data);
      return response.data;
    } catch (error) {
      console.error(`API Error deleting bug ${id}:`, error);
      throw error;
    }
  },
};

export default bugService;
