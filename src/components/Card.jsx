export default function Card({ cardData, onCardClick }) {
  function handleClick() {
    onCardClick(cardData.name, cardData.link);
  }

  return (
    <article className="card">
      <img src={cardData.link} alt={cardData.name} className="card__image" onClick={handleClick} />
      <div className="card__wrapper">
        <h2 className="card__title">{cardData.name}</h2>
        <div className="card__wrap">
          <button aria-label="нравится" type="button" className="card__like" />
          <span className="card__counter">{cardData.likes.lenght}</span>
        </div>
      </div>
      <button aria-label="удалить" type="button" className="card__delete" />
    </article>
  );
}
