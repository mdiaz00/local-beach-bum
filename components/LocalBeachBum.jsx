'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, X, Eye, EyeOff, ChevronRight, ChevronLeft } from 'lucide-react';

export default function LocalBeachBum() {
  const [page, setPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [slideIndex, setSlideIndex] = useState(0);

  const correctPassword = 'LocalBeachBum2025';
  const accentColor = '#f5f5f5';
  const accentColorHover = '#d0d0d0';

  const crewCatches = [
    { id: 1, emoji: '🎣', caption: 'Monster bass caught at dawn', by: '@fisherman_joe' },
    { id: 2, emoji: '🌅', caption: 'Golden hour paradise', by: '@sunrise_crew' },
    { id: 3, emoji: '🐟', caption: 'Trophy largemouth', by: '@bass_master' },
    { id: 4, emoji: '⚓', caption: 'Night fishing vibes', by: '@night_fisher' },
    { id: 5, emoji: '🏖️', caption: 'Crew gathering moment', by: '@local_vibes' },
  ];

  const products = [
    { id: 1, name: 'The Predator Cap', price: 32, image: '🧢' },
    { id: 2, name: 'Tech Fishing Shirt', price: 65, image: '👕' },
    { id: 3, name: 'Beach Bum Shorts', price: 55, image: '🩳' },
    { id: 4, name: 'Crew Neck Hoodie', price: 85, image: '🎽' },
    { id: 5, name: 'Fishing Hat Collection', price: 48, image: '🎩' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % crewCatches.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [crewCatches.length]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setAuthError('');
      setPassword('');
      setPage('home');
    } else {
      setAuthError('Invalid password');
    }
  };

  const nextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % crewCatches.length);
  };

  const prevSlide = () => {
    setSlideIndex((prev) => (prev - 1 + crewCatches.length) % crewCatches.length);
  };

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item)));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', fontFamily: "'Helvetica Neue', sans-serif" }}>
        <div style={{ background: '#0f0f0f', border: `2px solid ${accentColor}`, borderRadius: '8px', padding: '3rem', maxWidth: '450px', width: '100%', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '1.5rem' }}>🐟</div>
          <h1 style={{ fontSize: '28px', color: accentColor, margin: '0 0 0.5rem 0', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 'bold' }}>Local Beach Bum</h1>
          <p style={{ color: accentColor, fontSize: '14px', margin: '0 0 2rem 0', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold', borderTop: `1px solid ${accentColor}`, borderBottom: `1px solid ${accentColor}`, padding: '1rem 0' }}>Locals Only</p>

          <div style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '6px', padding: '2rem', marginBottom: '1.5rem' }}>
            <p style={{ color: '#ccc', fontSize: '12px', margin: '0 0 1.5rem 0', textTransform: 'uppercase', letterSpacing: '1px' }}>Exclusive early access</p>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ position: 'relative' }}>
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" style={{ width: '100%', padding: '0.75rem 2.5rem 0.75rem 0.75rem', background: '#0f0f0f', border: '1px solid #333', borderRadius: '4px', color: '#fff', fontSize: '14px', boxSizing: 'border-box' }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#666', cursor: 'pointer', padding: '0.5rem' }}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <button type="submit" style={{ background: accentColor, color: '#0d0d0d', border: 'none', padding: '0.75rem', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }} onMouseEnter={(e) => (e.target.style.background = accentColorHover)} onMouseLeave={(e) => (e.target.style.background = accentColor)}>Unlock</button>
            </form>

            {authError && <p style={{ color: '#ff6b6b', fontSize: '13px', margin: '1rem 0 0 0', background: 'rgba(255, 107, 107, 0.1)', padding: '0.75rem', borderRadius: '4px', border: '1px solid rgba(255, 107, 107, 0.3)' }}>
              {authError}
            </p>}
          </div>

          <p style={{ color: '#666', fontSize: '12px', margin: '2rem 0 0 0' }}>Premium fishing apparel for the crew. Monthly drops. Invitation only.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#0d0d0d', color: '#fff', minHeight: '100vh', fontFamily: "'Helvetica Neue', sans-serif" }}>
      <nav style={{ background: '#1a1a1a', borderBottom: '1px solid #333', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <button onClick={() => setPage('home')} style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', color: accentColor, background: 'none', border: 'none', cursor: 'pointer' }}>LBB</button>

        <div style={{ display: 'flex', gap: '2rem', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>
          {['home', 'shop', 'about', 'community'].map((p) => (
            <button key={p} onClick={() => setPage(p)} style={{ background: 'none', border: 'none', color: page === p ? accentColor : '#999', cursor: 'pointer', transition: 'color 0.2s', fontSize: '13px' }} onMouseEnter={(e) => (e.target.style.color = page === p ? accentColor : '#ccc')} onMouseLeave={(e) => (e.target.style.color = page === p ? accentColor : '#999')}>
              {p}
            </button>
          ))}
        </div>

        <button onClick={() => setShowCart(!showCart)} style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontSize: '20px', position: 'relative' }}>
          <ShoppingCart size={20} />
          {cart.length > 0 && <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: accentColor, color: '#0d0d0d', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>{cart.length}</span>}
        </button>
      </nav>

      {showCart && (
        <div style={{ position: 'fixed', top: 0, right: 0, width: '100%', maxWidth: '400px', height: '100vh', background: '#1a1a1a', borderLeft: '1px solid #333', zIndex: 200, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid #333' }}>
            <h2 style={{ margin: 0, fontSize: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>Bag</h2>
            <button onClick={() => setShowCart(false)} style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer' }}><X size={20} /></button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
            {cart.length === 0 ? (
              <p style={{ color: '#666', textAlign: 'center', marginTop: '2rem' }}>Bag is empty</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #333' }}>
                  <div>
                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '14px' }}>{item.name}</p>
                    <p style={{ margin: 0, color: '#999', fontSize: '13px' }}>${item.price} x {item.qty}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}><X size={18} /></button>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div style={{ padding: '1.5rem', borderTop: '1px solid #333' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '16px', fontWeight: 'bold' }}>
                <span>Total:</span>
                <span style={{ color: accentColor }}>${cartTotal.toFixed(2)}</span>
              </div>
              <button style={{ width: '100%', background: accentColor, color: '#0d0d0d', border: 'none', padding: '0.75rem', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }} onMouseEnter={(e) => (e.target.style.background = accentColorHover)} onMouseLeave={(e) => (e.target.style.background = accentColor)}>Checkout</button>
            </div>
          )}
        </div>
      )}

      {page === 'home' && (
        <div>
          <div style={{ position: 'relative', height: '80vh', background: '#1a1a1a', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
            <div style={{ textAlign: 'center', zIndex: 10 }}>
              <h1 style={{ fontSize: '48px', margin: '0 0 0.5rem 0', textTransform: 'uppercase', letterSpacing: '4px', color: accentColor, fontWeight: 'bold' }}>Local</h1>
              <h1 style={{ fontSize: '48px', margin: '0 0 1.5rem 0', textTransform: 'uppercase', letterSpacing: '4px', color: accentColor, fontWeight: 'bold' }}>Beach Bum</h1>
              <p style={{ fontSize: '16px', margin: '0 0 2rem 0', color: accentColor, textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 'bold', borderTop: `1px solid ${accentColor}`, borderBottom: `1px solid ${accentColor}`, padding: '1rem 0' }}>Locals Only</p>

              <div style={{ marginBottom: '2rem', animation: 'pulse 2s infinite', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '140px' }}>
                <img src="/images/fish-logo.png" alt="Fish Logo" style={{ width: '120px', height: '120px', objectFit: 'contain', maxWidth: '100%' }} />
              </div>

              <h2 style={{ fontSize: '18px', margin: '0 0 0.5rem 0', color: accentColor, textTransform: 'uppercase', letterSpacing: '1px' }}>{crewCatches[slideIndex].caption}</h2>
              <p style={{ color: '#999', fontSize: '14px', margin: 0 }}>{crewCatches[slideIndex].by}</p>
            </div>

            <button onClick={prevSlide} style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: `1px solid ${accentColor}`, color: accentColor, cursor: 'pointer', padding: '0.75rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20 }}><ChevronLeft size={24} /></button>
            <button onClick={nextSlide} style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: `1px solid ${accentColor}`, color: accentColor, cursor: 'pointer', padding: '0.75rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20 }}><ChevronRight size={24} /></button>

            <div style={{ position: 'absolute', bottom: '1.5rem', display: 'flex', gap: '0.5rem', zIndex: 20 }}>
              {crewCatches.map((_, i) => (
                <button key={i} onClick={() => setSlideIndex(i)} style={{ width: slideIndex === i ? '24px' : '6px', height: '6px', background: slideIndex === i ? accentColor : '#666', border: 'none', borderRadius: '3px', cursor: 'pointer', transition: 'all 0.3s' }} />
              ))}
            </div>
          </div>

          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
            <h2 style={{ fontSize: '32px', margin: '0 0 2rem 0', textTransform: 'uppercase', letterSpacing: '2px', color: accentColor }}>Latest Drop</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
              {products.map((product) => (
                <div key={product.id} style={{ background: '#1a1a1a', border: '1px solid #333', padding: '1.5rem', borderRadius: '4px', textAlign: 'center' }}>
                  <div style={{ fontSize: '56px', marginBottom: '1rem', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{product.image}</div>
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>{product.name}</h3>
                  <p style={{ margin: '0 0 1rem 0', color: accentColor, fontSize: '16px', fontWeight: 'bold' }}>${product.price}</p>
                  <button onClick={() => addToCart(product)} style={{ width: '100%', background: accentColor, color: '#0d0d0d', border: 'none', padding: '0.5rem', borderRadius: '3px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }} onMouseEnter={(e) => (e.target.style.background = accentColorHover)} onMouseLeave={(e) => (e.target.style.background = accentColor)}>Add</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {page === 'shop' && (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
          <h1 style={{ fontSize: '32px', margin: '0 0 2rem 0', textTransform: 'uppercase', letterSpacing: '2px', color: accentColor }}>All Products</h1>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
            {products.map((product) => (
              <div key={product.id} style={{ background: '#1a1a1a', border: '1px solid #333', padding: '1.5rem', borderRadius: '4px', textAlign: 'center' }}>
                <div style={{ fontSize: '56px', marginBottom: '1rem', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{product.image}</div>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>{product.name}</h3>
                <p style={{ margin: '0 0 1rem 0', color: accentColor, fontSize: '16px', fontWeight: 'bold' }}>${product.price}</p>
                <button onClick={() => addToCart(product)} style={{ width: '100%', background: accentColor, color: '#0d0d0d', border: 'none', padding: '0.5rem', borderRadius: '3px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }} onMouseEnter={(e) => (e.target.style.background = accentColorHover)} onMouseLeave={(e) => (e.target.style.background = accentColor)}>Add</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {page === 'about' && (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1.5rem' }}>
          <h1 style={{ fontSize: '32px', margin: '0 0 2rem 0', textTransform: 'uppercase', letterSpacing: '2px', color: accentColor }}>About Us</h1>

          <div style={{ display: 'grid', gap: '2rem', marginBottom: '2rem' }}>
            <div style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '4px', padding: '2rem' }}>
              <h2 style={{ margin: '0 0 1rem 0', fontSize: '16px', color: accentColor, textTransform: 'uppercase', letterSpacing: '1px' }}>Who We Are</h2>
              <p style={{ margin: 0, color: '#ccc', lineHeight: '1.6', fontSize: '14px' }}>Local Beach Bum is an invitation-only fishing apparel brand built by anglers, for anglers. We're a crew dedicated to premium gear that celebrates beach culture and lifestyle.</p>
            </div>

            <div style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '4px', padding: '2rem' }}>
              <h2 style={{ margin: '0 0 1rem 0', fontSize: '16px', color: accentColor, textTransform: 'uppercase', letterSpacing: '1px' }}>What We Stand For</h2>
              <p style={{ margin: 0, color: '#ccc', lineHeight: '1.6', fontSize: '14px' }}>Authenticity, quality, and community. Limited drops. Selective crew. Premium apparel for people who live and breathe fishing.</p>
            </div>

            <div style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '4px', padding: '2rem' }}>
              <h2 style={{ margin: '0 0 1rem 0', fontSize: '16px', color: accentColor, textTransform: 'uppercase', letterSpacing: '1px' }}>What Fishing Means</h2>
              <p style={{ margin: 0, color: '#ccc', lineHeight: '1.6', fontSize: '14px' }}>More than catching fish. It's patience, respect for nature, early mornings, golden sunsets, and moments with the crew. A way of being.</p>
            </div>
          </div>

          <div style={{ background: '#1a1a1a', border: `2px solid ${accentColor}`, borderRadius: '4px', padding: '2rem', textAlign: 'center' }}>
            <p style={{ fontSize: '18px', margin: '0 0 1rem 0', color: accentColor, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Locals Only</p>
            <p style={{ margin: 0, color: '#999', fontSize: '14px' }}>For the crew that lives and breathes the water.</p>
          </div>
        </div>
      )}

      {page === 'community' && (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1.5rem' }}>
          <h1 style={{ fontSize: '32px', margin: '0 0 2rem 0', textTransform: 'uppercase', letterSpacing: '2px', color: accentColor }}>Community</h1>

          <div style={{ background: '#1a1a1a', border: `2px solid ${accentColor}`, borderRadius: '4px', padding: '2rem', marginBottom: '3rem' }}>
            <h2 style={{ margin: '0 0 1rem 0', fontSize: '16px', textTransform: 'uppercase', letterSpacing: '1px', color: accentColor }}>Share Your Catch</h2>
            <p style={{ color: '#999', margin: '0 0 1.5rem 0', fontSize: '14px' }}>Submit your latest fishing photo to be featured on the homepage.</p>

            <div style={{ background: '#0d0d0d', border: '2px dashed #333', borderRadius: '4px', padding: '2rem', textAlign: 'center', marginBottom: '1.5rem', cursor: 'pointer' }} onMouseEnter={(e) => (e.currentTarget.style.borderColor = accentColor)} onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#333')}>
              <p style={{ margin: '0 0 1rem 0', fontSize: '40px' }}>📸</p>
              <p style={{ margin: '0 0 0.5rem 0', fontSize: '14px', fontWeight: 'bold' }}>Upload Photo</p>
              <p style={{ margin: 0, color: '#666', fontSize: '12px' }}>PNG, JPG or GIF (MAX 5MB)</p>
            </div>

            <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
              <input type="text" placeholder="Your name" style={{ padding: '0.75rem', background: '#0d0d0d', border: '1px solid #333', borderRadius: '4px', color: '#fff', fontSize: '14px' }} />
              <input type="text" placeholder="Catch title" style={{ padding: '0.75rem', background: '#0d0d0d', border: '1px solid #333', borderRadius: '4px', color: '#fff', fontSize: '14px' }} />
              <textarea placeholder="Tell the story (optional)" style={{ padding: '0.75rem', background: '#0d0d0d', border: '1px solid #333', borderRadius: '4px', color: '#fff', fontSize: '14px', minHeight: '80px', fontFamily: 'inherit', resize: 'none' }} />
            </div>

            <button style={{ width: '100%', background: accentColor, color: '#0d0d0d', border: 'none', padding: '0.75rem', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }} onMouseEnter={(e) => (e.target.style.background = accentColorHover)} onMouseLeave={(e) => (e.target.style.background = accentColor)}>Submit</button>
          </div>

          <div>
            <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '18px', color: accentColor, textTransform: 'uppercase', letterSpacing: '1px' }}>Featured Catches</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              {crewCatches.map((pic) => (
                <div key={pic.id} style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ fontSize: '60px', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#2a2a2a' }}>{pic.emoji}</div>
                  <div style={{ padding: '1rem' }}>
                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '13px', fontWeight: 'bold' }}>{pic.caption}</p>
                    <p style={{ margin: 0, color: accentColor, fontSize: '12px' }}>{pic.by}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <footer style={{ borderTop: '1px solid #333', marginTop: '3rem', padding: '1.5rem', textAlign: 'center', color: '#666', fontSize: '12px' }}>
        <p style={{ margin: 0 }}>© 2026 Local Beach Bum. Locals Only.</p>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}