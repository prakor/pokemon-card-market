import { useState, useEffect, createContext } from 'react';
import './App.css';
import Header from './components/Header';
import Card from './components/Card';
import Cart from './components/Cart';
import axios from 'axios';

const AppContext = createContext();

function App() {
  const [allCards, setAllCard] = useState([]);
  const [allSet, setAllSet] = useState([]);
  const [allRarity, setAllRarity] = useState([]);
  const [allType, setAllType] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(20);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectSet, setSelectSet] = useState('');
  const [selectRarity, setSelectRarity] = useState('');
  const [selectType, setSelectType] = useState('');
  const [show, setShow] = useState(false);
  const [cartData, setCartData] = useState([])

  async function fetchCard() {
    try {
      const resCard = await axios.get('https://api.pokemontcg.io/v2/cards');
      console.log('-fetch-');
      console.log(resCard.data.data);
      setAllCard(resCard.data.data);
  
      const resSet = await axios.get('https://api.pokemontcg.io/v2/sets');
      setAllSet(resSet.data.data)

      const resRarity = await axios.get('https://api.pokemontcg.io/v2/rarities');
      setAllRarity(resRarity.data.data)

      const resType = await axios.get('https://api.pokemontcg.io/v2/types');

      setAllType(resType.data.data)
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const filteredCards = allCards.filter((card) =>
    card.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectSet === '' || card.set.id === selectSet) &&
    (selectRarity === '' || card.rarity === selectRarity) &&
    (selectType.length === 0 || card.types.some(type => selectType.includes(type))) 
    && card.cardmarket && card.cardmarket.prices !== undefined
  )

  const setChange = (e) => {
    setSelectSet(e.target.value);
  }

  const rarityChange = (e) => {
    setSelectRarity(e.target.value);
  }

  const typeChange = (e) => {
    setSelectType(e.target.value);
  }

  const toggleCart = () => {
    setShow(!show);
  }

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchCard();
  }, []);

  return (
    <AppContext.Provider value={{cartData,setCartData,allCards,setAllCard}}>
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        showCart={toggleCart}
      />
      <div className="content">
        <div className="container">
          <div className="top-content">
            <div className="title-con">Choose Card</div>
            <div className="filter-con">
              <div className="select-wrapper">
                <select name="Set" id="set" style={{width: '82px'}} 
                  onChange={setChange} value={selectSet}>
                    <option value="" defaultValue>Set</option>
                    {allSet.map((item) => (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </select>
              </div>
              <div className="select-wrapper">
                <select name="Rarity" id="rarity" style={{width: '100px'}}
                  onChange={rarityChange} value={selectRarity}>
                    <option value="" defaultValue>Rarity</option>
                    {allRarity.map((item,index) => (
                      <option key={index} value={item}>{item}</option>
                      ))}
                </select>
              </div>
              <div className="select-wrapper">
                <select name="Type" id="type" style={{width: '94px'}}
                  onChange={typeChange} value={selectType}>
                    <option value="" defaultValue>Type</option>
                    {allType.map((item,index) => (
                      <option key={index} value={item}>{item}</option>
                      ))}
                </select>
              </div>
            </div>
          </div>
          <div className="content-con">
            {currentCards.map((card) => (
              <Card 
                key={card.id} 
                id={card.id}
                name={card.name} 
                image={card.images.large}
                total={card.set.total}
                // price={card.cardmarket.prices.averageSellPrice}
                price={card.cardmarket.prices.averageSellPrice}
                />
            ))}
          </div>
          <div className="pagination">
            {Array.from({ length: Math.ceil(filteredCards.length / cardsPerPage) }, (_, index) => index + 1).map(page => (
              <button key={page} onClick={() => paginate(page)} className={page === currentPage ? 'active' : ''}>
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Cart 
        showCart={show} 
        closeCart={toggleCart}
        />
    </AppContext.Provider>
  );
}

export { AppContext }
export default App;


