import React from "react";
import Container from "react-bootstrap/Container";
import estudiante from "../../assets/images/estudiante.png";
import mensual from "../../assets/images/mensual.png";
import cursoparalelo from "../../assets/images/cursoparalelo.png";
import { Image } from "react-bootstrap";


export default class Reportes extends React.Component{
    constructor(props){
        super(props);

        this.estudiante = this.estudiante.bind(this);
        this.mensual = this.mensual.bind(this);
        this.cursoparalelo = this.cursoparalelo.bind(this);
    }

    estudiante(){
        window.location.href = "/inicio/reportes/estudiante";
    }

      mensual(){
        window.location.href = "/inicio/reportes/mensual";
    }
      cursoparalelo(){
        window.location.href = "/inicio/reportes/cursoparalelo";
    }

    render(){
        return(
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: 'center',
                height: "86%",
                flexDirection: "column",
              }}>
                <Container style={{ display: "flex", marginBottom: "100px", justifyContent: "center", alignItems: "center", fontSize: '50'}}>
                <div>REPORTES</div>
                </Container>

              <Container style={{ display: "flex", marginTop: "80px", marginBottom: "235px", justifyContent: "center", alignItems: "center"}}>
                <div onClick={this.mensual} href="/inicio/reportes/mensual" style={{ width: "232", height: "276", backgroundColor: "E4E2E2", borderRadius: '25px', margin: '25px', display: "flex", alignItems: "center", justifyContent: "center", flexDirection: 'column'}}>
                  <Image style={{width: '163', height: '160', margin: '5px'}} src={mensual}></Image>
                  <h5 style={{margin: '5px', textAlign: "center"}} >MENSUAL</h5>
                </div>
                <div onClick={this.cursoparalelo} href="/inicio/reportes/mensual" style={{ width: "232", height: "276", backgroundColor: "E4E2E2", borderRadius: '25px', margin: '25px', display: "flex", alignItems: "center", justifyContent: "center", flexDirection: 'column'}}>
                  <Image style={{width: '163', height: '160', margin: '5px'}} src={cursoparalelo}></Image>
                  <h5 style={{margin: '5px', textAlign: "center"}} >CURSO/PARALELO</h5>
                </div>
              </Container>
              </div>
        );
    }
}