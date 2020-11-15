function PopupWithForm(props) {
    return(
        <div className={props.isOpen? 'popup  popup_opened': 'popup'} id={props.id}>
        <div className="popup__grid">
          <button type="button" className="popup__close" onClick={props.onClose}/>
          <form action={props.formDataUrl} name={props.name} id = {props.name} className="popup__form" novalidate>
            <fieldset className="popup__fieldset">
              <legend className="popup__title">{props.title}</legend>
                {props.children}
              <button type="submit" className="popup__button">{(props.id==="yes")?"Да":"Сохранить"}</button>
            </fieldset>
          </form>
        </div>
      </div>
    )
}
export default PopupWithForm;
// 