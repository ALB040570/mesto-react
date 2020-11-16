import Header from './Header';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import { useState } from 'react';


function App() {
  const[isEditProfilePopupOpen,handleEditProfileClick] = useState(false);
  const[isAddPlacePopupOpen,handleAddPlaceClick] = useState(false);
  const[isEditAvatarPopupOpen,handleEditAvatarClick] = useState(false);
  const[selectedCard,handleCardClick]=useState(null);
  
  function closeAllPopups() {
    handleEditProfileClick(false);
    handleAddPlaceClick(false);
    handleEditAvatarClick(false);
    handleCardClick(null);
  }
  
  return (
    <>
    <div className="page">
      <Header />
      <Main 
        onEditProfile = {()=>{handleEditProfileClick(true)}} 
        onAddPlace = {()=>{handleAddPlaceClick(true)}}
        onEditAvatar = {()=>{handleEditAvatarClick(true)}}
        onCardClick = {selectedCard=>handleCardClick(selectedCard)}
      />
      <Footer />
    </div>
    <PopupWithForm id="edit"
      name = "info"
      title = "Редактировать профиль"
      isOpen = {isEditProfilePopupOpen}
      onClose = {closeAllPopups}
      children = {
        <>
          <input placeholder= "Введите имя" required className="popup__input" name = "popup-name" id="name"  minLength="2" maxLength="40"/>
          <span className="popup__error" id="name-error"/>
          <input placeholder="Введите информацию о деятельности" required className="popup__input popup__input_type_description" name = "popup-profession" id="info" minLength="2" maxLength="200"/>
          <span className="popup__error" id="info-error"/></>}
    />

    <PopupWithForm id="updata"
      name = "avatar"
      title = "Обновить аватар"
      isOpen = {isEditAvatarPopupOpen}
      onClose = {closeAllPopups}
      children = {
        <>
        <input placeholder="Ссылка для картинки" required className="popup__input popup__input_type_description" name = "photo-link" id="link" type="url"/>
        <span className="popup__error" id="link-error"/></>}
    />

    <PopupWithForm id="add"
      name = "photo"
      title = "Новое место"
      isOpen = {isAddPlacePopupOpen}
      onClose = {closeAllPopups}
      children = {
        <>
        <input placeholder="Название" required className="popup__input" name = "photo-name" id="picture"  minLength="1" maxLength="30"/>
        <span className="popup__error" id="picture-error"/>
        <input placeholder="Ссылка для картинки" required className="popup__input popup__input_type_description" name = "photo-link" id="link" type="url"/>
        <span className="popup__error" id="link-error"/></>}
    />

     <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

 </>
  );
}

export default App;

