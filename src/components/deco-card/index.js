import React, { useState, useEffect } from 'react';
import './deco-card.css';
import { Link } from 'react-router-dom';
import firebase from '../../config/firebase';

function DecoCard({id, img, titulo, descricao, likes, visualizacoes }) {

    const [urlImagem, setUrlImagem] = useState();

    useEffect(()=>{
        firebase.storage().ref(`imagens/${img}`).getDownloadURL().then(url=>setUrlImagem(url));
    },{urlImagem})

    return (
        <div className="col-md-3 col-sm-12">
            <img src={urlImagem} className="card-img-top img-deco" alt="Imagem da decoração" />
            <div className="card-body text-justify">
                <div className="text-center">
                    <h5>{titulo}</h5>
                </div>
                <p className="card-text text-justify">{descricao}</p>
                <div className="row rodape-card d-flex align-items-center">
                    <div className="col-6">
                        <Link to={'/descricao/'+id} className="btn btn-md btn-outline-primary btn-descricao">Descrição</Link>
                    </div>
                    <div className="col-3 text-right">
                        <i class="fas fa-eye"></i> <span>{visualizacoes}</span>
                    </div>
                    <div className="col-3 text-left">
                        <i class="fas fa-thumbs-up"></i> <span>{likes}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DecoCard;