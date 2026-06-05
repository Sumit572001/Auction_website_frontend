import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import Listings from './Listings';
import WishlistPage from './WishlistPage';

// Shared Data - Furniture/Appliances
export const allItems = [
  { id: 1, title: "Executive Office Table", sub: "Solid Wood Finish", price: "₹ 15,500", condition: "Excellent", img: "https://image.made-in-china.com/202f0j00gWYcVSkzOPrL/New-Arrival-Modern-Office-Table-Executive-CEO-Desk-Office-Desk.webp", category: "Table" },
  { id: 2, title: "Designer Office Chair", sub: "Ergonomic Mesh", price: "₹ 8,200", condition: "Good", img: "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400", category: "Chair" },
  { id: 3, title: "Samsung Double Door Fridge", sub: "320L Smart Inverter", price: "₹ 28,000", condition: "Excellent", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXAy5n_6jFxDL5RYKlN2QccNrQKLCjjdyZlg&s", category: "Fridge" },
  { id: 4, title: "LG 1.5 Ton Split AC", sub: "5-Star Dual Inverter", price: "₹ 32,500", condition: "Like New", img: "https://www.lg.com/content/dam/channel/wcms/in/images/split-ac/ts-q19ynze_anlg_eail_in_c/gallery/TS-Q19YNZE-split-ac-fornt-view-D-01.jpg", category: "AC" },
  { id: 5, title: "Queen Size Metal Bed", sub: "With Orthopedic Mattress", price: "₹ 18,900", condition: "Good", img: "https://interio.com/media/catalog/product/5/6/56101515sd00323_01_1920x1080.jpg", category: "Bed" },
  { id: 6, title: "IFB Front Load Washing Machine", sub: "8kg Fully Automatic", price: "₹ 24,000", condition: "Excellent", img: "https://i.pinimg.com/474x/f1/5e/4e/f15e4e91dca5d2330dcf31674db3d896.jpg", category: "Washing Machine" },
];

/* ─── 1. Navbar with micro-interaction on links ─── */
const Navbar = ({ wishlistCount }) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
        <Link to="/" className="nav-logo">
          <img src="https://nyatigroup.com/_next/image?url=%2Fimages%2Flogo%2Flogo.png&w=640&q=80" alt="Company Logo" className="logo-img" style={{ height: '40px', width: 'auto' }} />
          <div className="logo-text"><span>NYATI</span><span>GROUP</span></div>
        </Link>
        <div className="nav-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/listings" className={location.pathname === '/listings' ? 'active' : ''}>Auctions</Link>
          <a href="#process">Process</a>
          <a href="#faqs">FAQs</a>
          <Link to="/wishlist" className={location.pathname === '/wishlist' ? 'active' : ''}>
            Wishlist {wishlistCount > 0 && <span className="wishlist-badge">{wishlistCount}</span>}
          </Link>
        </div>
        <button className="nav-btn btn-ripple">Register Now</button>
      </div>
    </nav>
  );
};

/* ─── HomePage ─── */
const HomePage = () => (
  <>
    <Hero />
    {/* 2. Parallax section */}
    <section className="parallax-wrapper" style={{ padding: '80px 0', background: 'var(--bg-white)' }}>
      <div className="container">
        <RevealOnScroll>
          <div className="strategy-box">
            <h2>Strategic Asset Recovery</h2>
            <p>We ensure that functional items are repurposed for new environments, reducing waste and supporting a sustainable business lifecycle.</p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
    <FeaturedAssets />
    {/* 7. Thumbnail Carousel */}
    <ThumbnailCarousel />
    <div id="process"><Process /></div>
    <div id="faqs"><FAQ /></div>
    <CTA />
  </>
);

/* ─── 1. Hero Carousel with Crossfade Animation ─── */
const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1400&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1400&q=80"
  ];
  useEffect(() => {
    const timer = setInterval(() => setActiveSlide((prev) => (prev + 1) % slides.length), 3000);
    return () => clearInterval(timer);
  }, []);
  return (
    <section className="hero">
      {slides.map((src, index) => (
        <div key={index} className={`hero-slide ${index === activeSlide ? 'active' : ''}`}>
          <img src={src} className="hero-bg" alt="" />
        </div>
      ))}
      <div className="hero-overlay"></div>
      {/* Slide indicator dots */}
      <div className="hero-dots">
        {slides.map((_, i) => (
          <span key={i} className={`dot ${i === activeSlide ? 'active' : ''}`} onClick={() => setActiveSlide(i)}></span>
        ))}
      </div>
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title-anim">Premium Corporate Asset Recovery</h1>
          <p className="hero-sub-anim">Repurposing high-end corporate furniture and appliances with absolute integrity and transparency.</p>
          <div className="hero-btns hero-btns-anim">
            <Link to="/listings" className="btn-primary btn-ripple" style={{ display: 'inline-block' }}>Explore Listings</Link>
            <button className="btn-outline btn-ripple">Watch Process</button>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── 3. RevealOnScroll (Staggered Grid Reveal) ─── */
const RevealOnScroll = ({ children, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => { if (entry.isIntersecting) setIsVisible(true); }),
      { threshold: 0.15 }
    );
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);
  return <div className={`reveal ${isVisible ? 'visible' : ''} ${className}`} ref={domRef}>{children}</div>;
};

