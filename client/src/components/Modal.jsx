import React, { useState } from 'react';
import axios from 'axios';

const Modal = ({ closeModal }) => {
  const [image, setImage] = useState(null);
  const [imageInfo, setImageInfo] = useState(''); // State to hold additional image info

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]); // Set the file object instead of URL
  };

  const authToken = localStorage.getItem('authToken'); // Retrieve authentication token from local storage
  const userData = localStorage.getItem('userData'); // Retrieve user data

  let userInfo = {};
  try {
    userInfo = JSON.parse(userData); // Convert JSON string to object
  } catch (error) {
    console.error('Error parsing user data:', error);
  }

  // Handle form submission
  const handleSubmit = async () => {
    if (!image) {
      console.error('No image selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', image); // Append the image file
    formData.append('userId', userInfo._id); // Append user ID if needed
    formData.append('authToken', authToken); // Append authentication token if needed
    formData.append('filecaption', imageInfo); // Append additional image info

    try {
      const response = await axios.post("http://localhost:3000/api/v1/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
          'Authorization': `Bearer ${authToken}` // Include auth token in headers if required
        }
      });
      console.log(response.data);
      closeModal();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">Upload Image</h2>
        <input type="file" onChange={handleImageUpload} className="mb-4" />
        {image && <img src={URL.createObjectURL(image)} alt="Preview" className="mb-4 w-full h-48 object-cover" />}
        <div className="mb-4">
          <label htmlFor="imageInfo" className="block text-sm font-medium text-gray-700">Image Information</label>
          <input 
            type="text" 
            id="imageInfo" 
            value={imageInfo} 
            onChange={(e) => setImageInfo(e.target.value)} 
            className="mt-1 p-2 w-full border border-gray-300 rounded-md" 
            placeholder="Enter image description or details"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button className="bg-gray-200 px-4 py-2 rounded-full" onClick={closeModal}>
            Cancel
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
