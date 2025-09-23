import React from "react";
import "./Dashboard.css"; // Import the CSS file

const Dashboard = () => {
  const categories = ["All", "North Indian", "South Indian", "Gujarati", "Healthy"];
  const messes = [
    {
      name: "Annapurna Mess",
      type: "North Indian",
      distance: "0.5 km away",
      rating: 4.7,
      price: 80,
      image:
        "https://images.unsplash.com/photo-1567337710282-00832b415979?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwZm9vZHxlbnwwfHwwfHx8MA==&auto=format&fit=crop&w=500&q=60",
      special: "Dal Makhani, Paneer Butter Masala, Roti, Rice, Papad, Salad",
    },
    {
      name: "South Spice Tiffin",
      type: "South Indian",
      distance: "1.2 km away",
      rating: 4.5,
      price: 65,
      image:
        "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c291dGglMjBpbmRpYW4lMjBmb29kfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      special: "Masala Dosa, Sambar, Coconut Chutney, Coffee",
    },
  ];

  return (
    <div id="webcrumbs">
      <header className="dashboard-header">
        <div className="logo-container">
          <div className="logo-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 13h10m-5-5v10"></path>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            </svg>
          </div>
          <h1 className="logo-text">MealMate</h1>
        </div>
        <div className="header-right">
          <button className="button-icon">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="avatar">JS</div>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="search-section">
          <div className="relative">
            <input type="text" placeholder="Search for mess, tiffin, or dish..." className="search-input" />
            <span className="search-icon">search</span>
          </div>
          <div className="flex mt-4 overflow-x-auto pb-2 space-x-2">
            {categories.map((cat, idx) => (
              <button key={idx} className={`category-button ${idx === 0 ? "active" : ""}`}>
                {cat}
              </button>
            ))}
          </div>
        </section>
        <section className="p-4">
          <div className="section-header">
            <h2 className="section-title">Nearby Messes</h2>
            <button className="section-button">See All</button>
          </div>
          <div className="grid gap-4">
            {messes.map((mess, index) => (
              <div key={index} className="mess-card">
                <img src={mess.image} alt={mess.name} />
                <div className="card-content">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="card-title">{mess.name}</h3>
                      <p className="card-subtext">
                        {mess.type} • {mess.distance}
                      </p>
                    </div>
                    <div className="rating-container">
                      <span className="rating-star">star</span>
                      <span className="rating-value">{mess.rating}</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="special-title">Today's Special:</p>
                    <p className="special-text">{mess.special}</p>
                  </div>
                  <div className="price-container">
                    <div>
                      <span className="price">₹{mess.price}</span>
                      <span className="price-unit"> / meal</span>
                    </div>
                    <button className="subscribe-button">Subscribe</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
