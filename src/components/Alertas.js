import React from "react";
import Container from "react-bootstrap/Container";
import carga from "../../assets/images/carga.png";
import historia from "../../assets/images/historia.png";
import { Image } from "react-bootstrap";


export default class Alertas extends React.Component{
    constructor(props){
        super(props);

        this.carga = this.carga.bind(this);
        this.historia = this.historia.bind(this);
    }

    carga(){
        window.location.href = "/inicio/alertas/carga";
    }

      historia(){
        window.location.href = "/inicio/alertas/historia";
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
                <div>ALERTAS</div>
                </Container>

              <Container style={{ display: "flex", marginTop: "80px", marginBottom: "235px", justifyContent: "center", alignItems: "center"}}>
                <div onClick={this.carga} href="/inicio/alertas/carga" style={{ width: "232", height: "276", backgroundColor: "E4E2E2", borderRadius: '25px', margin: '25px', display: "flex", alignItems: "center", justifyContent: "center", flexDirection: 'column'}}>
                  <Image style={{width: '163', height: '160', margin: '5px'}} src={carga}></Image>
                  <h5 style={{margin: '5px', textAlign: "center"}} >CARGA DE ALERTAS</h5>
                </div>
                <div onClick={this.historia} href="/inicio/alertas/historia" style={{ width: "232", height: "276", backgroundColor: "E4E2E2", borderRadius: '25px', margin: '25px', display: "flex", alignItems: "center", justifyContent: "center", flexDirection: 'column'}}>
                  <Image style={{width: '163', height: '160', margin: '5px'}} src={historia}></Image>
                  <h5 style={{margin: '5px', textAlign: "center"}} >HISTORIAL DE ALERTAS</h5>
                </div>
              </Container>
              </div>
        );
    }
}