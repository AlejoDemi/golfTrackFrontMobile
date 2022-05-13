import React, {useState} from 'react';
import {Modal,View, StyleSheet, Text, Dimensions, Image, Button, TouchableOpacity,StatusBar,Platform,TextInput, ImageBackground,ScrollView} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import * as Animatable from 'react-native-animatable';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as Haptics from "expo-haptics";
import * as ImagePicker from "expo-image-picker";
import NumericInput from 'react-native-numeric-input'
//chala's code


export default function EditProfileScreen({navigation}) {
    const [image,setImage]=useState(null);
    const [name,setName]=useState("Alejo Demitropulos");
    const [handicap,setHandicap]=useState(7.2);
    const [bio,setBio]=useState('Daily golf Argentina');
    const [email,setEmail]=useState('alejodemitropulos@homail.com');
    const [password,setPassword]=useState('salta');
    const [validatePass,setValidatePass]=useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const changeName=(val)=>{
        if(val.length>0)setName(val);
    }

    const changeHandicap=(val)=>{
        if(val.length>0)setHandicap(val);
    }

    const changeBio=(val)=>{
        if(val.length>0)setBio(val);
    }

    const changeEmail=(val)=>{
        if(val.length>0)setEmail(val);
    }

    const returnToProfile=()=>{
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        navigation.navigate("Profile");
    }



    let openImagePicker=async ()=>{
        let permission=await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permission.granted===false)return;
        const pickerResult=await ImagePicker.launchImageLibraryAsync();
        if(pickerResult.cancelled===true)return;
        setImage({localUri:pickerResult.uri})

    }

    const validate=(val)=>{
        if(val===password)setValidatePass(true);
    }
    let closeModal=()=>{
        if (validatePass) setModalVisible(false);
    };

    return(
        <View style={styles.container}>
            <StatusBar backgroundColor="transparent" barStyle='dark-content'/>
            <Animatable.View animation="fadeInRightBig" style={styles.header}>

                <Feather name="arrow-left"
                         size={40}
                style={
                    {
                        marginTop:50,
                        marginLeft:20,
                    }
                }
                onPress={returnToProfile}/>

            </Animatable.View>

            <Animatable.View animation="fadeInRightBig" style={styles.footer}>
              <ScrollView >
                  <Text style={styles.label}>Profile Image</Text>
                      <TouchableOpacity style={styles.card} onPress={openImagePicker}>
                          <Image
                              source={{uri:
                                  image!==null?image.localUri:
                                      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAKlBMVEXFxcX////CwsLe3t7b29vT09Pn5+f19fXOzs77+/vJycnw8PDq6urt7e0K8aSoAAAE+klEQVR4nO2di5qqMAyEsQpy0fd/3WOXZYuKCiTpTD35n8D50maS0NaqchzHcRzHcRzHcRzHcRzHcRzHcRzHcRzHcRwHQJiD/jHa3CT17enYNEPk0hxPdV99j8wQ2uO16w4PdOem/gaVoaqvT+ISw7EtWmSU91rdFMtTW6rG0J/eRG/Opa0KFBn6yzp5P5xPpUkM1XGDvsjQF6UxrF2fcy7laAzt5/yyRFfKUg2nXfoi1zIkNrsF3sLI7xyhPQsE3jiiFXwgtDtSzINE6iiGWqrvwL0ZBTlmzoDW8RIlgbcKhzSKKkt0hHShtmoCD4cGLWaJXpxF5zBmVKEPPlKzSQySSmaJDq3oAbU0mjijNd0jL2WeodqKYUs/v5oeLSthsEYjRMYfDNZohCafGoWQKNn0RgJpko26Fc7gSDa65do9FEE024WRgUGhdkF6T41WV+k2Tc8QBNGmnEngc42V20/g5+B6o4tl4MvU0gxHwALNFyk+m9pm0kiDXaamdj8C7qGsvSKC9YtgWtCMtFCFlXmiQTuiXWuYwKYaa7+PQD0/QyoFJ9Ow9dTMHjpXaKowgx0eDq7QFbrC/1yhef8LV/j9bpGjpoEq/P669D/oLb6/P8zR42OHbWHfie5NgOc09naBPjpkPy+9oMf65qkG/WnGvjJFf14zr2rwx4asPR9/ViEMtgrBE++IbWkK/0AaMc2m+EVqbPpoux+xzDUMIbStTQnyTMSucoNXbL+YzaM6dD3zRzBSiC5JE0bpFDuCesCk1ac55l2pXltLcF1gM0g2HGaf0C/A6W51a1c2HNXMHOWtyLUJR1S7fc7LzoquyFPM3KOXUNFKXqI0eOtIOoolVKLYUb9To7AXB9I9OCHOqFe0go8In2/hM/ol9uebAh7g+WHXO1gR/hU6EXbZRsfUD35k23t0P/p4RhZrCOG01RmvdUFPRIaq2bMRu6aM1xNDqPfbxZk/kDd9smZ/INcoid8sjmgZL9HQx6wx9HrDKManPoPyPLFh245aCzTBtlQtTtVc0KISCs9BLkLTaRh+yCfpFi0P1BDMTa1W6AR8pWY4rA8+BJ3jvgV0M2a5MoN8CDPLracD0BkznGL/BTOiynER4Q/IOdqcAiGP0+VboiPZF2quJJPIm27y3Kx8IOcNL4jAnBKz3KtcIlcBF+xvAr0iVxkOE5jpCENWp38kh/ODssyEfbYxOWe5BfMRXI6rze8xPqphfctpBbb3hGBOOMfUFfFrNGK4TqFGkbCzjCxzpzXYzabQyv4w0gf2+jlGvo/2+jkmL0kQWGHCwhTh5do9FsVbhndaNqB/o4bGKSbUHcP+zeeNaF/dowuhfhDZQqi9EwlDqB1EvhAqB5HLCycUCxuqciahWNjgRsDvUbsfRZlnInq5Bq3kJUr6yGruOUr1N8l0ZgmliQ3HgG0ZlbEb0fDiGZ1xBu8iVTqiwWqGIwqWSGuGIwqWSNf63qPQCDNn0og4m1J8bXqH+EsUaVuRkDcY3NtQoQ/m9oqI0C+oC5oRYVmT4zVrIdK3eti3oXgj8m9D4Uakd8OIyBELSDTCVEPc3idkjT5/ohGmmhISjSjVFJFoRKmGvPudEHTB9I3FiKC9KCKVipIp+QRjQjLJQP/2lewXyD6jmdg/q+H9JHPP7o/BhdihwBALsUOBIRbRWUR2dxd5/qFSgd1/MFBISfOhqPkHhUBa66YjQ/cAAAAASUVORK5CYII="}}
                              style={styles.image}
                              />

                          <Text style={styles.input}>Change photo</Text>
                          <Feather name="chevron-right"
                                   color="#05375a"
                                   size={30}
                                   style={styles.icon}
                          />
                      </TouchableOpacity>

                  <Text style={styles.label}>Name</Text>
                      <View style={styles.card}>
                              <TextInput style={styles.input}
                                         onChangeText={(val) => changeName(val)}>{name}</TextInput>
                      </View>

                  <Text style={styles.label}>Bio</Text>
                  <View style={styles.card}>
                      <TextInput style={styles.input}
                                 onChangeText={(val) => changeBio(val)}>{bio}</TextInput>
                  </View>

                  <Text style={styles.label}>Handicap</Text>
                  <View style={styles.card}>
                      <TextInput style={styles.input}
                                 onChangeText={(val) => changeHandicap(val)}
                                 keyboardType='numeric'
                      >{handicap}</TextInput>
                  </View>

                  <Text style={styles.label}>Email</Text>
                  <View style={styles.card}>
                      <TextInput style={styles.input}
                                 onChangeText={(val) => changeEmail(val)}>{email}</TextInput>
                  </View>

                  <Text style={styles.label}>Password</Text>
                  <TouchableOpacity style={styles.card}>
                      <Text style={styles.input}>Change password</Text>
                      <Feather name="chevron-right"
                               color="#05375a"
                               size={30}
                               style={styles.icon}
                      />
                  </TouchableOpacity>

              </ScrollView>
            </Animatable.View>


        </View>
    );
}

const styles = StyleSheet.create({

    footer:{
        height:"100%",
        //backgroundColor: "white",
        alignContent:"center",
        flexDirection:"column",
        flex:9,
    },


    container:{
        flex:1,
    },

    header:{
        flexDirection:"row",
        height:"10%",
        flex:1,
        //backgroundColor: "white"
    },

    card:{
        elevation: 3,
        alignSelf:"center",
        flexDirection:"row",
        alignContent:"center",
        borderRadius: 20,
        width:"90%",
        height:"15%",
        backgroundColor: "white",
        shadowColor:"black",
        shadowOpacity:0.35,
        shadowOffset:{
            width:0,
            height:2,
        },
    },

    image:{
        borderRadius: 20,
        height:"95%",
        width:"25%",
        alignSelf:"flex-start",
        marginTop: "0.5%",
        marginLeft: "1%",

    },

    icon:{
        alignSelf:"center",
    },
    label:{
        marginLeft:"10%",
        marginBottom:"1%",
        marginTop:"7%",
        fontSize: 18,
        color: 'grey',
        fontWeight:"bold",
    },

    input:{

        color:"#05375a",
        flex:1,
        alignSelf: "center",
        fontSize:20,
        marginLeft:"10%",
        fontWeight: "bold"
    },

});

