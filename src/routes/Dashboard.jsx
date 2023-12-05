import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChartComponent from '../components/ChartComponent';
import DoughnutChart from '../components/DoughnutChart';
import axios from 'axios';
import moment from 'moment';
import Main from '../components/Main';
import AdicionarCliente from '../components/AdicionarCliente';



const Dashboard = () => {

  const navigate = useNavigate();
  const [quantidadeVendas, setQuantidadeVendas] = useState(0);
  const [qtdVendasConvertidas, setQtdVendasConvertidas] = useState(0);
  const [qtdVendasUser, setQtdVendasUser] = useState(0);
  const [cliente, setCliente] = useState(0);


  const porcentagemConversao = () => {
    const porcentagem = (qtdVendasConvertidas / quantidadeVendas) * 100;

    if (isNaN(porcentagem)) {
      return 0;
    }

    return porcentagem.toFixed(2);
  };




  useEffect(() => {

    const token = localStorage.getItem('token');

    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/vendas/last30days`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const quantidadeVendas = response.data.totalElements;
        setQuantidadeVendas(quantidadeVendas);
      } catch (error) {
        console.error('Erro ao obter a quantidade de vendas:', error);
      }
    };

    const vendasUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/vendas/last30daysuser`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const quantidadeVendas = response.data.totalElements;
        setQtdVendasUser(quantidadeVendas);
      } catch (error) {
        console.error('Erro ao obter a quantidade de vendas do usuario:', error);
      }
    };

    const clientesUltimos = async () => {
      try {
        let allClientes = [];
        let currentPage = 0;

        while (true) {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/clientes`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              page: currentPage,
              size: 10,
            },
          });

          const clientesUltimos30Dias = response.data.content.filter(cliente => {
            if (cliente.data) {
              const [ano, mes, dia] = cliente.data.slice(0, 3);
              const clienteDate = moment(`${ano}-${mes}-${dia}`);
              const limite30Dias = moment().subtract(30, 'days');
              return clienteDate.isAfter(limite30Dias);
            }

            return false;
          });

          allClientes = allClientes.concat(clientesUltimos30Dias);

          if (response.data.last) {
            break;
          }

          currentPage++;
        }

        setCliente(allClientes.length);

      } catch (error) {
        console.error('Erro ao obter a quantidade de clientes:', error);
      }
    };

    const conversao = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/vendas/convertidos`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const quantidadeVendas = response.data.totalElements;
        setQtdVendasConvertidas(quantidadeVendas);
      } catch (error) {
        console.error('Erro ao obter a quantidade de vendas do usuario:', error);
      }
    };

    if (!token) {
      navigate('/');
    } else {
      axios.get(`${process.env.REACT_APP_API_URL}/logado`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          fetchData();
          vendasUser();
          conversao();
          clientesUltimos();
        })
        .catch((error) => {
          console.error('Erro ao validar o token:', error);
          navigate('/');
        });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Main>
      <div class="container-fluid">


        <div class="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
          <AdicionarCliente />
        </div>


        <div class="row">


          <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-primary shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      Vendas(Mês)</div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{quantidadeVendas}</div>
                  </div>
                  <div class="col-auto">
                    <i class="fas fa-calendar fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-success shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                      Minhas vendas(mes)</div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{qtdVendasUser}</div>
                  </div>
                  <div class="col-auto">
                    <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-info shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Conversão Geral
                    </div>
                    <div class="row no-gutters align-items-center">
                      <div class="col-auto">
                        <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">{porcentagemConversao()}%</div>
                      </div>
                      <div class="col">
                        <div class="progress progress-sm mr-2">
                          <div class="progress-bar bg-info" role="progressbar"
                            style={{ width: `${porcentagemConversao()}%` }} aria-valuenow="50" aria-valuemin="0"
                            aria-valuemax="100"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-auto">
                    <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-warning shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                      Clientes(mês)</div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{cliente}</div>
                  </div>
                  <div class="col-auto">
                    <i class="fas fa-comments fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



        <div class="row">


          <div class="col-xl-8 col-lg-7">
            <div class="card shadow mb-4">

              <div
                class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 class="m-0 font-weight-bold " style={{ color: 'green' }}>VENDAS CONVERTIDAS</h6>

              </div>

              <div class="card-body">
                <div class="chart-area">
                  <ChartComponent />
                </div>
              </div>
            </div>
          </div>


          <div class="col-xl-4 col-lg-5">
            <div class="card shadow mb-4">

              <div
                class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 class="m-0 font-weight-bold" style={{ color: 'green' }}>STATUS</h6>

              </div>

              <div class="card-body">

                <DoughnutChart />

              </div>
            </div>
          </div>
        </div>

      </div>

    </Main>
  );
};

export default Dashboard;