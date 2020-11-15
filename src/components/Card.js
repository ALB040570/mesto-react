function Card(props) {
     
    return (
        <li className="element">
            <div className="element__bord">
                <img src={props.card.link} alt="фото места" className="element__photo" onClick = {()=>props.onCardClick(props.card)}/>
            </div>
            <h2 className="element__title">{props.card.name}</h2>
            <div className="element__like-group">
                <button type="button" className="element__like"/>
                <p className="element__like-counter">{props.card.likes.length}</p>
            </div>
            <button type="button" className="element__trash"/>
         </li>
         )
}
export default Card;