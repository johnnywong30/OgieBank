import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from '../src/firebase/Auth'
import Error from './components/Error'
import store from './redux/store'
import './App.css';
import AllRoutes from './routes/index'

function App() {
  return (
    <AuthProvider>
      <ChakraProvider>
        <Provider store={store}>
          <AllRoutes/>
        </Provider>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
