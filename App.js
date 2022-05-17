import { NavigationContainer } from '@react-navigation/native';
import RootStackScreen from "./src/screens/RootStackScreen";
import apolloClient from "./apollo";
import {ApolloProvider} from "@apollo/client";
import {Provider} from 'react-redux';
import store from "./src/redux/store";

export default function App() {
  return (
      <Provider store={store}>
        <ApolloProvider client={apolloClient()}>
          <NavigationContainer>
            <RootStackScreen/>
          </NavigationContainer>
        </ApolloProvider>
      </Provider>
  );
}


