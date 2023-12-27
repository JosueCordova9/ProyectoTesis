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

const Usuarios = () => {
  const [data, setData] = useState([]);
  const [selectRoles, setSelectRoles] = useState([]);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/read/usuarios");
            const data = await response.json();
            setData(data.data);

        };

        const fetchRoles = async () => {
          const response = await fetch("/api/read/roles");
          const data = await response.json();
          setSelectRoles(data.data);

      };
    fetchData();
    fetchRoles();
  }, []);

  const validateUsuario = (values) => {
    const errors = {};
    if (!values.usuario) {
      errors.Usuario = "El usuario es requerido";
    }
    if (!values.nom_usu) {
      errors.Nombre = "El nombre es requerido";
    }
    if (!values.ape_usu) {
      errors.Apellido = "El apellido es requerido";
    }
    if (!values.con_usu) {
      errors.Contraseña = "La contraseña es requerida";
    }
    if (!values.id_rol_per) {
      errors.Rol = "El rol es requerido";
    }
    return errors;
  };

  //Create action
  const handleCreateUsuario = async ({ values, table }) => {
    const nomRol = values['role.nom_rol'] ? values['role.nom_rol'] : undefined;
    const rol = values['role.nom_rol'] ? selectRoles.find(role => role.nom_rol === nomRol): undefined;
    const idRol = values['role.nom_rol'] ? rol['id_rol']: undefined;
    const data = {
      usuario: values.usuario,
      nom_usu: values.nom_usu,
      ape_usu: values.ape_usu,
      con_usu: values.con_usu,
      id_rol_per: idRol
    };
    const errors = validateUsuario(data)
    if (Object.keys(errors).length > 0) {
      const message = Object.keys(errors).map((field) => {
        return `${field}: ${errors[field]}`;
      }).join(", " + "\n");
        alert(message);
      return;
    }
    const response = await fetch('/api/create/usuarios',{
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
      const fetchData = async () => {
        const response = await fetch("/api/read/usuarios");
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
  const handleSaveUsuario = async ({ values, table }) => {
    const nomRol = values['role.nom_rol'] ? values['role.nom_rol'] : undefined;
    const rol = values['role.nom_rol'] ? selectRoles.find(role => role.nom_rol === nomRol): undefined;
    const idRol = values['role.nom_rol'] ? rol['id_rol']: undefined;
    const data = {
      id_usu: values.id_usu,
      usuario: values.usuario,
      nom_usu: values.nom_usu,
      ape_usu: values.ape_usu,
      con_usu: values.con_usu,
      id_rol_per: idRol
    };
    const errors = validateUsuario(data)
    if (Object.keys(errors).length > 0) {
      const message = Object.keys(errors).map((field) => {
        return `${field}: ${errors[field]}`;
      }).join(", "+ "\n");
      alert(message);
      return;
    }
    const response = await fetch(`/api/update/usuarios/${data.id_usu}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      setShow(true);
      setTitle("Aviso");
      setContent("Usuario actualizado exitosamente");
    } else {
      setShow(true);
      setTitle("Aviso");
      setContent("Error al actualizar el usuario");
    }
    table.setEditingRow(null); //exit editing mode
  };

  const openDeleteConfirmModal = async (row) => {
    const id = parseInt(row.original.id_usu);
    if (window.confirm('Estas seguro que deseas eliminar este registro?')) {
      const response = await fetch(`/api/delete/usuarios/${id}`, {
        method: 'DELETE',
      });
      
      if (response.status === 200) {
        setShow(true);
        setTitle("Aviso");
        setContent("Usuario eliminado exitosamente");
        const fetchData = async () => {
          const response = await fetch("/api/read/usuarios");
          const data = await response.json();
          setData(data.data);

      };
      fetchData();
      } else {
        setShow(true);
        setTitle("Aviso");
        setContent("Error al eliminar el usuario");
      }
    }
  };

  const closeAlert = () =>{
    setShow(false);
  }


  const columns = useMemo(
    () => [
      {
        accessorKey: "id_usu",
        header: "Id Usuario",
        enableEditing: false,
        size: 10,
      },
      {
        accessorKey: "usuario",
        header: "Usuario",
        muiEditTextFieldProps: {
          type: 'text',
          required: true,
        },
      },
      {
        accessorKey: "nom_usu",
        header: "Nombre",
        muiEditTextFieldProps: {
          type: 'text',
          required: true,
        },
      },
      {
        accessorKey: "ape_usu",
        header: "Apellido",
        muiEditTextFieldProps: {
          type: 'text',
          required: true,
        },
      },
      {
        accessorKey: "con_usu",
        header: "Contraseña",
        muiEditTextFieldProps: {
          type: 'text',
          required: true,
        },
      },
      {
        accessorKey: "role.nom_rol",
        header: "Rol",
        editVariant: 'select',
        editSelectOptions: selectRoles.map((role) => role.nom_rol),
        muiEditTextFieldProps: {
          type: 'text',
          required: true,
        },
      },
    ],
    [selectRoles]
  );

  const table = useMaterialReactTable({
    enableColumnActions: false,
    data: data,
    columns,
    createDisplayMode: 'modal', 
    editDisplayMode: 'modal', 
    enableEditing: true,
    positionActionsColumn: 'last',
    getRowId:  (row) => row.id,
    onCreatingRowSave: handleCreateUsuario,
    onEditingRowSave: handleSaveUsuario,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h5" style={{textAlign:"center"}}>Crear Nuevo Usuario</DialogTitle>
        <DialogContent 
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          {internalEditComponents}
        </DialogContent>
        <DialogActions style={{justifyContent: "center"}} >
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>    
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h5" style={{textAlign:"center"}}>Editar Usuario</DialogTitle>
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
    height: "86%",
    flexDirection: "column",
  }}>
    <Container style={{ display: "flex", marginBottom: "10px", justifyContent: "center", alignItems: "center", fontSize: '50'}}>
    <div style={{marginBottom:"50px"}}>USUARIOS</div>
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
  
};

export default Usuarios;