import React, { Component } from 'react'
import './index.scss'




export default class Map extends Component {

    componentDidMount() {
     /*    // 初始化地图实例
        // 注意：在 react 脚手架中全局对象需要使用 window 来访问，否则，会造成 ESLint 校验错误
        const map = new window.BMap.Map('container')
        // 设置中心点坐标
        const point = new window.BMap.Point(116.404, 39.915)
        // 初始化地图
        map.centerAndZoom(point, 15) */
         //获取地理位置信息 
          
           //定义地图中心点坐标
           var center = new window.TMap.LatLng(34.1856,108.4549)
           //定义map变量，调用 TMap.Map() 构造函数创建地图
           new window.TMap.Map(document.getElementById('container'), {
               center: center,//设置地图中心点坐标
               zoom: 10,   //设置地图缩放级别
               pitch: 43.5,  //设置俯仰角
               rotation: 45    //设置地图旋转角度
           });

           
      }

    render() {
        return (
            <div className='map'>
             <div id="container" />
            </div>
        )
    }
}
