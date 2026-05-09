'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, X, Menu, ChevronRight, ChevronLeft } from 'lucide-react';

export default function LocalBeachBum() {
  const [page, setPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const allPhotos = [
    // { id: 1, emoji: '🎣', name: 'James M.', caption: 'Caught this beauty in the Predator Cap' },
    // { id: 2, emoji: '🌅', name: 'Sarah L.', caption: 'Early morning session in tech shirt' },
    // { id: 3, emoji: '🐟', name: 'Marcus K.', caption: 'Trophy bass in crew neck hoodie' },
    // { id: 4, emoji: '⚓', name: 'Tyler D.', caption: 'Night vibes with the bum crew' },
    // { id: 5, emoji: '🏖️', name: 'Alex R.', caption: 'Beach bum shorts, perfect fit' },
    // { id: 6, emoji: '🎽', name: 'Chris P.', caption: 'Hoodie saved me from cold mornings' },
    { id: 7, image: '/images/front-page-image-2.jpeg', name: 'Team Photo', caption: 'The crew together' },
    { id: 8, image: '/images/front-page-image-3.jpeg', name: 'Team Photo', caption: 'Out on the water' },
    { id: 9, image: '/images/front-page-image-4.jpeg', name: 'Team Photo', caption: 'Fishing moments' },
  ];

  // Filter only slides that have either emoji or image
  const customerPhotos = allPhotos.filter(photo => photo.emoji || photo.image);

  const products = [
    { id: 1, name: 'The Predator Cap', price: 32, image: '/images/nav-bar-logo.png', inStock: true, sizes: ['One Size'], description: 'The ultimate fishing cap - designed for serious anglers. Premium quality with superior durability.' },
    { id: 2, name: 'Tech Fishing Shirt', price: 65, image: '/images/skull-2-shirt.PNG', inStock: true, sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], description: 'Breathable tech fabric keeps you cool all day. UV protection and moisture-wicking technology.' },
    { id: 3, name: 'Beach Bum Shorts', price: 55, image: '/images/chill-shirt.PNG', inStock: true, sizes: ['S', 'M', 'L', 'XL'], description: 'Comfortable beach shorts perfect for any fishing trip. Quick-dry material and stylish design.' },
    { id: 4, name: 'Crew Neck Hoodie', price: 85, image: '/images/skull-shirt.PNG', inStock: true, sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], description: 'Stay warm on early morning fishing sessions. Premium comfort with iconic LBB branding.' },
    { id: 5, name: 'Fishing Hat Collection', price: 48, image: '/images/front-page-logo.png', inStock: false, sizes: ['One Size'], description: 'Exclusive collection featuring multiple hat styles. Limited edition designs for the true angler.' },
    { id: 6, name: 'UV Protection Gloves', price: 28, image: '/images/fish-logo.png', inStock: true, sizes: ['S', 'M', 'L', 'XL'], description: 'Protect your hands from sun exposure. Lightweight and durable for all-day wear.' },
  ];

  const menuItems = [
    { label: 'Home', id: 'home' },
    { label: 'Shop', id: 'shop' },
    { label: 'About', id: 'about' },
    { label: 'Community', id: 'community' },
    { label: 'Settings', id: 'settings' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % customerPhotos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [customerPhotos.length]);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item)));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    setShowCart(true);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleMenuClick = (itemId) => {
    setPage(itemId);
    setMenuOpen(false);
  };

  return (
    <div style={{ background: '#0a0a0a', color: '#fff', minHeight: '100vh', fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif' }}>
      {/* TOP NAV BAR */}
      <nav style={{ 
        background: '#0f0f0f', 
        borderBottom: '1px solid #222', 
        padding: '0.75rem 1.5rem', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        position: 'sticky', 
        top: 0, 
        zIndex: 100,
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(15, 15, 15, 0.95)'
      }}>
        {/* HAMBURGER MENU */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)} 
          style={{ background: 'none', border: 'none', color: '#f5f5f5', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
        >
          <Menu size={24} />
        </button>

        {/* LOGO CENTER */}
        <button 
          onClick={() => handleMenuClick('home')} 
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, margin: 0, display: 'flex', alignItems: 'center' }}
        >
          <img src="/images/fish-logo.png" alt="LBB" style={{ width: '60px', height: '60px' }} />
        </button>

        {/* CART */}
        <button 
          onClick={() => setShowCart(!showCart)} 
          style={{ background: 'none', border: 'none', color: '#f5f5f5', cursor: 'pointer', position: 'relative', padding: 0 }}
        >
          <ShoppingCart size={22} />
          {cart.length > 0 && (
            <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#ff6b35', color: '#fff', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>
              {cart.length}
            </span>
          )}
        </button>
      </nav>

      {/* DROPDOWN MENU */}
      {menuOpen && (
        <div style={{ position: 'fixed', top: '60px', left: 0, right: 0, background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)', borderBottom: '1px solid #222', zIndex: 99, animation: 'slideDown 0.3s ease-out', backdropFilter: 'blur(5px)' }}>
          <div style={{ padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                style={{ background: page === item.id ? 'rgba(255, 107, 53, 0.1)' : 'none', border: 'none', color: page === item.id ? '#ff6b35' : '#999', padding: '0.75rem 1rem', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer', borderLeft: page === item.id ? '3px solid #ff6b35' : '3px solid transparent', transition: 'all 0.2s' }}
                onMouseEnter={(e) => { e.target.style.color = '#f5f5f5'; e.target.style.background = 'rgba(255, 255, 255, 0.05)'; }}
                onMouseLeave={(e) => { e.target.style.color = page === item.id ? '#ff6b35' : '#999'; e.target.style.background = page === item.id ? 'rgba(255, 107, 53, 0.1)' : 'none'; }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', zIndex: 250, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#1a1a1a', borderRadius: '8px', maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '2rem', position: 'relative' }}>
            {/* Close Button */}
            <button onClick={() => { setSelectedProduct(null); setSelectedSize(''); setQuantity(1); }} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: '#f5f5f5', cursor: 'pointer', fontSize: '24px' }}>
              ✕
            </button>

            {/* Product Image */}
            <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '4px', marginBottom: '1.5rem' }} />

            {/* Product Name */}
            <h2 style={{ fontSize: '28px', margin: '0 0 1rem 0', color: '#f5f5f5', fontWeight: 'bold' }}>{selectedProduct.name}</h2>

            {/* Description */}
            <p style={{ color: '#ccc', fontSize: '14px', marginBottom: '1.5rem', lineHeight: '1.6' }}>{selectedProduct.description}</p>

            {/* Price & Stock */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '24px', color: '#ff6b35', fontWeight: 'bold' }}>${selectedProduct.price}</span>
              <span style={{ fontSize: '14px', color: selectedProduct.inStock ? '#4ade80' : '#ff6b6b' }}>
                {selectedProduct.inStock ? '✓ In Stock' : '✗ Out of Stock'}
              </span>
            </div>

            {/* Size Selection */}
            {selectedProduct.inStock && (
              <>
                <p style={{ fontSize: '14px', color: '#999', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Select Size</p>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                  {selectedProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      style={{ 
                        padding: '0.75rem 1rem', 
                        background: selectedSize === size ? '#ff6b35' : '#0f0f0f', 
                        color: '#f5f5f5', 
                        border: selectedSize === size ? '1px solid #ff6b35' : '1px solid #333',
                        borderRadius: '4px', 
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {/* Quantity Selection */}
                <p style={{ fontSize: '14px', color: '#999', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Quantity</p>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ background: '#0f0f0f', border: '1px solid #333', color: '#f5f5f5', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>−</button>
                  <span style={{ fontSize: '16px', fontWeight: 'bold', minWidth: '30px', textAlign: 'center' }}>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} style={{ background: '#0f0f0f', border: '1px solid #333', color: '#f5f5f5', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>+</button>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    onClick={() => {
                      if (selectedSize) {
                        addToCart({ ...selectedProduct, selectedSize, qty: quantity });
                        setSelectedProduct(null);
                        setSelectedSize('');
                        setQuantity(1);
                      }
                    }}
                    disabled={!selectedSize}
                    style={{ 
                      flex: 1, 
                      background: selectedSize ? '#ff6b35' : '#444', 
                      color: '#fff', 
                      border: 'none', 
                      padding: '0.75rem', 
                      borderRadius: '4px', 
                      cursor: selectedSize ? 'pointer' : 'not-allowed',
                      fontSize: '14px', 
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </>
            )}
            {!selectedProduct.inStock && (
              <button
                onClick={() => setSelectedProduct(null)}
                style={{ 
                  width: '100%', 
                  background: '#0f0f0f', 
                  color: '#f5f5f5', 
                  border: '1px solid #333',
                  padding: '0.75rem', 
                  borderRadius: '4px', 
                  cursor: 'pointer',
                  fontSize: '14px', 
                  fontWeight: 'bold',
                  textTransform: 'uppercase'
                }}
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}

      {/* SHOPPING CART SIDEBAR */}
      {showCart && (
        <div style={{ position: 'fixed', top: 0, right: 0, width: '100%', maxWidth: '400px', height: '100vh', background: '#1a1a1a', borderLeft: '1px solid #333', zIndex: 200, display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '-10px 0 30px rgba(0,0,0,0.5)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid #333' }}>
            <h2 style={{ margin: 0, fontSize: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>Your Bag</h2>
            <button onClick={() => setShowCart(false)} style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer' }}>
              <X size={20} />
            </button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
            {cart.length === 0 ? (
              <p style={{ color: '#666', textAlign: 'center', marginTop: '2rem', fontSize: '14px' }}>Bag is empty</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #333' }}>
                  <div>
                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '14px' }}>{item.name}</p>
                    <p style={{ margin: 0, color: '#999', fontSize: '13px' }}>${item.price} x {item.qty}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}>
                    <X size={18} />
                  </button>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div style={{ padding: '1.5rem', borderTop: '1px solid #333' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '16px', fontWeight: 'bold' }}>
                <span>Total:</span>
                <span style={{ color: '#ff6b35' }}>${cartTotal.toFixed(2)}</span>
              </div>
              <button style={{ width: '100%', background: '#ff6b35', color: '#fff', border: 'none', padding: '0.75rem', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', transition: 'all 0.2s' }} 
                onMouseEnter={(e) => (e.target.style.background = '#ff5722')}
                onMouseLeave={(e) => (e.target.style.background = '#ff6b35')}
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      )}

      {/* HOME PAGE */}
      {page === 'home' && (
        <div>
          {/* HERO SECTION */}
          <div style={{ height: '60vh', background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
            <img src="/images/front-page-logo.png" alt="Local Beach Bum" style={{ width: '90vw', maxWidth: '800px', height: 'auto', marginBottom: '2rem', animation: 'float 3s ease-in-out infinite' }} />
          </div>

          {/* CUSTOMER GALLERY */}
          <div style={{ background: '#0d0d0d', padding: '4rem 1.5rem', position: 'relative' }}>
            <h2 style={{ fontSize: '24px', margin: '0 0 3rem 0', textTransform: 'uppercase', letterSpacing: '2px', color: '#f5f5f5', textAlign: 'center' }}>The Crew In Action</h2>
            
            <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
              <div style={{ background: '#1a1a1a', border: '1px solid #222', borderRadius: '8px', padding: '2rem', textAlign: 'center', minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {customerPhotos[slideIndex].image ? (
                  <img src={customerPhotos[slideIndex].image} alt={customerPhotos[slideIndex].caption} style={{ width: '100%', maxWidth: '400px', height: 'auto', marginBottom: '1rem', borderRadius: '4px' }} />
                ) : (
                  <div style={{ fontSize: '80px', marginBottom: '1rem' }}>{customerPhotos[slideIndex].emoji}</div>
                )}
                <p style={{ fontSize: '18px', margin: '0 0 0.5rem 0', fontWeight: 'bold', color: '#f5f5f5' }}>{customerPhotos[slideIndex].caption}</p>
                <p style={{ fontSize: '13px', color: '#999' }}>— {customerPhotos[slideIndex].name}</p>
              </div>

              <button 
                onClick={() => setSlideIndex((prev) => (prev - 1 + customerPhotos.length) % customerPhotos.length)}
                style={{ position: 'absolute', left: '-60px', top: '50%', transform: 'translateY(-50%)', background: '#1a1a1a', border: '1px solid #222', color: '#f5f5f5', cursor: 'pointer', padding: '0.75rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={() => setSlideIndex((prev) => (prev + 1) % customerPhotos.length)}
                style={{ position: 'absolute', right: '-60px', top: '50%', transform: 'translateY(-50%)', background: '#1a1a1a', border: '1px solid #222', color: '#f5f5f5', cursor: 'pointer', padding: '0.75rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <ChevronRight size={20} />
              </button>

              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '2rem' }}>
                {customerPhotos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlideIndex(i)}
                    style={{ width: slideIndex === i ? '24px' : '8px', height: '8px', background: slideIndex === i ? '#ff6b35' : '#444', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.3s' }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* FEATURED PRODUCTS */}
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem' }}>
            <h2 style={{ fontSize: '24px', margin: '0 0 3rem 0', textTransform: 'uppercase', letterSpacing: '2px', color: '#f5f5f5' }}>Latest Drops</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
              {products.slice(0, 4).map((product) => (
                <div 
                  key={product.id} 
                  onClick={() => setSelectedProduct(product)}
                  style={{ background: '#1a1a1a', border: '1px solid #222', padding: '2rem 1.5rem', borderRadius: '8px', textAlign: 'center', transition: 'all 0.3s', cursor: 'pointer' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#ff6b35'; e.currentTarget.style.background = '#1f1f1f'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#222'; e.currentTarget.style.background = '#1a1a1a'; }}
                >
                  <img 
                    src={product.image} 
                    alt={product.name}
                    style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px', marginBottom: '1rem', cursor: 'pointer' }}
                  />
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', color: '#f5f5f5' }}>
                    {product.name}
                  </h3>
                  <p style={{ margin: '0 0 1rem 0', color: '#ff6b35', fontSize: '16px', fontWeight: 'bold' }}>
                    ${product.price}
                  </p>
                  <button 
                    onClick={(e) => { e.stopPropagation(); alert('Clicked ' + product.name); setSelectedProduct(product); }}
                    disabled={!product.inStock}
                    style={{ width: '100%', background: product.inStock ? '#ff6b35' : '#444', color: '#fff', border: 'none', padding: '0.75rem', borderRadius: '4px', cursor: product.inStock ? 'pointer' : 'not-allowed', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', transition: 'all 0.2s' }}
                    onMouseEnter={(e) => product.inStock && (e.target.style.background = '#ff5722')}
                    onMouseLeave={(e) => product.inStock && (e.target.style.background = '#ff6b35')}
                  >
                    {product.inStock ? 'View Details' : 'Out of Stock'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SHOP PAGE */}
      {page === 'shop' && (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
          <h1 style={{ fontSize: '32px', margin: '0 0 3rem 0', textTransform: 'uppercase', letterSpacing: '2px', color: '#f5f5f5' }}>All Products</h1>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {products.filter(p => p.inStock).map((product) => (
              <div 
                key={product.id} 
                style={{ background: '#1a1a1a', border: '1px solid #222', padding: '2rem 1.5rem', borderRadius: '8px', textAlign: 'center', transition: 'all 0.3s', cursor: 'pointer' }}
                onClick={() => setSelectedProduct(product)}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#ff6b35'; e.currentTarget.style.background = '#1f1f1f'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#222'; e.currentTarget.style.background = '#1a1a1a'; }}
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px', marginBottom: '1rem' }}
                />
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', color: '#f5f5f5' }}>
                  {product.name}
                </h3>
                <p style={{ margin: '0 0 1rem 0', color: '#ff6b35', fontSize: '16px', fontWeight: 'bold' }}>
                  ${product.price}
                </p>
                <button 
                  onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                  style={{ width: '100%', background: '#ff6b35', color: '#fff', border: 'none', padding: '0.75rem', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => (e.target.style.background = '#ff5722')}
                  onMouseLeave={(e) => (e.target.style.background = '#ff6b35')}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ABOUT PAGE */}
      {page === 'about' && (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem 1.5rem' }}>
          <h1 style={{ fontSize: '32px', margin: '0 0 3rem 0', textTransform: 'uppercase', letterSpacing: '2px', color: '#f5f5f5' }}>About Us</h1>

          <div style={{ display: 'grid', gap: '2rem' }}>
            <div style={{ background: '#1a1a1a', border: '1px solid #222', borderRadius: '8px', padding: '2rem' }}>
              <h2 style={{ margin: '0 0 1rem 0', fontSize: '16px', color: '#ff6b35', textTransform: 'uppercase', letterSpacing: '1px' }}>Who We Are</h2>
              <p style={{ margin: 0, color: '#ccc', lineHeight: '1.8', fontSize: '14px' }}>Local Beach Bum is an invitation-only fishing apparel brand built by anglers, for anglers. We're a crew dedicated to premium gear that celebrates beach culture and the lifestyle.</p>
            </div>

            <div style={{ background: '#1a1a1a', border: '1px solid #222', borderRadius: '8px', padding: '2rem' }}>
              <h2 style={{ margin: '0 0 1rem 0', fontSize: '16px', color: '#ff6b35', textTransform: 'uppercase', letterSpacing: '1px' }}>What We Stand For</h2>
              <p style={{ margin: 0, color: '#ccc', lineHeight: '1.8', fontSize: '14px' }}>Authenticity, quality, and community. Limited drops. Selective crew. Premium apparel for people who live and breathe fishing and the ocean lifestyle.</p>
            </div>

            <div style={{ background: '#1a1a1a', border: '1px solid #222', borderRadius: '8px', padding: '2rem' }}>
              <h2 style={{ margin: '0 0 1rem 0', fontSize: '16px', color: '#ff6b35', textTransform: 'uppercase', letterSpacing: '1px' }}>What Fishing Means</h2>
              <p style={{ margin: 0, color: '#ccc', lineHeight: '1.8', fontSize: '14px' }}>More than catching fish. It's patience, respect for nature, early mornings, golden sunsets, and moments with the crew. It's a way of being, a connection to something real and pure.</p>
            </div>
          </div>
        </div>
      )}

      {/* COMMUNITY PAGE */}
      {page === 'community' && (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem 1.5rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '32px', margin: '0 0 2rem 0', textTransform: 'uppercase', letterSpacing: '2px', color: '#f5f5f5' }}>Community</h1>
          
          <div style={{ background: '#1a1a1a', border: '2px solid #ff6b35', borderRadius: '8px', padding: '3rem', textAlign: 'center' }}>
            <div style={{ fontSize: '60px', marginBottom: '1rem' }}>🚀</div>
            <h2 style={{ fontSize: '24px', margin: '0 0 1rem 0', color: '#ff6b35', textTransform: 'uppercase', letterSpacing: '1px' }}>Coming Soon</h2>
            <p style={{ margin: 0, color: '#999', fontSize: '14px', lineHeight: '1.6' }}>
              The community section is under development. This is where the crew will share catches, stories, and moments together.
            </p>
          </div>
        </div>
      )}

      {/* SETTINGS PAGE */}
      {page === 'settings' && (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem 1.5rem' }}>
          <h1 style={{ fontSize: '32px', margin: '0 0 3rem 0', textTransform: 'uppercase', letterSpacing: '2px', color: '#f5f5f5' }}>Settings</h1>
          
          <div style={{ background: '#1a1a1a', border: '1px solid #222', borderRadius: '8px', padding: '2rem' }}>
            <p style={{ color: '#999', fontSize: '14px', margin: 0 }}>Settings page - customize your preferences here.</p>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #222', marginTop: '3rem', padding: '2rem', textAlign: 'center', color: '#666', fontSize: '12px' }}>
        <p style={{ margin: 0 }}>© 2026 Local Beach Bum. Locals Only. 🎣</p>
      </footer>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #0a0a0a;
        }

        ::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
}