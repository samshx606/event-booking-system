import "./Home.css";

function Home() {
  return (
    <div className="home">
      <header className="hero">
        <h1>Welcome to EventBooking</h1>
        <p>Book your favorite events hassle-free</p>
        <button className="hero-btn">Explore Events</button>
      </header>

      <section className="features">
        <div className="feature-card">
          <h3>🎤 Concerts</h3>
          <p>Find and book tickets for the hottest concerts around you.</p>
        </div>
        <div className="feature-card">
          <h3>⚽ Sports</h3>
          <p>Catch your favorite sports matches with just a few clicks.</p>
        </div>
        <div className="feature-card">
          <h3>🎭 Theater</h3>
          <p>Experience live performances and theater shows easily.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
