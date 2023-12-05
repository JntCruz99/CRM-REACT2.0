import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Main from '../components/Main';

const Cliente = () => {
    const { id } = useParams();
    const [cliente, setCliente] = useState(null);
    const [vendas, setVendas] = useState([]);
    const [formValues, setFormValues] = useState({
        nome: '',
        numeroTelefone1: '',
        numeroTelefone2: '',
        plataforma: '',
        email: '',
    });
    const [editVenda, setEditVenda] = useState(false);
    const [vendaSelecionada, setVendaSelecionada] = useState(null);

    const getStatusColor = (status) => {
        switch (status) {
            case 'PENDENTE':
                return 'gradient-warning';
            case 'CONVERTIDO':
                return 'gradient-success';
            case 'NAO_CONVERTIDO':
                return 'gradient-danger';
            default:
                return 'gradient-secondary';
        }
    };

    const adicionarVenda = async () => {
        const status = document.getElementById('status1').value;
        const valor = document.getElementById('valor1').value;
        const obs = document.getElementById('obs1').value;
        const curso = document.getElementById('curso1').value;

        try {
            const token = localStorage.getItem('token');
            await axios.post(`${process.env.REACT_APP_API_URL}/vendas/${id}`, {
                status: status,
                valor: parseFloat(valor),
                obs: obs,
                curso: curso,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('venda adicionada com sucesso!')
        } catch (error) {
            alert('Erro ao adicionar venda');
        }
    };

    useEffect(() => {
        const fetchClienteDetalhes = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/clientes/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCliente(response.data);
                setFormValues({
                    nome: response.data.nome,
                    numeroTelefone1: response.data.numeroTelefone1,
                    numeroTelefone2: response.data.numeroTelefone2,
                    plataforma: response.data.plataforma,
                    email: response.data.email,
                });
                setVendas(response.data.venda || []);
            } catch (error) {
                alert('Erro ao buscar detalhes do cliente:', error);
            }
        };

        fetchClienteDetalhes();
    }, [id]);

    const handleInputChange = (e, venda) => {
        const { name, value } = e.target;
        setVendaSelecionada({
            ...vendaSelecionada,
            [name]: value,
        });
    };

    const handleInputChangeCliente = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSaveCliente = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`${process.env.REACT_APP_API_URL}/clientes/${id}`, formValues, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Cliente salvo com sucesso!');
        } catch (error) {
            alert('Erro ao salvar cliente:', error);
        }
    };

    const handleEditVenda = (venda) => {
        setEditVenda(true);
        setVendaSelecionada(venda);
    };

    const handleSaveVenda = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`${process.env.REACT_APP_API_URL}/vendas/${vendaSelecionada.id}`, vendaSelecionada, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Venda salva com sucesso!');
            setEditVenda(false);
            setVendaSelecionada(null);
        } catch (error) {
            alert('Erro ao salvar venda:', error);
        }
    };

    if (!cliente) {
        return <p>Carregando...</p>;
    }

    return (
        <Main>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <div className="container-fluid">

                        <span># {cliente.id}</span>
                        <h1 className="h3 mb-1 text-gray-800" style={{ textTransform: 'uppercase' }}>
                            {cliente.nome}
                        </h1>

                        <div className="row" style={{ marginTop: '20px' }}>

                            <div className="col-lg-6">
                                <div className="card position-relative">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-success">INFORMAÇÕES DO CLIENTE:</h6>
                                    </div>
                                    <div className="card-body">
                                        <form id="adicionarClienteForm">
                                            <div className="form-group">
                                                <label htmlFor="nome">Nome:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="nome"
                                                    name="nome"
                                                    value={formValues.nome}
                                                    onChange={handleInputChangeCliente}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="numeroTelefone1">Telefone 1:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="numeroTelefone1"
                                                    name="numeroTelefone1"
                                                    value={formValues.numeroTelefone1}
                                                    onChange={handleInputChangeCliente}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="numeroTelefone2">Telefone 2:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="numeroTelefone2"
                                                    name="numeroTelefone2"
                                                    value={formValues.numeroTelefone2}
                                                    onChange={handleInputChangeCliente}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="plataforma">Plataforma:</label>
                                                <select
                                                    className="form-control"
                                                    id="plataforma"
                                                    name="plataforma"
                                                    value={formValues.plataforma}
                                                    onChange={handleInputChangeCliente}
                                                    required
                                                >
                                                    <option value="facebook">Facebook</option>
                                                    <option value="instagram">Instagram</option>
                                                    <option value="google">Google</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="email">Email:</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="email"
                                                    name="email"
                                                    value={formValues.email}
                                                    onChange={handleInputChangeCliente}
                                                    required
                                                />
                                            </div>
                                            <button type="button" className="btn btn-success" onClick={() => { handleSaveCliente(); window.location.reload(); }}>
                                                Salvar Cliente
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="card position-relative">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-success">VENDAS: <a
                                            data-target="#novavenda"
                                            data-toggle="modal"
                                            class="d-none d-sm-inline-block btn btn-sm btn shadow-sm " style={{ backgroundColor: 'green', color: 'white', marginLeft: '350px' }}><i
                                            ></i> +</a></h6>

                                    </div>
                                    <div className="card-body">

                                        {vendas.map((venda) => (
                                            <div key={venda.id} className={`card border-${getStatusColor(venda.status)} mb-3`}>
                                                <div
                                                    className={`card-header text-light bg-${getStatusColor(venda.status)} border-${getStatusColor(
                                                        venda.status
                                                    )}`}
                                                >
                                                    {venda.status}
                                                    <button
                                                        onClick={() => handleEditVenda(venda)}
                                                        className="btn btn-transparent btn btn-sm"
                                                        style={{ marginLeft: '10px', color: 'white' }}
                                                        data-target="#adicionarVendaModal"
                                                        data-toggle="modal"
                                                    >
                                                        <i className="fas fa-edit"></i>
                                                    </button>

                                                </div>

                                                <div className={`card-body text-${getStatusColor(venda.status)}`}>
                                                    <span>{venda.data[2]}/{venda.data[1]}/{venda.data[0]}</span>
                                                    <h5 className="card-title">{venda.curso}</h5>
                                                    <p className="card-text text-dark ">Valor: R${venda.valor}</p>
                                                </div>
                                                <div className={`card-footer bg-transparent border-${getStatusColor(venda.status)}`}>
                                                    Observações: {venda.obs}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="adicionarVendaModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Editar Venda
                            </h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form id="adicionarVendaForm">
                                {editVenda && vendaSelecionada && (
                                    <>
                                        <div className="form-group">
                                            <label htmlFor="status">Status:</label>
                                            <select
                                                className="form-control"
                                                id="status"
                                                name="status"
                                                value={vendaSelecionada.status}
                                                onChange={(e) => handleInputChange(e, vendaSelecionada)}
                                                required
                                            >
                                                <option value="PENDENTE">PENDENTE</option>
                                                <option value="CONVERTIDO">CONVERTIDO</option>
                                                <option value="NAO_CONVERTIDO">NAO_CONVERTIDO</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="valor">Valor:</label>
                                            <input
                                                type="number"
                                                step="0.10"
                                                className="form-control"
                                                id="valor"
                                                name="valor"
                                                value={vendaSelecionada.valor}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="curso">Curso:</label>
                                            <select
                                                className="form-control"
                                                id="curso"
                                                name="curso"
                                                value={vendaSelecionada.curso}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="Superior_Enfermagem">Superior em Enfermagem</option>
                                                <option value="Pos_graduacao">Pós-graduacao</option>
                                                <option value="Curso_Capacitacao">Curso de Capacitacao</option>
                                                <option value="Tec_enfermagem">Tec. enfermagem</option>
                                                <option value="Tec_radiologia">Tec. radiologia</option>
                                                <option value="Tec_laboratorio">Tec. laboratorio</option>
                                                <option value="Tec_segurancaDoTrabalho">Tec. TST</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="obs">Observação:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="obs"
                                                name="obs"
                                                value={vendaSelecionada.obs}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </>
                                )}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" type="button" data-dismiss="modal">
                                Cancelar
                            </button>
                            <button className="btn btn-success" onClick={() => { handleSaveVenda(); window.location.reload(); }} data-dismiss="modal">
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="novavenda" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Adicionar Venda</h5>
                            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="adicionarVendaForm">
                                <div class="form-group">
                                    <label for="status1">Status:</label>
                                    <select class="form-control" id="status1" name="status1" required>
                                        <option value="PENDENTE">PENDENTE</option>
                                        <option value="CONVERTIDO">CONVERTIDO</option>
                                        <option value="NAO_CONVERTIDO">NAO_CONVERTIDO</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="valor1">Valor:</label>
                                    <input type="number" step="0.10" class="form-control" id="valor1" name="valor1" required />
                                </div>
                                <div class="form-group">
                                    <label for="curso1">Curso:</label>
                                    <select class="form-control" id="curso1" name="curso1" required>
                                        <option value="Superior_Enfermagem">Superior em Enfermagem</option>
                                        <option value="Pos_graduacao">Pós-graduacao</option>
                                        <option value="Curso_Capacitacao">Curso de Capacitacao</option>
                                        <option value="Tec_enfermagem">Tec. enfermagem</option>
                                        <option value="Tec_radiologia">Tec. radiologia</option>
                                        <option value="Tec_laboratorio">Tec. laboratorio</option>
                                        <option value="Tec_segurancaDoTrabalho">Tec. TST</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="obs1">Observação:</label>
                                    <input type="text" class="form-control" id="obs1" name="obs1" required />
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancelar</button>
                            <button class="btn btn-success" onClick={() => { adicionarVenda(); window.location.reload(); }} data-dismiss="modal">Adicionar</button>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    );
};

export default Cliente;
