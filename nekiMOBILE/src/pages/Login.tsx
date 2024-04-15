import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { login } from '../api/api';
import LoginStyles from '../styles/LoginStyles';
import { RootStackParamList } from '../routes/Navigation';
import { StackNavigationProp } from '@react-navigation/stack';

const Login = () => {
  const [loginInput, setLoginInput] = useState('');
  const [senhaInput, setSenhaInput] = useState('');
  const [token, setToken] = useState<string>('');
  const [mostrarSenha, setMostrarSenha] = useState<boolean>(false);
  const [lembrarSenha, setLembrarSenha] = useState<boolean>(false);
  const [erroLogin, setErroLogin] = useState<string>('');
  type CadastroScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

  const navigation = useNavigation<CadastroScreenNavigationProp>();

  useEffect(() => {}, []);

  const handleLogin = async () => {
    try {
      const response = await login(loginInput, senhaInput);
      const userToken = response.data.token;
      setToken(userToken);

      if (lembrarSenha) {
        await AsyncStorage.setItem('senhaSalva', senhaInput);
      } else {
        await AsyncStorage.removeItem('senhaSalva');
      }

      const userId = response.data.id;
      await AsyncStorage.setItem('token', userToken);
      await AsyncStorage.setItem('Id', userId.toString());
      navigation.navigate('Home');
      setLoginInput('');
      setSenhaInput('');
      setErroLogin('');
    } catch (error) {
      setErroLogin('Login ou senha inválidos.');
    }
  };

  const handleMostrarSenhaChange = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const navigateCadastrado = () => {
    navigation.navigate('Cadastro');
  };

  return (
    <View style={LoginStyles.backgroundPage}>
      <View style={LoginStyles.loginContainer}>
        <View style={{ alignItems: 'center' }}>
          <Text style={LoginStyles.title}>Skills</Text>
        </View>

        <Text>E-MAIL:</Text>
        <TextInput style={LoginStyles.input} value={loginInput} onChangeText={(text) => setLoginInput(text)} />
        <Text>SENHA:</Text>
        <TextInput
          style={LoginStyles.input}
          secureTextEntry={!mostrarSenha}
          value={senhaInput}
          onChangeText={(text) => setSenhaInput(text)}
        />
        {erroLogin && <Text style={LoginStyles.errorText}>{erroLogin}</Text>}
        <View style={LoginStyles.mostraSenha}>
          <Text>Mostrar Senha</Text>
          <TouchableOpacity onPress={handleMostrarSenhaChange}>
            {mostrarSenha ? (
              <MaterialCommunityIcons name="checkbox-marked" size={24} color="green" />
            ) : (
              <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>
        <View style={LoginStyles.mostraSenha}>
          <Text>Lembrar Senha</Text>
          <TouchableOpacity onPress={() => setLembrarSenha(!lembrarSenha)}>
            {lembrarSenha ? (
              <MaterialCommunityIcons name="checkbox-marked" size={24} color="green" />
            ) : (
              <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>
        <View style={LoginStyles.buttonContainer}>
          <TouchableOpacity style={LoginStyles.buttonLogin} onPress={handleLogin}>
            <Text>Logar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={LoginStyles.buttonLogin} onPress={navigateCadastrado}>
            <Text>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;