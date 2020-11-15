function ImagePopup(props) {
    return (
    <div className={`popup popup_view ${props.card&&'popup_opened'}`} id="view">
    <div className="popup__grid">
      <button type="button" className="popup__close" onClick={props.onClose}/>
      <div className="popup__form popup__form_view">
        <figure className="popup__image-conteiner">
          {props.card!==null?<img src={props.card.link} alt={props.card.name} className="popup__image"/>:<></>}
          <figcaption className="popup__caption"/>
        </figure>
      </div>
    </div>
  </div>)
}
export default ImagePopup;