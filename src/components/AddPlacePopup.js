import PopupWithForm from './PopupWithForm.js';
import {useState} from 'react';

function AddPlacePopup(props) {
   // Стейты, в которых содержатся значения инпутов 
   const [name, setName] = useState('');
   const [link, setLink] = useState('');

   //Обработчик изменения инпута обновляет стейт
   const handleChange = (e) =>{
       e.target.id === "picture"? setName(e.target.value): setLink(e.target.value);
   }
 
  const handleSubmit = (e) =>{
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateCards({
        name: name,
        link: link,
    });
    setName('');
    setLink('');
    }
  return(
    <PopupWithForm 
      id="add"
      name = "photo"
      title = "Новое место"
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      onSubmit = {handleSubmit}
      >
        <input 
          placeholder="Название" 
          required 
          className="popup__input" 
          name = "photo-name" 
          id="picture"  
          minLength="1" 
          maxLength="30"
          value={name || ''}
          onChange={handleChange} />
        <span className="popup__error" id="picture-error"/>
        <input 
          placeholder="Ссылка для картинки" 
          required 
          className="popup__input popup__input_type_description" 
          name = "photo-link" 
          id="link" 
          type="url"
          value={link || ''}
          onChange={handleChange} />
        <span className="popup__error" id="link-error"/>
    </PopupWithForm>
  )
}
export default AddPlacePopup;