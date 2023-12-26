import React from "react";
import ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import { jwtDecode } from "jwt-decode";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Gestion from "./components/Gestion";
import Alertas from "./components/Alertas";
import Reportes from "./components/Reportes";
import Ayuda from "./components/Ayuda";
import NavBar from "./components/NavBar";
import Inicio from "./components/Inicio";
import Lectivo from "./components/Lectivo";
import Cursos from "./components/Cursos";
import Paralelos from "./components/Paralelos";
import Docentes from "./components/Docentes";
import Estudiantes from "./components/Estudiantes";
import Representantes from "./components/Representantes";
import Usuarios from "./components/Usuarios";
import Carga from "./components/Carga";
import Historia from "./components/Historia";
import Mensual from "./components/Mensual";
import CursoParalelo from "./components/CursoParalelo";


const root = ReactDOM.createRoot(document.getElementById('root'));
let tokenExist = false;

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            token: localStorage.getItem("token"),
        }
    }

    componentDidMount(){
        if (!this.state.token) {
          window.location.href = "/";
        } else {
          try {
            const decodedToken = jwtDecode(this.state.token);
            if (decodedToken.exp > Date.now()) {
              window.location.href = "/inicio";
              tokenExist = true;
              console.log(tokenExist);
            } else {
                tokenExist = false;
              localStorage.removeItem("token");
              window.location.href = "/";
            }
          } catch (error) {
            tokenExist = false;
            localStorage.removeItem("token");
            window.location.href = "/";
          }
        }
      }
}
root.render(
  <div>
    <BrowserRouter>
    <Routes>
      <>{tokenExist ? <Inicio/> : <Route path="/" element={<Login/>}/>}</>
      <Route element={<NavBar/>}>
      <Route index path="/inicio" element={<Inicio/>}/>
      <Route path="/inicio/gestion" element={<Gestion/>}/>
      <Route path="/inicio/gestion/lectivo" element={<Lectivo/>}/>
      <Route path="/inicio/gestion/cursos" element={<Cursos/>}/>
      <Route path="/inicio/gestion/paralelos" element={<Paralelos/>}/>
      <Route path="/inicio/gestion/docentes" element={<Docentes/>}/>
      <Route path="/inicio/gestion/estudiantes" element={<Estudiantes/>}/>
      <Route path="/inicio/gestion/representantes" element={<Representantes/>}/>
      <Route path="/inicio/gestion/usuarios" element={<Usuarios/>}/>
      <Route path="/inicio/alertas" element={<Alertas/>}/>
      <Route path="/inicio/alertas/carga" element={<Carga/>}/>
      <Route path="/inicio/alertas/historia" element={<Historia/>}/>
      <Route path="/inicio/reportes" element={<Reportes/>}/>
      <Route path="/inicio/reportes/mensual" element={<Mensual/>}/>
      <Route path="/inicio/reportes/cursoparalelo" element={<CursoParalelo/>}/>
      <Route path="/inicio/ayuda" element={<Ayuda/>}/>
    </Route>
    </Routes>
    </BrowserRouter>
  </div>
);



export default App;




