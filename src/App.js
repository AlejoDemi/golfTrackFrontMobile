import Login from "./components/LogIn";
import Home from "./components/Home";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotPassword from "./components/ForgotPassword";
import Register from "./components/Register";

export default function App() {
    const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{
            headerShown: false }}
            initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }}/>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="ForgotPass" component={ForgotPassword} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}


