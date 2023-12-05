import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Pagination } from 'react-bootstrap';
import Main from '../components/Main';
import { Link } from 'react-router-dom';

const VendasGeral = () => {
    const [clientes, setClientes] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [clientesPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/clientes/recentes?page=${currentPage}&size=${clientesPerPage}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setClientes(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                alert('Erro ao obter a quantidade de vendas:', error);
            }
        };

        fetchData();
    }, [currentPage, clientesPerPage]);

    const paginate = (pageNumber) => setCurrentPage(pageNumber - 1);

    const renderPageNumbers = () => {
        const maxPages = 4;
        const startPage = Math.max(0, currentPage - Math.floor(maxPages / 2));
        const endPage = Math.min(totalPages - 1, startPage + maxPages - 1);
        const lastPage = Math.max(0, totalPages - 1);

        return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index + 1).map((page) => (
            <span
                key={page}
                className={`page-item ${page - 1 === currentPage ? 'active' : ''}`}
                onClick={() => paginate(page)}
            >
                {page}
            </span>
        )).concat(
            
            endPage !== lastPage ? (
                <span
                    key="next"
                    className="page-item"
                    onClick={() => paginate(endPage + 1)}
                >
                    &raquo;
                </span>
            ) : null
        );
    };

    return (
        <Main>
            <div className="container-fluid">
                <h1 className="h3 mb-2 text-gray-800">Tabela Vendas Gerais</h1>

                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-success">Clientes</h6>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <Table bordered hover>
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Telefone 1</th>
                                        <th>Telefone 2</th>
                                        <th>Plataforma</th>
                                        <th>Email</th>
                                        <th>Vendas</th>
                                        <th>Data</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clientes.map((cliente) => (
                                        
                                        <tr  key={cliente.id}>
                                            <td><Link style={{ textTransform: 'uppercase' }} to={`/cliente/${cliente.id}`}>{cliente.nome}</Link></td>
                                            <td>{cliente.numeroTelefone1}</td>
                                            <td>{cliente.numeroTelefone2}</td>
                                            <td>{cliente.plataforma}</td>
                                            <td>{cliente.email}</td>
                                            <td>{cliente.venda ? cliente.venda.length : 0}</td>
                                            <td>{cliente.data ? `${cliente.data[2]}/${cliente.data[1]}/${cliente.data[0]}` : 'Data não disponível'}</td>
                                        </tr>
                                        
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                        <Pagination>
                            <div className="custom-pagination">
                                {renderPageNumbers()}
                            </div>
                            <style>
                                {`
                                    .custom-pagination .page-item.active {
                                        background-color: green;
                                        color: white;
                                        padding: 6px 12px;  
                                        border-radius: 5px;
                                        margin: 0 3px;  
                                        cursor: pointer;
                                    }
                                    .custom-pagination .page-item  {
                                        background-color: white;
                                        color: green;
                                        padding: 6px 12px;  
                                        border-radius: 5px;
                                        margin: 0 3px;  
                                        cursor: pointer;
                                    }
                                    .custom-pagination  {
                                        text-align: center;
                                    }
                                    .pagination {
                                        display: block;
                                    }
                                `}
                            </style>
                        </Pagination>
                    </div>
                </div>
            </div>
        </Main>
    );
};

export default VendasGeral;
