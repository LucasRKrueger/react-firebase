import firebase from './firebaseConnection';
import {useState} from 'react'
import './style.css'

function App() {

  const [email, setEmail] = useState('')
  const [senha , setSenha] = useState('')
  const [cargo, setCargo] = useState('')
  const [nome, setNome] = useState('')
  const [user, setUser] = useState({})

  async function novoUsuario(){
    await firebase.auth().createUserWithEmailAndPassword(email, senha)
    .then(async (value) => {
      await firebase.firestore().collection('users')
      .doc(value.user.uid)
      .set({
        nome: nome,
        cargo: cargo,
        status: true
      })
      .then(() => {
        setNome('')
        setCargo('')
        setEmail('')
        setSenha('')
      })
    })
    .catch((error)=> {
      alert(error)
    })
  }
  async function login(){
    await firebase.auth().signInWithEmailAndPassword(email, senha)
    .then(async (value) => {
      await firebase.firestore().collection('users')
      .doc(value.user.uid)
      .get()
      .then((snapshot) => {
        setUser({
            nome: snapshot.data().nome,
            cargo: snapshot.data().cargo,
            status: snapshot.data().status,
            email: value.user.email
          })
        })
    })
    .catch((error) => {
      alert(error)
    })
  }
  async function logout(){
    await firebase.auth().signOut();
    setUser({})
  }

  return (
    <div className="app">
      <h1>React + Firebase</h1><br/>


      <div className="container">
        <label>Nome</label>
        <input type="text" value={nome} onChange={(e) => {setNome(e.target.value)}}/><br/>

        <label>Cargo</label>
        <input type="text" value={cargo} onChange={(e) => {setCargo(e.target.value)}}/><br/>

        <label>Email</label>
        <input type="text" value={email} onChange={(e) => {setEmail(e.target.value)}}/><br/>

        <label>Senha</label>
        <input type="password" value={senha} onChange={(e) => {setSenha(e.target.value)}}/><br/>


        <button onClick={login}>LogIn</button>
        <button onClick={novoUsuario}>Cadastrar</button>
        <button onClick={logout}>Sair da conta</button>
      </div>

      <hr/><br/>

      {Object.keys(user).length > 0 && (
        <div>
          <strong>Olá </strong>{user.nome}<br/>
          <strong>Cargo: </strong>{user.cargo}<br/>
          <strong>Email: </strong>{user.email}<br/>
          <strong>Status: </strong>{user.status ? 'Ativo' : 'Inativo'}<br/>
        </div>
      )}

    </div>
  );
}

export default App;