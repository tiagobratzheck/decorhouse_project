import React, { useState, useEffect } from 'react';
import './descricao.css';
import { Link, Redirect } from 'react-router-dom';
import firebase from '../../config/firebase';
import 'firebase/auth';
import { useSelector } from 'react-redux';

import Navbar from '../../components/navbar/index';


function Descricao(props) {

    const [decoracao, setDecoracao] = useState({});
    const [img, setImg] = useState({});
    const [carregando, setCarregando] = useState(1);
    const [excluido, setExcluido] = useState();

    const usuario = useSelector(state => state.usuarioEmail);


    function excluir(){
        firebase.firestore()
        .collection('decorations')
        .doc(props.match.params.id)
        .delete()
        .then(()=>{
            setExcluido(1);

        })
    }

    useEffect(() => {
        if (carregando) {
            firebase.firestore()
            .collection('decorations')
            .doc(props.match.params.id)
            .get()
            .then((resultado) => {
                setDecoracao(resultado.data());
                firebase.firestore()
                .collection('decorations')
                .doc(props.match.params.id)
                .update(
                    'visualizacoes', resultado.data().visualizacoes + 1);
                firebase.storage()
                .ref(`imagens/${resultado.data().imagem}`)
                .getDownloadURL()
                .then((url) => {
                    setImg(url)
                    setCarregando(0);
                });
            });
        } else {
            firebase.storage()
            .ref(`imagens/${decoracao.imagem}`)
            .getDownloadURL()
            .then(url => setImg(url));
        }
    }, [])


    function curtir() {
        firebase.firestore()
        .collection('decorations')
        .doc(props.match.params.id)
        .get()
        .then((resultado) => {
            setDecoracao(resultado.data());
            firebase.firestore()
            .collection('decorations')
            .doc(props.match.params.id)
            .update(
                'likes', resultado.data().likes + 1);

        })
    };

    return (
        <div>
            <Navbar />
            {excluido ? <Redirect to='/'/> : null}
            <div className="container">
                {
                    carregando ?
                        <div className="row mt-5">
                            <div class="spinner-border mx-auto text-danger" role="status"><span class="sr-only"></span></div>
                        </div>
                        :
                        <div>
                            <div className="row">
                                <img src={img} className="mx-auto img-banner col-md-8 col-sm-12 p-2" alt="banner" />
                                <div className="row col-12 mt-1">
                                    <div className="row mx-auto col-md-8 col-sm-12 p-2 visualizacoes">
                                        <div className="p-2">
                                            <i class="fas fa-eye"></i> <span>{decoracao.visualizacoes}</span>
                                        </div>
                                        <div className="p-2">
                                            <i class="fas fa-thumbs-up"></i> <span>{decoracao.likes}</span>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="mx-auto mt-3 titulo"><strong>{decoracao.titulo}</strong></h3>
                            </div>
                            <div className="row mt-4 justify-content-center">
                                <div className="col-md-4 col-sm-12 box-info p-3">
                                    <i className="fas fa-ticket-alt fa-2x"></i>
                                    <h4><strong>Tipo</strong></h4>
                                    <span className="mt-3">{decoracao.comodo}</span>
                                </div>
                                <div className="col-md-4 col-sm-12 box-info p-3">
                                    <i class="fas fa-clock fa-2x"></i>
                                    <h4><strong>Última modificação</strong></h4>
                                    <span className="mt-3">{decoracao.data}</span>
                                </div>
                            </div>
                            <div className="row mt-4 justify-content-center box-detalhes">
                                <div className="col-8 text-center">
                                    <h4><strong>Detalhes da decoração:</strong></h4>
                                </div>
                                <div className="col-8 mb-4 text-center mt-3">
                                    <h6>{decoracao.descricao}</h6>
                                </div>
                                {
                                    usuario === decoracao.usuario ?
                                        <Link to={`/editardecoracao/${props.match.params.id}`} className="btn-editar"> <i className="fas fa-pen-square fa-3x"></i></Link>
                                        :
                                        <div>
                                            <button onClick={curtir} className="btn-editar"><i class="far fa-thumbs-up fa-3x"></i></button>
                                        </div>
                                }

                                {
                                    usuario === decoracao.usuario ?
                                        <button type="button" onClick={excluir} className="btn btn-lg mt-4 mb-4 col-8 btn-block btn-add">Remover decoração</button>
                                        : null
                                }

                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default Descricao;