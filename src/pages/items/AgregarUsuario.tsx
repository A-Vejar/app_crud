import { Button, Card, FloatingLabel, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useMediaQuery } from "react-responsive";
import { PostUsuario } from "../../ts/api.interfaces";
import { alertaConfirmacion, alertaExito, alertaToast } from "../../services/alertas.service";
import { Usuarios } from "../../api/usuarios.api";
import { DefaultModalComponentProps } from "../../ts/global.interfaces";

// Headers
const headers = {
  nombre: "",
  apellido_paterno: "",
  apellido_materno: "",
  fecha_nacimiento: "",
  correo: undefined,
  telefono: undefined
}

export const AgregarUsuario: React.FC<AgregarUsuarioProps> = ({ setEstaFormularioEnUso, cerrarModal }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  // States
  const [input, setInput] = useState<PostUsuario>(headers);

  useEffect(() => {
    setEstaFormularioEnUso(false);
    if(input !== headers )
      setEstaFormularioEnUso(true);
  }, [input]);

  // Handle Functions
  const handleChangeInput = async ({target: { value, name, type }}: React.ChangeEvent<HTMLInputElement>) => setInput(
    { ...input, [name]: type === "number" ? Number(value) : value }
  );

  // Post data
  const { mutate: mutateIngresarUsuario, isPending } = useMutation({
    mutationFn: Usuarios.ingresarUsuario,
    onSuccess: ({ data }): void => {
      if (data) {
        alertaExito({ titulo: `Usuario Ingresado.` });
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
      titulo: "Ingresar Usuario",
      texto: "Si continua, el Usuario será ingresado en sistema",
    });
    if (isConfirmed) mutateIngresarUsuario(input);
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
                value={ input?.nombre || "" }
                onChange={ handleChangeInput }
              />
            </FloatingLabel>

            <FloatingLabel label={<p>Apellido Paterno <span className="fw-bold text-danger">*</span></p>}>
              <Form.Control
                type="text"
                name="apellido_paterno"
                value={ input?.apellido_paterno || "" }
                onChange={ handleChangeInput }
              />
            </FloatingLabel>

            <FloatingLabel label={<p>Apellido Materno <span className="fw-bold text-danger">*</span></p>}>
              <Form.Control
                type="text"
                name="apellido_materno"
                value={ input?.apellido_materno || "" }
                onChange={ handleChangeInput }
              />
            </FloatingLabel>

            <FloatingLabel label="Fecha Nacimiento">
              <Form.Control
                type="date"
                name="fecha_nacimiento"
                value={ input?.fecha_nacimiento || "" }
                onChange={ handleChangeInput }
              />
            </FloatingLabel>
          </div>

          <div className="d-flex flex-column gap-2 w-50">
            <FloatingLabel label="Correo">
              <Form.Control
                type="text"
                name="correo"
                value={ input?.correo || "" }
                onChange={ handleChangeInput }
              />
            </FloatingLabel>

            <FloatingLabel label="Teléfono">
              <Form.Control
                type="number"
                name="telefono"
                min={0}
                value={ input?.telefono || "" }
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
          {/* {
            isLoadingPostMaterial ?
            <CustomSpinnerIcon className="mx-3" /> :
            "Enviar"
          } */}
          Enviar
        </Button>

      </Card.Body>
    </Card>
  );
};

interface AgregarUsuarioProps extends DefaultModalComponentProps {}
