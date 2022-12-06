import './App.css';
import AllRoutes from './routes/index'
import { BrowserRouter as Router } from 'react-router-dom'
import Nav from './components/Nav';
import { VStack } from '@chakra-ui/react';

const App = () => {
  return (
    <Router>
      <VStack>
        <Nav />
        <AllRoutes />
      </VStack>
    </Router>
  )
}

export default App;
