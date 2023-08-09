export default function Card({ name, link, likes, onCardClick, gg }) {
  function handleClick() {
    onCardClick(name, link);
  }

  return (
    <article className="card">
      <img src={link} alt={name} className="card__image" onClick={handleClick} />
      <div className="card__wrapper">
        <h2 className="card__title">{name}</h2>
        <div className="card__wrap">
          <button aria-label="нравится" type="button" className="card__like" />
          <span className="card__counter">{likes.lenght}</span>
        </div>
      </div>
      <button aria-label="удалить" type="button" className="card__delete" />
    </article>
  );
}
