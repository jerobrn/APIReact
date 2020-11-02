import logo from './logo.svg';
import React from 'react';
import './App.css';

const axios = require('axios')

class App extends React.Component {
 //constructor
constructor(props){
  super(props);
  this.state = {flag:false, banda:'', tema:''};
  this.handlerBanda.bind(this);
  this.handlerTema.bind(this);
}

//Handler input banda
handlerBanda(event){
  console.log(event.target.value);
  this.setState({banda: event.target.value})
}

//Handler input Tema
handlerTema(event){
  console.log(event.target.value);
 // var tema = event.target.value;
  this.setState({tema: event.target.value})
  }

 
// Handler de Boton
handlerBtn(){
var banda = this.state.banda;
var tema = this.state.tema;
var parametros= banda+"/"+tema; 


var url= "https://api.lyrics.ovh/v1/";

axios.get (url+ parametros )
.then(response=>{
console.log(response.data);
this.setState( () => {return {flag:true,data: response.data, banda: banda , tema: tema }});

})
.catch(error => {
console.log(error);

});

}



 render(){

var resultados;
if(this.state.flag){
resultados = (
<div>
<h1>{this.state.banda}</h1>
<h2>{this.state.tema}</h2>
  <p className="c">
  {this.state.data.lyrics}

  </p>
</div>

)

}else{
resultados = <div></div> 
}

         return (
          <div>

            <div className='principal'>
              <h2>Busca la Letra de tu Tema</h2>
              
              <input onChange={this.handlerBanda.bind(this)} type="text" placeholder="Nombre de la banda" />
         
              <input onChange={this.handlerTema.bind(this)} type="text" placeholder="Nombre de la canción" />
              <button className='button' onClick={this.handlerBtn.bind(this)}>Obtener Letra</button> 
            </div>
            {resultados}

          </div>
             );
          }


}


export default App;
