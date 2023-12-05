import React, { useState } from 'react';
import axios from 'axios';

const AdicionarCliente = () => {
    const [idCliente, setIdCliente] = useState(0);
    

    const adicionarCliente = async () => {
        const nomeCliente = document.getElementById('nome').value;
        const telefoneCliente1 = document.getElementById('numeroTelefone1').value;
        const telefoneCliente2 = document.getElementById('numeroTelefone2').value;
        const plataformaCliente = document.getElementById('plataforma').value;
        const emailCliente = document.getElementById('email').value;

        if (!nomeCliente || !telefoneCliente1 || !plataformaCliente) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/clientes`, {
                nome: nomeCliente,
                numeroTelefone1: telefoneCliente1,
                numeroTelefone2: telefoneCliente2,
                plataforma: plataformaCliente,
                email: emailCliente,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setIdCliente(response.data.id);
        } catch (error) {
            alert('Erro ao adicionar cliente:');
        }
    };

    const adicionarVenda = async () => {
        const status = document.getElementById('status').value;
        const valor = document.getElementById('valor').value;
        const obs = document.getElementById('obs').value;
        const curso = document.getElementById('curso').value;

        try {
            const token = localStorage.getItem('token');
            await axios.post(`${process.env.REACT_APP_API_URL}/vendas/${idCliente}`, {
                status: status,
                valor: parseFloat(valor),
                obs: obs,
                curso: curso,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            alert('Erro ao adicionar venda');
        }
    };


    return (
        <div>
            <a 
            data-target="#adicionarClienteModal" 
            data-toggle="modal"
             class="d-none d-sm-inline-block btn btn-sm btn shadow-sm" style={{ backgroundColor: 'green', color: 'white' }}><i
                class="fas fa-user fa-sm text-white-50"></i> Adicionar Cliente</a>

            <div class="modal fade" id="adicionarClienteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Adicionar Cliente</h5>
                            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="adicionarClienteForm">
                                <div class="form-group">
                                    <label for="nome">Nome:</label>
                                    <input type="text" class="form-control" id="nome" name="nome" required />
                                </div>
                                <div class="form-group">
                                    <label for="numeroTelefone1">Telefone 1:</label>
                                    <input type="text" class="form-control" id="numeroTelefone1" name="numeroTelefone1" required />
                                </div>
                                <div class="form-group">
                                    <label for="numeroTelefone2">Telefone 2:</label>
                                    <input type="text" class="form-control" id="numeroTelefone2" name="numeroTelefone2" required />
                                </div>
                                <div class="form-group">
                                    <label for="plataforma">Plataforma:</label>
                                    <select class="form-control" id="plataforma" name="plataforma" required>
                                        <option value="facebook">Facebook</option>
                                        <option value="instagram">Instagram</option>
                                        <option value="whatsapp">WhatsApp</option>
                                        <option value="google">Google</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="email">Email:</label>
                                    <input type="email" class="form-control" id="email" name="email" required />
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancelar</button>
                            <button class="btn btn-success"  
                            onClick={adicionarCliente} 
                            data-dismiss="modal"
                            data-target="#adicionarVendaModal" 
                            data-toggle="modal">Adicionar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="adicionarVendaModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
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
                                    <label for="status">Status:</label>
                                    <select class="form-control" id="status" name="status" required>
                                        <option value="PENDENTE">PENDENTE</option>
                                        <option value="CONVERTIDO">CONVERTIDO</option>
                                        <option value="NAO_CONVERTIDO">NAO_CONVERTIDO</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="valor">Valor:</label>
                                    <input type="number" step="0.10" class="form-control" id="valor" name="valor" required />
                                </div>
                                <div class="form-group">
                                    <label for="curso">Curso:</label>
                                    <select class="form-control" id="curso" name="curso" required>
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
                                    <label for="obs">Observação:</label>
                                    <input type="text" class="form-control" id="obs" name="obs" required />
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancelar</button>
                            <button class="btn btn-success" onClick={adicionarVenda}  data-dismiss="modal">Adicionar</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default AdicionarCliente;