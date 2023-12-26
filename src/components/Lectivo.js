import React, { useState, useEffect, useMemo } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
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


const Lectivo = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/read/lectivos");
            const data = await response.json();
            setData(data.data);
        };
    fetchData();
  }, []);

  const validateLectivo = (values) => {
    const errors = {};
    if (!values.nom_año) {
      errors.Año = "El año es requerido";
    }
    return errors;
  };

  //Create action
  const handleCreateLectivos = async ({ values, table }) => {
    const data = {
      nom_año: values.nom_año,
    };
    const errors = validateLectivo(data)
    if (Object.keys(errors).length > 0) {
      const message = Object.keys(errors).map((field) => {
        return `${field}: ${errors[field]}`;
      }).join(", ");
      alert(message);
      return;
    }
    const response = await fetch('/api/create/lectivos',{
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 200) {
      alert("Guardado exitoso");
      const fetchData = async () => {
        const response = await fetch("/api/read/lectivos");
        const data = await response.json();
        setData(data.data);

    };
    fetchData();
    } else {
      alert("Error en el guardado");
    }
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveLectivo = async ({ values, table }) => {
    const data = {
      id_ano: values.id_ano,
      nom_año: values.nom_año,
    };
    const errors = validateLectivo(data)
    if (Object.keys(errors).length > 0) {
      const message = Object.keys(errors).map((field) => {
        return `${field}: ${errors[field]}`;
      }).join(", ");
      alert(message);
      return;
    }
    const response = await fetch(`/api/update/lectivos/${data.id_ano}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      alert("Lectivo actualizado exitosamente");
    } else {
      alert("Error al actualizar el lectivo");
    }
    table.setEditingRow(null); //exit editing mode
  };

  const openDeleteConfirmModal = async (row) => {
    const id = parseInt(row.original.id_ano);
    if (window.confirm('Estas seguro que deseas eliminar este registro?')) {
      const response = await fetch(`/api/delete/lectivos/${id}`, {
        method: 'DELETE',
      });
      
      if (response.status === 200) {
        alert("Lectivo eliminado exitosamente");
        const fetchData = async () => {
          const response = await fetch("/api/read/lectivos");
          const data = await response.json();
          setData(data.data);

      };
      fetchData();
      } else {
        alert("Error al eliminar el lectivo");
      }
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "id_ano",
        header: "Id Año",
        enableEditing: false,
        size: 10,
      },
      {
        accessorKey: "nom_año",
        header: "Año",
        muiEditTextFieldProps: {
          type: 'text',
          required: true,
        },
      },
    ],
    []
  );


  const table = useMaterialReactTable({
    enableColumnActions: false,
    data: data,
    columns,
    columns,
    createDisplayMode: 'modal', 
    editDisplayMode: 'modal', 
    enableEditing: true,
    positionActionsColumn: 'last',
    getRowId:  (row) => row.id,
    onCreatingRowSave: handleCreateLectivos,
    onEditingRowSave: handleSaveLectivo,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h5" style={{textAlign:"center"}}>Crear Nuevo Lectivo</DialogTitle>
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
        <DialogTitle variant="h5" style={{textAlign:"center"}}>Editar Lectivo</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {internalEditComponents}
        </DialogContent>
        <DialogActions style={{justifyContent: "center"}}>
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
    // justifyContent: "center",
    // alignItems: 'center',
    height: "86%",
    flexDirection: "column",
  }}>
    <Container style={{ display: "flex", marginBottom: "10px", justifyContent: "center", alignItems: "center", fontSize: '50'}}>
    <div style={{marginBottom:"50px"}}>AÑO LECTIVO</div>
    </Container>
    <Container style={{ borderRadius: "25px", border: "2px solid", borderColor:"E4E2E2", backgroundColor: 'E4E2E2', padding: "15px"}}>
    <MaterialReactTable table={table} />
    </Container>
</div>
  )
  
};

export default Lectivo;