import React, {useState, useEffect} from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table"
import * as XLSX from 'xlsx';
import Form from "react-bootstrap/Form";
import file from "../../assets/images/file.png"
import FileSaver from "file-saver";


const Carga = () => {
    const [worksheet, setWorksheet] = useState([]);
    const [filas, setFilas] = useState([]);
    const [propiedades, setPropiedades] = useState([]);
    const [status, setStatus] = useState(false);
    const [selectEstudiantes, setSelectEstudiantes] = useState([]);

    useEffect(() => {
        const fetchEstudiantes = async () => {
            const response = await fetch("/api/read/estudiantes");
            const data = await response.json();
            setSelectEstudiantes(data.data);
        };
        
        fetchEstudiantes();
      }, []);


      const handleDownload = (event) => {
        const filePath = "../assets/alerta.xlsx";
      fetch(filePath)
        .then((response) => response.blob())
        .then((blob) => {
          FileSaver.saveAs(blob, "alerta"); // Cambiar el nombre si lo deseas
        });
      };
    

    const validateCedulas = (value) => {
        const errors = {};
        const estudiante = selectEstudiantes.find(estudiante => estudiante.ced_est === value);
        if (!estudiante) {
          errors.Estudiante = "El estudiante con esa cédula no existe";
        }
        return errors;
      };
    

    const leerFilas = (index) => {
        var hoja = worksheet[index];
        var filas = XLSX.utils.sheet_to_json(hoja.data, {raw: false},);
        setFilas(filas)
    }

    const leerPropiedades = (index) => {
        var hoja = worksheet[index];
        for(let key in hoja.data){
            let regEx = new RegExp("^\(\\w\)\(1\){1}$");
            if(regEx.test(key)){
                propiedades.push(hoja.data[key].v);
            }
        }
        setPropiedades(propiedades);
    }

    const leerExcel = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const excel = formData.get("alerta");
        const reader = new FileReader();

        reader.readAsArrayBuffer(excel);
        reader.onloadend = (e) => {
            var data = new Uint8Array(e.target.result)
            var excelRead = XLSX.read(data, {type: 'array'})
            const listWorksheet = [];
            excelRead.SheetNames.forEach((sheetName, index) =>{
                listWorksheet.push({
                    data: excelRead.Sheets[sheetName],
                    name: sheetName,
                    index,
                });
            });

            setWorksheet(listWorksheet);
            leerPropiedades(0);
            leerFilas(0);
            setStatus(true);
            };
    };

    const enviarAlertas = async () => {
        const fil = filas;
        let cedula = "";
        fil.forEach(element => {
            cedula = element.ced_est;
        });
        const errors = validateCedulas(cedula)
        if (Object.keys(errors).length > 0) {
        const message = Object.keys(errors).map((field) => {
        return `${field}: ${errors[field]}`;
        }).join(", ");
        alert(message);
        return;
        }
        let id = 0;
        const est = selectEstudiantes.find(estudiante => estudiante.ced_est === cedula);
        id = est.id_est;
        for (const fila of filas) {
          const data = {
            id_est: id,
            ced_est: fila.ced_est,
            des_ale: fila.des_ale,
            nom_ale: fila.nom_ale,
            ape_ale: fila.ape_ale,
            car_ale: fila.car_ale,
            con_ale: fila.con_ale,
            fec_ale: fila.fec_ale,
          };
          const response = await fetch(`/api/create/alertas`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (response.status === 200) {
            alert("Guardado exitoso");
            window.location.href = "/inicio/alertas/historia";
          }else {
            alert("Error en el guardado");
          }
        } 
      }
        return(
            <div style={{
                display: "flex",
                height: "86%",
                flexDirection: "column",
              }}>
                <Container style={{ display: "flex", marginBottom: "10px", justifyContent: "center", alignItems: "center", fontSize: '50'}}>
                <div style={{marginBottom:"50px"}}>CARGA DE ALERTAS</div>
                </Container>
                <Container style={{ borderRadius: "25px", border: "2px solid", borderColor:"E4E2E2", backgroundColor: 'E4E2E2', padding: "15px"}}>
                    <Form onSubmit={leerExcel}>
                        <input style={{marginBottom: "10px"}} type={"file"} className="form-control" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" name="alerta"/>
                        <section style={{display: "flex" ,flexDirection: "row", justifyContent: "space-between"}}>
                        <Button style={{justifyContent: "flex-start"}} type="submit" className="btn btn-secondary">Cargar</Button>
                        <div style={{color: "E0001A", justifyContent: "flex-end"}}>
                            IMPORTANTE: Descargar el formato del archivo
                            <Button onClick={handleDownload} style={{marginLeft: "5px", backgroundColor: "E0001A", borderColor: "E0001A", paddingBottom: "10px"}}> alerta.xlsx <img style={{height: "23px", width: "23px"}} src={file}></img></Button>
                        </div>
                        </section>
                    </Form>
                    <hr/>
                    {
                        status &&
                        <>
                        <Table>
                            <thead style={{borderRadius: "25px", border: "2px solid", borderColor:"E4E2E2", backgroundColor: 'E4E2E2'}}>
                                <tr>
                                    {propiedades.map((propiedad, index)=>{
                                            return(<th key={index}>
                                                {propiedad}
                                            </th>)
                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {filas.map((fila, index1) =>{
                                        return(
                                            <tr key={index1}>
                                                {propiedades.map((propiedad, index2)=>{
                                                        return <td>{fila[propiedad]}</td>
                                                    })
                                                }
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                        <div style={{display: "flex",  justifyContent: "center", alignItems: "center"}}>
                        <Button variant="secondary" onClick={enviarAlertas}>Enviar</Button>
                        </div>
                        </>
                    }
                </Container>
            </div>
        );
    }

export default Carga;


