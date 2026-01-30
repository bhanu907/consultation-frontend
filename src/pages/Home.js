import { useEffect, useState } from "react";
import API from "../services/api";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);

  // ✅ CONTACT STATE
  const [contact, setContact] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  // ✅ NEWSLETTER STATE
  const [newsletterEmail, setNewsletterEmail] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const projRes = await API.get("/projects");
      const clientRes = await API.get("/clients");

      setProjects(projRes.data);
      setClients(clientRes.data);
    } catch (err) {
      console.error("Failed to load data", err);
    }
  };

  // ✅ SEND CONTACT MESSAGE
  const sendContact = async () => {
    try {
      await API.post("/contacts", contact);
      alert("Message sent successfully");
      setContact({ name: "", email: "", mobile: "", message: "" });
    } catch (err) {
      alert("Failed to send message");
    }
  };

  // ✅ SUBSCRIBE NEWSLETTER
  const subscribeNewsletter = async () => {
    try {
      await API.post("/newsletter", { email: newsletterEmail });
      alert("Subscribed successfully");
      setNewsletterEmail("");
    } catch (err) {
      alert("Subscription failed");
    }
  };

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div>
          <h1>We Build Bold Brands</h1>
          <p>Consultation, Design & Marketing for modern businesses</p>
          <button
            onClick={() =>
              document
                .getElementById("contact")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Start Your Project
          </button>
        </div>

        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
          alt="team"
        />
      </section>

      {/* STATS */}
      <section className="section light">
        <div className="grid">
          <div className="card">
            <h2>{projects.length}+</h2>
            <p>Projects Completed</p>
          </div>

          <div className="card">
            <h2>3+</h2>
            <p>Years Experience</p>
          </div>

          <div className="card">
            <h2>{clients.length}+</h2>
            <p>Happy Clients</p>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="section">
        <h2>Our Projects</h2>
        <div className="grid">
          {projects.length === 0 && <p>No projects yet</p>}
          {projects.map((p) => (
            <div className="card" key={p._id}>
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
                alt="project"
              />
              <h3>{p.name}</h3>
              <p>{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HAPPY CLIENTS */}
      <section className="section dark">
        <h2>Happy Clients</h2>
        <div className="grid">
          {clients.length === 0 && <p>No clients yet</p>}
          {clients.map((c) => (
            <div className="card" key={c._id}>
              <img
                className="avatar"
                src="https://randomuser.me/api/portraits/lego/1.jpg"
                alt="client"
              />
              <h3>{c.name}</h3>
              <p>{c.company}</p>
              <small>“{c.testimonial}”</small>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="section light" id="contact">
        <h2>Let’s Work Together</h2>
        <div className="form-box">
          <input
            placeholder="Name"
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
          />
          <input
            placeholder="Email"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
          />
          <input
            placeholder="Mobile"
            value={contact.mobile}
            onChange={(e) => setContact({ ...contact, mobile: e.target.value })}
          />
          <textarea
            placeholder="Message"
            value={contact.message}
            onChange={(e) =>
              setContact({ ...contact, message: e.target.value })
            }
          />
          <button onClick={sendContact}>Send Message</button>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="section newsletter">
        <h2>Subscribe to our Newsletter</h2>
        <div className="form-box">
          <input
            placeholder="Email"
            value={newsletterEmail}
            onChange={(e) => setNewsletterEmail(e.target.value)}
          />
          <button onClick={subscribeNewsletter}>Subscribe</button>
        </div>
      </section>
    </>
  );
}
