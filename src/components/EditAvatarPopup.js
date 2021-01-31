import PopupWithForm from './PopupWithForm.js';
import {useRef} from 'react';

function EditAvatarPopup(props) {
  const avatarRef = useRef(); // записываем объект, возвращаемый хуком, в переменную
  const handleSubmit=(e)=> {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value/* Значение инпута, полученное с помощью рефа */,
    });
  } 

  return(
    <PopupWithForm id="updata"
        name = "avatar"
        title = "Обновить аватар"
        isOpen = {props.isOpen}
        onClose = {props.onClose}
        onSubmit = {handleSubmit}
        children = {
        <>
        <input 
            placeholder="Ссылка для картинки" 
            required className="popup__input popup__input_type_description" 
            name = "photo-link" 
            id="link" 
            type="url"
            ref={avatarRef}
            // onChange={handleChange} 
        />
        <span className="popup__error" id="link-error"/></>}
    />
  )
}
export default EditAvatarPopup;