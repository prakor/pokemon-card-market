import React from 'react'
import './Header.css'
import Search from '../assets/search.png'
import Cart from '../assets/shopping-bag.png'

function Header({ searchQuery, setSearchQuery, showCart }) {

    const searchChange = (e) => {
        setSearchQuery(e.target.value)
    }
    
    return (
        <div className="header">
            <div className="header-group">
                <div className="header-con">
                    <div className="head-l">Pokemon market</div>
                    <div className="head-r">
                        <div className="search-box">
                            <img src={Search} alt="" className="icon" />
                            <input type="text" placeholder="Search by Name" 
                                value={searchQuery}
                                onChange={searchChange}
                            />
                        </div>
                        <div className="btn-cart" onClick={showCart}>
                            <img src={Cart} alt="" />
                        </div>
                    </div>     
                </div>
            </div>
        </div>
    )
}

export default Header
