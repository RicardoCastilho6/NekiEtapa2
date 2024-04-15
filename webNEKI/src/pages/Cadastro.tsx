import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/login.css';

const Cadastro: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [confirmarSenha, setConfirmarSenha] = useState<string>('');
  const [erroCadastro, setErroCadastro] = useState<string>('');
  const [mostrarSenha, setMostrarSenha] = useState<boolean>(false);
  const [cadastroSucesso, setCadastroSucesso] = useState<boolean>(false);

  const handleCadastro = async () => {
    try {
      
        if (!name || !email || !password || !confirmarSenha) {
            setErroCadastro('Por favor, preencha todos os campos.');
            return;
        }
        
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            setErroCadastro('Por favor, insira um endereço de e-mail válido.');
            return;
        }

        if (password !== confirmarSenha) {
            setErroCadastro('As senhas não coincidem.');
            return;
        }
        
        const response = await axios.post('http://localhost:8080/api/auth/register', { name, email, password }, { withCredentials: true });
        console.log('Cadastro bem-sucedido:', response.data);
        setCadastroSucesso(true);
        setName('');
        setEmail('');
        setPassword('');
        setConfirmarSenha('');
        setErroCadastro('');
    } catch (error) {
        console.error('Erro no cadastro:', error);
        setErroCadastro('Erro ao cadastrar.');
    }
};

  const handleMostrarSenhaChange = () => {
    setMostrarSenha(!mostrarSenha);
  };

  return (
    <div className='backgroundPage'>
      <div className='login-container'>
      <h1>Cadastro</h1>
        <label>Nome:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <br />
        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Senha:</label>
        <input type={mostrarSenha ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <label>Confirmar Senha:</label>
        <input type={mostrarSenha ? "text" : "password"} value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />
        <br />
        {erroCadastro && <p style={{ color: 'red' }}>{erroCadastro}</p>}
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
        <br />
        <button className='buttonCadastro' onClick={handleCadastro}>Cadastrar</button>
        <br />
        <Link to="/">Fazer Login</Link>

        {cadastroSucesso && (
          <div className='modal'>
            <p>Cadastro bem-sucedido!</p>
            <button className='buttonCadastro' onClick={() => setCadastroSucesso(false)}>Fechar</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cadastro;