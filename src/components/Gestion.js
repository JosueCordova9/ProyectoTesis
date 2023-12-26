import React from "react";
import lectivo from '../../assets/images/lectivo.png';
import cursos from '../../assets/images/cursos.png';
import paralelos from '../../assets/images/paralelos.png';
import docentes from '../../assets/images/docentes.png';
import estudiantes from '../../assets/images/estudiantes.png';
import representantes from '../../assets/images/representantes.png';
import usuarios from '../../assets/images/usuarios.png';
import Container from "react-bootstrap/Container";
import { Image } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";


export default class Gestion extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          token: localStorage.getItem("token"),
          rol: false
        },
        this.lectivo = this.lectivo.bind(this);
        this.cursos = this.cursos.bind(this);
        this.paralelos = this.paralelos.bind(this);
        this.docentes = this.docentes.bind(this);
        this.estudiantes = this.estudiantes.bind(this);
        this.representantes = this.representantes.bind(this);
        this.usuarios = this.usuarios.bind(this);
    }

    componentDidMount(){
      const decodedToken = jwtDecode(this.state.token);
      if (!this.state.token) {
        window.location.href = "/";
        return;
      }
        const roles = parseInt(decodedToken.rol)
        if(roles === 1){
          this.setState({
            rol: true,
          })
        }
        else{
          this.setState({
            rol: false,
          })
        }
    }

    lectivo(){
        window.location.href = "/inicio/gestion/lectivo";
    }
      cursos(){
        window.location.href = "/inicio/gestion/cursos";
    }
      paralelos(){
        window.location.href = "/inicio/gestion/paralelos";
    }
    docentes(){
        window.location.href = "/inicio/gestion/docentes";
    }
      estudiantes(){
        window.location.href = "/inicio/gestion/estudiantes";
    }
      representantes(){
        window.location.href = "/inicio/gestion/representantes";
    }
      usuarios(){
        window.location.href = "/inicio/gestion/usuarios";
    }

    render(){
        return(
         <> { this.state.rol ? <>
            <div style={{
                display: "flex",
                // justifyContent: "center",
                // alignItems: 'center',
                height: "86%",
                flexDirection: "column",
              }}>
                <Container style={{ display: "flex", marginBottom: "0px", justifyContent: "center", alignItems: "center", fontSize: '50'}}>
                <div>GESTIÓN</div>
                </Container>

              <Container style={{ display: "flex", marginTop: "20px", marginBottom: "10px", justifyContent: "center", alignItems: "center"}}>  
                <div onClick={this.lectivo} href="/inicio/gestion/lectivo" style={{ width: "232", height: "276", backgroundColor: "E4E2E2", borderRadius: '25px', margin: '25px', display: "flex", alignItems: "center", justifyContent: "center", flexDirection: 'column'}}>
                  <Image style={{width: '163', height: '160', margin: '5px'}} src={lectivo}></Image>
                  <h5 style={{margin: '5px'}} >AÑO LECTIVO</h5>
                </div>
                <div onClick={this.cursos} href="/inicio/alertas" style={{ width: "232", height: "276", backgroundColor: "E4E2E2", borderRadius: '25px', margin: '25px', display: "flex", alignItems: "center", justifyContent: "center", flexDirection: 'column'}}>
                  <Image style={{width: '163', height: '160', margin: '5px'}} src={cursos}></Image>
                  <h5 style={{margin: '5px'}} >CURSOS</h5>
                </div>
                <div onClick={this.paralelos} href="/inicio/reportes" style={{width: "232", height: "276", backgroundColor: "E4E2E2", borderRadius: '25px', margin: '25px', display: "flex", alignItems: "center", justifyContent: "center", flexDirection: 'column'}}>
                  <Image style={{width: '163', height: '160', margin: '5px'}} src={paralelos}></Image>
                  <h5 style={{margin: '5px'}} >PARALELOS</h5>
                </div>
                <div onClick={this.docentes} href="/inicio/reportes" style={{ width: "232", height: "276", backgroundColor: "E4E2E2", borderRadius: '25px', margin: '25px', display: "flex", alignItems: "center", justifyContent: "center", flexDirection: 'column'}}>
                  <Image style={{width: '163', height: '160', margin: '5px'}} src={docentes}></Image>
                  <h5 style={{margin: '5px'}} >DOCENTES</h5>
                </div>
              </Container>

              <Container style={{ display: "flex", justifyContent: "center", marginBottom: "70px", alignItems: "center"}}>
              <div onClick={this.estudiantes} href="/inicio/reportes" style={{ width: "232", height: "276", backgroundColor: "E4E2E2", borderRadius: '25px', margin: '25px', display: "flex", alignItems: "center", justifyContent: "center", flexDirection: 'column'}}>
                  <Image style={{width: '163', height: '160', margin: '5px'}} src={estudiantes}></Image>
                  <h5 style={{margin: '5px'}} >ESTUDIANTES</h5>
                </div>
                <div onClick={this.representantes} href="/inicio/reportes" style={{ width: "232", height: "276", backgroundColor: "E4E2E2", borderRadius: '25px', margin: '25px', display: "flex", alignItems: "center", justifyContent: "center", flexDirection: 'column'}}>
                  <Image style={{width: '163', height: '160', margin: '5px'}} src={representantes}></Image>
                  <h5 style={{margin: '5px'}} >REPRESENTANTES</h5>
                </div>
                <div onClick={this.usuarios} href="/inicio/reportes" style={{  width: "232", height: "276", backgroundColor: "E4E2E2", borderRadius: '25px', margin: '25px', display: "flex", alignItems: "center", justifyContent: "center", flexDirection: 'column'}}>
                  <Image style={{width: '163', height: '160', margin: '5px'}} src={usuarios}></Image>
                  <h5 style={{margin: '5px'}} >USUARIOS</h5>
                </div>
              </Container> </div></>
              : 
              <>
              <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: 'center',
                height: "86%",
                flexDirection: "column",
              }}>
                <Container style={{ display: "flex", marginBottom: "100px", justifyContent: "center", alignItems: "center", fontSize: '50'}}>
                <div>GESTIÓN</div>
                </Container>

              <Container style={{ display: "flex",marginTop: "80px",marginBottom: "235px", justifyContent: "center", alignItems: "center"}}>
              <div onClick={this.docentes} href="/inicio/reportes" style={{ width: "232", height: "276", backgroundColor: "E4E2E2", borderRadius: '25px', margin: '25px', display: "flex", alignItems: "center", justifyContent: "center", flexDirection: 'column'}}>
                  <Image style={{width: '163', height: '160', margin: '5px'}} src={docentes}></Image>
                  <h5 style={{margin: '5px'}} >DOCENTES</h5>
                </div>
              <div onClick={this.estudiantes} href="/inicio/reportes" style={{ width: "232", height: "276", backgroundColor: "E4E2E2", borderRadius: '25px', margin: '25px', display: "flex", alignItems: "center", justifyContent: "center", flexDirection: 'column'}}>
                  <Image style={{width: '163', height: '160', margin: '5px'}} src={estudiantes}></Image>
                  <h5 style={{margin: '5px'}} >ESTUDIANTES</h5>
                </div>
                <div onClick={this.representantes} href="/inicio/reportes" style={{ width: "232", height: "276", backgroundColor: "E4E2E2", borderRadius: '25px', margin: '25px', display: "flex", alignItems: "center", justifyContent: "center", flexDirection: 'column'}}>
                  <Image style={{width: '163', height: '160', margin: '5px'}} src={representantes}></Image>
                  <h5 style={{margin: '5px'}} >REPRESENTANTES</h5>
                </div>
              </Container>
              </div>
              </>
            }</>
        );
    }
}