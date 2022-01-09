import React from "react";

import { BrowserRouter as Router, Route, Routes,NavLink } from "react-router-dom";

import Home from "./pages/Home";
import CityList from "./pages/CityList";

//import { Button } from "antd-mobile";
function App() {
  return (
    <Router>
      <div className="App">
        {/* <Button>登录</Button> */}
      
          <Route path="/home" component={Home} />
          <Route path="/cityList" component={CityList } />
      
      </div>
    </Router>
  );
}

export default App;
