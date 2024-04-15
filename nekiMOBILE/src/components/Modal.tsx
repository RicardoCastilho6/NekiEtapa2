import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { listarTodasSkills } from '../api/api';
import { MaterialIcons } from '@expo/vector-icons';
import ModalStyles from '../styles/ModalStyles';
import { AntDesign } from '@expo/vector-icons';

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
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [totalPages, setTotalPages] = useState<number>(0);

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

  const handleAssociarSkill = (skillId: number) => {
    onAssociar(skillId);
    onClose();
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const previousPage = () => {
    if (page >= 0) { 
      setPage(page - 1);
    }
  };

  const handleSearchTermChange = (text: string) => {
    setSearchTerm(text);
 
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '80%', marginTop: '-170%', height: '50%' }}>
      <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '100%', height: '100%' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Selecione uma Skill</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 10 }}
          placeholder="Pesquisar"
          onChangeText={handleSearchTermChange}
          value={searchTerm}
        />
        <FlatList
          data={skills}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 25, marginVertical: 10 }}>{item.nome}</Text>
              <TouchableOpacity onPress={() => handleAssociarSkill(item.id)}>
                <MaterialIcons name="add-circle" size={24} color="black" />
              </TouchableOpacity>
            </View>
          )}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
          <TouchableOpacity onPress={previousPage} disabled={page === 0} style={page === 0 ? ModalStyles.disabledButton : ModalStyles.paginationButton}>
          <AntDesign name="caretleft" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={nextPage} disabled={page === totalPages - 1} style={page === totalPages - 1 ? ModalStyles.disabledButton : ModalStyles.paginationButton}>
          <AntDesign name="caretright" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onClose} style={{ marginTop: 20, backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Modal;