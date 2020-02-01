import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NavBar from './components/NavBar';
import HomeScreen from './screens/HomeScreen';
import AddScreen from './screens/AddScreen';
import EditScreen from './screens/EditScreen';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <NavBar />
          <Switch>            
            <Route path="/add" component={AddScreen} />
            <Route path="/edit/:id" component={EditScreen} />
            <Route path="/" component={HomeScreen} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
