import { StyleSheet } from 'react-native';

const HomeStyles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#e0e0e0',
    alignItems: 'center'
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  skillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 40,
    borderBottomWidth: 6,
    borderBottomColor: '#ccc',
    
  },
  skillImage: {
    width: '40%',
    height: '200%',
    marginRight: 30,
  },
  skillName: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'black'
  },
  levelInput: {
    width: 50,
    height: 30,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginRight: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    
  },
  buttonAddSkill: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 16,
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 16,
    marginLeft: 16,
  },
  titulo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paginationButton: {
    backgroundColor: 'blue',
    padding: 3,
    borderRadius:10,
    marginRight: 30
  },
  disabledButton: {
    backgroundColor: 'gray',
    padding: 3,
    borderRadius: 10,
    marginRight: 30
  },
  paginationButtonText: {
    color: 'white',
    fontSize: 16,
  },
  flatList: {
    flex: 1,   
  },
});

export default HomeStyles;