import kusto from '../images/kusto.jpg';
import editava from '../images/editava.png';
import api from '../utils/Api.js';
import { useState, useEffect } from 'react';
import Card from './Card.js';

function Main(props) {
    // const[[userName,userDescription,userAvatar,cards], setData]=useState(["Жак Кусто","Исследователь океана",kusto,[]]);
    const[userName, setUserName]=useState("Жак Кусто");
    const[userDescription, setUserDescription]=useState("Исследователь океана");
    const[userAvatar, setUserAvatar]=useState(kusto);
    const[cards, setCards]=useState([]);

    useEffect(()=>{
        const userInfoFromServer = api.getUsersInfo();
        const cardsFromSer= api.getCards();
        Promise.all([userInfoFromServer,cardsFromSer])
        .then(([userInfoFromServer,cardsFromSer]) => {
            setUserName(userInfoFromServer.name);
            setUserDescription(userInfoFromServer.about);
            setUserAvatar(userInfoFromServer.avatar);
            setCards(cardsFromSer);
          })
        .catch((err) => {console.log(err);});
     },[]);

    return (
    <main className="content">
    <section className="profile">
      <div className="profile__grid">
        <img src={userAvatar} alt="Аватар" className="profile__avatar" onClick={props.onEditAvatar} />
        <img src={editava} alt="Изменить" className="profile__avatar profile__avatar_edit" />
        <h1 className="profile__name">{userName}</h1>
        <p className="profile__profession">{userDescription}</p>
        <button type="button" className="profile__button-edit" onClick={props.onEditProfile}/>
      </div>
      <button type="button" className="profile__button-add"  onClick={props.onAddPlace}/>
    </section>
    <ul className="elements">
    {cards.map((item,i)=>{
       return(
       <Card card={item} key={i} onCardClick={props.onCardClick}/>
       )
    })}
    </ul>
  </main>
  )
}
export default Main;
