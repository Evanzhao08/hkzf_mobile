import React, { Component } from "react";
import { Route } from "react-router-dom";


import {TabBar } from 'antd-mobile'

import "./index.css"
import Index from "../Index";
import HouseList from "../HouseList";
import Profile from "../Profile";
import News from "../News";

export default class Home extends Component {
    state = {
        selectedTab: this.props.location.pathname,
      };
     
  render() {

    return (
      <div className="home">
          <Route path="/home/index" component={Index} />
          <Route path="/home/news" component={News} />
          <Route path="/home/list" component={HouseList} />
          <Route path="/home/profile" component={Profile} />

         
          <TabBar
            unselectedTintColor="#888"
            tintColor="#21B97A"
            barTintColor="white"
            noRenderContent={true}
          >
            <TabBar.Item
              title="首页"
              key="Life"
              icon={ <i className = "iconfont icon-ind"/>}
              selectedIcon={<i className = "iconfont icon-ind"/>}
              selected={this.state.selectedTab === '/home/index'}
              badge={0}
              onPress={() => {
                this.setState({
                  selectedTab: '/home/index',
                });
                //路由切换
                this.props.history.push('/home/index')
              }}
              data-seed="logId"
            >
            </TabBar.Item>
            <TabBar.Item
              icon={<i className = "iconfont icon-findHouse"/>}
              selectedIcon={<i className = "iconfont icon-findHouse"/>}
              title="找房"
              key="Koubei"
              badge={0}
              selected={this.state.selectedTab === '/home/list'}
              onPress={() => {
                this.setState({
                  selectedTab: '/home/list',
                });
                 //路由切换
                 this.props.history.push('/home/list')
              }}
              data-seed="logId1">
           
            </TabBar.Item>
            <TabBar.Item
              icon={<i className = "iconfont icon-infom"/>}
              selectedIcon={<i className = "iconfont icon-infom"/>}
              title="资讯"
              key="Friend"
              selected={this.state.selectedTab === '/home/news'}
              onPress={() => {
                this.setState({
                  selectedTab: '/home/news',
                });
                 //路由切换
                 this.props.history.push('/home/news')
              }}
            >
              
            </TabBar.Item>
            <TabBar.Item
              icon={<i className = "iconfont icon-my"/>}
              selectedIcon={<i className = "iconfont icon-my"/>}
              title="我的"
              key="my"
              selected={this.state.selectedTab === '/home/profile'}
              onPress={() => {
                this.setState({
                  selectedTab: '/home/profile',
                });
                 //路由切换
                 this.props.history.push('/home/profile')
              }}
            >
              
            </TabBar.Item>
          </TabBar>
        </div>
    );
  }
}
