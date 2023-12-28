import React, { useState, useEffect, useMemo } from "react";
import Container from "react-bootstrap/Container";
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
import Avisos from './Avisos';

const Docentes = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
        //READ Action
        const fetchData = async () => {
            const response = await fetch("/api/read/docentes");
            const data = await response.json();
            setData(data.data);

        };

        fetchData();
  }, []);


  const validateDocente = (values) => {
    const errors = {};
    if (!values.ced_doc) {
      errors.Cédula = "La cédula es requerida";
    }else if (!values.ced_est.match(/^[0-9]{1,15}$/)) {
      errors.Cédula = "La cédula debe ser solo números";
    }
    return errors;
  };

  //Create action
  const handleCreateDocente = async ({ values, table }) => {
    const dataDoc = {
      ced_doc: values.ced_doc,
      nom_doc: values.nom_doc,
      ape_doc: values.ape_doc,
      tel_doc: values.tel_doc,
      dir_doc: values.dir_doc
    };
    const errors = validateDocente(dataDoc)
    if (Object.keys(errors).length > 0) {
      const message = Object.keys(errors).map((field) => {
        return `${field}: ${errors[field]}`;
      }).join(", "+ "\n");
      alert(message);
      return;
    }
    const response = await fetch('/api/create/docentes',{
      method: 'POST',
      body: JSON.stringify(dataDoc),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 200) {
      setShow(true);
      setTitle("Aviso");
      setContent("Guardado exitoso");
      const fetchData = async () => {
        const response = await fetch("/api/read/docentes");
        const data = await response.json();
        setData(data.data);

    };
    fetchData();
    } else {
      setShow(true);
      setTitle("Aviso");
      setContent("Error en el guardado");
    }
    table.setCreatingRow(null); //exit creating mode
  };


  //UPDATE action
  const handleSaveUser = async ({ values, table }) => {
    const dataDoc = {
      id_doc: values.id_doc,
      ced_doc: values.ced_doc,
      nom_doc: values.nom_doc,
      ape_doc: values.ape_doc,
      tel_doc: values.tel_doc,
      dir_doc: values.dir_doc
    };
    const errors = validateDocente(dataDoc)
    if (Object.keys(errors).length > 0) {
      const message = Object.keys(errors).map((field) => {
        return `${field}: ${errors[field]}`;
      }).join(", "+ "\n");
      alert(message);
      return;
    }
    const response = await fetch(`/api/update/docentes/${dataDoc.id_doc}`, {
      method: 'PATCH',
      body: JSON.stringify(dataDoc),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      setShow(true);
      setTitle("Aviso");
      setContent("Docente actualizado exitosamente");
    } else {
      setShow(true);
      setTitle("Aviso");
      setContent("Error al actualizar el docente");
    }
    table.setEditingRow(null); //exit editing mode
  };

  const openDeleteConfirmModal = async (row) => {
    const id = parseInt(row.original.id_doc);
    if (window.confirm('Estas seguro que deseas eliminar este registro?')) {
      const response = await fetch(`/api/delete/docentes/${id}`, {
        method: 'DELETE',
      });
      
      if (response.status === 200) {
        setShow(true);
        setTitle("Aviso");
        setContent("Docente eliminado exitosamente");
        const fetchData = async () => {
          const response = await fetch("/api/read/docentes");
          const data = await response.json();
          setData(data.data);

      };
      fetchData();
      } else {
        setShow(true);
        setTitle("Aviso");
        setContent("Error al eliminar el docente");
      }
    }
  };

  const closeAlert = () =>{
    setShow(false);
  }


  const columns = useMemo(
    () => [
      {
        accessorKey: "id_doc",
        header: "Id Docente",
        enableEditing: false,
        size: 10,
      },
      {
        accessorKey: "ced_doc",
        header: "Cédula",
        muiEditTextFieldProps: {
          type: 'text',
          required: true,
        },
      },
      {
        accessorKey: "nom_doc",
        header: "Nombres",
      },
      {
        accessorKey: "ape_doc",
        header: "Apellidos",
      },
      {
        accessorKey: "tel_doc",
        header: "Teléfono",
      },
      {
        accessorKey: "dir_doc",
        header: "Dirección",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    enableColumnActions: false,
    enableDensityToggle: false,
    enableDensityToggle: false,
    data: data,
    columns,
    initialState: { pagination: { pageSize: 25 },density: 'compact', columnVisibility: { id_doc: false } },
    createDisplayMode: 'modal', 
    editDisplayMode: 'modal', 
    enableEditing: true,
    positionActionsColumn: 'last',
    getRowId:  (row) => row.id,
    onCreatingRowSave: handleCreateDocente,
    onEditingRowSave: handleSaveUser,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h5" style={{textAlign:"center"}}>Crear Nuevo Docente</DialogTitle>
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
    //optionally customize modal content
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h4">Editar Docente</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
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
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
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
    <div style={{marginBottom:"50px"}}>DOCENTES</div>
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
</div>
  )
}

export default Docentes;