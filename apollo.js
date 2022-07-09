import {ApolloClient, InMemoryCache, from, HttpLink} from '@apollo/client';
import {useSelector} from "react-redux";


const GRAPHQL_ENDPOINT =
    'https://golf-track.loca.lt/player';


const apolloClient = () => {
    const link = new HttpLink({
        uri: GRAPHQL_ENDPOINT,
        headers:{
            "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfdXNlciI6ImZlZGVAZ21haWwuY29tIiwiX2lkIjoiOGFjNjhiMGQzODkyY2RlODZmOGQiLCJpYXQiOjE2NTUxNjc0NTN9.hSZzG2QvXU_1wEs3bIMGnqDa5xJYERsaWutxZkQbw1M",
        },
    });

    return new ApolloClient({
        link: from([link]),
        cache: new InMemoryCache(),
        defaultOptions: {
            watchQuery: {
                fetchPolicy: 'cache-and-network'
            },
            query: {
                fetchPolicy: 'cache-and-network'
            }
        }
    });
};
export default apolloClient;
