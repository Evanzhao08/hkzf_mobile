import React, { Component } from "react";
import {AutoSizer, List} from 'react-virtualized';
import { NavBar, Toast } from "antd-mobile";

import axios from "axios";
import {getCurrentCity} from '../../utils'
import "./index.scss";





//数据格式化方法
const formatCityData= (list)=>{
    const cityList= {}
  
    list.forEach(item =>{
        const first = item.short.substr(0,1)
        if (cityList[first]) {
            cityList[first].push(item)
           // cityList[first] = [...cityList[first],item]
        } else {
            cityList[first]=[item]
        }
    });
    //获取索引
    const cityIndex =  Object.keys(cityList).sort();
    return{
        cityList,
        cityIndex
    }
}

//封装处理字母索引
const formatCityIndex = (letter)=>{
  switch (letter) {
    case '#':
      return '当前定位'
    case 'hot':
      return '热门城市'
    default:
      return letter.toUpperCase()
  }
} 
//索引的高度
const TITLE_HEIGHT = 36
//每个城市高度 
const NAME_HEIGHT = 50

export default class CityList extends Component {
  state = {
    cityList: {},
    cityIndex: [],
    activeIndex:0,
  };
/* 
  1 将获取到的 cityList 和 cityIndex  添加为组件的状态数据。
  2 修改 List 组件的 rowCount 为 cityIndex 的长度。
  3 将 rowRenderer 函数，添加到组件中，以便在函数中获取到状态数据 cityList 和 cityIndex。
  4 修改 List 组件的 rowRenderer 为组件中的 rowRenderer 方法。
  5 修改 rowRenderer 方法中渲染的每行结构和样式。
  6 修改 List 组件的 rowHeight 为函数，动态计算每一行的高度（因为每一行高度都不相同）。
  
  <div key={key} style={style} className="city">
    <div className="title">S</div>
    <div className="name">上海</div>
  </div>
*/
  rowRenderer=({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  })=> {
    const{ cityIndex,cityList} = this.state
    const letter = cityIndex[index]
    return (
      <div key={key} style={style} className="city">
        {/* {this.cityList[index]} */}
        <div className="title">{formatCityIndex(letter)}</div>
        {/* <div className="name">上海</div> */}
        {
          cityList[letter].map(item=><div className="name" key={item.value}>{item.label}</div>)
        }
      </div>
    );
  }
  getRowHeight=({index})=>{
   /*  const TITLE_HEIGHT = 36
    const NAME_HEIGHT = 50
     索引标题高度+城市数量*城市名称高度
    TITLE_HEIGHT + cityList[cityIndex[index]].length * NAME_HEIGHT */

    const{ cityIndex,cityList} = this.state
    return TITLE_HEIGHT + cityList[cityIndex[index]].length * NAME_HEIGHT
  }

  async getCityLists() {
    const res = await axios.get("http://localhost:8080/area/city?level=1");
    if (res.status === 200 && res.data.status === 200) {
      const { cityList, cityIndex } = formatCityData(res.data.body);
      const hotRes = await axios.get("http://localhost:8080/area/hot");
      cityList["hot"] = hotRes.data.body;
      cityIndex.unshift("hot");
      const curCity = await getCurrentCity();
      cityList["#"] = [curCity];
      cityIndex.unshift("#");
      console.log(cityList, cityIndex);
      console.log(curCity);
      this.setState(() => ({
        cityList, 
        cityIndex 
      }));
    } else {
      Toast.fail("城市列表failed !!!", 3);
    }
  }

  async componentDidMount() {
    await this.getCityLists();
    //调用 measureAllRows 提前计算高度 精确跳转
    this.cityListComponent.measureAllRows()
  }

  renderCityIndex(){
    const {cityIndex,activeIndex} = this.state
    return cityIndex.map((item,index)=>
          <li className="city-index-item" key={item} onClick={()=>{
            console.log(index)
            this.cityListComponent.scrollToRow(index)
          } }>
            <span className={activeIndex === index? "index-active":""}>{item ==='hot'?'热':item.toUpperCase()}</span>
          </li>
    )
  }
/* 
    1 给索引列表项绑定点击事件。
    2 在点击事件中，通过 index 获取到当前项索引号。
    3 调用 List 组件的 scrollToRow 方法，让 List 组件滚动到指定行。

    3.1 在 constructor 中，调用 React.createRef() 创建 ref 对象。
    3.2 将创建好的 ref 对象，添加为 List 组件的 ref 属性。
    3.3 通过 ref 的 current 属性，获取到组件实例，再调用组件的 scrollToRow 方法。

    4 设置 List 组件的 scrollToAlignment 配置项值为 start，保证被点击行出现在页面顶部。
    5 对于点击索引无法正确定位的问题，调用 List 组件的 measureAllRows 方法，提前计算高度来解决。
  */
  onRowsRendered=({startIndex})=>{
    console.log(startIndex);
    if (this.state.activeIndex !== startIndex) {
      this.setState({
        activeIndex:startIndex
      })
    }
  }

  render() {
    return (
      <div className="cityList">
        {/*  顶部导航栏 */}
        <NavBar
          mode="light"
          icon={<i className="iconfont icon-back" />}
          onLeftClick={() => this.props.history.go("-1")}
        >
          城市选择
        </NavBar>
        <AutoSizer>
          {({ height, width }) => (
            <List
              ref={c => this.cityListComponent = c }
              height={height}
              rowCount={this.state.cityIndex.length}
              rowHeight={this.getRowHeight}
              rowRenderer={this.rowRenderer}
              onRowsRendered={this.onRowsRendered}
              scrollToAlignment="start"
              width={width}
            />
          )}
        </AutoSizer>
         {/* 右侧索引列表 */}
        {/* 
          1 封装 renderCityIndex 方法，用来渲染城市索引列表。
          2 在方法中，获取到索引数组 cityIndex ，遍历 cityIndex ，渲染索引列表。
          3 将索引 hot 替换为 热。
          4 在 state 中添加状态 activeIndex ，指定当前高亮的索引。
          5 在遍历 cityIndex 时，添加当前字母索引是否高亮的判断条件。
        */}
        <ul className="city-index">
          {this.renderCityIndex()}
        </ul>
      </div>
    );
  }
}
