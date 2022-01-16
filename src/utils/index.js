
import $ from "jquery";
import axios from "axios";

export const getCurrentCity = () =>{
    const localCity = JSON.parse(localStorage.getItem('hkzf_city'))
    if (!localCity) {
        return new Promise((resolve,reject)=>{
            $.ajax({
                type: "GET",
                url: "https://apis.map.qq.com/ws/location/v1/ip?key=DUIBZ-S7SW6-XZHSP-ETD4Y-5INT5-4QBNI",
                async: false,
                data: {output: "jsonp"},
                dataType: "jsonp",
                success: async (data) => {
                   // getDefaultCity(data.result.ad_info.city);
                   try {
                      const res = await axios.get(`http://localhost:8080/area/info?name=`+data.result.ad_info.city);
                      if (res.status === 200 && res.data.status === 200) {
                          localStorage.setItem('hkzf_city',JSON.stringify(res.data.body))
                      } 
                      resolve(res.data.body)
                   } catch (error) {
                      reject(error)
                   }
                },
                error:  (xhr, errorType, error)=>{
                  $.alert(error);
                },
              });
        })
    }
    return Promise.resolve(localCity);
}