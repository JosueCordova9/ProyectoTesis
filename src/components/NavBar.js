import React from "react";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import logo from '../../assets/images/ueb.png';
import { NavLink } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import { Outlet } from "react-router-dom";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';



export default class NavBar extends React.Component{
    constructor(props){
        super(props);
        this.inicioTooltip = (props) => (
          <Tooltip id="button-tooltip" {...props}>
            Página de inicio
          </Tooltip>
        );
        this.state = {
            token: localStorage.getItem("token"),
        };
        this.handleLogout  = this.handleLogout.bind(this);
        this.inicio = this.inicio.bind(this);
        this.ayuda = this.ayuda.bind(this);
    }

    inicio(){
        window.location.href = "/inicio";
    }

    ayuda(){
      window.location.href = "/inicio/ayuda";
    }

    handleLogout() {
        localStorage.removeItem("token");
        window.location.href = "/";
      };

      componentDidMount(){
        if (!this.state.token) {
          window.location.href = "/";
        }
      }

    render(){
        const decodedToken = jwtDecode(this.state.token);
        const usuario = decodedToken.usuario;
        return(
            <>
            <Container style={{ height:'125px', minWidth:'100vw', backgroundColor: 'black', display: 'flex',  alignItems: 'center'}}>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={this.inicioTooltip}>
            <Image onClick={this.inicio} href="/inicio" style={{height: "90", width: "70", marginLeft: '300px', marginRight: '15px' }} src={logo}></Image>
            </OverlayTrigger>
            <h1 style={{color:'white'}}>DECE</h1>
            <NavLink href="/inicio/gestion" style={{color:'white', position: 'absolute', right: 595}}>Gestión</NavLink>
            <NavLink href="/inicio/alertas" style={{color:'white',position: 'absolute', right: 505}}>Alertas</NavLink>
            <NavLink href="/inicio/reportes" style={{color:'white',position: 'absolute', right: 400}}>Reportes</NavLink>
            <NavDropdown style={{color: 'black', padding: "5px", position: 'absolute', right: 300, borderRadius: "25px", border: "1px solid", borderColor:"E0001A", backgroundColor:"E0001A"}} title={usuario} id="collapsible-nav-dropdown">
              <NavDropdown.Item onClick={this.ayuda} href="/inicio/ayuda">Ayuda</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={this.handleLogout} href="/">Salir</NavDropdown.Item>
            </NavDropdown>
            </Container>
            <Outlet></Outlet>
            </>
        );
    }
}