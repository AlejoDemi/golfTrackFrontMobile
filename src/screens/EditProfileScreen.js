import React, {useEffect, useState} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    StatusBar,
    Platform,
    TextInput,
    ImageBackground,
    ActivityIndicator
} from "react-native";
import * as Animatable from 'react-native-animatable';
import {gql, useMutation, useQuery} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useSelector} from "react-redux";

const USER_DATA = gql`
query Query($id: String!){
    getPlayerInfo(id: $id){
        fullname
        email
        password
    }
}
`

const EDIT_PLAYER = gql`
mutation Mutation($input: EditPlayerInput){
    editPlayer(input:$input){
        id
    }
}
`

export default function EditProfileScreen({navigation}) {

    const [name, setName] = useState("Alejo");
    const [email, setEmail] = useState("alejo@alejo");
    const [password, setPass] = useState("");
    const [auxPass, setAuxPass] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setLoading] = useState(false);

    const playerId = useSelector(state => state.playerId);

    const logOut = async () => {
        await AsyncStorage.clear();
        navigation.navigate('FrontScreen');
    }

    const {data, loading, error} = useQuery(USER_DATA, {
        variables: {
            id: playerId.playerId,
        },
        onCompleted: r => {
            setName(r.getPlayerInfo.fullname);
            setEmail(r.getPlayerInfo.email);
            setAuxPass(r.getPlayerInfo.password);
        },
        onError: e => console.log("1" + e),
    });

    const [editPlayer] = useMutation(EDIT_PLAYER);

    const editPlayerInfo = async () => {
        setLoading(true);
        const actualPass = password === "" ? auxPass : password;
        editPlayer({
            variables: {
                input: {
                    id: playerId.playerId,
                    email: email,
                    fullname: name,
                    password: actualPass,
                    handicap: 0,
                    photo: "",
                }
            }
        }).then(r => {
            setLoading(false);
        }).catch(e => setErrorMsg(e.message));
    }


    if (loading || isLoading) return <View style={styles.loadingContainer}>
        <ActivityIndicator
            color = '#4a8a3f'
            size = "large"
            style = {styles.activityIndicator}/>
    </View>

    return (
        <View style={styles.globalContainer}>
            <ImageBackground
                source={require("../assets/golfer_bg.jpeg")}
                style={styles.image}
                resizeMode="cover">
                <View style={{flex: 1}}>
                    <StatusBar backgroundColor="transparent" translucent barStyle='light-content'/>
                </View>
                <Animatable.View style={styles.container} animation='fadeInUpBig'>
                    <View style={{
                        height: "33%",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Text style={styles.label}>USERNAME</Text>
                        <TextInput style={styles.card} onChangeText={(val) => setName(val)}>{name}</TextInput>
                    </View>
                    <View style={{
                        height: "33%",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Text style={styles.label}>EMAIL</Text>
                        <TextInput style={styles.card} onChangeText={(val) => setEmail(val)}>{email}</TextInput>
                    </View>
                    <View style={{
                        height: "33%",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Text style={styles.label}>PASSWORD</Text>
                        <TextInput style={styles.card} secureTextEntry={true} onChangeText={(val) => setPass(val)}>{password}</TextInput>
                    </View>

                    <View style={styles.buttons}>
                        <TouchableOpacity style={[styles.button, {backgroundColor: "firebrick",}]} onPress={logOut}>
                            <Text style={styles.buttonText}>Log Out</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, {backgroundColor: "#4a8a3f"}]} onPress={editPlayerInfo}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        errorMsg === '' ? <View style={{height:40}}/> :
                            <View style={styles.errorMsg}>
                                <Text style={styles.errorText}>{errorMsg}</Text>
                            </View>
                    }
                </Animatable.View>
            </ImageBackground>
        </View>

    );
}

const styles = StyleSheet.create({

    globalContainer:{
        flex: 1,
        backgroundColor:"#4a8a3f",
    },

    header:{
        flex: 1,
        display:"flex",
        justifyContent:"center",
        alignItems:"flex-start",
        backgroundColor:"#4a8a3f",
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    },

    container:{
        flex: 4,
        height:"60%",
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-around",
        alignItems:"center",
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        backgroundColor:"whitesmoke"
    },
    errorMsg: {
        backgroundColor: '#a63721',
        padding: "3%",
        height: 40,
        alignSelf:"center",
        width:"80%",
        borderRadius:20,
        flexDirection:"row",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:35,
        marginBottom: 50,
    },
    errorText: {
        color: 'white',
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    label:{
       fontSize:15,
        alignSelf:"flex-start",
        marginLeft:"10%",
        marginBottom: 5,
        fontWeight:"bold",
        color: 'dimgray'
    },

    card:{
        elevation: 3,
        paddingLeft: 10,
        zIndex: 1,
        width:"80%",
        height:"25%",
        backgroundColor:"white",
        borderRadius:15,
        fontSize:15
    },

    buttons: {
        flexDirection: 'row',
        width: "75%",
        height:"10%",
        marginTop:"10%",
        marginBottom: "20%",
    },

    button:{
        flex: 1,
        borderRadius:10,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        margin: 7,
    },

    buttonText:{
       color:"white",
        fontSize:20,
        fontWeight:"bold"
    }


});

