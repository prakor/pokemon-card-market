import { useContext } from 'react'
import './Card.css'
import Cart from '../assets/shopping-bag.png'
import {AppContext} from '../App'

function Card({ id, name, image, total, price, }) {
    const { cartData, setCartData, allCards, setAllCard } = useContext(AppContext);

    const addToCard = () => {

        if (total == 0) {
            return
        }

        const checkCardID = cartData.findIndex(item => item.card_id === id);

        if (checkCardID !== -1) {
            const updateCartData = [...cartData];
            updateCartData[checkCardID].total += 1;
            setCartData(updateCartData)

            updateAllCards()
        } else {
            setCartData(item => [
                ...item,
                {
                  card_id: id,
                  card_name: name,
                  card_img: image,
                  total: 1,
                  prices: price,
                },
              ]);
              updateAllCards()
        }
    }

    const updateAllCards = () => {
        const updatedAllCards = [...allCards];
        const cardToUpdate = updatedAllCards.find((card) => card.id === id);

        if (cardToUpdate) {
        cardToUpdate.set.total -= 1;
        setAllCard(updatedAllCards);
        }
    }



    return (
        <div className="card">
            <img src={image} alt="" className='card-img' />
            <div className="card-con">
                <span className="card-name" style={{marginTop: '50px'}}>{name}</span>
                <div className="cardmarket">
                    <span className='card-total'>$ {price}</span>
                    <div className='dots'></div>
                    {
                        total > 0 ? <span className='card-total'>{total} Cards</span> : 
                        <span className='card-total'>Out of stock</span>
                    }
                </div>
                <button  
                    className='btn-add'
                    onClick={addToCard}
                    disabled={total > 0 ? false : true}>
                    <img src={Cart} alt="" />
                    Add to cart
                </button>
            </div>
        </div>
    )
}

export default Card
