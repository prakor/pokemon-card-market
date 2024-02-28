import { useContext } from 'react'
import './Cart.css'
import close from '../assets/x.png'
import CartItem from './CartItem' 
import {AppContext} from '../App'

function Cart({ showCart, closeCart, }) {
    const { cartData, setCartData, allCards, setAllCard } = useContext(AppContext);

    const cartTotalAmount = cartData.reduce((total, item) => total + item.total, 0);
    const cartTotalPrice = cartData.reduce((total, item) => total + (item.total * item.prices), 0);

    const clearAllCard = () => {
        const updatedAllCards = allCards.map((card) => {
          const cartItem = cartData.find((item) => card.id === item.card_id);
      
          if (cartItem) {
            card.set.total += cartItem.total;
          }
      
          return card;
        });
      
        // ลบข้อมูลทั้งหมดจากตะกร้า
        setCartData([]);
        // อัปเดต allCards
        setAllCard(updatedAllCards);
      };

    return (
        <div className={showCart ? 'cart-con active' : 'cart-con'}>
            <div className="cart-header">
                <div className="cart-con-title">
                    <span className="cart-title">Cart</span>
                    <div className="btn-clear" onClick={clearAllCard}>Clear all</div>
                </div>
                <div className="cart-con-btn">
                    <div className="btn-cart" style={{float:'right'}} onClick={closeCart}>
                        <img src={close} alt="" />
                    </div>
                </div>
                <div className="cart-title-l">
                    <span className='cart-title-item'>item</span>
                    <span className='cart-title-item' style={{marginLeft: '35px'}}>Qty</span>
                </div>
                <div className="cart-title-r">
                    <span className='cart-title-item' style={{float:'right'}}>Price</span>
                </div>
            </div>
            <div className="cart-list">
                {cartData.map((card, index) => (
                    <CartItem
                        key={index}
                        id={card.card_id}
                        name={card.card_name}
                        image={card.card_img}
                        total={card.total}
                        price={card.prices}
                    />
                ))}
            </div>
            <div className="cart-btm">
                <div className="cart-btm-desc">
                    <span className='cart-txt'>Total card amount</span>
                    <span className='cart-num'>{cartTotalAmount}</span>
                </div>
                <div className="cart-btm-desc">
                    <span className='cart-txt'>Total price</span>
                    <span className='cart-num'>$ {cartTotalPrice.toFixed(2)}</span>
                </div>
                <button className="btn-payment">Continue to Payment</button>
            </div>
    </div>
    )
}

export default Cart
