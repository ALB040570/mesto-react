import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {useContext} from 'react';

function Card(props) {
    const currentUser = useContext(CurrentUserContext);
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.card.owner._id === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `element__trash ${isOwn ? 'element__trash_visible' : 'element__trash_hidden'}`
    );
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `element__like ${isLiked && 'element__like_active'}`
    );
    
    return (
        <li className="element">
            <div className="element__bord">
                <img src={props.card.link} alt={props.card.name} className="element__photo" onClick = {()=>props.onCardClick(props.card)}/>
            </div>
            <h2 className="element__title">{props.card.name}</h2>
            <div className="element__like-group">
                <button type="button" className={cardLikeButtonClassName} onClick={() => props.onCardLike(props.card)}/>
                <p className="element__like-counter">{props.card.likes.length}</p>
            </div>
            <button type="button" className={cardDeleteButtonClassName} onClick={() => props.onCardDelete(props.card)}/>
         </li>
         )
}
export default Card;