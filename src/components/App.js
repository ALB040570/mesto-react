import Header from './Header';
import Main from './Main.js';
import Footer from './Footer.js';
import api from '../utils/api.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import {useState, useEffect} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';


function App() {
  const[currentUser, setCurrenUser]=useState({name: '', about: '', avatar: ''});
  const[isEditProfilePopupOpen,handleEditProfileClick] = useState(false);
  const[isAddPlacePopupOpen,handleAddPlaceClick] = useState(false);
  const[isEditAvatarPopupOpen,handleEditAvatarClick] = useState(false);
  const[selectedCard,handleCardClick]=useState(null);
  const[cards, setCards]=useState([]);

  useEffect(()=>{
    const cardsFromSer= api.getCards();
    cardsFromSer
      .then((cardsFromSer) => {
        setCards(cardsFromSer);    
      })
      .catch((err) => {console.log(err);});
    },[]);
    //ставит или удаляет лайки
  const handleCardLike=(card) =>{
    //  проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
    // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
    const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Обновляем стейт
      setCards(newCards);
    })
    .catch((err) => {console.log(err);});
  }
    
  //handleCardDelete удаляет карточку
  const handleCardDelete=(card) =>{
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.deleteCard(card._id).then((newCard) => {
    // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
    const newCards = cards.filter((c,i,cards) => c._id !== card._id ? newCard : false);
      // Обновляем стейт
      setCards(newCards);
    })
    .catch((err) => {console.log(err);});
  }
  

  useEffect(()=>{
    const userInfoFromServer = api.getUsersInfo();
    userInfoFromServer
    .then((userInfo) => {
      setCurrenUser(userInfo);
      })
    .catch((err) => {console.log(err);});
  },[]);
  
  function closeAllPopups() {
    handleEditProfileClick(false);
    handleAddPlaceClick(false);
    handleEditAvatarClick(false);
    handleCardClick(null);
  }
  
  const handleUpdateUser=(data)=> {
    const userInfoFromForm = api.patchUsersInfo(data);
    userInfoFromForm
    .then((userInfo) => {
      setCurrenUser(userInfo);
      })
    .catch((err) => {console.log(err);});
      closeAllPopups();
  }

  const handleUpdateAvatar=(data)=> {
    const avatarFromForm = api.patchAvatar(data);
    avatarFromForm
    .then((userInfo) => {
      setCurrenUser(userInfo);
      })
    .catch((err) => {console.log(err);});
      closeAllPopups();
  }

  const handleAddPlaceSubmit=(data)=> {
    const cardFromForm = api.postCard(data);
    cardFromForm
    .then((newCard) => {
        setCards([newCard, ...cards]);
      })
    .catch((err) => {console.log(err);});
      closeAllPopups();
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
      <div className="page">
        <Header />
        <Main 
          onEditProfile={()=>{handleEditProfileClick(true)}} 
          onAddPlace={()=>{handleAddPlaceClick(true)}}
          onEditAvatar={()=>{handleEditAvatarClick(true)}}
          onCardClick={selectedCard=>handleCardClick(selectedCard)}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
      </div>
  
      <EditProfilePopup 
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups} 
        onUpdateUser={handleUpdateUser}
        /> 
    
      <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups} 
        onUpdateAvatar={handleUpdateAvatar}
        />

      <AddPlacePopup 
        isOpen={isAddPlacePopupOpen} 
        onClose={closeAllPopups} 
        onUpdateCards={handleAddPlaceSubmit}
        />

      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;


