import { Button } from "react-bootstrap";
import { Trash3Fill } from "react-bootstrap-icons";
import { useMediaQuery } from "react-responsive";
import { useMutation } from "@tanstack/react-query";
import { Usuario } from "../../ts/api.interfaces";
import { CustomTooltip } from "../../components/bootstrap/CustomTooltip";
import { alertaConfirmacion, alertaToast } from "../../services/alertas.service";
import { DefaultComponentProps } from "../../ts/global.interfaces";
import { Usuarios } from "../../api/usuarios.api";

export const BotonEliminarUsuario: React.FC<BotonEliminarUsuarioProp> = ({ idUsuario, recargarListaRecursos }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const { mutate: mutateEliminarUsuario } =
    useMutation({
      mutationFn: Usuarios.eliminarUsuario,
      onSuccess: ({ data }): void => {
        if (data.id) {
          alertaToast({ titulo: "Usuario eliminado", posicion: "center" });
          recargarListaRecursos();
        }
      }
    });

  const handleClick = async (): Promise<void> => {
    const { isConfirmed } = await alertaConfirmacion({
      titulo: "Eliminar usuario",
      texto: "Si continua, será eliminado el usuario"
    });
    if (isConfirmed) mutateEliminarUsuario(idUsuario);
  };

  return (
    <CustomTooltip className="align-self-end" texto="Eliminar Usuario">
      <Button
        className="d-flex justify-content-center align-items-center"
        size={ isTabletOrMobile ? "lg" : "sm" }
        variant="danger"
        type="button"
        onClick={ handleClick }
      >
        <Trash3Fill className="fs-5 text-white" />
      </Button>
    </CustomTooltip>
  );
};

interface BotonEliminarUsuarioProp extends DefaultComponentProps {
  idUsuario: Usuario['id'];
  recargarListaRecursos: () => void;
}
