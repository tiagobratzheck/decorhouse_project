import React, { useState } from 'react';
import './recuperar.css';

import firebase from '../../config/firebase';
import 'firebase/auth';

import Navbar from '../../components/navbar/index';


function Recuperar() {

    const [email, setEmail] = useState();
    const [msg, setMsg] = useState();

    function recuperarSenha() {
        firebase.auth().sendPasswordResetEmail(email).then(resultado => {
            setMsg("Enviamos um link para recuperação de senha!");
        }).catch(err => {
            setMsg("Por favor, verifique se seu email está correto!");
        });

    }

    return (
        <>
            <Navbar />
            <form className="text-center form-login mx-auto mt-5">
                <h3 className="mb-3 font-weight-bold">Recuperar senha</h3>
                <input onChange={
                    (e)=>setEmail(e.target.value)
                    } type="email" className="form-control my-2" placeholder="Email" />
                <div className="msg my-4 text-center">
                    <span>{msg}</span>
                </div>
                <button onClick={recuperarSenha} type="button" className="btn btn-lg btn-block btn-enviar">Recuperar senha</button>
            </form>
        </>
    )
}


export default Recuperar;