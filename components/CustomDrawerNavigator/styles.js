import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
  },
  backgroundImage:{
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    width:'100%',
    height:'100%'
  },

  icons: {
    width: 40,
  },
  topHeader:{
    width:'100%',
    height:'40%',
  },
  drawerRow:{
    borderBottomWidth:1,
    borderColor:'#DDDDDD',
    paddingTop:17,
    flex:1,
    flexDirection:'row',
    paddingBottom:10,
    height:40,
  },
  itemContainer:{
    flex:1,
    flexDirection:'column',

  },
  textItem:{
    color: '#8C8C8C',
    fontSize:14,
    textAlign: 'right',
    fontFamily: "byekan",

  }
});

export default styles;
