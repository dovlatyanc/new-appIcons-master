// Компонент карточки


 export default function Card({ card, onClick, isFlipped }) {
  return (
    <div 
      className={`card ${isFlipped ? 'flipped' : ''}`}
      onClick={onClick}
    >
      <div className="card-inner">
        <div className="card-front">
          <div />
        </div>
        <div className="card-back">
          <card.IconComponent size={40} />
        </div>
      </div>
    </div>
  );
}