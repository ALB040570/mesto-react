import PopupWithForm from './PopupWithForm.js';
import {useState,useEffect, useContext} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    // Стейты, в которых содержатся значения инпутов name и description
  const [name, setName] = useState('имя');
  const [description, setDescription] = useState('инфа');

  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

// После загрузки текущего пользователя из API
// его данные будут использованы в управляемых компонентах.
    useEffect(() => {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }, [currentUser]);

  // Обработчик изменения инпута обновляет стейт
const handleChange = (e) =>{
    e.target.id === "name"? setName(e.target.value): setDescription(e.target.value);
}

const handleSubmit = (e) =>{
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

return(
<PopupWithForm id="edit"
      name = "info"
      title = "Редактировать профиль"
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      onSubmit = {handleSubmit}
      children = {
        <>
          <input 
            placeholder= "Введите имя" 
            required className="popup__input" 
            name = "popup-name" 
            id="name"  
            minLength="2" 
            maxLength="40"
            value={name || ''}
            onChange={handleChange} 
            />
          <span className="popup__error" id="name-error"/>
          <input 
            placeholder="Введите информацию о деятельности" 
            required className="popup__input popup__input_type_description"
            name = "popup-profession" 
            id="info" 
            minLength="2" 
            maxLength="200"
            value={description || ''}
            onChange={handleChange} 
            />
          <span className="popup__error" id="info-error"/></>}
    />
)
}
export default EditProfilePopup;
