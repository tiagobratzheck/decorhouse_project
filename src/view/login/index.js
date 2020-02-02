import React, { useState } from 'react';
import './login.css';
import {Link, Redirect} from 'react-router-dom';
import home from '../../images/home.png';
import firebase from '../../config/firebase';
import 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';

function Login() {

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msg, setMsg] = useState();

    const dispatch = useDispatch();

    function logar() {
        firebase.auth().signInWithEmailAndPassword(email, senha).then(resultado => {
            setMsg("SUCESSO");
            setTimeout(() => {
                dispatch({type: 'LOG_IN', usuarioEmail: email});
            }, 1500);            
        }).catch(err => {
            setMsg("ERR");
        })
    }

    return (
        <div className="login-content d-flex align-items-center">

            {
                useSelector(state => state.usuarioLogado) > 0 ? <Redirect to='/' /> : null
            }

            <form className="form-signin mx-auto">
                <div className="text-center mb-4">
                    <div>
                        <img class="mb-4" src={home} alt="" width="72" height="72" />
                    </div>
                    <h1 className="h3 mb-3 font-weight-bold">Login</h1>
                </div>
                <div className="form-label-group">
                    <input onChange={
                        (e) => setEmail(
                            e.target.value)} type="email" id="inputEmail" className="form-control my-2" placeholder="Email" />
                </div>
                <div className="form-label-group">
                    <input onChange={
                        (e) => setSenha(
                            e.target.value)} type="password" id="inputPassword" className="form-control my-2" placeholder="Senha" />
                </div>
                <button onClick={logar} className="btn btn-lg btn-block btn-login" type="button">Sign in</button>
                <div className="msg-login text-center my-5">
                    {msg === 'SUCESSO' && <span>Você está conectado!</span>}                                        
                    {msg === 'ERR' && <span>Verifique sua senha ou inscrição</span>}
                </div>
                <div className="opcoes-login mt-3 text-center">
                    <Link to='recuperar' className="mx-2">Recuperar senha</Link>
                    <span className="text-blue">&#9733;</span>
                    <Link to='cadastro' className="mx-2">Quero Cadastrar</Link>
                </div>
            </form>
        </div>
    )
}

export default Login;
