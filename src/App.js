import Home from "./screens/Home";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotPassword from "./screens/ForgotPassword";
import RootStackScreen from "./screens/RootStackScreen";
import {TabBarNavigator} from "./components/TabBarNavigator";
export default function App() {
    //const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
        <TabBarNavigator/>
        {/*
        <RootStackScreen/>
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


