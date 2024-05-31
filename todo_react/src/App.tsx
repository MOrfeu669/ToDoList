import { ChangeEvent, useState } from 'react';
import './App.css'

interface Card {
  title: string;
  done: boolean;
}

function App() {

  const [cards, setCards] = useState<Card[]>([]);
  const [textInput, setTextInput] = useState('');
  
  function handleTextInput(event: ChangeEvent<HTMLInputElement>){
    setTextInput(event.target.value);
  }

  function handleCreateCard(){
    setCards(prevState => [...prevState, { title: textInput, done: false }]);
    setTextInput('');
  }

  function handleToogleCard(cardIndex: number){
    setCards(prevState => {

      const cardFoundIndex = prevState.findIndex((_, index) => index === cardIndex);

      if(cardFoundIndex === -1) return prevState

      const cardFound = prevState[cardFoundIndex];
      console.log(cardFound)
      const newArray = [...prevState];
      newArray[cardIndex] = {
        ...cardFound,
        done: !cardFound.done
      }

      return newArray;
    });
  }
  
  return (
    <div className='main-container'>
      <h1>TODO List</h1>
      
      <div className='container'>
        <div className='todo-header'>
          <input value={textInput} onChange={handleTextInput} placeholder='O que fará hoje?'/>
          <button onClick={handleCreateCard} title='Criar Nota'>+</button>
        </div>

        <ul className='todo-list'>
          {cards.map((card, index) => (
            <li key={index}>
              <button onClick={() => handleToogleCard(index)} ></button>
              <span className={card.done ? 'card-done' : ''}>{card.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>    
  )
}

export default App
