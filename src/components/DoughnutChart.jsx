import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import moment from 'moment';
import axios from 'axios';

const DoughnutChart = () => {
  const token = localStorage.getItem('token');
  const [vendasPendentes, setVendasPendentes] = useState([]);
  const [vendasConvertidas, setvendasConvertidas] = useState([]);
  const [vendasNaoConvertidas, setvendasNaoConvertidas] = useState([]);

  useEffect(() => {
    const vendasPendentesUltimos30Dias = async () => {
      try {
        let allVendasPendentes = [];
        let currentPage = 0;
    
        while (true) {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/vendas`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              page: currentPage,
              size: 10,
            },
          });
    
          const vendasPendentes = response.data.content.filter(venda =>
            venda.status === 'PENDENTE' &&
            venda.data &&
            moment(new Date(...venda.data)).isAfter(moment().subtract(30, 'days'))
          );
    
          allVendasPendentes = allVendasPendentes.concat(vendasPendentes);
    
          if (response.data.last) {
            break;
          }
    
          currentPage++;
        }
    
        setVendasPendentes(allVendasPendentes.length);
    
      } catch (error) {
        console.error('Erro ao obter as vendas pendentes:', error);
      }
    };

    const vendasConvertidasUltimos30Dias = async () => {
      try {
        let allVendasPendentes = [];
        let currentPage = 0;
    
        while (true) {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/vendas`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              page: currentPage,
              size: 10,
            },
          });
    
          const vendasPendentes = response.data.content.filter(venda =>
            venda.status === 'CONVERTIDO' &&
            venda.data &&
            moment(new Date(...venda.data)).isAfter(moment().subtract(30, 'days'))
          );
    
          allVendasPendentes = allVendasPendentes.concat(vendasPendentes);
    
          if (response.data.last) {
            break;
          }
    
          currentPage++;
        }
    
        setvendasConvertidas(allVendasPendentes.length);
    
      } catch (error) {
        console.error('Erro ao obter as vendas pendentes:', error);
      }
    };

    const vendasNaoConvertidasUltimos30Dias = async () => {
      try {
        let allVendasPendentes = [];
        let currentPage = 0;
    
        while (true) {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/vendas`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              page: currentPage,
              size: 10,
            },
          });
    
          const vendasPendentes = response.data.content.filter(venda =>
            venda.status === 'NAO_CONVERTIDO' &&
            venda.data &&
            moment(new Date(...venda.data)).isAfter(moment().subtract(30, 'days'))
          );
    
          allVendasPendentes = allVendasPendentes.concat(vendasPendentes);
    
          if (response.data.last) {
            break;
          }
    
          currentPage++;
        }
    
        setvendasNaoConvertidas(allVendasPendentes.length);
    
      } catch (error) {
        console.error('Erro ao obter as vendas pendentes:', error);
      }
    };

    vendasPendentesUltimos30Dias();
    vendasConvertidasUltimos30Dias();
    vendasNaoConvertidasUltimos30Dias();
  }, [token]);

  const data = {
    labels: ["Não-Convertido", "Convertido", "Pendente"],
    datasets: [
      {
        data: [vendasNaoConvertidas, vendasConvertidas, vendasPendentes],
        backgroundColor: ['#B22222', '#98FB98', '#FFA500'],
        hoverBackgroundColor: ['#A52A2A', '#90EE90', '#FF8C00'],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: false,
    },
    cutoutPercentage: 80,
  };

  return (
    <div>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
