import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from '../../components/Modal';

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('created');
  const [allImages, setAllImages] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllImages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/getAllPosts');
        console.log(response.data.allPost);
        setAllImages(response.data.allPost);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchAllImages();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear authentication token from local storage
    localStorage.removeItem('userData');
    navigate('/'); // Redirect to login page
  };

  const userData = JSON.parse(localStorage.getItem('userData'));

  // Filter images if needed
  // const createdPins = allImages.filter(image => image.category === 'created');
  // const savedPins = allImages.filter(image => image.category === 'saved');

  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center py-10">
      {/* Top-left Home Button */}
      <button
        onClick={() => navigate('/feed')}
        className="absolute top-4 left-4 bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300"
      >
        Home
      </button>

      {/* Top-right Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300"
      >
        Logout
      </button>

      <img
        src="https://images.unsplash.com/photo-1484515991647-c5760fcecfc7?q=80&w=1498&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Profile"
        className="h-24 w-24 rounded-full mb-4 object-cover"
      />
      <h1 className="text-2xl font-bold mb-1">{userData.name}</h1>
      <p className="text-gray-600 mb-4">{userData.email}</p>
      <p className="text-gray-600 mb-4">0 following</p>
      <div className="flex space-x-2 mb-4">
        <button className="bg-gray-200 px-4 py-2 rounded-full">Share</button>
        <button className="bg-gray-200 px-4 py-2 rounded-full">Edit profile</button>
        <button className="bg-gray-200 px-4 py-2 rounded-full" onClick={openModal}>
          Create Pins
        </button>
      </div>
      <div className="flex space-x-8 mt-4">
        <button
          className={`font-bold ${selectedTab === 'created' ? 'border-b-2 border-black' : ''}`}
          onClick={() => setSelectedTab('created')}
        >
          Created
        </button>
        <button
          className={`font-bold ${selectedTab === 'saved' ? 'border-b-2 border-black' : ''}`}
          onClick={() => setSelectedTab('saved')}
        >
          Saved
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {selectedTab === 'created' &&
          allImages.map((pin, index) => (
            <div key={index} className="w-full h-full object-cover rounded-lg shadow-md">
              <img src={`./images/${pin.image}`} alt="Created Pin" className="w-full h-70 object-cover rounded-lg shadow-md" />
              <p>{pin.imageText}</p>
            </div>
          ))}
        {selectedTab === 'saved' &&
          allImages.map((pin, index) => (
            <div key={index} className="w-full h-60 object-cover rounded-lg shadow-md">
              <img src={pin.imageUrl} alt="Saved Pin" className="w-full h-60 object-cover rounded-lg shadow-md" />
              <p>{pin.imageText}</p>
            </div>
          ))}
      </div>
      {isModalOpen && <Modal closeModal={closeModal} />}
    </div>
  );
};

export default Profile;
