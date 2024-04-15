import { StyleSheet } from 'react-native';

const CadastroStyles = StyleSheet.create({
  backgroundPage: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    padding: 20,
    width: '80%',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'black'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  mostraSenha: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonLogin: {
    backgroundColor: '#4285f4',
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default CadastroStyles;