import React, { useState, useEffect } from 'react';
import './inc.css';
import { Link, Redirect } from 'react-router-dom';
import firebase from '../../config/firebase';
import Navbar from '../../components/navbar/index';
import { useSelector } from 'react-redux';

function IncluirAmbiente(props) {

    const [carregando, setCarregando] = useState();
    const [msg, setMsg] = useState();
    const [titulo, setTitulo] = useState();
    const [comodo, setComodo] = useState();
    const [data, setData] = useState();
    const [descricao, setDescricao] = useState();
    const [imagem, setImagem] = useState();
    const [imagemNova, setImagemNova] = useState();
    const usuarioEmail = useSelector(state => state.usuarioEmail);

    const storage = firebase.storage();
    const db = firebase.firestore();

    useEffect(() => {
        if (props.match.params.id) {
            firebase.firestore()
            .collection('decorations')
            .doc(props.match.params.id)
            .get()
            .then((resultado) => {
                setTitulo(resultado.data().titulo);
                setComodo(resultado.data().comodo);
                setData(resultado.data().data);
                setDescricao(resultado.data().descricao);
                setImagem(resultado.data().imagem);

            });
        }
    }, [carregando])


    function atualizar() {
        setMsg(null)
        setCarregando(1)

        if (imagemNova)
            storage.ref(`imagens/${imagemNova.name}`).put(imagemNova);
        db.collection('decorations')
        .doc(props.match.params.id)
        .update({
            titulo: titulo,
            comodo: comodo,
            data: data,
            descricao: descricao,
            imagem: imagemNova ? imagemNova.name : imagem
        }).then(() => {
            setCarregando(0)
            setMsg('SUCESSO')
        }).catch(err => {
            setCarregando(0)
            setMsg('ERR');
        })

    }

    function cadastrar() {
        setMsg(null)
        setCarregando(1)
        storage.ref(`imagens/${imagemNova.name}`).put(imagemNova).then(() => {
            db.collection('decorations')
            .add({
                titulo: titulo,
                comodo: comodo,
                data: data,
                descricao: descricao,
                imagem: imagemNova.name,
                usuario: usuarioEmail,
                visualizacoes: 0,
                likes: 0,
                criacao: new Date()
            }).then(() => {
                setCarregando(0)
                setMsg('SUCESSO')
            }).catch(err => {
                setCarregando(0)
                setMsg('ERR');
            })
        })
    }

    return (
        <div>
            {
                useSelector(state => state.usuarioLogado) < 1 ? <Redirect to='/' /> : null
            }
            <Navbar />
            <div className="col-8 mt-3 mx-auto">
                <div className="row">
                    <h3 className="mx-auto font-weight-bold">{props.match.params.id ? 'Atualizar decoração' : 'Nova decoração'}</h3>
                </div>
                <form>
                    <div className="form-group">
                        <label>Título:</label>
                        <input onChange={(e) => setTitulo(e.target.value)} type="text" className="form-control" value={titulo && titulo}></input>
                    </div>

                    <div className="form-group row">
                        <div className="col-6">
                            <label>Cômodo</label>
                            <select onChange={(e) => setComodo(e.target.value)} className="form-control" value={comodo && comodo}>
                                <option disabled selected value>Selecione um cômodo da casa:</option>
                                <option>Sala</option>
                                <option>Cozinha</option>
                                <option>Banheiro</option>
                                <option>Varanda</option>
                                <option>Garagem</option>
                                <option>Jardim</option>
                                <option>Sacada</option>
                            </select>
                        </div>
                        <div className="col-6">
                            <label>Data:</label>
                            <input onChange={(e) => setData(e.target.value)} type="date" className="form-control" value={data && data} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Descrição da decoração:</label>
                        <textarea onChange={(e) => setDescricao(e.target.value)} className="form-control" rows="3" value={descricao && descricao}></textarea>
                    </div>
                    <div className="form-group">
                        <label>Upload da foto:{props.match.params.id ? ('Adicionar uma nova foto') : null}</label>
                        <input onChange={(e) => setImagemNova(e.target.files[0])} type="file" className="form-control"></input>
                    </div>
                    <div className="row">
                        {
                            carregando ?
                                <div class="spinner-border mx-auto text-danger" role="status"><span class="sr-only">Loading...</span></div>
                                :
                                <button onClick={props.match.params.id ? atualizar : cadastrar} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-add">{props.match.params.id ? 'Atualizar' : 'Adicionar'}</button>
                        }
                    </div>
                </form>
                <div className="msg-login text-center mb-2">
                    {msg === 'SUCESSO' && <span>Decoração adicionada</span>}
                    {msg === 'ERR' && <span>Algo deu errado!</span>}
                </div>
            </div>

        </div>
    )
}


export default IncluirAmbiente;