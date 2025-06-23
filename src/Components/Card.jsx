import * as IconArr from "react-icons/fc"

// Компонент карточки

export default function Card({ card, onClick }) {
  const MyIconComponent = IconArr[card.iconName]
  return (
    <div 
      className={`card ${card.isFlipped ? 'flipped' : ''}`}
      onClick={onClick}
    >
      <div className="card-inner">
        <div className="card-front">
          <div />
        </div>
        <div className="card-back">
          <MyIconComponent size={40} />
        </div>
      </div>
    </div>
  );
}