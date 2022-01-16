import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";

import Home from "./pages/Home";
import CityList from "./pages/CityList";
import Map from './pages/Map';

//import { Button } from "antd-mobile";
function App() {
  return (
    <Router>
      <div className="App">
        {/* <Button>登录</Button> */}
        {/* 默认路由匹配时，跳转到 /home 实现路由重定向到首页 */}
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        {/* 配置路由 */}
        {/* Home 组件是父路由的内容 */}
        <Route path="/home" component={Home} />
        <Route path="/cityList" component={CityList} />
        <Route path="/map" component={Map} />
      </div>
    </Router>
  );
}

export default App;
