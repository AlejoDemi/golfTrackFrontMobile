import Login from "./components/LogIn";
import Home from "./components/Home";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotPassword from "./components/ForgotPassword";
import Register from "./components/Register";
import Frontpage from "./components/Frontpage";
import RootStackScreen from "./screens/RootStackScreen";

export default function App() {
    //const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
        <RootStackScreen/>
        {/*
        <Stack.Navigator screenOptions={{
            headerShown: false }}
            initialRouteName="Frontpage">
            <Stack.Screen name="Frontpage" component={Frontpage} options={{ title: 'Frontpage' }}/>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="ForgotPass" component={ForgotPassword} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>*/}
    </NavigationContainer>
  );
}


