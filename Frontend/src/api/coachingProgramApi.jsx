import axios from "axios";

const BASE_URL = "http://localhost:5000/api/programs";

// Get all coaching programs with optional filters
export const getCoachingPrograms = async (params = {}) => {
  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching coaching programs:', error);
    throw error;
  }
};

// Get single coaching program by ID
export const getCoachingProgram = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching coaching program:', error);
    throw error;
  }
};

// Get programs by coach ID
export const getProgramsByCoach = async (coachId, params = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}/coach/${coachId}`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching coach programs:', error);
    throw error;
  }
};

// Create new coaching program (for coaches)
export const createCoachingProgram = async (programData) => {
  try {
    const response = await axios.post(BASE_URL, programData);
    return response.data;
  } catch (error) {
    console.error('Error creating coaching program:', error);
    throw error;
  }
};

// Update coaching program (for coaches)
export const updateCoachingProgram = async (id, programData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, programData);
    return response.data;
  } catch (error) {
    console.error('Error updating coaching program:', error);
    throw error;
  }
};

// Delete coaching program (for coaches)
export const deleteCoachingProgram = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting coaching program:', error);
    throw error;
  }
};

// Add material to program
export const addMaterialToProgram = async (programId, materialData) => {
  try {
    const response = await axios.post(`${BASE_URL}/${programId}/materials`, materialData);
    return response.data;
  } catch (error) {
    console.error('Error adding material to program:', error);
    throw error;
  }
};

// Get program statistics
export const getProgramStats = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}/stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching program stats:', error);
    throw error;
  }
};
