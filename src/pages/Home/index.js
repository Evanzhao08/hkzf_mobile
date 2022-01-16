import React, { Component } from "react";
import { Route } from "react-router-dom";


import {TabBar } from 'antd-mobile'

import "./index.scss"
import Index from "../Index";
import HouseList from "../HouseList";
import Profile from "../Profile";
import News from "../News";

// TabBar 数据
const tabItems = [
  {
    title: '首页',
    icon: 'icon-ind',
    path: '/home'
  },
  {
    title: '找房',
    icon: 'icon-findHouse',
    path: '/home/list'
  },
  {
    title: '资讯',
    icon: 'icon-infom',
    path: '/home/news'
  },
  {
    title: '我的',
    icon: 'icon-my',
    path: '/home/profile'
  }
];

/* 点击首页导航菜单，导航到找房列表页面 */

export default class Home extends Component {
 
    state = {
       // 默认选中的TabBar菜单项
        selectedTab: this.props.location.pathname,
      };
  componentDidUpdate(prevProps){
    console.log(prevProps);
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState(()=>({selectedTab:this.props.location.pathname}))
    }
    
  }
  
  //渲染TabBar.Item
  renderTabBarItem(){
    return tabItems.map(item=>
      <TabBar.Item
              title={item.title}
              key={item.title}
              icon={ <i className = {`iconfont ${item.icon}`}/>}
              selectedIcon={<i className = {`iconfont ${item.icon}`}/>}
              selected={this.state.selectedTab === `${item.path}`}
              badge={0}
              onPress={() => {
                this.setState({
                  selectedTab: `${item.path}`,
                });
                //路由切换
                this.props.history.push(`${item.path}`)
              }}
              data-seed="logId"
            />)
  }
  render() {
    return (
      <div className="home">
          {/* exact精确匹配 */}
          <Route exact path="/home" component={Index} />
          <Route path="/home/news" component={News} />
          <Route path="/home/list" component={HouseList} />
          <Route path="/home/profile" component={Profile} />

         
          <TabBar
            unselectedTintColor="#888"
            tintColor="#21B97A"
            barTintColor="white"
            noRenderContent={true}
          >
            {this.renderTabBarItem()}
          </TabBar>
        </div>
    );
  }
}
