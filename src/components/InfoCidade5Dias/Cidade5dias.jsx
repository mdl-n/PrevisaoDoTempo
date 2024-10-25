/* eslint-disable react/prop-types */
import './Cidade5dias.css'

function Cidade5dias({ cfg }) {

    let diasForecast = {}

    for (let forecast of cfg.list) {
        if(forecast.dt_txt.endsWith("12:00:00")){
            const date = new Date(forecast.dt * 1000).toLocaleDateString().slice(1, 6)

            if (!diasForecast[date]) {
                diasForecast[date] = forecast
            }
        }
    }

    const proximos5dias = Object.values(diasForecast)

    function converterData(date){
        const novaData = new Date(date.dt *1000).toLocaleDateString('pt-BR', {weekday:'long', day:'2-digit'})
        return novaData
    }

    return (
        
        <div className='containermain'>
            <p className='titulo2container'>Previsão dos próximos 5 dias</p>
        <div className='cincodiascontainer'>
            {proximos5dias.map(x => (
                <div key={x.dt} className='arraycontainer'>
                    <p>{converterData(x)}</p>
                    <img src={`http://openweathermap.org/img/wn/${x.weather[0].icon}.png`} />
                    <p className='txtDescription'>{x.weather[0].description}</p>
                    <p>{Math.round(x.main.temp)}ºC</p>
                </div>
            ))}
        </div>
        </div>


    )
}

export default Cidade5dias