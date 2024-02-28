import React from 'react'
import './Content.css';

function Content() {
    return (
        <div className="content">
            <div className="container">
                <div className="top-content">
                    <div className="title-con">Choose Card</div>
                    <div className="filter-con">
                    <select name="Set" id="set">
                        <option value="" selected>Set</option>
                        <option value="saab">Saab</option>
                    </select>
                    <select name="Rarity" id="rarity">
                        <option value="" selected>Rarity</option>
                        <option value="saab">Saab</option>
                    </select>
                    <select name="Type" id="type">
                        <option value="" selected>Type</option>
                        <option value="saab">Saab</option>
                    </select>
                    </div>
                </div>
                <div className="content-con">

  
                </div>
            </div>
        </div>
    )
}

export default Content
