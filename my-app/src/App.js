import firebase from './firebaseConnection';
import {useState, useEffect} from 'react'
import './style.css'

function App() {
  const [idPost, setIdPost] = useState('')
  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')
  const [posts, setPosts] = useState([])

  const [email, setEmail] = useState('')
  const [senha , setSenha] = useState('')
  

  useEffect(() =>{
    async function loadPosts(){
      await firebase.firestore().collection('posts')
      .onSnapshot((doc) => {
        let meusPosts = [];
        
        doc.forEach((item) => {
          meusPosts.push({
            id: item.id,
            titulo: item.data().titulo,
            autor: item.data().autor
          })
        })
        setPosts(meusPosts);
      })
    }
    loadPosts();
  },[])

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
    .get()
    .then((snapshot) => {
      let lista = [];
      snapshot.forEach((doc) =>{
        lista.push({
          id: doc.id,
          titulo: doc.data().titulo,
          autor: doc.data().autor
        })
      })
      setPosts(lista);
    })
    .catch((error) => {
      console.log(error)
    })
  }

  async function editarPost(){
    await firebase.firestore().collection('posts')
    .doc(idPost)
    .update({
      titulo: titulo,
      autor: autor
    })
    .then(()=>{
      alert('Dados atualizados com sucesso')
      setIdPost('')
      setTitulo('')
      setAutor('')
    })
    .catch(() => {
      alert('Erro ao atualizar')
    })
  }

  async function excluirPost(id){
    await firebase.firestore().collection('posts').doc(id)
    .delete()
    .then(() => {
      alert('Excluído com sucesso')
    })
  }

  async function novoUsuario(){
    await firebase.auth().createUserWithEmailAndPassword(email, senha)
    .then(() => {
      alert('Usuário cadastrado')
    })
    .catch((error)=> {
      alert(error)
    })
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
      </div>

      <hr/> <br/>

      <div className="container">
        <h2>CRUD</h2>
        <label>ID: </label>
        <input type="text" value={idPost} onChange={(e) => setIdPost(e.target.value)}/><br/>

        <label>Titulo: </label>
        <textarea type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)}></textarea><br/>

        <label>Autor: </label>
        <input type="text" value={autor} onChange={(e) => {setAutor(e.target.value)}}/><br/>

        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={buscaPost}>Buscar Posts</button>
        <button onClick={editarPost}>Editar Post</button>
        
        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <span>ID: {post.id}</span><br/>
                <span>Titulo: {post.titulo}</span><br/>
                <span>Autor: {post.autor}</span><br/>
                <button onClick={() => excluirPost(post.id)}>Excluir post</button><br/><br/>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;