// import { Provider } from 'react-redux'
// import { createStore, applyMiddleware } from 'redux'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from '../src/firebase/Auth'
import Error from './components/Error'
// import rootReducer from './reducers/rootReducer'
// import logger from 'redux-logger'
import './App.css';
import AllRoutes from './routes/index'
// const store = createStore(rootReducer, applyMiddleware(logger))

function App() {
  return (
    <AuthProvider>
      <ChakraProvider>
      {/* <Provider store={store}> */}
          <AllRoutes/>
      {/* </Provider> */}
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
