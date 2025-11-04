// import React from "react";
// import { motion } from "framer-motion";
// import "./Landing.css";
// import { Link } from "react-router-dom";

// const Landing = () => {
//   return (
//     <div className="landing-container">
//       {/* Header */}
//       <header className="header">
//         <h1 className="logo">🍽️ Munchy</h1>
//         <nav className="nav">
//           <Link to="#">Home</Link>
//           <Link to="#">Menu</Link>
//           <Link to="#">About</Link>
//           <div className="auth-buttons">
//             <Link to="/login" className="btn-outline">
//               Login
//             </Link>
//             <Link to="/register" className="btn-solid">
//               Sign Up
//             </Link>
//           </div>
//         </nav>
//       </header>

//       {/* Hero Section */}
//       <section className="hero-section">
//         <motion.div
//           className="hero-text"
//           initial={{ opacity: 0, y: 80 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           <h1>Eat Fresh. Feel Good. 🌮</h1>
//           <p>
//             Discover delicious, healthy, and affordable meals — made with love
//             for students and foodies alike. Simplify your dining with Munchy.
//           </p>
//           <div className="hero-buttons">
//             <Link to="/login" className="btn-solid large">
//               Order Now
//             </Link>
//             <Link to="/register" className="btn-outline large">
//               Join Us
//             </Link>
//           </div>
//         </motion.div>
//       </section>

//       {/* Features Section */}
//       <section className="features-section">
//         <h2>Why Choose Munchy?</h2>
//         <div className="features-grid">
//           {[
//             {
//               icon: "🍲",
//               title: "Curated Menus",
//               desc: "Weekly menus designed to keep your meals exciting and balanced.",
//             },
//             {
//               icon: "💳",
//               title: "Easy Payments",
//               desc: "Manage subscriptions and payments securely — all in one place.",
//             },
//             {
//               icon: "⭐",
//               title: "User Reviews",
//               desc: "Rate dishes and help improve your favorite meals.",
//             },
//           ].map((f, i) => (
//             <motion.div
//               key={i}
//               className="feature-card"
//               whileHover={{ scale: 1.05 }}
//               transition={{ type: "spring", stiffness: 200 }}
//             >
//               <div className="feature-icon">{f.icon}</div>
//               <h3>{f.title}</h3>
//               <p>{f.desc}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* New Section: Your Choice */}
//       <section className="choice-section">
//         <motion.div
//           className="choice-content"
//           initial={{ opacity: 0, y: 60 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           <h2>Your Choice, Anytime, Anywhere 🍱</h2>
//           <p>
//             Whether you’re in class, at work, or relaxing at home — Munchy brings
//             your favorite meals right to you. Experience convenience, taste, and
//             joy with every bite.
//           </p>
//           <img
//             src="https://cdn.pixabay.com/photo/2017/01/22/19/20/pizza-2000616_1280.jpg"
//             alt="Food delivery"
//           />
//         </motion.div>
//       </section>

//       {/* Footer */}
//       <footer className="footer">
//         © 2025 Munchy — Made with ❤️ for Food Lovers
//       </footer>
//     </div>
//   );
// };

// export default Landing;
import React from "react";
import { motion } from "framer-motion";
import "./Landing.css";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landing-container">
      {/* Header */}
      <header className="navbar">
        <h1 className="logo">Munchy</h1>
        <nav className="nav-links">
          <div className="auth-buttons">
            <Link to="/login" className="login-btn">
              Login
            </Link>
            <Link to="/register" className="signup-btn">
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="overlay" />
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Eat Fresh. Feel Good.</h1>
          <p>
            Discover healthy, delicious meals made for students, providers, and
            food lovers — all managed easily through Munchy.
          </p>
          <div className="hero-buttons">
            <Link to="/login" className="order-btn">
              Order Now
            </Link>
            <Link to="/register" className="join-btn">
              Join Us
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Choice Section */}
      <section className="choice-section">
        <motion.div
          className="choice-content"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2>Your Choice, Anytime. Anywhere. </h2>
          <p>
            Whether you’re at home, college, or work — enjoy freshly prepared
            meals delivered wherever you are. Munchy makes it effortless.
          </p>
          <Link to="/menu" className="explore-btn">
            Explore Menu
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Munchy?</h2>
        <div className="features-grid">
          {[
            {
              icon: "restaurant_menu",
              title: "Curated Menus",
              desc: "Explore weekly menus designed to keep your meals exciting and healthy.",
            },
            {
              icon: "QR_code_scanner",
              title: "Simple Payments",
              desc: "Pay securely and manage subscriptions seamlessly your choice.",
            },
            {
              icon: "star_rate",
              title: "Rated by You",
              desc: "Leave feedback to improve dishes and reward your favorite Mess.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              className="feature-card"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <span className="material-symbols-outlined feature-icon">
                {f.icon}
              </span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Munchy. Made with team for food lovers.</p>
      </footer>
    </div>
  );
};

export default Landing;
