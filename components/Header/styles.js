import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0,
    height: 50,
    backgroundColor: '#0078B9',
    flexDirection: 'row',
    padding:10
  },
  LeftCol: {
    width: '50%',
    flex:1,
    flexDirection:'row'
  },
  RightCol: {
    width: '50%',
    flex:1,
    flexDirection:'row-reverse',
    alignSelf:'flex-end',
    alignContent: 'stretch',
  },
  tagContainer: {
    alignSelf: 'flex-end' 
  },
  captionContainer:{
    width:'100%',
    height:'100%',
    marginTop:-12,
  },
  iconContainer:{
    paddingBottom:5,
    paddingLeft:25,
  }
});

export default styles;
