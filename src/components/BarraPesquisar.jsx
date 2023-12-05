import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BarraPesquisar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const searchResultsRef = useRef(null);

    const handleSearch = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/clientes/search?searchTerm=${searchTerm}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setSearchResults(response.data.content);
        } catch (error) {
            console.error('Erro ao buscar resultados:', error);
        }
    };

    useEffect(() => {
        const handleDocumentClick = (e) => {
            if (searchResultsRef.current && !searchResultsRef.current.contains(e.target)) {
                setSearchResults([]);
            }
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    return (
        <div className="position-relative" ref={searchResultsRef}>
            <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control bg-light border-0 small"
                        placeholder="Pesquisar..."
                        aria-label="Pesquisar..."
                        aria-describedby="basic-addon2"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            handleSearch();
                        }}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-success"
                            type="button"
                            style={{ backgroundColor: 'green', color: 'white' }}
                            onClick={handleSearch}
                        >
                            <i className="fas fa-search fa-sm"></i>
                        </button>
                    </div>
                </div>
            </form>


            {searchResults.length > 0 && (
                <div className="search-results position-absolute border rounded p-2 mt-1" style={{ zIndex: 100, backgroundColor: 'white', cursor: 'pointer', width: '360px', marginLeft: '16px' }}>
                    <ul className="list-unstyled m-0">
                        {searchResults.map((result, index) => (
                            <li
                                key={result.id}
                                className={`border-bottom py-1 ${highlightedIndex === index ? 'bg-light' : ''}`}
                                onMouseEnter={() => setHighlightedIndex(index)}
                                onMouseLeave={() => setHighlightedIndex(-1)}
                            >
                                <Link to={`/cliente/${result.id}`}>
                                    {result.nome} ; <span style={{ fontSize: '10px' }}>Tel:{result.numeroTelefone1}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default BarraPesquisar;
