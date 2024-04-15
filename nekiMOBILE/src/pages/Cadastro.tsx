import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { cadastrar } from '../api/api';
import CadastroStyles from '../styles/CadastroStyles';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../routes/Navigation';
import axios from 'axios';

const Cadastro = () => {
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmarSenha, setConfirmarSenha] = useState<string>('');
    const [erroCadastro, setErroCadastro] = useState<string>('');
    const [mostrarSenha, setMostrarSenha] = useState<boolean>(false);
    const [cadastroSucesso, setCadastroSucesso] = useState<boolean>(false);
    
    type CadastroScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Cadastro'>;

const navigation = useNavigation<CadastroScreenNavigationProp>();

interface CadastroFormData {
  nome: string;
  email: string;
  password: string;
  confirmarSenha: string;
}

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
      
      const response = await axios.post('http://192.168.1.2:8080/api/auth/register', { name, email, password }, { withCredentials: true });
      
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

    const handleMostrarSenhaChange = ()=> {
        setMostrarSenha(!mostrarSenha);
    }

    return (
        <View style={CadastroStyles.backgroundPage}>
          <View style={CadastroStyles.loginContainer}>
            <View style={{alignItems:'center'}}>
            <Text style={CadastroStyles.title}>Cadastro</Text>
            </View>
            <Text>Nome:</Text>
            <TextInput
              style={CadastroStyles.input}
              value={name}
              onChangeText={(text: string) => setName(text)}
            />
            <Text>E-mail:</Text>
            <TextInput
              style={CadastroStyles.input}
              value={email}
              onChangeText={(text: string) => setEmail(text)}
            />
            <Text>Senha:</Text>
            <TextInput
              style={CadastroStyles.input}
              secureTextEntry={!mostrarSenha}
              value={password}
              onChangeText={(text: string) => setPassword(text)}
            />
            <Text>Confirmar Senha:</Text>
            <TextInput
              style={CadastroStyles.input}
              secureTextEntry={!mostrarSenha}
              value={confirmarSenha}
              onChangeText={(text: string) => setConfirmarSenha(text)}
            />
            {cadastroSucesso && (             
                <Text style={{color:'green'}}>Cadastro bem-sucedido!</Text>
            )}
            {erroCadastro && <Text style={CadastroStyles.errorText}>{erroCadastro}</Text>}
            <View style={CadastroStyles.mostraSenha}>
              <Text>Mostrar Senha</Text>
              <TouchableOpacity onPress={handleMostrarSenhaChange}>
              {mostrarSenha ? (
             <MaterialCommunityIcons name="checkbox-marked" size={24} color="green" />
             ) : (
               <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="black" />
            )}
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={CadastroStyles.buttonCadastro} onPress={handleCadastro}>
              <Text>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <View style={{alignItems:'center'}}>
          <Text style={CadastroStyles.link}>Ja possui conta? Faça Login!</Text>
          </View>
        </TouchableOpacity>
            
          </View>
        </View>
      );
    };
export default Cadastro;
