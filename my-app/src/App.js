import firebase from './firebaseConnection';
import {useState} from 'react'
import './style.css'

function App() {

  const [email, setEmail] = useState('')
  const [senha , setSenha] = useState('')

  async function novoUsuario(){
    await firebase.auth().createUserWithEmailAndPassword(email, senha)
    .then(() => {
      alert('Usuário cadastrado')
    })
    .catch((error)=> {
      alert(error)
    })
  }

  async function logout(){
    await firebase.auth().signOut();
  }

  return (
    <div className="app">
      <h1>React + Firebase</h1><br/>


      <div className="container">
        <label>Email</label>
        <input type="text" value={email} onChange={(e) => {setEmail(e.target.value)}}/><br/>

        <label>Senha</label>
        <input type="password" value={senha} onChange={(e) => {setSenha(e.target.value)}}/><br/>

        <button onClick={novoUsuario}>Cadastrar</button>
        <button onClick={logout}>Sair da conta</button>
      </div>
    </div>
  );
}

export default App;