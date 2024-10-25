import { useState } from 'react'
import './App.css'
import axios from 'axios';
import InformacoesTempo from './components/informacoesTempo/informacoesTempo';
import Cidade5dias from './components/InfoCidade5Dias/Cidade5dias';

function App() {

  const [cidade, setCidade] = useState('');
  const [cidade5dias, setCidade5dias] = useState();
  const [dadosCidade, setDadosCidade] = useState();
  const [modal, setModal] =useState(false);

  async function procurarCidade(){

    try {
      console.log(cidade)
    const cidadeFormatada = encodeURIComponent(cidade)
    const API_KEY = "3b0998770f55ec57793c03c92e408c0b"
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cidadeFormatada}&appid=${API_KEY}&lang=pt_br&units=metric` 

    const URL5dias = `https://api.openweathermap.org/data/2.5/forecast?q=${cidadeFormatada}&appid=${API_KEY}&lang=pt_br&units=metric`
    const api5dias = await axios.get(URL5dias)
    setCidade5dias(api5dias.data);
  
    console.log('api5dias:',api5dias)
    const apiInfo = await axios.get(URL)
    setDadosCidade(apiInfo.data)
    console.log('data: ',apiInfo.data)
    } catch (error) {
      setModal(true)
    }

  }

  return (
      <div className='container'>
        <h1>Previsão do Tempo</h1>
        <input
        placeholder='Digite o nome da cidade'
        type='text'
        value={cidade}
        onChange={(event) => setCidade(event.target.value)}
        />
        <button onClick={procurarCidade}>Buscar</button>

        {dadosCidade &&(
          <InformacoesTempo dadosCidade={dadosCidade}/>
        )}
        {cidade5dias && (
          <Cidade5dias cfg={cidade5dias}/>
        )}
        {modal && (
  <div style={{
    position: 'fixed', 
    top: '0', 
    left: '0', 
    width: '100%', 
    height: '100%', 
    backgroundColor: 'rgba(0,0,0,0.5)', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center'
  }}>
    <div style={{
      backgroundColor: 'white', 
      padding: '20px', 
      borderRadius: '10px', 
      textAlign: 'center'
    }}>
      <p style={{marginTop: '20px', color:'black'}}>Cidade não encontrada!</p>
      <button onClick={() => setModal(false)} style={{marginTop: '20px', borderRadius:'20px'}}>
        Fechar
      </button>
    </div>
  </div>
)}
      </div>

  )
}

export default App
