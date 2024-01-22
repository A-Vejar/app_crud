import { Button } from "react-bootstrap";
import { PencilSquare } from "react-bootstrap-icons";
import { useMediaQuery } from "react-responsive";
import { CustomTooltip } from "../../components/bootstrap/CustomTooltip";
import { ModalActivo } from "../../ts/global.interfaces";
import { Usuario } from "../../ts/api.interfaces";
import { EditarUsuario } from "../items/EditarUsuario";

export const BotonEditarUsuario: React.FC<BotonEditarUsuarioProps> = ({ setModalActivo, handleOnModalClose, setEstaFormularioModalEnUso, idUsuario }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const handleClick = () => setModalActivo({
    titulo: "Editar Usuario",
    componente: <EditarUsuario cerrarModal={ handleOnModalClose } setEstaFormularioEnUso={ setEstaFormularioModalEnUso } idUsuario={ idUsuario } />
  });

  // Render
  return (
    <CustomTooltip className="align-self-end" texto="Editar Usuario">
      <Button
        className="d-flex justify-content-center align-items-center"
        size={ isTabletOrMobile ? "lg" : "sm" }
        variant="warning"
        type="button"
        onClick={ () => handleClick() }
      >
        <PencilSquare className="fs-5 text-white" />
      </Button>
    </CustomTooltip>
  );
};

// Interface
interface BotonEditarUsuarioProps {
  setModalActivo: React.Dispatch<React.SetStateAction<ModalActivo | null>>;
  handleOnModalClose: () => void;
  setEstaFormularioModalEnUso: React.Dispatch<React.SetStateAction<boolean>>;
  idUsuario: Usuario['id'];
}
