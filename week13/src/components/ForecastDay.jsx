import React from 'react'

function ForecastDay({data}) {
  console.log(data)
  return (
    <div className='border border-2'>
      <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" width="100px"/>
      <p>{data.dt_text}</p>
      <p>Min: {data.main.temp_min}</p>
      <p>Max: {data.main.temp_max}</p>
    </div>
  )
}

export default ForecastDay