/* ─── 4. Featured Assets with Tab Switching & 6. Modal Pop-up ─── */
const FeaturedAssets = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [modalItem, setModalItem] = useState(null);
  const [bidSuccess, setBidSuccess] = useState(false);

  const tabs = ['All', 'Table', 'Chair', 'Fridge', 'AC'];
  const filtered = activeTab === 'All' ? allItems : allItems.filter(a => a.category === activeTab);

  const handleBid = (e) => {
    e.stopPropagation();
    setBidSuccess(true);
    setTimeout(() => setBidSuccess(false), 2500);
  };

  return (
    <section className="assets-section">
      <div className="container">
        <RevealOnScroll className="section-head">
          <h2 style={{ fontSize: '48px', fontWeight: 800 }}>Featured Assets</h2>
          <p>Curated selection of high-quality items for bidding.</p>
        </RevealOnScroll>

        {/* 4. Tab Switching Animation */}
        <div className="tabs-container">
          {tabs.map(t => (
            <button key={t} className={`tab-btn ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>
              {t}
            </button>
          ))}
        </div>

        {/* 3. Staggered Grid */}
        <div className="asset-grid" key={activeTab}>
          {filtered.map((a, idx) => (
            <RevealOnScroll key={a.id} className={`stagger-${(idx % 3) + 1}`}>
              {/* 5. Hover Lift & Scale Effect */}
              <div className="asset-card" onClick={() => setModalItem(a)}>
                <div className="asset-img-wrapper"><img src={a.img} className="asset-img" alt={a.title} /></div>
                <h3>{a.title}</h3>
                <span className="condition">{a.condition}</span>
                <div className="asset-footer">
                  <span style={{ fontWeight: 700, color: '#10b981' }}>● Open</span>
                  <button className="btn-bid btn-ripple" onClick={handleBid}>BID NOW</button>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* 8. Micro-interaction: Success Toast */}
        <div className={`toast ${bidSuccess ? 'show' : ''}`}>
          ✅ Bid Placed Successfully!
        </div>

        {/* 6. Modal Pop-up / Overlay Entrance */}
        <div className={`modal-overlay ${modalItem ? 'active' : ''}`} onClick={() => setModalItem(null)}>
          {modalItem && (
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setModalItem(null)}>✕</button>
              <img src={modalItem.img} className="modal-img" alt="" />
              <h2>{modalItem.title}</h2>
              <p className="modal-sub">{modalItem.sub}</p>
              <p className="modal-condition">{modalItem.condition} Condition</p>
              <div className="modal-price">{modalItem.price}</div>
              <div className="modal-actions">
                <button className="btn-primary btn-ripple" style={{ background: 'var(--secondary)', color: 'white' }} onClick={handleBid}>Place Bid</button>
                <button className="btn-outline btn-ripple" style={{ color: 'var(--secondary)', borderColor: 'var(--border-light)' }} onClick={() => setModalItem(null)}>Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

/* ─── 7. Slider / Thumbnail Carousel Animation ─── */
const ThumbnailCarousel = () => {
  const [activeThumb, setActiveThumb] = useState(0);
  const items = allItems.slice(0, 4);

  useEffect(() => {
    const timer = setInterval(() => setActiveThumb(prev => (prev + 1) % items.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="carousel-section">
      <div className="container">
        <RevealOnScroll>
          <h2 style={{ fontSize: '42px', textAlign: 'center', marginBottom: '50px' }}>Browse Our Collection</h2>
        </RevealOnScroll>
        <div className="carousel-main">
          {items.map((item, i) => (
            <div key={item.id} className={`carousel-slide ${i === activeThumb ? 'active' : ''}`}>
              <img src={item.img} alt={item.title} />
              <div className="carousel-caption">
                <h3>{item.title}</h3>
                <p>{item.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="carousel-thumbs">
          {items.map((item, i) => (
            <div key={item.id} className={`thumb ${i === activeThumb ? 'active' : ''}`} onClick={() => setActiveThumb(i)}>
              <img src={item.img} alt={item.title} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Process with Staggered Reveal ─── */
const Process = () => (
  <section className="process-section" style={{ padding: '100px 0', background: 'var(--bg-light)' }}>
    <div className="container">
      <RevealOnScroll>
        <h2 style={{ fontSize: '42px', textAlign: 'center', marginBottom: '10px' }}>The Bidding Process</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '60px' }}>A clear, structured, and transparent guide to purchasing corporate assets.</p>
      </RevealOnScroll>
      <div className="process-grid">
        {[
          { n: "1", d: "Registration and Login. Buyers must register with a valid email address to access the bidding portal and submit competitive quotes." },
          { n: "2", d: "Lot Inspection. Prospective buyers are invited to inspect items at the designated sales office or sample flats prior to bidding." },
          { n: "3", d: "Transparent Bidding. All auctions are conducted with clear reserve prices and real-time bid tracking to ensure a fair market outcome." },
          { n: "4", d: "Final Collection. Winning bidders coordinate with our logistics team for secure asset pickup and final payment on an as-is-where-is basis." }
        ].map((item, idx) => (
          <RevealOnScroll key={idx} className={`stagger-${idx + 1}`}>
            <div className="process-item">
              <div className="number">{item.n}</div>
              <p>{item.d}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  </section>
);

/* ─── FAQ ─── */
const FAQ = () => (
  <section className="faq-section" style={{ padding: '100px 0' }}>
    <div className="container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-container">
        {[
          { q: "How do I inspect the items before bidding?", a: "Inspection is mandatory for all prospective bidders. You are required to visit the scheduled demolition site at the listed location to physically examine the condition and functionality of the furniture and appliances prior to placing a bid." },
          { q: "What is the bidding process for these assets?", a: "Bidding is conducted through our secure online portal. Buyers must register and log in with their email ID to view the current auction listings. You can submit a quote against any product or participate in live bidding sessions as per the scheduled timelines." },
          { q: "Are the items sold on an as-is basis?", a: "Yes, all items are sold strictly on an as-is-where-is basis. Corporate Auction Hub does not provide warranties or guarantees regarding the condition of the furniture or appliances. Buyers assume full responsibility for any defects or pre-existing damage." },
          { q: "How do I arrange for the collection of my purchased items?", a: "Collection is handled directly by the buyer. Once the auction is complete and payment is confirmed, the buyer is responsible for arranging their own pickup at the scheduled demolition site. We recommend coordinating with our logistics team for logistical support." },
          { q: "What are the payment terms and accepted methods?", a: "Payment is due in full immediately upon successful bid confirmation. We accept major credit cards, bank transfers, and wire transfers. Please ensure your payment method is verified in your bidder profile to avoid delays in the closing process." }
        ].map((faq, idx) => (
          <RevealOnScroll key={idx} className={`stagger-${(idx % 3) + 1}`}>
            <div className="faq-item">
              <h3>{faq.q}</h3>
              <p>{faq.a}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  </section>
);

/* ─── CTA ─── */
const CTA = () => (
  <section className="cta-section">
    <div className="container">
      <RevealOnScroll>
        <h2>Ready to begin?</h2>
        <button className="btn-cta btn-ripple">Sign up to bid</button>
      </RevealOnScroll>
    </div>
  </section>
);

/* ─── Footer ─── */
const Footer = () => (
  <footer className="main-footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-col">
          <div className="nav-logo" style={{ marginBottom: '20px' }}>
            <div className="logo-icon" style={{ background: 'white', color: 'var(--secondary)' }}>N</div>
            <div className="logo-text"><span style={{ color: 'white' }}>NYATI</span><span style={{ color: 'white' }}>GROUP</span></div>
          </div>
        </div>
        <div className="footer-col"><h4>Location</h4><p>Nyati Unitree, Yerwada Pune</p></div>
        <div className="footer-col"><h4>Connect</h4><p>Varsha Bhandari</p></div>
        <div className="footer-col"><h4>Legal</h4><p>© 2026 Nyati Group.</p></div>
      </div>
    </div>
  </footer>
);

/* ─── App Root ─── */
function App() {
  const [wishlist, setWishlist] = useState([]);
  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <Router>
      <div className="app">
        <Navbar wishlistCount={wishlist.length} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/listings" element={<Listings wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
          <Route path="/wishlist" element={<WishlistPage wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
