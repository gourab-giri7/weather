                                          // location
async function getLocation(city){
geo=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`)
console.log(geo)
geo = await geo.json()

return geo.results[0]
}
                                    // search
document.querySelector('#btn').addEventListener("click",async()=>{
city1=document.querySelector('#city')
   lat=await getLocation(city1.value)
   if(lat.latitude){
data=
   await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat.latitude}&longitude=${lat.longitude}&hourly=temperature_2m,relative_humidity_2m,wind_gusts_10m&daily=wind_speed_10m_max,temperature_2m_mean,precipitation_probability_mean,weather_code`)
   data=await data.json()
                                    // current status
   document.querySelector('#temperature').innerText=data.hourly.temperature_2m[h]
   document.querySelector('#humidity').innerText=data.hourly.relative_humidity_2m[h]
   document.querySelector('#wind').innerText=data.hourly.wind_gusts_10m[h]
   document.querySelector('#city_name').innerText=lat.name
                        // DAY Wise
      for(i=0;i<=6;i++){
               // weather_code
      if(data.daily.weather_code[i]==0)
         wcondition='sunny'
      else if(data.daily.weather_code[i]>=1 && data.daily.weather_code[i]<=3){
        wcondition='cloud'
        document.querySelector('#right').style.cssText=`background-image:url(Assects/Cloudy.png);`
      }
       else if(data.daily.weather_code[i]==45){
         wcondition='Fog'
         document.querySelector('#right').style.cssText=`background-image:url(Assects/Cloudy.png);`
       }
      else if(data.daily.weather_code[i]>=51 && data.daily.weather_code[i]<=61){
         wcondition='light_rain'
      }
      else if(data.daily.weather_code[i]>=61){
         wcondition='havy_rain'
         document.querySelector('#right').style.cssText=`background-image:url(Assects/rain.png);`
      }
      else if(data.daily.weather_code[i]>=95){
         document.querySelector('#right').style.cssText=`background-image:url(Assects/rain.png);`
         wcondition='thunder'
      }
      // console.log(wcondition)
      document.querySelector(`#weather${i}`).setAttribute("src",`Assects/${wcondition}.png`)
      if(i<=5){
      document.querySelector(`#probality${i+1}`).innerText=`${data.daily.precipitation_probability_mean[i+1]}% rain`
      document.querySelector(`#temperature${i+1}`).innerText=parseInt(data.daily.temperature_2m_mean[i+1])
      document.querySelector(`#tem${i+1}`).innerText=parseInt(data.hourly.temperature_2m[h+(i+1)]);
      }
   }
   console.log(data)
   }
   else
      alert("ghgh")

   
})
   const now=new Date()
   const h= now.getHours()
   let month= now.getMonth()+1<10?`0${now.getMonth()+1}`:now.getMonth()+1
   let day= now.getDate()<10?`0${now.getDate()}`:now.getDate()
                              // date
 document.querySelector('#date').innerText=`${day}/${month}/${now.getFullYear()}`
                        // time
   if(h>12)
      time=`${h-12}.00 pm`;
   else if(h==12)
      time=`${12}.00 pm`
   else if(h==0)
      time=`${12}.00 am`
   else
      time=`${h}.00 am`
                     // wish
   if(h>=5 && h<12){
      wish="Good Morning"
      document.querySelector('#right').style.cssText=`background-image:url(Assects/Morning.jpg);`
   }
   else if(h>=12 && h<16){
            wish="Good Afternoon"
         document.querySelector('#right').style.cssText=`background-image:url(Assects/Afternoon.png);`
   }
   else if(h>=16 && h<=18){
            wish="Good Evening"
            document.querySelector('#right').style.cssText=`background-image:url(Assects/Eveining.png);color:white;`
   }
   else{
      wish="Good Night"
        document.querySelector('#right').style.cssText=` background-size:cover background-image:url(Assects/Night.png);color:white;`
   }

   document.querySelector('#time').innerText=time
   document.querySelector('#wish').innerText=wish
                                                // hourly time
   for(let i=1;i<=6;i++){
   let g=h+i
   if(g>24)
      g-=24
   if(g>12)
      time1=`${g-12} pm`;
   else if(g==12)
      time1=`${12} pm`
   else if(g==0)
      time1=`${12} am`
   else
      time1=`${g} am`
    document.querySelector(`#hr${i}`).innerText=time1
   }
   
   
               // week
   let week=now.getDay()
   day=['Sun','Mon','Tue','Wed','Thur','Fri','Sat']
   j=week+1
   for(i=1;i<=6;i++){
      document.querySelector(`#next${i}`).innerText=day[j]
      j++
      if(j==7)
         j=0
   }