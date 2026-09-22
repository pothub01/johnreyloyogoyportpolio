import React, { useMemo, useState } from 'react';
import SampleInvitation from './samples/SampleInvitation';

const products = [
  { id: 1, name: 'The Olive Garden', type: 'Wedding', price: 28, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85', tone: 'olive', badge: 'Bestseller', sample: '/samples/olive-garden' },
  { id: 2, name: 'Sunday in Capri', type: 'Wedding', price: 32, image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=85', tone: 'blue', badge: 'New', sample: '/samples/sunday-in-capri' },
  { id: 3, name: 'A Little Wild', type: 'Birthday', price: 18, image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=900&q=85', tone: 'peach', badge: null },
  { id: 4, name: 'Rattan & Sun', type: 'Baby shower', price: 22, image: 'https://images.unsplash.com/photo-1513159446162-54eb8bdaa79b?auto=format&fit=crop&w=900&q=85', tone: 'sand', badge: 'Popular' },
  { id: 5, name: 'Midnight Toast', type: 'Celebration', price: 24, image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=900&q=85', tone: 'night', badge: null, sample: '/samples/midnight-toast' },
  { id: 6, name: 'Petal Notes', type: 'Wedding', price: 26, image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&w=900&q=85', tone: 'rose', badge: null },
];

const categories = ['All designs', 'Wedding', 'Birthday', 'Baby shower', 'Celebration'];

function Storefront() {
  const [category, setCategory] = useState('All designs');
  const [favorites, setFavorites] = useState([]);
  const [preview, setPreview] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState('');

  const visibleProducts = useMemo(() => category === 'All designs' ? products : products.filter((product) => product.type === category), [category]);

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2400);
  };

  const addToCart = (product) => {
    setCart((items) => [...items, product]);
    setCartOpen(true);
    notify(`${product.name} added to your bag`);
  };

  const toggleFavorite = (id) => setFavorites((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);

  return (
    <div className="site-shell">
      <div className="announcement">Complimentary envelope liners with every order this week <span>✦</span> Shop the collection <span>→</span></div>
      <header className="header">
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">☰</button>
        <a className="brand" href="#top" aria-label="Vow and Vine home"><span>Vow</span><i>&amp;</i><span>Vine</span><small>INVITATION STUDIO</small></a>
        <nav className={menuOpen ? 'nav open' : 'nav'}>
          <a href="#shop" onClick={() => setMenuOpen(false)}>Shop invitations</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>Our story</a>
        </nav>
        <div className="header-actions">
          <button aria-label="Search" onClick={() => notify('Search is coming soon')}>⌕</button>
          <button aria-label="Favorites" onClick={() => notify(`${favorites.length} saved design${favorites.length === 1 ? '' : 's'}`)}>♡ <sup>{favorites.length || ''}</sup></button>
          <button className="bag-button" onClick={() => setCartOpen(true)} aria-label="Open shopping bag">Bag <b>{cart.length}</b></button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Thoughtful details for meaningful days</p>
            <h1>Make it<br /><em>feel like you.</em></h1>
            <p className="hero-text">Beautiful, modern invitations for the moments you’ll remember forever. Personalize in minutes, send with love.</p>
            <div className="hero-buttons"><a className="button dark" href="#shop">Explore designs <span>↘</span></a><button className="text-button" onClick={() => notify('A design consultant will be in touch soon')}>Work with a designer <span>→</span></button></div>
            <div className="hero-note"><span className="avatars">● ● ●</span><span>Trusted by 2,000+ joyful hosts</span></div>
          </div>
          <div className="hero-art">
            <div className="sun-disc" />
            <div className="hero-card card-back" />
            <div className="hero-card card-front"><span>the</span><strong>Olive<br />Garden</strong><small>made for forever</small></div>
            <div className="scribble">made<br />with<br /><i>love</i></div>
            <span className="leaf leaf-one">❧</span><span className="leaf leaf-two">❧</span>
          </div>
        </section>

        <section className="trust-row"><span>DESIGNED FOR THE DETAILS</span><span>✦</span><span>EDITABLE IN MINUTES</span><span>✦</span><span>DELIVERED WITH LOVE</span></section>

        <section className="shop-section" id="shop">
          <div className="section-heading"><div><p className="eyebrow">Find your feeling</p><h2>Invitations for<br /><em>every occasion.</em></h2></div><p>From first hellos to forever yeses,<br />there’s a little something here for you.</p></div>
          <div className="filters">{categories.map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div>
          <div className="product-grid">{visibleProducts.map((product) => <article className="product-card" key={product.id}>
            <button className="favorite" onClick={() => toggleFavorite(product.id)} aria-label={`Save ${product.name}`}>{favorites.includes(product.id) ? '♥' : '♡'}</button>
            <button className="product-image" onClick={() => setPreview(product)}><img src={product.image} alt="" /><span className={`tone tone-${product.tone}`}><small>{product.type}</small><strong>{product.name}</strong><i>you’re invited</i></span>{product.badge && <b className="badge">{product.badge}</b>}<span className="quick-view">Quick view ↗</span></button>
            <div className="product-info"><div><h3>{product.name}</h3><p>{product.type} · from ${product.price}</p></div><button className="add-button" onClick={() => addToCart(product)}>＋</button></div>
          </article>)}</div>
          <button className="view-all" onClick={() => { setCategory('All designs'); notify('Showing all designs'); }}>View all invitations <span>→</span></button>
        </section>

        <section className="how-section" id="how-it-works"><div className="how-intro"><p className="eyebrow">Simple by design</p><h2>Your day.<br /><em>Your way.</em></h2><p>We believe the best invitations feel effortless. Pick a design you love, make it yours, and let the good times begin.</p></div><div className="steps"><div><span>01</span><h3>Choose your mood</h3><p>Browse our collection of artful templates, made for real-life celebrations.</p></div><div><span>02</span><h3>Make it personal</h3><p>Change the names, colors, wording, and every tiny detail in our easy editor.</p></div><div><span>03</span><h3>Send the joy</h3><p>Download, print, or send beautifully online. RSVP tracking included.</p></div></div></section>
        <section className="story-section" id="about"><div className="story-image"><img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85" alt="Flowers and stationery on a table" /></div><div className="story-copy"><p className="eyebrow">A little note from us</p><h2>Good things<br /><em>start with paper.</em></h2><p>Vow &amp; Vine began with a stack of handwritten notes and a belief that the smallest details can make people feel truly seen.</p><button className="text-button" onClick={() => notify('Thanks for getting to know us')}>Meet the studio <span>→</span></button></div></section>
      </main>

      <footer className="footer"><div className="brand"><span>Vow</span><i>&amp;</i><span>Vine</span><small>INVITATION STUDIO</small></div><p>For all of life’s lovely little reasons.</p><div><a href="#shop">Shop</a><a href="#how-it-works">FAQ</a><a href="#about">Instagram</a></div><small>© 2024 Vow &amp; Vine</small></footer>

      {preview && <div className="modal-backdrop" onClick={() => setPreview(null)}><div className="preview-modal" onClick={(event) => event.stopPropagation()}><button className="close" onClick={() => setPreview(null)}>×</button><img src={preview.image} alt="" /><div><p className="eyebrow">{preview.type} invitation</p><h2>{preview.name}</h2><p>Fully editable template · starts at ${preview.price}</p><div className="preview-actions"><a className="button outline" href={preview.sample || '#'} target="_blank" rel="noreferrer">Open live sample <span>↗</span></a><button className="button dark" onClick={() => { addToCart(preview); setPreview(null); }}>Customize this design <span>→</span></button></div></div></div></div>}
      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-head"><h2>Your bag <span>{cart.length}</span></h2><button onClick={() => setCartOpen(false)}>×</button></div>{cart.length ? <><div className="cart-items">{cart.map((item, index) => <div className="cart-item" key={`${item.id}-${index}`}><img src={item.image} alt="" /><div><h3>{item.name}</h3><p>{item.type} · ${item.price}</p></div></div>)}</div><div className="cart-total"><span>Estimated total</span><strong>${cart.reduce((total, item) => total + item.price, 0)}</strong></div><button className="button dark checkout" onClick={() => notify('Checkout is ready for your payment integration')}>Continue to checkout <span>→</span></button></> : <div className="empty-cart"><span>✦</span><p>Your bag is waiting<br />for something lovely.</p><a href="#shop" onClick={() => setCartOpen(false)}>Browse designs →</a></div>}</aside></div>}
      {toast && <div className="toast">{toast} <span>✦</span></div>}
    </div>
  );
}

export default function App() {
  const samplePath = window.location.pathname.replace(/\/$/, '');
  return samplePath.startsWith('/samples/') ? <SampleInvitation path={samplePath} /> : <Storefront />;
}
