
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { listar, deletarAssocia, atualizarHabilidade, associar } from '../api/Api';
import Modal from '../components/SkillModal';
import '../css/home.css';

interface UsuarioSkill {
  id: number;
  novoLevel: number;
  level: number;
  skill: {
    id: number;
    nome: string;
    imgUrl: string;
    descricao: string;
  };
}

const Home: React.FC = () => {
  const [usuarioSkills, setUsuarioSkills] = useState<UsuarioSkill[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const isAutorizado = localStorage.getItem('Autorizado') === 'true';

    if (!isAutorizado) {
      navigate('/');
    } else {
      carregarUsuarioSkills(currentPage);
    }
  }, [currentPage, navigate]);

  const carregarUsuarioSkills = async (page: number) => {
    try {
      const response = await listar(Number(localStorage.getItem('Id')), page);
      const usuarioSkillsPage = response.data;
      const usuarioSkillsList = usuarioSkillsPage.content;
  
      setUsuarioSkills(usuarioSkillsList);
      setTotalPages(usuarioSkillsPage.totalPages);
    } catch (error) {
      console.error('Erro ao carregar as skills do usuário', error);
    }
  };

  const handleExcluirSkill = async (usuarioSkillId: number) => {
    try {
      await deletarAssocia(usuarioSkillId);
      carregarUsuarioSkills(currentPage);
    } catch (error) {
      console.error('Erro ao excluir a skill do usuário', error);
    }
  };

  const handleAtualizarLevel = async (usuarioSkillId: number, novoLevel: number) => {
    try {
       
        const habilidadeAtual = usuarioSkills.find((habilidade) => habilidade.id === usuarioSkillId);

        if (habilidadeAtual) {
         
            await atualizarHabilidade(
                habilidadeAtual.id,
                Number(localStorage.getItem('Id')),
                habilidadeAtual.skill.id,
                novoLevel
            );

            carregarUsuarioSkills(currentPage);
        } else {
            console.error('Habilidade não encontrada para atualização');
        }
    } catch (error) {
        console.error('Erro ao atualizar o nível da habilidade do usuário', error);
    }
};

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, usuarioSkillId: number) => {
    const novoLevel = Number(event.target.value);
    setUsuarioSkills((prevSkills) =>
      prevSkills.map((usuarioSkill) =>
        usuarioSkill.id === usuarioSkillId ? { ...usuarioSkill, novoLevel } : usuarioSkill
      )
    );
  };

  const handleSalvarLevel = async (usuarioSkillId: number) => {
    const usuarioSkill = usuarioSkills.find((skill) => skill.id === usuarioSkillId);
    if (usuarioSkill) {
      await handleAtualizarLevel(usuarioSkillId, usuarioSkill.novoLevel);
    }
  };

  const handleAssociarSkill = async (skillId: number) => {
    try {     
      await associar(Number(localStorage.getItem('Id')), skillId, 1);
      carregarUsuarioSkills(currentPage);
      setErro(null);
    } catch (error) {
      console.error('Erro ao associar a skill ao usuário ou ja possui a skill!', error);
      setErro('Erro ao associar a skill ao usuário ou já possui a skill!');
    }
  };

  const handleAbrirModal = () => {
    setIsModalOpen(true);
  };

  const handleFecharModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage >= 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="home-container">
      <h1>SKILLS</h1>

     
     {erro && <p style={{ color: 'red', marginTop :-20, fontSize:25}}>{erro}</p>}

      <div>
        <ul>
          {usuarioSkills.map((usuarioSkill) => (
            <li key={usuarioSkill.id} className="skill-item">
              <img src={usuarioSkill.skill.imgUrl} style={{ width: 230, height: 150, padding: 5 }} />
              <div>
                <p>Nome: {usuarioSkill.skill.nome}</p>
                <p>
                  Level:
                  <input
                    type="text"
                    value={usuarioSkill.novoLevel || ''}
                    onChange={(event) => handleInputChange(event, usuarioSkill.id)}
                    placeholder={usuarioSkill.level.toString()}
                  />
                </p>
                <p>Descrição: {usuarioSkill.skill.descricao}</p>
              </div>
              <div style={{ flexDirection: 'column' }}>
                <button onClick={() => handleSalvarLevel(usuarioSkill.id)}>Salvar Level</button>
                <button onClick={() => handleExcluirSkill(usuarioSkill.id)}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="pagination-buttons">
        <button onClick={handlePreviousPage} disabled={currentPage === 0}>
          Anterior
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages-1}>
          Próximo
        </button>
      </div>
      <div className="titulo">
        <button onClick={handleAbrirModal} className="button-add-skill">
          Adicionar Skill
        </button>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      {isModalOpen && <Modal onClose={handleFecharModal} onAssociar={handleAssociarSkill} />}
    </div>
  );
};

export default Home;