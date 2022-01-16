import React from "react";
import ReactDOM from "react-dom";



import "antd-mobile/dist/antd-mobile.css";
//导入字体图标库的样式
import "./assets/fonts/iconfont.css";

//react-virtualized样式
import 'react-virtualized/styles.css';

//自己写的样式放在组件库之后导入
import "./index.css";

// 注意：应该将 组件 的导入放在样式导入后面，从而避免样式覆盖的问题
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
