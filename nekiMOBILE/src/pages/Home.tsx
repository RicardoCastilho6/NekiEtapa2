import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { listar, deletarAssocia, atualizarHabilidade, associar } from '../api/api';
import SkillModal from '../components/SkillModal';
import HomeStyles from '../styles/HomeStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../routes/Navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import Modal from '../components/Modal';
import { AntDesign } from '@expo/vector-icons';

interface UsuarioSkill {
  id: number;
  skill: {
    id: number;
    nome: string;
    imgUrl: string;
    descricao: string;
  };
  level: string;
  descricao: string; 
}

const Home = () => {
  const [usuarioSkills, setUsuarioSkills] = useState<UsuarioSkill[]>([]);
  const [isDetalhesModalOpen, setIsDetalhesModalOpen] = useState<boolean>(false);
  const [selectedSkill, setSelectedSkill] = useState<UsuarioSkill | null>(null);
  const [isAdicionarSkillModalOpen, setIsAdicionarSkillModalOpen] = useState<boolean>(false);
  const [novoLevel, setNovoLevel] = useState<string>('');
  const [erroAssociacao, setErroAssociacao] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  type CadastroScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

  const navigation = useNavigation<CadastroScreenNavigationProp>();

  useEffect(() => {
    carregarSkills(currentPage);
  }, [currentPage]);

  const carregarSkills = async (page: number) => {
    try {
      const userId = await AsyncStorage.getItem('Id');

      if (userId) {
        const response = await listar(JSON.parse(userId), page);
        setUsuarioSkills(response.data.content);
        setTotalPages(response.data.totalPages)
      } else {
        console.error('Id do usuário não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao carregar as skills do usuário', error);
    }
  };

  const handleExcluirSkill = async (usuarioSkillId: number) => {
    try {
      await deletarAssocia(usuarioSkillId);
      carregarSkills(currentPage); 
      setErroAssociacao('');
      
    } catch (error) {
      console.error('Erro ao excluir a skill do usuário', error);
    }
  };

  const handleAssociarSkill = async (skillId: number) => {
    try {
      const userId = await AsyncStorage.getItem('Id');
      if (userId !== null) {
        await associar(JSON.parse(userId), skillId, 1);
        setErroAssociacao(null);
        carregarSkills(currentPage);
      } else {
        console.error('Id do usuário não encontrado.');
      }
    } catch (error) {
      setErroAssociacao('Você já possui essa Skill. Tente novamente.');
    }
  };

  const handleSalvarLevel = async (usuarioSkillId: number) => {
    try {
      const userId = await AsyncStorage.getItem('Id');
      if (userId !== null) {
        const skillAtual = usuarioSkills.find((skill) => skill.id === usuarioSkillId);
        if (skillAtual) {
          const novoLevelNumber = parseInt(novoLevel); // Converte novoLevel para um número
          const novaSkill = { ...skillAtual, level: novoLevelNumber };
          await atualizarHabilidade(usuarioSkillId, JSON.parse(userId), skillAtual.skill.id, novoLevelNumber);
          carregarSkills(currentPage);
          setNovoLevel('');
        } else {
          console.error('Skill não encontrada para atualização');
        }
      } else {
        console.error('Id do usuário não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao atualizar o level da skill do usuário', error);
    }
  };

  const handleAbrirDetalhesModal = (skill: UsuarioSkill) => {
    const nivelNumerico = typeof skill.level === 'string' ? skill.level : String(skill.level);
    const skillWithCorrectType = { ...skill, level: nivelNumerico };
    setSelectedSkill(skillWithCorrectType);
    setIsDetalhesModalOpen(true);
  };

  const handleFecharDetalhesModal = () => {
    setSelectedSkill(null);
    setIsDetalhesModalOpen(false);
  };

  const handleAbrirAdicionarSkillModal = () => {
    setIsAdicionarSkillModalOpen(true);
  };

  const handleFecharAdicionarSkillModal = () => {
    setIsAdicionarSkillModalOpen(false);
  };

  const handleLogout = () => {
    AsyncStorage.clear();
    navigation.navigate('Login');
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    if (currentPage >= 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <View style={HomeStyles.homeContainer}>
      <Text style={HomeStyles.title}>SKILLS</Text>
              
    
      <FlatList
        style={HomeStyles.flatList}
        data={usuarioSkills}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleAbrirDetalhesModal(item)} style={HomeStyles.skillItem}>
            <Image style={HomeStyles.skillImage} source={{ uri: item.skill.imgUrl }} />
            <Text style={HomeStyles.skillName}>{item.skill.nome}</Text>
          </TouchableOpacity>
        )}
      />

         
      <View style={{ alignItems: 'center',flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5, marginTop: 5 }}>
        <TouchableOpacity  onPress={previousPage} disabled={currentPage === 0} style={currentPage === 0 ? HomeStyles.disabledButton : HomeStyles.paginationButton}>
        <AntDesign name="caretleft" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={nextPage} disabled={currentPage === totalPages - 1 } style={currentPage === totalPages - 1 ? HomeStyles.disabledButton : HomeStyles.paginationButton}>
        <AntDesign name="caretright" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {erroAssociacao && <Text style={{ color: 'red', marginBottom: 10 }}>{erroAssociacao}</Text>}
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={handleAbrirAdicionarSkillModal} style={HomeStyles.buttonAddSkill}>
          <Text style={{ fontSize: 20, color: 'white' }}>Adicionar Skill</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={HomeStyles.logoutButton}>
          <Text style={{ fontSize: 20, color: 'white' }}>Logout</Text>
        </TouchableOpacity>
      </View>

      {isDetalhesModalOpen && (
        <SkillModal
          isVisible={isDetalhesModalOpen}
          onClose={handleFecharDetalhesModal}
          skill={selectedSkill}
          onDelete={handleExcluirSkill}
          onSaveLevel={handleSalvarLevel}
          novoLevel={novoLevel}
          setNovoLevel={setNovoLevel}
        />
      )}

      {isAdicionarSkillModalOpen && <Modal onClose={handleFecharAdicionarSkillModal} onAssociar={handleAssociarSkill} />}
    </View>
  );
};

export default Home;