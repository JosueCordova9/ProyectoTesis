import React, { useState, useEffect, useMemo } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, ModalFooter } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ModalHeader } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import Avisos from './Avisos';


const Historia = () => {
  const [data, setData] = useState([]);
  const [estudiante, setEstudiante] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [observacion, setObservacion] = useState([]);
  const [alertId, setAlertId] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectEstudiantes, setSelectEstudiantes] = useState([]);

  useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/read/alertas");
            const data = await response.json();
            setData(data.data);
        };

        const fetchEstudiantes = async () => {
          const response = await fetch("/api/read/estudiantes");
          const data = await response.json();
          setSelectEstudiantes(data.data);
      };
      
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const user = decodedToken.id;
      setUsuario(user);
      fetchData();
      fetchEstudiantes();
  }, []);

  //ALERTAS

  const validateAlerta = (values) => {
    const errors = {};
    const estudiante = selectEstudiantes.find(estudiante => estudiante.ced_est === values.ced_est);
    if (!estudiante) {
        errors.Estudiante = "El estudiante con esa cédula no existe";
    }
    if (!values.ced_est) {
      errors.Cédula = "La cédula es requerida";
    }
    if (!values.des_ale) {
      errors.Descripcion = "La descripcion es requerida";
    }
    if (!values.nom_ale) {
      errors.Nombre = "El nombre es requerido";
    }
    if (!values.ape_ale) {
      errors.Apellido = "El apellido es requerido";
    }
    if (!values.car_ale) {
      errors.Cargo = "El cargo es requerido";
    }
    if (!values.con_ale) {
      errors.Contacto = "El contacto es requerido";
    }
    if (!values.fec_ale) {
      errors.Fecha = "La fecha es requerida";
    }
    return errors;
  };


