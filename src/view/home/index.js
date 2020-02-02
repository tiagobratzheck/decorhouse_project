import React, { useState, useEffect } from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import firebase from '../../config/firebase';
import Navbar from '../../components/navbar/index';
import DecoCard from '../../components/deco-card/index';
import { useSelector } from 'react-redux';


function Home({ match }) {

    const [decoracao, setDecoracao] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    let listaDecoracoes = []

    const usuarioEmail = useSelector(state=>state.usuarioEmail);

    useEffect(() => {

        if (match.params.parametro) {
            firebase.firestore().collection('decorations')
            .where('usuario', '==', usuarioEmail)
            .get()
            .then(async (resultado) => {
                await resultado.docs.forEach(element => {
                    if (element.data().titulo.indexOf(pesquisa) >= 0) {
                        listaDecoracoes.push({
                            id: element.id,
                            ...element.data()
                        })
                    }
                });

                setDecoracao(listaDecoracoes);
            })

        } else {
            firebase.firestore().collection('decorations').get().then(async (resultado) => {
                await resultado.docs.forEach(element => {
                    if (element.data().titulo.indexOf(pesquisa) >= 0) {
                        listaDecoracoes.push({
                            id: element.id,
                            ...element.data()
                        })
                    }
                });

                setDecoracao(listaDecoracoes);
            })
        }
    })

    return (
        <div>
            <Navbar />
            <div className="row col-8 mx-auto p-3">
                <h5 className="mx-auto p-3">Decorações publicadas</h5>
                <input onChange={(e) => setPesquisa(e.target.value)} type="text" className="form-control text-center" placeholder="Pesquisar decoração"></input>
            </div>
            <div className='row p-3'>
                {decoracao.map(item => <DecoCard key={item.id}
                    id={item.id}
                    img={item.imagem}
                    comodo={item.comodo}
                    titulo={item.titulo}
                    descricao={item.descricao}
                    likes={item.likes}
                    visualizacoes={item.visualizacoes} />)}
            </div>
        </div>
    )
}

export default Home;