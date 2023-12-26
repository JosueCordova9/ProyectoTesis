import React, { useState, useEffect, useMemo } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { MaterialReactTable, useMaterialReactTable,} from "material-react-table";

const Ayuda = () => {

  useEffect(() => {

  }, []);

  return(
  <div style={{
    display: "flex",
    height: "86%",
    flexDirection: "column",
  }}>
    <Container style={{ display: "flex", marginBottom: "10px", justifyContent: "center", alignItems: "center", fontSize: '50'}}>
    <div style={{marginBottom:"50px"}}>AYUDA</div>
    </Container>
</div>
  )
  
};

export default Ayuda;