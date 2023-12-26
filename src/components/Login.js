import React from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from 'react-bootstrap/Image';
import logo from '../../assets/images/ueb.png';
import Avisos from '../components/Avisos';
import Inicio from "../components/Inicio";
import {Route} from "react-router-dom";

let loginSuccessfull = false;

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      title: '',
      content: '',
      usuario: '',
      con_usu: '',
    };
    this.inputHandler = this.inputHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
  }

  handleSubmit (e) {

    e.preventDefault();
      const data = {
        usuario: usuario.value,
        con_usu: con_usu.value
      };
      fetch('/api/login',{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(res => res.json())
      .then((result)=>{
        if(result.token){
          localStorage.setItem('token', result.token)
          loginSuccessfull = true;
          window.location.href = "/inicio";
        }else{
          this.setState({
            show: true,
            title: "Alerta - Datos incorrectos",
            content: result.mensaje,
          });
          loginSuccessfull = false;
        }
      }).catch((error) => {
        console.error(error);
        this.setState({
          show: true,
          title: "Alerta - Error",
          content: result.mensaje,
        });
      });;
}

  closeAlert(){
    this.setState({
      show: false,
    });
  }

  inputHandler(event){
    if(event.target.name === "usuario"){
      this.setState({
        usuario: event.target.value,
      });
    }

    if(event.target.name === "con_usu"){
      this.setState({
        con_usu: event.target.value,
      });
    }
  }

 
  render() {
    return (
      <>{loginSuccessfull ? <Route element={ <Inicio/>}/> : <div>
        <Container style={{
          backgroundColor: 'black',
          float: 'left', 
          width: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh'
        }}>
          <Form>
            <h1 style={{color: "white"}}> UNIDAD EDUCATIVA BOLÍVAR </h1>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '50px'
            }}>
              <Image style={{height: "250", width: "200"}} src={logo}></Image>
            </div>
          </Form>

        </Container>
        <Container style={{
          float: 'right',
          width: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}>
          <div style={{ height:'682px', width: '540px',
          backgroundColor: 'E4E2E2',
          borderRadius: '25px', 
          justifyContent: 'center',
              alignItems: 'center'}}>
          <Form onSubmit={this.handleSubmit} style={{margin:'auto', paddingTop: '150px', paddingLeft:'80px', paddingRight:'80px' }}>
          <h2 style={{textAlign: "center"}}> DEPARTAMENTO DE CONSEJERÍA ESTUDIANTIL</h2>
          <div className="form-group" style={{paddingTop: '50px'}}>
            <input onChange={this.inputHandler} type="usuario" id="usuario" name="usuario" className="form-control" placeholder="USUARIO" style={{ textAlign: "center", justifyContent: "center", fontSize: '16px' }}/>
          </div>
          <div className="form-group" style={{paddingTop:'30px', paddingBottom: '30px'}}>
            <input onChange={this.inputHandler} type="password" id="con_usu" name="con_usu" className="form-control" placeholder="CONTRASEÑA" style={{ textAlign: "center", justifyContent: "center" }}/>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '10vh' }}>
          <Button style={{ padding: '10px 20px',color: 'black', backgroundColor:'E0001A' }} type="submit" className="btn btn-danger" >Ingresar</Button>
          </div>
          </Form>
          </div>
        </Container>
        <div style={{ display: 'flex', alignItems: "center", justifyContent: 'center'}} >
        <Avisos 
          show={this.state.show}
          title={this.state.title}
          content={this.state.content}
          close={this.closeAlert}
        />
        </div>
      </div>
      }</>
        
    );
  }
}

