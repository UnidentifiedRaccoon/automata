import './App.css';
import style from './App.module.css';
import {useReducer} from "react";

const getNumberFromWord = (alphabet, word) => {
    let k = word.length
    let n = alphabet.length
    let N = 0
    const algoCommands = []
    for (const char of word) {
        const pos = alphabet.indexOf(char) + 1
        if (pos === 0) {
            console.log('Такой буквы нет в алфавите:', char)
            return 0
        }
        N += pos * Math.pow(n, --k)
        algoCommands.push([pos, n, k])

    }
    return  [N, algoCommands]
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
    // chars = chars.filter(Boolean)
    console.log(chars)
    return chars.map(char => alphabet[char-1]).join('')
}

const filterAlphabet = (arr) => {
    const set = new Set()
    const filteredArr = []
    for (const char of arr) {
        if (set.has(char)) continue
        if (char.length < 1 || char.length > 1) continue
        set.add(char)
        filteredArr.push(char)
    }
    return filteredArr
}


const reducer = (state, action) => {
    switch (action.type) {
        case 'alphabet': {
            return {
                ...state,
                alphabet: filterAlphabet(action.payload)
            }
        }
        case 'word': {
            const [number, algoCommands] = getNumberFromWord(state.alphabet, action.payload)
            return {
                ...state,
                word: action.payload,
                number,
                algoCommands,
            }
        }
        case 'number': {
            return {
                ...state,
                number: action.payload,
                word: getWordFromNumber(state.alphabet, action.payload)
            }
        }
    }
}

const initial = {
    alphabet: [],
    word: '',
    number: '',
    algoCommands: []
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

  console.log(content.algoCommands)
    const algo = content.algoCommands.map(([pos, n, k], i) => <i key={i}>{pos}*{n}<sup>{k}</sup></i>)


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
          <section className={style.section}>
              <p>
                  {"Алфавит: " + JSON.stringify(content.alphabet)}
              </p>
              <p>
                  {"Слово: " + content.word}
              </p>
              <p>
                  {"Число: " + content.number}
              </p>
              <p>
                  "Слово по формуле: " {algo}
              </p>
          </section>
      </header>
    </div>
  );
}

export default App;
