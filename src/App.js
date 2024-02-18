import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import rightArrowIcon from './right-arrow.svg';
import leftArrowIcon from './left-arrow.svg';

function App() {
    const [foodItems, setFoodItems] = useState([]);
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const fetchFoodItems = async () => {
            try {
                const response = await axios.get('https://world.openfoodfacts.org/cgi/search.pl?search_terms=burger&json=1');
                setFoodItems(response.data.products);
            } catch (error) {
                console.error('Error fetching food items:', error);
            }
        };
        fetchFoodItems();
    }, []);

    const handleScroll = (scrollOffset) => {
        const container = document.querySelector('.food-carousel');
        if (container) {
            const newPosition = scrollPosition + scrollOffset;
            container.scrollTo({
                left: newPosition,
                behavior: 'smooth',
            });
            setScrollPosition(newPosition);
        }
    };

    return (
        <div className="app">
            <h1>Food Menu</h1>
            <div className="food-carousel-container">
                <img
                    src={leftArrowIcon}
                    alt="Left Arrow"
                    className="arrow left-arrow"
                    onClick={() => handleScroll(-100)}
                />
                <div className="food-carousel">
                    {foodItems.map((item, index) => (
                        <div key={index} className="food-item">
                            <img src={item.image_front_url} alt={item.product_name} />
                            <p>{item.product_name}</p>
                        </div>
                    ))}
                </div>
                <img
                    src={rightArrowIcon}
                    alt="Right Arrow"
                    className="arrow right-arrow"
                    onClick={() => handleScroll(100)}
                />
            </div>
        </div>
    );
}

export default App;
