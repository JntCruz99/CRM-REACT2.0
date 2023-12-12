import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatComponent = ({ clienteId }) => {
  const [mensagens, setMensagens] = useState([]);
  const [novaMensagem, setNovaMensagem] = useState('');

  useEffect(() => {
    
    carregarMensagens();

    
    const intervalId = setInterval(carregarMensagens, 5000);

    
    return () => clearInterval(intervalId);
  }, [clienteId]);

  const carregarMensagens = async () => {
    try {
        const token = localStorage.getItem('token');
      const response = await axios.get(`/mensagens/${clienteId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

      setMensagens(response.data);
    } catch (error) {
      console.error('Erro ao carregar mensagens:', error);
    }
  };

  const enviarMensagem = async () => {
    try {
      await axios.post(`/mensagens/${clienteId}`, { conteudo: novaMensagem },
      {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
      
      setNovaMensagem('');
      
      carregarMensagens();
    } catch (error) {
      alert('Erro ao enviar mensagem:', error);
    }
  };

  return (
    <div>
      <div>
        <h2>Mensagens</h2>
        <ul>
          {mensagens.map((mensagem) => (
            <li key={mensagem.id}>{mensagem.texto}</li>
          ))}
        </ul>
      </div>
      <div>
        <input
          type="text"
          value={novaMensagem}
          onChange={(e) => setNovaMensagem(e.target.value)}
        />
        <button onClick={enviarMensagem}>Enviar</button>
      </div>
    </div>
  );
};

export default ChatComponent;
