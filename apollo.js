import {ApolloClient, InMemoryCache, from, HttpLink} from '@apollo/client';
import AsyncStorage from "@react-native-async-storage/async-storage";


const GRAPHQL_ENDPOINT =
    'https://golftrackapi.azurewebsites.net/player';

const apolloClient = () => {
    const link = new HttpLink({
        uri: GRAPHQL_ENDPOINT,
        headers:{
            "Authorization": "Bearer " + AsyncStorage.getItem('TOKEN'),
        }
    });

    return new ApolloClient({
        link: from([link]),
        cache: new InMemoryCache(),
    });
};
export default apolloClient;
