import React from 'react';
import Navbar from "../../components/Navbar"
// import './App.css';

const pins = [
  {
    img: 'https://images.unsplash.com/photo-1457301547464-91995555cd25?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2VzfGVufDB8fDB8fHww',
    title: 'Portrait Sketch Art',
    author: 'GleEnKANE917'
  },
  {
    img: 'https://images.unsplash.com/photo-1653389525308-e7ab9fc0c260?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW1hZ2VzfGVufDB8fDB8fHww',
    title: 'LeafLife - Garden Landscape',
    author: ''
  },
  {
    img: 'https://images.unsplash.com/photo-1706755347832-0a8c8caa7647?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D',
    title: 'Acid Warhol Pop-Art Photo Effects',
    author: 'Pixelbuddha Studio'
  },
  {
    img: 'https://images.unsplash.com/photo-1574774191469-3d7732e5fc8b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: '',
    author: 'Okroshkins'
  },
  {
    img: 'https://images.unsplash.com/photo-1594054159878-250f833fdc5c?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: '',
    author: 'cy'
  }
];

const Feed = () => {
  return (
    <div className="min-h-screen bg-gray-100 pb-5">
      <Navbar />
      <div className="mt-[54px] max-w-6xl mx-auto p-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pins.map((pin, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={pin.img} alt={pin.title} className="w-full h-60 object-cover" />
              <div className="p-4">
                <h2 className="font-bold text-lg mb-2">{pin.title}</h2>
                <p className="text-gray-600">{pin.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
