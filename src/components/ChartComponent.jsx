import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import axios from 'axios';

const ChartComponent = () => {
  const token = localStorage.getItem('token');
  const [vendasPendentes, setVendasPendentes] = useState([]);

  useEffect(() => {
    const fetchVendasPendentes = async () => {
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

          const vendasPendentes = response.data.content.filter(
            (venda) =>
              venda.status === 'CONVERTIDO' &&
              venda.data &&
              moment(new Date(...venda.data)).isAfter(moment().subtract(1, 'year'))
          );

          allVendasPendentes = allVendasPendentes.concat(vendasPendentes);

          if (response.data.last) {
            break;
          }

          currentPage++;
        }

        setVendasPendentes(allVendasPendentes);
      } catch (error) {
        console.error('Erro ao obter as vendas pendentes:', error);
      }
    };

    fetchVendasPendentes();
  }, [token]);

  const calculateVendasPorMes = () => {
    const vendasPorMes = Array.from({ length: 12 }, () => 0);

    vendasPendentes.forEach((venda) => {
      const monthIndex = moment(new Date(...venda.data)).month();
      vendasPorMes[monthIndex]++;
    });

    return vendasPorMes;
  };

  const getCurrentYearLabels = () => {
    const currentYear = moment().year();
    const monthLabels = moment.monthsShort();
    const currentYearLabels = monthLabels.map((month, index) => `${month} ${currentYear}`);
    return currentYearLabels;
  };

  const data = {
    labels: getCurrentYearLabels(),
    datasets: [
      {
        label: '',
        data: calculateVendasPorMes(),
        fill: true,
        borderColor: "#006400",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        type: 'linear',
        position: 'left',
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartComponent;
