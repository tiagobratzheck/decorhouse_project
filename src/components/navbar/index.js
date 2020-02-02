import React, { useState } from 'react';
import './navbar.css';
import home from '../../images/home.png';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


function Navbar() {

    const dispatch = useDispatch();

    return (
        <nav className="navbar navbar-expand-lg">
            <Link className="navbar-brand" to="/">
                <img src={home} width="30" height="30" class="d-inline-block align-top" alt=""></img>
            </Link>
            <span className="navbar-brand text-black font-weight-bold">DecorHouse</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <i class="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>

                    {
                        useSelector(state => state.usuarioLogado) > 0 ?

                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/adicionar">Incluir decoração</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/decoracoes/meus">Minhas decorações</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={
                                        () => dispatch({ type: 'LOG_OUT' })
                                    } >Sair</Link>
                                </li>
                            </>
                            :
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/cadastro">Cadastrar</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                            </>

                    }

                </ul>
            </div>
        </nav>
    )
}

export default Navbar;