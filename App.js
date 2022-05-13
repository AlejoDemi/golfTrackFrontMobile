import { NavigationContainer } from '@react-navigation/native';
import RootStackScreen from "./src/screens/RootStackScreen";
import apolloClient from "./apollo";
import {ApolloProvider} from "@apollo/client";


export default function App() {
  return (
      <ApolloProvider client={apolloClient()}>
          <NavigationContainer>
              <RootStackScreen/>
          </NavigationContainer>
      </ApolloProvider>

  );
}


