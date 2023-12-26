import React from "react";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import gestion from '../../assets/images/gestion.png';
import alertas from '../../assets/images/alertas.png';
import reportes from '../../assets/images/reportes.png';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


export default class Inicio extends React.Component{
    constructor(props){
        super(props);
        this.gestionTooltip = (props) => (
          <Tooltip id="button-tooltip" {...props}>
            Manejo de la información de:<br/>
            Estudiantes,
            Docentes,
            Representantes
          </Tooltip>
        );
        this.alertasTooltip = (props) => (
          <Tooltip id="button-tooltip" {...props}>
            Carga e historial de: <br/>
            Alertas,
          </Tooltip>
        );
        this.reportesTooltip = (props) => (
          <Tooltip id="button-tooltip" {...props}>
            Reportes:
            Mensuales y por
            Curso/Paralelo
          </Tooltip>
        );
        this.gestion = this.gestion.bind(this);
        this.alertas = this.alertas.bind(this);
        this.reportes = this.reportes.bind(this);
    }

    gestion(){
      window.location.href = "/inicio/gestion";
  }
    alertas(){
      window.location.href = "/inicio/alertas";
  }
    reportes(){
      window.location.href = "/inicio/reportes";
  }


    render(){
        return(
            <div style={{
              display: "flex",
              justifyContent: "center",
              flexGrow: 1,
              alignItems: 'center',
              height: "86%"
            }}>
            <Container style={{ display: "flex", flexGrow: 1, justifyContent: "center", alignItems: "center", margin:'0 auto'}}>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={this.gestionTooltip}>
              <div onClick={this.gestion} href="/inicio/gestion" style={{ width: "232", height: "276", backgroundColor: "E4E2E2", borderRadius: '25px', margin: '25px', display: "flex", alignItems: "center", justifyContent: "center", flexDirection: 'column'}}>
                <Image style={{width: '163', height: '160', margin: '5px'}} src={gestion}></Image>
                <h4 style={{margin: '5px'}} >GESTIÓN</h4>
              </div>
              </OverlayTrigger>
              <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={this.alertasTooltip}>
              <div onClick={this.alertas} href="/inicio/alertas" style={{ width: "232", height: "276", backgroundColor: "E4E2E2", borderRadius: '25px', margin: '25px', display: "flex", alignItems: "center", justifyContent: "center", flexDirection: 'column'}}>
                <Image style={{width: '163', height: '160', margin: '5px'}} src={alertas}></Image>
                <h4 style={{margin: '5px'}} >ALERTAS</h4>
              </div>
              </OverlayTrigger>
              <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={this.reportesTooltip}>
              <div onClick={this.reportes} href="/inicio/reportes" style={{ width: "232", height: "276", backgroundColor: "E4E2E2", borderRadius: '25px', margin: '25px', display: "flex", alignItems: "center", justifyContent: "center", flexDirection: 'column'}}>
                <Image style={{width: '163', height: '160', margin: '5px'}} src={reportes}></Image>
                <h4 style={{margin: '5px'}} >REPORTES</h4>
              </div>
              </OverlayTrigger>
            </Container>
          </div>
        );
    }
}