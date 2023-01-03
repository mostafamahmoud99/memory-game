import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./Components/SingleCard";
import cardImages from "./img/Images";

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disAbled, setDisAbled] = useState(false);

  const shuffledCards = () => {
    const shuffledCard = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCard);
    setTurns(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisAbled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    setDisAbled(false);
  };

  useEffect(() => {
    shuffledCards();
  }, []);

  return (
    <div className="App">
      <h1 className="mb-3">Magic Match</h1>
      <button onClick={shuffledCards}>New Game</button>

      <h2 className="my-3">Turns : {turns}</h2>

      <div className="container">
        <div className="row">
          {cards.map((card) => (
            <SingleCard
              key={card.id}
              handleChoice={handleChoice}
              card={card}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disAbled={disAbled}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
