import { Button } from "react-bootstrap";
import { PlusSquareFill } from "react-bootstrap-icons";
import { useMediaQuery } from "react-responsive";
import { CustomTooltip } from "../../components/bootstrap/CustomTooltip";
import { ModalActivo } from "../../ts/global.interfaces";
import { AgregarUsuario } from "../items/AgregarUsuario";

export const BotonAgregarUsuario: React.FC<BotonAgregarUsuarioProps> = ({ setModalActivo, handleOnModalClose, setEstaFormularioModalEnUso }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const handleClick = () => setModalActivo({
    titulo: "Agregar Usuario",
    componente: <AgregarUsuario cerrarModal={ handleOnModalClose } setEstaFormularioEnUso={ setEstaFormularioModalEnUso } />
  });

  // Render
  return (
    <CustomTooltip className="align-self-end" texto="Agregar Usuario">
      <Button
        className="d-flex justify-content-center align-items-center"
        size={ isTabletOrMobile ? "lg" : "sm" }
        variant="primary"
        type="button"
        onClick={ () => handleClick() }
      >
        <PlusSquareFill className="fs-5" />
      </Button>
    </CustomTooltip>
  );
};

// Interface
interface BotonAgregarUsuarioProps {
  setModalActivo: React.Dispatch<React.SetStateAction<ModalActivo | null>>;
  handleOnModalClose: () => void;
  setEstaFormularioModalEnUso: React.Dispatch<React.SetStateAction<boolean>>;
}
