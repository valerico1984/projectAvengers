import { useState } from "react";

export const Card = ({
  deleteCard,
  editCardStatus,
  data: {
    id,
    title,
    createdAt,
    userName,
    description,
    status,
    importance,
  },
  editCardPriority,

  data,
}) => {
  const [showMore, setShowMore] = useState(false);

  const datetime = new Date(createdAt).toLocaleDateString()



  const limitString = (str) => {
    if (str.length > 170)
      return { string: str.slice(0, 167).concat("..."), addButton: true };
    return { string: str, addButton: false };
  };

  return (
    <div className="card">
      <div className="close" onClick={() => deleteCard(id)}>
      <i className="fa fa-trash-o fa-lg"  aria-hidden="true"></i>
      </div>
      <h2>Título: {title}</h2>
      <h6>Fecha: </h6>
      <p>{datetime}</p>
      <h5>Avenger: </h5>
      <p>{userName}</p>
      {!showMore && (
      <div>
        <h5>Descripción:</h5>
      <p>{limitString(description).string}</p>
      </div>)}
      {showMore && (
        <>
          <p>Descripción: {description}</p>
          <button type="button" onClick={() => setShowMore(false)}>
            Ver menos
          </button>
        </>
      )}
      {!showMore && limitString(description).addButton && (
        <button type="button" onClick={() => setShowMore(true)}>
          Ver más
        </button>
      )}
      <button
        className={status.trim().toLowerCase().replace(" ", "")}
        type="button"
        onClick={() => editCardStatus(data)}
      >
        {status}
      </button>
      <button className={importance.toLowerCase()} 
            type="button"
            onClick={() => editCardPriority(data)}
            
            >
        {importance}
      </button>
      
    </div>
  );
};
