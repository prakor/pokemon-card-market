import { useContext } from 'react'
import './CartItem.css'
import {AppContext} from '../App'

function CartItem({ id, name, image, total, price, }) {
        // "https://images.pokemontcg.io/dp3/1.png"
    const { cartData, setCartData, allCards, setAllCard } = useContext(AppContext);

    const cardIncrease = () => {
        setCartData((cart) =>
        cart.map((card) =>
          card.card_id === id ? { ...card, total: card.total + 1 } : card
        )
      );
      updateAllCards(true)
    }
    
    const cardDecrease = () => {
        const checkCardID = cartData.find((card) => card.card_id === id);

        if (checkCardID.total > 1) {
            setCartData((cart) =>
                cart.map((card) =>
                    card.card_id === id ? { ...card, total: card.total - 1 } : card
                )
            );
            updateAllCards(false)
        } else {
            setCartData((cart) =>
                cart.filter((card) => card.card_id !== id)
            );
            updateAllCards(false)
        }
    }

    const updatedAllCards = [...allCards];
    const cardToUpdate = updatedAllCards.find((card) => card.id === id);
    const updateAllCards = (check) => {

        if (cardToUpdate) {
            if (check) {
                cardToUpdate.set.total -= 1;
            } else {
                cardToUpdate.set.total += 1;
            }
            setAllCard(updatedAllCards);
        }
    }



    return (
        <div className='cartItem-con'>
            <div className="card-desc">
                <div className="desc-l">
                    <img src={image} alt="" style={{ width: 44, height: 60 }}/>
                    <div className='name'>{name}</div>
                    <div className='price'>$ {price}</div>
                </div>
                <div className="desc-r">
                    <span>$ {(price * total).toFixed(2)}</span>
                </div>
            </div>
            <div className="card-qty">
                <button className="btn-qty" onClick={cardDecrease}>-</button>
                <div className='total-card'>{total}</div>
                <button className="btn-qty" 
                    onClick={cardIncrease}
                    disabled={cardToUpdate.set.total > 0 ? false : true}
                >+</button>
            </div>
        </div>
    )
}

export default CartItem