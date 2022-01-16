import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import "antd-mobile/dist/antd-mobile.css";
//导入字体图标库的样式
import "./assets/fonts/iconfont.css";

//react-virtualized样式
import 'react-virtualized/styles.css';

//自己写的样式放在组件库之后导入
import "./index.css";



ReactDOM.render(<App />, document.getElementById("root"));
