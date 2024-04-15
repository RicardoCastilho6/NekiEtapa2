import React, { useState, useEffect } from 'react';
import { login } from '../api/Api';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [autorizado, setAuorizado] = useState<boolean>(true);
  const navi = useNavigate();
  const [mostrarSenha, setMostrarSenha] = useState<boolean>(false);
  const [lembrarSenha, setLembrarSenha] = useState<boolean>(false);
  const [erroLogin, setErroLogin] = useState<string>('');

  useEffect(() => {
    const senhaSalva = localStorage.getItem('senhaSalva');
    if (senhaSalva) {
      setPassword(senhaSalva);
      setLembrarSenha(true);
    }
  }, []);

  const handleLogin = async () => {
    try {
      
      const response = await login(email, password);
  
      const userToken = response.data.token;

      setToken(userToken);

      if (lembrarSenha) {
        localStorage.setItem('senhaSalva', password);
      } else {
        localStorage.removeItem('senhaSalva');
      }
      localStorage.setItem('token', userToken);
      localStorage.setItem('Name', response.data.name.toString());
      localStorage.setItem('Id', response.data.id.toString());
      localStorage.setItem('Autorizado', autorizado.toString());
      navi('/Home');
    } catch (error: any) {
      console.error('Erro no login:', error.response ? error.response.data : error.message || error);
      setErroLogin('Login ou senha inválidos.');
    }
  };

  const handleMostrarSenhaChange = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const navigateCadastrado = () => {
    navi('/Cadastro');
  };

  return (
    <div className='backgroundPage'>
      <div className='login-container'>
        <h1>Skills</h1>
        <label>E-mail:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>SENHA:</label>
        <input
          type={mostrarSenha ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          {erroLogin && <p style={{ color: 'red' }}>{erroLogin}</p>}
        </div>

        <div className='mostraSenha'>
          <label htmlFor="mostrarSenhaCheckbox">Mostrar Senha</label>
          <input
            style={{ width: 15, height: 15, marginTop: '6px' }}
            type="checkbox"
            id="mostrarSenhaCheckbox"
            checked={mostrarSenha}
            onChange={handleMostrarSenhaChange}
          />

        </div>
        <div className='mostraSenha'>
          <label>Lembrar Senha</label>
          <input
            style={{ width: 15, height: 15, marginTop: '6px' }}
            type="checkbox"
            checked={lembrarSenha}
            onChange={() => setLembrarSenha(!lembrarSenha)}
          />

        </div>
        <div className='button-container'>
          <button className='buttonLogin' onClick={handleLogin}>
            Logar
          </button>
          <button className='buttonLogin' onClick={navigateCadastrado}>
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;