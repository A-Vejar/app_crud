import { Button, Card, FloatingLabel, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMediaQuery } from "react-responsive";
import { PatchUsuario, Usuario } from "../../ts/api.interfaces";
import { alertaConfirmacion, alertaExito, alertaToast } from "../../services/alertas.service";
import { Usuarios } from "../../api/usuarios.api";
import { DefaultModalComponentProps } from "../../ts/global.interfaces";
import { DateTime } from "luxon";

// Headers
const headers = {
  nombre: "",
  apellido_paterno: "",
  apellido_materno: "",
  fecha_nacimiento: "",
  correo: undefined,
  telefono: undefined
}

export const EditarUsuario: React.FC<EditarUsuarioProps> = ({ setEstaFormularioEnUso, cerrarModal, idUsuario }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const { data: usuario } = useQuery({
    queryKey: ["Usuarios", "obtenerUsuario"],
    queryFn: () => Usuarios.obtenerUsuario(idUsuario),
    select: ({ data }) => data
  });  

  // States
  const [input, setInput] = useState<Omit<PatchUsuario, 'id'>>(headers);

  // Handle Functions
  const handleChangeInput = async ({target: { value, name, type }}: React.ChangeEvent<HTMLInputElement>) => setInput(
    { ...input, [name]: type === "number" ? Number(value) : value }
  );

  useEffect(() => {
    setInput({ ...usuario, correo: (!usuario?.correo  ? '' : usuario?.correo), telefono: (!usuario?.telefono ? NaN : usuario?.telefono) });
  }, [usuario]);

  // Post data
  const { mutate: mutateEditarUsuario, isPending } = useMutation({
    mutationFn: Usuarios.editarUsuario,
    onSuccess: ({ data }): void => {
      if (data) {
        alertaExito({ titulo: `Usuario modificado.` });
        cerrarModal({ recargar: true });
      }
    }
  });

  // Constrains
  const handleClick = async (): Promise<void> => {
    if (!input.nombre) {
      alertaToast({ titulo: "Nombre requerido", icono: "warning", posicion: "center" });
      return;
    }

    if (!input.apellido_paterno) {
      alertaToast({ titulo: "Apellido paterno requerido", icono: "warning", posicion: "center" });
      return;
    }

    if (!input.apellido_materno) {
      alertaToast({ titulo: "Apellido materno requerido", icono: "warning", posicion: "center" });
      return;
    }

    if (!input.fecha_nacimiento) {
      alertaToast({ titulo: "Fecha nacimiento requerida", icono: "warning", posicion: "center" });
      return;
    }

    // Confirm
    const { isConfirmed } = await alertaConfirmacion({
      titulo: "Modificar Usuario",
      texto: "Si continua, el Usuario será modificado en sistema",
    });
    if (isConfirmed) mutateEditarUsuario({ ...input, id: idUsuario });
  };
  
  // Render
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <div className="d-flex gap-3 flex-column flex-sm-row">
          <div className="d-flex flex-column gap-2 w-50">
            <FloatingLabel label={<p>Nombre <span className="fw-bold text-danger">*</span></p>}>
              <Form.Control
                type="text"
                name="nombre"
                value={ input.nombre }
                onChange={ handleChangeInput }
              />
            </FloatingLabel>

            <FloatingLabel label={<p>Apellido Paterno <span className="fw-bold text-danger">*</span></p>}>
              <Form.Control
                type="text"
                name="apellido_paterno"
                value={ input.apellido_paterno }
                onChange={ handleChangeInput }
              />
            </FloatingLabel>

            <FloatingLabel label={<p>Apellido Materno <span className="fw-bold text-danger">*</span></p>}>
              <Form.Control
                type="text"
                name="apellido_materno"
                value={ input.apellido_materno }
                onChange={ handleChangeInput }
              />
            </FloatingLabel>

            <FloatingLabel label="Fecha Nacimiento">
              <Form.Control
                type="date"
                name="fecha_nacimiento"
                value={ input.fecha_nacimiento }
                onChange={ handleChangeInput }
              />
            </FloatingLabel>
          </div>

          <div className="d-flex flex-column gap-2 w-50">
            <FloatingLabel label="Correo">
              <Form.Control
                type="text"
                name="correo"
                value={ input.correo }
                onChange={ handleChangeInput }
              />
            </FloatingLabel>

            <FloatingLabel label="Teléfono">
              <Form.Control
                type="number"
                name="telefono"
                min={0}
                value={ input.telefono }
                onChange={ handleChangeInput }
              />
            </FloatingLabel>
          </div>
        </div>

        <Button
          className="float-end btn-lg"
          onClick={ handleClick }
          size={ isTabletOrMobile ? "lg" : undefined }
          disabled={ isPending }
        >
          Enviar
        </Button>

      </Card.Body>
    </Card>
  );
};

interface EditarUsuarioProps extends DefaultModalComponentProps {
  idUsuario: Usuario['id'];
}
