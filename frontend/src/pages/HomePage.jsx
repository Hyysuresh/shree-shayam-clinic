import { useMemo, useState } from "react";
import axios from "axios";
import { Toast } from "../components/Toast";
import { SectionReveal } from "../components/SectionReveal";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.png";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"
});

const services = [
  {
    title: "Smile Designing",
    description:
      "Digital smile planning and aesthetic restorations designed for confidence and long-term oral harmony."
  },
  {
    title: "Root Canal Therapy",
    description:
      "Gentle, precision-led treatment using modern techniques for comfort, speed, and dependable recovery."
  },
  {
    title: "Dental Implants",
    description:
      "Stable, natural-looking tooth replacement with restorative planning built around function and beauty."
  },
  {
    title: "Orthodontics",
    description:
      "Straighten teeth with personalized correction plans and discreet options tailored to your lifestyle."
  }
];

const testimonials = [
  {
    name: "Ritika Sharma",
    text: "The clinic feels premium from the moment you walk in. My treatment was smooth, clear, and genuinely comforting."
  },
  {
    name: "Abhishek Meena",
    text: "I booked online, got quick confirmation, and the doctor explained every step. Excellent experience in Jaipur."
  },
  {
    name: "Neha Bansal",
    text: "Very modern setup, warm team, and beautiful results with my smile makeover. Highly recommended."
  }
];

const gallery = [
  {
    src: image1,
    alt: "Dental treatment in progress with clinic staff supporting a patient"
  },
  {
    src: image2,
    alt: "Dental consultation using a tooth model at a clinic desk"
  },
  {
    src: image3,
    alt: "Dentist and assistant standing in a bright clinic"
  },
  {
    src: image4,
    alt: "Dentist consulting a patient in a treatment room"
  }
];

const initialForm = {
  name: "",
  phone: "",
  date: "",
  time: "",
  message: ""
};

