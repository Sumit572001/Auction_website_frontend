import React from 'react';
import './App.css';
import { allItems } from './App';

const WishlistPage = ({ wishlist, toggleWishlist }) => {
    const wishlistedItems = allItems.filter(item => wishlist.includes(item.id));

    return (
        <div className="listings-page">
            <div className="container" style={{ padding: '60px 0' }}>
                <h2 style={{ fontSize: '42px', marginBottom: '40px', textAlign: 'center' }}>My Wishlist</h2>
                
                {wishlistedItems.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '100px 0' }}>
                        <p style={{ fontSize: '20px', color: 'var(--text-muted)' }}>Your wishlist is empty.</p>
                        <a href="/listings" className="btn-primary" style={{ display: 'inline-block', marginTop: '20px' }}>Browse Auctions</a>
                    </div>
                ) : (
                    <div className="listings-grid">
                        {wishlistedItems.map(item => (
                            <div key={item.id} className="car-card">
                                <div 
                                    className="wishlist-heart active"
                                    onClick={() => toggleWishlist(item.id)}
                                >
                                    ❤️
                                </div>
                                <div className="car-img-box">
                                    <img src={item.img} alt={item.title} />
                                </div>
                                <div className="car-info">
                                    <div style={{ flex: 1 }}>
                                        <h3>{item.title}</h3>
                                        <p className="sub">{item.sub}</p>
                                        <p className="prod" style={{ color: '#10b981' }}>{item.condition} Condition</p>
                                    </div>
                                </div>
                                <div className="price-row">
                                    <span className="price-rupiah">{item.price}</span>
                                    <button className="btn-go-bid">GO BID</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishlistPage;
