import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
                username: username,
                senha: password,
            });

            if (response.status === 200) {

                localStorage.setItem('token', response.data.token);

                navigate('/dashboard');
            }
        } catch (error) {

            alert('Erro ao fazer login', error);

        }
    };

    return (
        <body class="bg-gradient-success">

            <div class="container">

                <div class="row justify-content-center">

                    <div class="col-xl-10 col-lg-12 col-md-9">

                        <div class="card o-hidden border-0 shadow-lg my-5">
                            <div class="card-body p-0">
                                <div class="row">
                                    <div class="container">
                                        <div class="p-5">
                                            <div class="text-center" style={{ marginTop: '50px', marginBottom: '50px' }}>
                                                <h1 class="h4 text-gray-900 mb-4">CRM-FESVIP!</h1>
                                            </div>
                                            <form class="user">
                                                <div class="form-group">
                                                    <input type="text" class="form-control form-control-user"
                                                        id="exampleInputEmail" aria-describedby="emailHelp"
                                                        placeholder="username"
                                                        value={username} onChange={(e) => setUsername(e.target.value)} />
                                                </div>
                                                <div class="form-group">
                                                    <input type="password" class="form-control form-control-user"
                                                        id="exampleInputPassword" placeholder="senha"
                                                        value={password} onChange={(e) => setPassword(e.target.value)} />
                                                </div>
                                                <div class="form-group">
                                                    <div class="custom-control custom-checkbox small">
                                                        <input type="checkbox" class="custom-control-input" id="customCheck" />
                                                        <label class="custom-control-label" for="customCheck">Lembre-me</label>
                                                    </div>
                                                </div >
                                                <div style={{ marginTop: '50px', marginBottom: '50px' }}>
                                                </div>
                                                <a class="btn btn-success btn-user btn-block" onClick={handleLogin}>
                                                    Login
                                                </a>

                                                <hr />
                                                <div style={{ marginTop: '50px', marginBottom: '70px' }}>
                                                </div>
                                            </form>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>




        </body>

    );
};

export default Login;
