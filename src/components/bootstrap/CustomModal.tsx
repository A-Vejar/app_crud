import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import CloseButton from "react-bootstrap/CloseButton";
import { DefaultComponentProps } from "../../ts/global.interfaces";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";

export const CustomModal: React.FC<CustomModalProps> = ({
  children,
  show,
  title,
  size = "xl",
  onClose,
}) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  return (
    <Modal
      size={size}
      show={show}
      onHide={onClose}
      fullscreen={isTabletOrMobile ? true : undefined}
    >
      <Modal.Header className="bg-main">
        <Modal.Title className="text-white">{title}</Modal.Title>
        <CloseButton
          variant="white"
          className={`me-1 ${isTabletOrMobile ? "fs-1" : "fs-4"}`}
          onClick={onClose}
        />
      </Modal.Header>
      <StyledModalBody className={isTabletOrMobile ? "" : "scroll"}>
        <Container>{children}</Container>
      </StyledModalBody>
    </Modal>
  );
};

const StyledModalBody = styled(Modal.Body)`
  background-color: #d2dff7;
  background-image: url(/layered_peaks_haikei.png);
  background-attachment: fixed;
  background-size: cover;
  border-radius: 0.5rem;
  &.scroll {
    max-height: 85vh;
    overflow-y: auto;
  }
`;

interface CustomModalProps extends DefaultComponentProps {
  show: boolean;
  onClose: () => void;
  title: string;
  size?: "sm" | "lg" | "xl";
}
