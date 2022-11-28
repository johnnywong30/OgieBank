import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { ChakraProvider } from '@chakra-ui/react'
import Error from './components/Error'
import rootReducer from './reducers/rootReducer'
import logger from 'redux-logger'
import './App.css';
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
const store = createStore(rootReducer, applyMiddleware(logger))

function App() {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <Router>
          <div className="App">
            <div className="App-body">
              <Routes>
                <Route path='/'/>
                <Route path="*" element={<Error error={'Error 404: Page not found'}/>}/>
              </Routes>
            </div>
          </div>
        </Router>
      </Provider>
    </ChakraProvider>
  );
}

export default App;
