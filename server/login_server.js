import axios from 'axios';

const loginUser = async (username, password) => {
  try {
    const response = await axios.post('https://www.pezabond.com/login.php', {
      username,
      password,
    });
    return response.data; // Assuming the server returns user data upon successful login.
  } catch (error) {
    throw error; // Handle errors (e.g., incorrect credentials)
  }
};
