import editava from '../images/editava.png';
import {useContext} from 'react';
import Card from './Card.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  
  return (
    <main className="content">
    <section className="profile">
      <div className="profile__grid">
        <img src={currentUser.avatar} alt="Аватар" className="profile__avatar" onClick={props.onEditAvatar} />
        <img src={editava} alt="Изменить" className="profile__avatar profile__avatar_edit" />
        <h1 className="profile__name">{currentUser.name}</h1>
        <p className="profile__profession">{currentUser.about}</p>
        <button type="button" className="profile__button-edit" onClick={props.onEditProfile}/>
      </div>
      <button type="button" className="profile__button-add"  onClick={props.onAddPlace}/>
    </section>
    <ul className="elements">
    {props.cards.map((item,i)=>{
       return(
       <Card 
          card={item} 
          key={item._id} 
          onCardLike={props.onCardLike} 
          onCardDelete={props.onCardDelete}
          onCardClick={props.onCardClick}
          />
       )
    })}
    </ul>
  </main>
  )
}
export default Main;
