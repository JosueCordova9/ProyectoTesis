import React, { useState, useEffect, useMemo } from "react";
import Container from "react-bootstrap/Container";
import { MaterialReactTable, useMaterialReactTable,} from "material-react-table";
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { jsPDF } from 'jspdf'; //or use your library of choice here
import autoTable from 'jspdf-autotable';

const Mensual = () => {
  const handleExportRows = (rows) => {
    const doc = new jsPDF('landscape');
    const tableHeaders = columns.map((c) => c.header);
    const tableData = rows.map((row) => {
      const visibleColumns = columns.filter((column) => column.show);
      return visibleColumns.map((column) => column.accessorFn ? column.accessorFn(row.original) : row.original[column.accessorKey]);
    });
    console.log(tableData);

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
      theme: 'striped'
    });

    doc.save('reporteMensual.pdf');
  };

  const [data, setData] = useState([]);

  useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/read/observaciones");
            const data = await response.json();
            setData(data.data);
        };
    fetchData();
  }, []);


  const columns = useMemo(
    () => [
      {
        accessorKey: "id_obs",
        header: "Id Observacion",
        size: 40,
        show: true,
      },
      {
        accessorFn: (row) => `${row.alerta.ced_est}`,
        id: 'alerta.ced_est',
        header: "cedula",
        size: 120,
        show: true,
      },
      {
        accessorFn: (row) => `${row.alerta.estudiante.nom_est} ${row.alerta.estudiante.ape_est}`,
        id: 'estudiante',
        header: 'Estudiante',
        size: 120,
        show: true,
      },
      {
        accessorFn: (row) => `${row.alerta.des_ale}`,
        id: "alerta.des_ale",
        header: "Descripción",
        size: 120,
        show: true,
      },
      {
        accessorFn: (row) => `${row.alerta.nom_ale} ${row.alerta.ape_ale}`,
        id: "notifica",
        header: "Notifica",
        size: 120,
        show: true,
      },
      {
        accessorFn: (row) => `${row.alerta.car_ale}`,
        id: "alerta.car_ale",
        header: "Cargo",
        size: 120,
        show: true,
      },
      {
        accessorKey: "observacion",
        header: "Observacion",
        size: 120,
        show: true,
      },
      {
        accessorFn: (row) => `${row.usuario.usuario}`,
        id: "usuario.usuario",
        header: "Usuario",
        size: 120,
        show: true,
      },
      {
        accessorFn: (row) => new Date(row.alerta.fec_ale),
        id: "fec_ale",
        header: "Fecha",
        filterVariant: 'date-range',
        Cell: ({ cell }) => cell.getValue().toLocaleDateString(), 
        size: 120,
        show: true,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    enableColumnActions: false,
    enableDensityToggle: false,
    initialState: { density: "comfortable", },
    data: data,
    columns,
    positionToolbarAlertBanner: 'bottom',
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: 'flex',
          gap: '16px',
          padding: '8px',
          flexWrap: 'wrap',
        }}
      >
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        >
          Exportar
        </Button>
      </Box>
    ),
  });
  return(
  <div style={{
    display: "flex",
    height: "86%",
    flexDirection: "column",
  }}>
    <Container style={{ display: "flex", marginBottom: "10px", justifyContent: "center", alignItems: "center", fontSize: '50'}}>
    <div style={{marginBottom:"50px"}}>REPORTE MENSUAL</div>
    </Container>
    <Container style={{ borderRadius: "25px", border: "2px solid", borderColor:"E4E2E2", backgroundColor: 'E4E2E2', padding: "15px"}}>
    <MaterialReactTable table={table} />
    </Container>
</div>
  )
  
};

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers';

const MensualWithLocalizationProvider = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Mensual />
  </LocalizationProvider>
);

export default MensualWithLocalizationProvider;