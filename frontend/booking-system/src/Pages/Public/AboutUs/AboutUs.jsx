import "./AboutUs.css";

function About() {
  return (
    <div className="about">
      <header className="about-hero">
        <h1>About Us</h1>
        <p>Connecting people with unforgettable experiences since 2023</p>
      </header>

      <section className="about-content">
        <h2>Who We Are</h2>
        <p>
          EventBooking is a premier platform designed to make event discovery and booking 
          seamless, secure, and enjoyable. From concerts and sports to theater and 
          exhibitions, we connect people with the experiences they love through our 
          intuitive and reliable booking system.
        </p>
        <p>
          Founded by a team of event enthusiasts and tech innovators, we understand 
          the excitement of discovering new experiences and the frustration of complicated 
          booking processes. That's why we've created a solution that puts the user first.
        </p>

        <h2>Our Mission</h2>
        <p>
          Our mission is to empower users by providing access to a wide variety of 
          events with a simple, smooth, and reliable booking system. We aim to bring 
          people closer to entertainment, culture, and unforgettable experiences while 
          supporting event creators and venues.
        </p>
        <p>
          We believe that great experiences should be accessible to everyone, and our 
          platform is designed to remove barriers between people and the events they love.
        </p>

        <h2>Why Choose Us?</h2>
        <ul>
          <li>🎟️ Seamless ticket booking with instant confirmation</li>
          <li>🔒 Secure payment processing and data protection</li>
          <li>🌍 Diverse range of events across multiple categories</li>
          <li>💬 Responsive customer support available 7 days a week</li>
          <li>📱 Mobile-friendly interface for on-the-go bookings</li>
          <li>⭐ Verified user reviews to help you choose the right events</li>
        </ul>

        <h2>Our Values</h2>
        <p>
          At EventBooking, we're guided by our commitment to:
        </p>
        <ul>
          <li>Transparency in all our operations and pricing</li>
          <li>Accessibility for users of all abilities</li>
          <li>Innovation in our technology and services</li>
          <li>Community building through shared experiences</li>
          <li>Reliability you can count on, event after event</li>
        </ul>
      </section>
    </div>
  );
}

export default About;
