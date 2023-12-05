import React from 'react';
import { CSVLink } from 'react-csv';

const DownloadButton = () => {

    

  const headers = [
    { label: 'ID', key: 'id' },
    { label: 'Nome', key: 'nome' },
    { label: 'Telefone 1', key: 'numeroTelefone1' },
    { label: 'Telefone 2', key: 'numeroTelefone2' },
    { label: 'Plataforma', key: 'plataforma' },
    { label: 'E-mail', key: 'email' },
    { label: 'Número de Vendas', key: 'venda.length' }, 
  ];

  return (
    <CSVLink data={data} headers={headers} filename={filename}>
      <button type="button">Download CSV</button>
    </CSVLink>
  );
};

export default DownloadButton;
