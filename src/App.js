import './App.css';
import style from './App.module.css';
import {useReducer} from "react";

const getNumberFromWord = (alphabet, word) => {
    let k = word.length
    let n = alphabet.length
    let N = 0
    for (const char of word) {
        const pos = alphabet.indexOf(char) + 1
        if (pos === 0) {
            console.log('Такой буквы нет в алфавите:', char)
            return 0
        }
        N += pos * Math.pow(n, --k)
    }
    return  N
}

const getWordFromNumber = (alphabet, number) => {
    let n = alphabet.length
    let chars = []
    let N = +number
    while (N > 0) {
        if (N % n === 0) {
            chars.push(n)
            N -= n
        }
        console.log(N)
        const char = N % n
        chars.push(char)
        N = Math.floor(N / n)
    }
    chars = chars.reverse()
    console.log(chars)
    return chars.map(char => alphabet[char-1]).join('')
}


const reducer = (state, action) => {
    switch (action.type) {
        case 'alphabet': return {
            ...state,
            alphabet: action.payload
        }
        case 'word': return {
            ...state,
            word: action.payload,
            number: getNumberFromWord(state.alphabet, action.payload)
        }
        case 'number': return {
            ...state,
            number: action.payload,
            word: getWordFromNumber(state.alphabet, action.payload)
        }
    }
}

const initial = {
    alphabet: [],
    word: '',
    number: ''
}

function App() {
  const [content, setContent] = useReducer(reducer, initial)

  const onSubmitAlphabetHandler = (e) => {
    e.preventDefault();
    const alphabet = e.target.alphabet.value.split(' ')
    console.log(alphabet);
    setContent({type: "alphabet", payload: alphabet})
  }

  const onSubmitWordHandler = (e) => {
    e.preventDefault();
    setContent({type: "word", payload: e.target.word.value})

  }

  const onSubmitNumberHandler = (e) => {
    e.preventDefault();
    setContent({type: "number", payload: e.target.number.value})
  }

  return (
    <div className="App">
      <header className="App-header">
          <section className={style.section}>
              <form className={style.form} onSubmit={onSubmitAlphabetHandler}>
                  <label>
                      <span>Алфавит</span>
                      <input name="alphabet" placeholder={"Алфавит"} type="text"/>
                  </label>
                  <button>Go</button>
              </form>
              <form className={style.form} onSubmit={onSubmitWordHandler}>
                  <label>
                      <span>Слово</span>
                      <input name="word" placeholder={"Слово"} type="text"/>
                  </label>
                  <button>Go</button>
              </form>
              <form className={style.form} onSubmit={onSubmitNumberHandler}>
                  <label>
                      <span>Число</span>
                      <input name="number" placeholder={"Число"} type="text"/>
                  </label>
                  <button>Go</button>
              </form>
          </section>
          <section>
              <p>
                  {"Алфавит: " + JSON.stringify(content.alphabet)}
              </p>
              <p>
                  {"Слово: " + content.word}
              </p>
              <p>
                  {"Число: " + content.number}
              </p>
          </section>
      </header>
    </div>
  );
}

export default App;