export function HomePage() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const minDate = useMemo(() => new Date().toISOString().split("T")[0], []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    window.clearTimeout(window.__toastTimeout);
    window.__toastTimeout = window.setTimeout(() => setToast(null), 3200);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      await api.post("/appointments", form);
      setForm(initialForm);
      showToast("Appointment request sent successfully.", "success");
    } catch (error) {
      showToast(
        error.response?.data?.message || "Unable to submit appointment right now.",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="site-shell">
      <Toast toast={toast} />

      <a
        className="whatsapp-float"
        href="https://wa.me/919828000000"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        WA
      </a>

      <header className="topbar">
        <div className="brand-mark">
          <span className="brand-badge">SR</span>
          <div>
            <h1>Shree Ram Sahay Dental And Cosmetic Clinic</h1>
            <p>Jaipur, Rajasthan</p>
          </div>
        </div>
        <nav>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#doctor">Doctor</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <SectionReveal className="hero">
          <div className="hero-copy">
            <span className="eyebrow">Luxury care. Precision dentistry. Lasting confidence.</span>
            <h2>Modern dental excellence crafted around your smile.</h2>
            <p>
              High-end cosmetic and restorative dental care in Jaipur with a
              calming experience, advanced technology, and seamless appointment
              booking.
            </p>
            <div className="hero-actions">
              <a href="#booking" className="btn btn-primary">
                Book Appointment
              </a>
              <a href="#services" className="btn btn-secondary">
                Explore Services
              </a>
            </div>
            <div className="hero-highlights">
              <div>
                <strong>10+</strong>
                <span>Years of patient trust</span>
              </div>
              <div>
                <strong>4.9/5</strong>
                <span>Patient satisfaction</span>
              </div>
              <div>
                <strong>Advanced</strong>
                <span>Cosmetic solutions</span>
              </div>
            </div>
            <div className="hero-signature-wrap">
              <span className="hero-signature">Dr. Shree Ram Sahay</span>
              <span className="hero-signature-note">Crafted with clinical precision and personal care</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-wireframe" aria-hidden="true" />
            <div className="hero-smile-silhouette" aria-hidden="true" />
            <div className="hero-lotus-mark" aria-hidden="true" />
            <div className="hero-panel glass-card">
              <div className="smile-frame">
                <div className="smile-glow" />
                <img className="smile-photo" src={image6} alt="Close-up of a bright natural smile" />
                <div className="smile-highlight" />
              </div>
              <div className="hero-panel-overlay">
                <div className="panel-chip">Featured Care</div>
                <h3>Complete Smile Transformation</h3>
                <p>
                  Cosmetic dentistry, implants, aligners, and preventive care
                  designed with a premium clinical journey.
                </p>
                <div className="floating-stats">
                  <div>
                    <span>Same-day consults</span>
                    <strong>Available</strong>
                  </div>
                  <div>
                    <span>Booking workflow</span>
                    <strong>Instant request</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal id="services" className="content-section">
          <div className="section-heading">
            <span>Services</span>
            <h3>Comprehensive dental and cosmetic solutions</h3>
          </div>
          <div className="card-grid">
            {services.map((service) => (
              <article className="glass-card service-card" key={service.title}>
                <h4>{service.title}</h4>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal id="about" className="content-section dual-panel">
          <div className="glass-card about-story">
            <div className="section-heading left">
              <span>About</span>
              <h3>Patient-first dentistry with modern aesthetics</h3>
            </div>
            <p>
              Shree Ram Sahay Dental And Cosmetic Clinic delivers advanced
              diagnostics, evidence-based treatment, and personalized smile care
              in a soothing premium environment.
            </p>
            <p>
              Every consultation focuses on comfort, transparency, and
              long-term oral wellness, whether you need a routine check-up or a
              complete cosmetic transformation.
            </p>
            <div className="about-photo-strip">
              <img src={image2} alt="Consultation with a dental model and treatment planning" />
              <img src={image4} alt="Dentist discussing treatment with a patient in a modern clinic" />
            </div>
          </div>
          <div className="glass-card metrics-card">
            <div>
              <strong>Digital</strong>
              <span>Clinical planning</span>
            </div>
            <div>
              <strong>Comfort-led</strong>
              <span>Treatment journey</span>
            </div>
            <div>
              <strong>Trusted</strong>
              <span>Jaipur practice</span>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal id="doctor" className="content-section doctor-section">
          <div className="doctor-card glass-card">
            <img className="doctor-photo" src={image5} alt="Doctor standing confidently in the dental clinic" />
            <div>
              <div className="section-heading left">
                <span>Doctor Profile</span>
                <h3>Expert care with a refined clinical approach</h3>
              </div>
              <p>
                Dedicated to aesthetic and restorative dentistry, the clinic's
                lead doctor combines advanced procedures with compassionate,
                clear communication to create confident patient outcomes.
              </p>
              <p>
                From preventive dentistry to smile enhancement, treatment plans
                are tailored to each patient's goals and oral health needs.
              </p>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal className="content-section experience-grid">
          <div className="section-heading">
            <span>Clinic Experience</span>
            <h3>Inside the care journey</h3>
          </div>
          <div className="experience-collage">
            {gallery.map((item, index) => (
              <figure className={`glass-card experience-card experience-card-${index + 1}`} key={item.alt}>
                <img src={item.src} alt={item.alt} />
              </figure>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal className="content-section">
          <div className="section-heading">
            <span>Testimonials</span>
            <h3>What patients say about their experience</h3>
          </div>
          <div className="card-grid">
            {testimonials.map((item) => (
              <article className="glass-card testimonial-card" key={item.name}>
                <p>"{item.text}"</p>
                <strong>{item.name}</strong>
              </article>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal id="booking" className="content-section booking-layout">
          <div className="section-heading left">
            <span>Book Appointment</span>
            <h3>Request your preferred consultation slot</h3>
            <p>
              Submit your request and our team will review and confirm your
              appointment shortly.
            </p>
            <div className="booking-side-photo glass-card">
              <img src={image3} alt="Dental team ready to welcome patients in the clinic" />
            </div>
          </div>
          <form className="glass-card booking-form" onSubmit={handleSubmit}>
            <div className="input-grid">
              <label>
                Name
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                />
              </label>
              <label>
                Phone
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                  required
                />
              </label>
              <label>
                Date
                <input
                  type="date"
                  name="date"
                  min={minDate}
                  value={form.date}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Time
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <label>
              Message
              <textarea
                name="message"
                rows="5"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your concern or treatment need"
              />
            </label>
            <button className="btn btn-primary full-width" type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Send Appointment Request"}
            </button>
          </form>
        </SectionReveal>

        <SectionReveal id="contact" className="content-section contact-strip">
          <div className="glass-card contact-card">
            <div className="section-heading left">
              <span>Contact</span>
              <h3>Visit or connect with the clinic</h3>
            </div>
            <p>Shree Ram Sahay Dental And Cosmetic Clinic, Jaipur, India</p>
            <p>Phone: +91 98280 00000</p>
            <p>Email: care@shreeramsahaydental.com</p>
          </div>
        </SectionReveal>
      </main>
    </div>
  );
}
