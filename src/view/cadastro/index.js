import React, { useState } from 'react';
import './cadastro.css';
import firebase from '../../config/firebase';
import 'firebase/auth';

import Navbar from '../../components/navbar/index';


function Cadastro() {

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msg, setMsg] = useState();
    const [msgErr, setMsgErr] = useState();
    const [carregando, setCarregando] = useState();

    function cadastrar() {
        setCarregando(1)
        setMsg(null);

        if (!email || !senha) {
            setCarregando(0);
            setMsg("ERR");
            setMsgErr("Você precisa informar o email e a senha para fazer o cadastro");
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(email, senha).then(resultado => {
            setCarregando(0);
            setMsg('SUCESSO')
        }).catch(erro => {
            setCarregando(0);
            setMsg('ERR')
            switch (erro.message) {
                case 'Password should be at least 6 characters':
                    setMsgErr('A senha deve ter pelo menos 6 caracteres!');
                    break;
                case 'The email address is already in use by another account.':
                    setMsgErr('Este email já está sendo utilizado por outro usuário!');
                    break;
                case 'The email address is badly formatted.':
                    setMsgErr('O formato do seu email é inválido!');
                    break;
                default:
                    setMsgErr('Não foi possível cadastrar. Tente novamente mais tarde!');
                    break;
            }
        })
    }

    return (
        <div>
            <Navbar/>
            <div className="form-cadastro align-items-center">
                <form className="text-center form-login mx-auto mt-5">
                    <h1 className="h3 mb-3 text-black font-weight-bold">Cadastro</h1>
                    <input onChange={
                        (e) => setEmail(
                            e.target.value)} type="email" className="form-control my-2" placeholder="Email" />
                    <input onChange={
                        (e) => setSenha(
                            e.target.value)} type="password" className="form-control my-2" placeholder="Senha" />
                    {
                        carregando ? <div class="spinner-border text-danger" role="status"><span class="sr-only">Loading...</span></div>
                            :
                            <button onClick={cadastrar} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro">Cadastrar</button>
                    }
                    <div className="msg-login text-black text-center my-5">
                        {msg === 'SUCESSO' && <span>Usuário cadastrado</span>}
                        {msg === 'ERR' && <span>{msgErr}</span>}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Cadastro;