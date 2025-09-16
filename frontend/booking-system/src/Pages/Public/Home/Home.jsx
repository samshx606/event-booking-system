import "./Home.css";
import { Link } from "react-router-dom";
function Home() {
  const features = [
    {
      icon: "🎤",
      title: "Concerts",
      description: "Find and book tickets for the hottest concerts around you.",
    },
    {
      icon: "⚽",
      title: "Sports",
      description: "Catch your favorite sports matches with just a few clicks.",
    },
    {
      icon: "🎭",
      title: "Theater",
      description: "Experience live performances and theater shows easily.",
    },
  ];

  return (
    <div className="home">
      <header className="hero">
        <h1>Welcome to EventBooking</h1>
        <p>Book your favorite events hassle-free</p>
        <h2 className="hero-subtitle">Discover events near you and enjoy unforgettable experiences!</h2>
        <button className="hero-btn"><Link to="/events">Explore Events</Link></button>
      </header>

      <section className="features">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <h3>{feature.icon} {feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Home;
