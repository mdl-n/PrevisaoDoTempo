/* eslint-disable react/prop-types */
import './InformacoesTempo.css'

function InformacoesTempo({ dadosCidade }) {

    return (
        <div className="informacoes-container">
            <h2>{dadosCidade.name}, {dadosCidade.sys.country}</h2>
            <div className="info-temperatura">
                <img src={`http://openweathermap.org/img/wn/${dadosCidade.weather[0].icon}.png`} />
                <p>{Math.round(dadosCidade.main.temp)}°C</p>
            </div>
            <p className="descricao">{dadosCidade.weather[0].description}</p>
            
            <div className="info-detalhes">
                <p>Sensação térmica: {Math.round(dadosCidade.main.feels_like)}°c</p>
                <p>Umidade: {dadosCidade.main.humidity}%</p>
                <p>Velocidade do vento: {Math.round(dadosCidade.wind.speed *3.6)} km/h</p>
            </div>
        </div>
    )

}

export default InformacoesTempo