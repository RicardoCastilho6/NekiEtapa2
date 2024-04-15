import React, { useState, useEffect } from 'react';
import { listarTodasSkills } from '../api/Api';
import { MdDataSaverOn } from 'react-icons/md';

interface Skill {
  id: number;
  nome: string;
}

interface Props {
  onClose: () => void;
  onAssociar: (skillId: number) => void;
}

const Modal: React.FC<Props> = ({ onClose, onAssociar }) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    carregarSkills();
  }, [page, searchTerm]);

  const carregarSkills = async () => {
    try {
      const response = await listarTodasSkills(page, searchTerm);
      setSkills(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Erro ao carregar as skills', error);
    }
  };

  const handleAssociar = (skillId: number) => {
    onAssociar(skillId);
    onClose();
  };

  const nextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const previousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0); 
  };

  return (
    <div className="modal-skill">
      <h2>Selecione uma Skill</h2>
      <input
        type="text"
        placeholder="Pesquisar habilidades"
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {skills.map((skill) => (
          <li key={skill.id} className="skill-item-modal" onClick={() => handleAssociar(skill.id)}>
            <div style={{ flexDirection: 'row', justifyContent: 'space-between', display: 'flex' }}>
              <p style={{ fontSize: 20 }}>{skill.nome}</p>
              <MdDataSaverOn style={{ fontSize: 23 }} />
            </div>
          </li>
        ))}
      </ul>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <button onClick={previousPage} disabled={page === 0}>Página Anterior</button>
        <span style={{ margin: '0 10px' }}>Página {page + 1} de {totalPages}</span>
        <button onClick={nextPage} disabled={page === totalPages - 1}>Próxima Página</button>
      </div>
      <button onClick={onClose}>Fechar</button>
    </div>
  );
};

export default Modal;