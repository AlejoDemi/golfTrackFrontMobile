import React, {useState} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity, Pressable } from 'react-native';

export default function Home() {
    return(
        <View style={styles.container}
        >
          <Text style={
              {
                  alignSelf:"center",
                  justifyContent: "center",
                  padding:100,
                  fontSize:30,
              }
          }>Home</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#7fffd4",
        flex:1,
    },
});