//UPDATE action Alertas
const handleSaveAlerta = async ({ values, table }) => {
  console.log(values);
  const data = {
    id_ale: values.id_ale,
    ced_est: values.ced_est,
    des_ale: values.des_ale,
    nom_ale: values.nom_ale,
    ape_ale: values.ape_ale,
    car_ale: values.car_ale,
    con_ale: values.con_ale,
    fec_ale: values.fec_ale
  };
  const errors = validateAlerta(data)
  if (Object.keys(errors).length > 0) {
    const message = Object.keys(errors).map((field) => {
      return `${field}: ${errors[field]}`;
    }).join(", "+ "\n");
    alert(message);
    return;
  }
  const response = await fetch(`/api/update/alertas/${data.id_ale}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 200) {
      setShow(true);
      setTitle("Aviso");
      setContent("Alerta actualizado exitosamente");
    const fetchData = async () => {
      const response = await fetch("/api/read/alertas");
      const data = await response.json();
      setData(data.data);

  };
  fetchData();
  } else {
    setShow(true);
      setTitle("Aviso");
      setContent("Error al actualizar la alerta");
  }
  table.setEditingRow(null); //exit editing mode
};


//DELETE action Alertas
const openDeleteConfirmModal = async (row) => {
  const id = parseInt(row.original.id_ale);
  if (window.confirm('Estas seguro que deseas eliminar este registro?')) {
    const response = await fetch(`/api/delete/alertas/${id}`, {
      method: 'DELETE',
    });
    
    if (response.status === 200) {
      setShow(true);
      setTitle("Aviso");
      setContent("Alerta eliminada exitosamente");
      const fetchData = async () => {
        const response = await fetch("/api/read/alertas");
        const data = await response.json();
        setData(data.data);

    };
    fetchData();
    } else {
      setShow(true);
      setTitle("Aviso");
      setContent("Error al eliminar la alerta");
    }
  }
};

  const handleAbrirModal = async (row) => {
    const idAle = row.original.id_ale;
    setAlertId(idAle);
    const fetchObservacion = async () => {
      const response = await fetch(`/api/read/observacion/${idAle}`);
      const data = await response.json();
      if(response.status === 200){
        setObservacion(data.data);
      }
      else{
        setShow(true);
      setTitle("Aviso");
      setContent("Observacion no encontrada");
      }
    };
    fetchObservacion();
    const id = row.original.id_est;
    const fetchEstudiantes = async () => {
      const response = await fetch(`/api/read/estudiante/${id}`);
      const data = await response.json();
      if(response.status === 200){
        setEstudiante(data.data);
      }
      else{
        setShow(true);
      setTitle("Aviso");
      setContent("Estudiante no encontrado");
      }
  };
  
    fetchEstudiantes();
    setMostrarModal(true);
  };

  //OBSERVACIONES

  const validateObservacion = (values) => {
    const errors = {};
    if (!values.observacion) {
      errors.Observacion = "La observación es requerida";
    }
    return errors;
  };

  //Create action Observacion
  const handleCreateObservacion = async ({ values, table2 }) => {
    const idAle = alertId;
    const date = Date.now();
    const fecha = moment(date).format("YYYY-MM-DD");
    const data = {
      id_ale_per: idAle,
      observacion: values.observacion,
      fec_obs: fecha,
      id_usu: usuario,
    };
    const errors = validateObservacion(data)
    if (Object.keys(errors).length > 0) {
      const message = Object.keys(errors).map((field) => {
        return `${field}: ${errors[field]}`;
      }).join(", "+ "\n");
      alert(message);
      return;
    }
    const response = await fetch('/api/create/observaciones',{
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 200) {
      setShow(true);
      setTitle("Aviso");
      setContent("Guardado exitoso");
      const fetchObservacion = async () => {
        const response = await fetch(`/api/read/observacion/${idAle}`);
        const data = await response.json();
        if(response.status === 200){
          setObservacion(data.data);
        }
        else{
          setShow(true);
      setTitle("Aviso");
      setContent("Observacion no encontrada");
        }
      };
      fetchObservacion();
    } else {
      setShow(true);
      setTitle("Aviso");
      setContent("Error en el guardado");
    }
    table2.setCreatingRow(null); //exit creating mode
  };

    //UPDATE action Observacion
    const handleSaveObservacion = async ({ values, table2 }) => {
      console.log(values);
      const idAle = alertId;
      console.log(idAle);
      const date = Date.now();
      const fecha = moment(date).format("YYYY-MM-DD");
      const data = {
        id_obs: values.id_obs,
        id_ale_per: idAle,
        observacion: values.observacion,
        fec_obs: fecha,
        id_usu: usuario,
      };
      const errors = validateObservacion(data);
      console.log(data);
      if (Object.keys(errors).length > 0) {
        const message = Object.keys(errors).map((field) => {
          return `${field}: ${errors[field]}`;
        }).join(", "+ "\n");
        alert(message);
        return;
      }
      const response = await fetch(`/api/update/observaciones/${data.id_obs}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        setShow(true);
      setTitle("Aviso");
      setContent("Observación actualizada exitosamente");
        const fetchObservacion = async () => {
          const response = await fetch(`/api/read/observacion/${idAle}`);
          const data = await response.json();
          if(response.status === 200){
            setObservacion(data.data);
          }
          else{
            setShow(true);
      setTitle("Aviso");
      setContent("Observacion no encontrada");
          }
        };
        fetchObservacion();
      } else {
        setShow(true);
      setTitle("Aviso");
      setContent("Error al actualizar la observación");
      }
      table2.setEditingRow(null);
    };

    //DELETE action Observacion
    const openDeleteConfirmModalObservacion = async (row) => {
      const id = parseInt(row.original.id_obs);
      if (window.confirm('Estas seguro que deseas eliminar este registro?')) {
        const response = await fetch(`/api/delete/observaciones/${id}`, {
          method: 'DELETE',
        });
        
        if (response.status === 200) {
          setShow(true);
      setTitle("Aviso");
      setContent("Observación eliminado exitosamente");
          const fetchObservacion = async () => {
            const response = await fetch("/api/read/observaciones");
            const data = await response.json();
            setObservacion(data.data);
        };
        fetchObservacion();
        } else {
          setShow(true);
      setTitle("Aviso");
      setContent("Error al eliminar la observación");
        }
      }
    };

  const handleCerrarModal = () => {
    setMostrarModal(false);
  };

  const closeAlert = () =>{
    setShow(false);
  }


  const columns = useMemo(
    () => [
      {
        accessorKey: "id_ale",
        header: "Id Alerta",
        enableEditing: false,
        size: 10,
      },
      {
        accessorKey: "id_est",
        header: "Id Estudiante",
        enableEditing: false,
        muiEditTextFieldProps: {
          type: 'text',
        },
      },
      {
        accessorKey: "ced_est",
        header: "Estudiante",
        muiEditTextFieldProps: {
          type: 'text',
          required: true,
        },
        size: 40,
      },
      {
        accessorFn: (row) => `${row.estudiante.nom_est} ${row.estudiante.ape_est}`,
        id: 'estudiante',
        header: 'Estudiante',
        size: 130
      },
      {
        accessorKey: "des_ale",
        header: "Descripción",
        muiEditTextFieldProps: {
          type: 'text',
          required: true,
        },
      },
      {
        accessorKey: "nom_ale",
        header: "Nombre",
        muiEditTextFieldProps: {
          type: 'text',
          required: true,
        },
        size: 50,
      },
      {
        accessorKey: "ape_ale",
        header: "Apellido",
        muiEditTextFieldProps: {
          type: 'text',
          required: true,
        },
        size: 50,
      },
      {
        accessorKey: "car_ale",
        header: "Cargo",
        muiEditTextFieldProps: {
          type: 'text',
          required: true,
        },
        size: 50
      },
      {
        accessorKey: "con_ale",
        header: "Contacto",
        muiEditTextFieldProps: {
          type: 'text',
          required: true,
        },
        size: 50
      },
      {
        accessorKey: "fec_ale",
        header: "Fecha",
        muiEditTextFieldProps: {
          type: 'text',
          required: true,
        },
        size: 100
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    enableColumnActions: false,
    enableDensityToggle: false,
    data: data,
    columns,
    initialState: { pagination: { pageSize: 25 }, density: 'comfortable',
    columnVisibility: { id_ale: false, id_est: false}},
    createDisplayMode: 'modal', 
    editDisplayMode: 'modal', 
    enableEditing: true,
    positionActionsColumn: 'last',
    getRowId:  (row) => row.id,
    onEditingRowSave: handleSaveAlerta,
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h5" style={{textAlign:"center"}}>Editar Alerta</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="secondary" table={table} row={row} />
        </DialogActions>
      </>
    ),

    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Ver">
          <IconButton onClick={() => handleAbrirModal(row)}>
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Editar">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  });

  const columns2 = useMemo(
    () => [
      {
        accessorKey: "id_obs",
        header: "Id Observacion",
        enableEditing: false,
        size: 10,
      },
      {
        accessorKey: "id_ale_per",
        header: "Id Alerta",
        enableEditing: false,
        muiEditTextFieldProps: {
          type: 'text',
        },
        size: 30
      },
      {
        accessorKey: "observacion",
        header: "Observación",
        muiEditTextFieldProps: {
          type: 'text',
          required: true,
        },
        size: 350
      },
      {
        accessorKey: "fec_obs",
        header: "Fecha",
        enableEditing: false,
        size: 150
      },
      {
        accessorKey: "usuario.usuario",
        header: "Usuario",
        enableEditing: false,
        size: 100
      },
    ],
    []
  );

  const table2 = useMaterialReactTable({
    enableColumnActions: false,
    enableDensityToggle: false,
    data: observacion,
    columns: columns2,
    initialState: { pagination: { pageSize: 5 }, density: 'comfortable', 
    columnVisibility: {id_ale_per: false }},
    createDisplayMode: 'row', 
    editDisplayMode: 'row', 
    enableEditing: true,
    positionActionsColumn: 'last',
    getRowId:  (row) => row.id,
    onCreatingRowSave: handleCreateObservacion,
    onEditingRowSave: handleSaveObservacion,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h5" style={{textAlign:"center"}}>Crear Nueva Observación</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {internalEditComponents}
        </DialogContent>
        <DialogActions style={{justifyContent: "center"}} >
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h5" style={{textAlign:"center"}}>Editar Observación</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="secondary" table={table} row={row} />
        </DialogActions>
      </>
    ),

    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Editar">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar">
          <IconButton color="error" onClick={() => openDeleteConfirmModalObservacion(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="secondary"
        onClick={() => {
          table.setCreatingRow(true);
        }}
        style={{backgroundColor: 'E4E2E2', fontSize: "15"}}>
        Crear +
      </Button>
    ),
  });
  
  return(
  <div style={{
    display: "flex",
    height: "86%",
    flexDirection: "column",
  }}>
    <Container style={{ display: "flex", marginBottom: "10px", justifyContent: "center", alignItems: "center", fontSize: '50'}}>
    <div style={{marginBottom:"50px"}}>HISTORIAL DE ALERTAS</div>
    </Container>
    <Container style={{ borderRadius: "25px", border: "2px solid", borderColor:"E4E2E2", backgroundColor: 'E4E2E2', padding: "15px"}}>
    <MaterialReactTable table={table} />
    </Container>
    <Avisos 
        show={show}
        title={title}
        content={content}
        close={closeAlert}
      />
    {mostrarModal && (
      <Modal show={mostrarModal}  onHide={handleCerrarModal} size="xl"  centered>
        <ModalHeader style={{justifyContent: "center"}}><h3>Estudiante</h3></ModalHeader>
        <div style={{display: "flex", flexDirection: "column", height: "800px", paddingTop: '30px', paddingInline: "5em"}}>
          <Container style={{paddingBottom: '10px' }}>
            <Row>
              <Col>
              <div className="form-group">
              <label style={{ fontWeight: "bold" }}>Id Estudiante: </label>
              <input readOnly type="text" value={estudiante.id_est} className="form-control" placeholder="ID" style={{ textAlign: "center", justifyContent: "center", fontSize: '16px' }}/>
              </div>
              </Col>
              <Col>
              <div className="form-group">
              <label style={{ fontWeight: "bold" }}>Cédula: </label>
              <input readOnly type="text" value={estudiante.ced_est} className="form-control" placeholder="CEDULA" style={{ textAlign: "center", justifyContent: "center"}}/>
              </div>
              </Col>
              <Col>
              <div className="form-group" >
              <label style={{ fontWeight: "bold" }}>Nombres: </label>
              <input readOnly type="text" value={estudiante.nom_est +" "+ estudiante.ape_est} className="form-control" placeholder="NOMBRES" style={{ textAlign: "center", justifyContent: "center", fontSize: '16px'}}/>
              </div>
              </Col>
            </Row>
            <Row>
              <Col>
              <div className="form-group" >
              <label style={{ fontWeight: "bold" }}>Lugar Nacimiento: </label>
              <input readOnly type="text" value={estudiante.provincia?.nom_prov} className="form-control" placeholder="L/N" style={{ textAlign: "center", justifyContent: "center", fontSize: '16px' }}/>
              </div>
              </Col>
              <Col>
              <div className="form-group">
              <label style={{ fontWeight: "bold" }}>Etnia: </label>
              <input readOnly type="text" value={estudiante.etnia?.nom_etn} className="form-control" placeholder="ETNIA" style={{ textAlign: "center", justifyContent: "center" }}/>
              </div>
              </Col>
              <Col>
              <div className="form-group" >
              <label style={{ fontWeight: "bold" }}>Domicilio: </label>
              <input readOnly type="text" value={estudiante.dom_est} className="form-control" placeholder="DOMICILIO" style={{ textAlign: "center", justifyContent: "center", fontSize: '16px'}}/>
              </div>
              </Col>
              <Col>
              <div className="form-group">
              <label style={{ fontWeight: "bold" }}>Teléfono: </label>
              <input readOnly type="text" value={estudiante.tel_est} className="form-control" placeholder="TELEFONO" style={{ textAlign: "center", justifyContent: "center" }}/>
              </div>
              </Col>
            </Row>
            <Row>
              <Col>
              <div className="form-group" >
              <label style={{ fontWeight: "bold" }}>Correo Electrónico: </label>
              <input readOnly type="text" value={estudiante.cor_est} className="form-control" placeholder="CORREO" style={{ textAlign: "center", justifyContent: "center", fontSize: '16px'}}/>
              </div>
              </Col>
              <Col>
              <div className="form-group">
              <label style={{ fontWeight: "bold" }}>Paralelo: </label>
              <input readOnly type="text" value={estudiante.paralelo?.nom_par} className="form-control" placeholder="PARALELO" style={{ textAlign: "center", justifyContent: "center"}}/>
              </div>
              </Col>
            </Row>
            <div style={{ width: "100%", paddingTop: "50px", paddingBottom: "10px"}}>
              <div style={{border:"2px solid", borderColor:"E0001A" }} />
            </div>
          </Container>
          <Container>
            <ModalHeader style={{justifyContent: "center"}}><h3>Observación</h3></ModalHeader>
            <Container style={{maxHeight: "330px", overflowY: "scroll"}}>
              <MaterialReactTable table={table2} />
            </Container>
          </Container>
          <ModalFooter style={{display:"flex", justifyContent: "center", alignItems: "center"}}>
          <Button style={{backgroundColor: "E0001A", color:"black", marginTop: "30px" , paddingLeft: "15px",paddingRight: "15px"}}  onClick={handleCerrarModal}>Cerrar</Button>
          </ModalFooter>
        </div>
        <Avisos 
        show={show}
        title={title}
        content={content}
        close={closeAlert}
      />
        </Modal>
        
      )}
</div>
  )
  
};

export default Historia;