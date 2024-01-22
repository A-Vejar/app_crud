import { Card, ListGroup, Stack } from "react-bootstrap";
import { Usuarios } from "../api/usuarios.api";
import { useQuery } from "@tanstack/react-query";
import { Datatable } from "../components/datatable/Datatable";
import { useState } from "react";
import { ColDef, ICellRendererParams, ValueFormatterParams } from "ag-grid-community";
import { Usuario } from "../ts/api.interfaces";
import { DateTime } from "luxon";
import { BotonAgregarUsuario } from "./buttons/BotonAgregarUsuario";
import { ModalActivo } from "../ts/global.interfaces";
import { alertaConfirmacion } from "../services/alertas.service";
import { CustomModal } from "../components/bootstrap/CustomModal";
import { BotonEditarUsuario } from "./buttons/BotonEditarUsuario";
import { BotonEliminarUsuario } from "./buttons/BotonEliminarUsuario";

export const Crud: React.FC = () => {
  
  // Load data
  const { data: dataUsuarios, refetch, isFetching } = useQuery({
    queryKey: ["Usuarios", "obtenerUsuarios"],
    queryFn: () => Usuarios.obtenerUsuarios(),
    select: ({ data }) => data
  });

  // States
  const [modalActivo, setModalActivo] = useState<ModalActivo | null>(null);
  const [estaFormularioModalEnUso, setEstaFormularioModalEnUso] = useState(false);
  
  // Datatable's Columns
  const [columnDefs] = useState<ColDef<Usuario>[]>([
    {
      headerName: "Id",
      field: "id",
      flex: 0.1
    },
    {
      headerName: "Nombre",
      field: "nombre",
      flex: 0.25,
      cellRenderer: ({data: usuario}: ICellRendererParams<Pick<Usuario, 'nombre' | 'apellido_paterno' | 'apellido_materno'>>) =>
        usuario ?
        <div className="d-flex justify-content-between align-items-center">
          { `${ usuario.nombre } ${ usuario.apellido_paterno } ${ usuario.apellido_materno }` }
        </div> : null
    },
    {
      headerName: "Fecha Nac.",
      field: "fecha_nacimiento",
      flex: 0.1,
      valueFormatter: (params: ValueFormatterParams) => params?.value ? DateTime.fromISO(params?.value).toFormat("dd/MM/yyyy") : ""
    },
    {
      headerName: "Correo",
      field: "correo",
      flex: 0.1
    },
    {
      headerName: "Telefono",
      field: "telefono",
      flex: 0.1
    },
    {
      headerName: "",
      flex: 0.1,
      cellRenderer: ({data: usuario}: ICellRendererParams<Pick<Usuario, 'id'>>) =>
        usuario ?
        <Stack direction="horizontal" gap={1} className="h-100 justify-content-center">
          <BotonEditarUsuario
            setModalActivo={ setModalActivo }
            handleOnModalClose={ handleOnModalClose }
            setEstaFormularioModalEnUso={ setEstaFormularioModalEnUso }
            idUsuario={ usuario.id }
          />

          <BotonEliminarUsuario
            idUsuario={ usuario.id }
            recargarListaRecursos={ refetch }
          />
        </Stack>
        : null
    }
  ]);
  
  const recargarData = async (): Promise<void> => { await refetch() };

  // Close Modal
  const handleOnModalClose = async (): Promise<void> => {
    if (!estaFormularioModalEnUso) {
      setEstaFormularioModalEnUso(false);
      setModalActivo(null);
      return;
    }
    const { isConfirmed } = await alertaConfirmacion({
      titulo: "Se cerrará el formulario",
      texto: "Si continua se perderan los datos ingresados",
    });
    if (isConfirmed) {
      setEstaFormularioModalEnUso(false);
      setModalActivo(null);
      return;
    }
  };

  // Render
  return (
    <>
      <Card className="shadow-sm">
        <ListGroup>
          <ListGroup.Item className="py-3 d-flex gap-3 flex-sm-row align-items-sm-center flex-column justify-content-between">
            <Card.Title className="m-0">Crud App</Card.Title>
            <BotonAgregarUsuario
              setModalActivo={ setModalActivo }
              handleOnModalClose={ handleOnModalClose }
              setEstaFormularioModalEnUso={ setEstaFormularioModalEnUso }
            />
          </ListGroup.Item>

          <ListGroup.Item className="py-3">
            <Datatable<Usuario>
              definicionColumnas={ columnDefs }
              data={ dataUsuarios }
              recargarData={ recargarData }
              cargando={ isFetching }
            />
          </ListGroup.Item>

        </ListGroup>
      </Card>

      <CustomModal
        show={ modalActivo?.titulo && modalActivo?.componente ? true : false }
        onClose={ handleOnModalClose }
        title={ modalActivo?.titulo ?? "" }
      >
        {modalActivo?.componente}
      </CustomModal>
    </>
  );
};
