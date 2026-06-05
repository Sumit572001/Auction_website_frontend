import React, { useState } from 'react';
import './App.css';
import { allItems } from './App';

const Listings = ({ wishlist, toggleWishlist }) => {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const categories = [
        "Table", "Chair", "Bed", "Fridge", "Washing Machine", "AC", "Sofa", "Office Desk"
    ];

    const toggleFilter = (filter) => {
        if (selectedFilters.includes(filter)) {
            setSelectedFilters(selectedFilters.filter(f => f !== filter));
        } else {
            setSelectedFilters([...selectedFilters, filter]);
        }
    };

    const filteredItems = allItems.filter(item => {
        const matchesCategory = selectedFilters.length === 0 || selectedFilters.includes(item.category);
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="listings-page">
            <div className="container-full">
                <div style={{ display: 'flex', gap: '30px', padding: '40px 0' }}>
                    
                    {/* Sidebar */}
                    <aside className="sidebar">
                        <div className="filter-header">
                            <span>▽ Filter</span>
                        </div>
                        
                        <div className="filter-group">
                            <h4>Browse by Category <span>^</span></h4>
                            <ul>
                                {categories.map(cat => (
                                    <li 
                                        key={cat} 
                                        className={selectedFilters.includes(cat) ? 'active' : ''}
                                        onClick={() => toggleFilter(cat)}
                                    >
                                        {cat}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="main-listings">
                        <div className="search-bar-container">
                            <input 
                                type="text" 
                                placeholder="Search inventory..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="listings-banner">
                            <div className="banner-text">
                                <h2>Discover Premium <br /> Corporate Style <br /> In Every Asset.</h2>
                            </div>
                        <div className="banner-collage">
                            <img src="/images/desk.png" alt="Furniture 1" className="collage-img img-1" />
                            <img src="/images/fridge.png" alt="Furniture 2" className="collage-img img-2" />
                            <img src="/images/ac.png" alt="Furniture 3" className="collage-img img-3" />
                        </div>
                        </div>

                        <div className="listings-grid">
                            {filteredItems.map(item => (
                                <div key={item.id} className="car-card">
                                    {/* Wishlist Heart Icon */}
                                    <div 
                                        className={`wishlist-heart ${wishlist.includes(item.id) ? 'active' : ''}`}
                                        onClick={(e) => { e.stopPropagation(); toggleWishlist(item.id); }}
                                    >
                                        {wishlist.includes(item.id) ? '❤️' : '🤍'}
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
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Listings;
