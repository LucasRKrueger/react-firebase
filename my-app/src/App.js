import firebase from './firebaseConnection';
import {useState} from 'react'
import './style.css'

function App() {
  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')
  
  async function handleAdd(){
    await firebase.firestore().collection('posts')
    .add({
      titulo: titulo,
      autor: autor
    })
    .then(() =>{
      alert('DADO CADASTRADO');
      setTitulo('');
      setAutor('');
    })
    .catch((error) => {
      alert(error)
    })
  }

  async function buscaPost(){
    await firebase.firestore().collection('posts')
    .doc('123')
    .get()
    .then((snapshot) => {
      setTitulo(snapshot.data().titulo)
      setAutor(snapshot.data().autor)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <div>
      <h1>React + Firebase</h1><br/>

      <div className="container">
        <label>Titulo: </label>
        <textarea type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)}></textarea>

        <label>Autor: </label>
        <input type="text" value={autor} onChange={(e) => {setAutor(e.target.value)}}/>

        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={buscaPost}>Buscar Posts</button>
      </div>
    </div>
  );
}

export default App;