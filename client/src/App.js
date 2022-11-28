import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { ChakraProvider } from '@chakra-ui/react'
import Error from './components/Error'
import rootReducer from './reducers/rootReducer'
import logger from 'redux-logger'
import './App.css';
import Routes from './routes/index'
const store = createStore(rootReducer, applyMiddleware(logger))

function App() {
  return (
    <ChakraProvider>
      <Provider store={store}>
          <Routes/>
      </Provider>
    </ChakraProvider>
  );
}

export default App;
