// #region React components
export interface DefaultComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface DefaultModalComponentProps extends DefaultComponentProps {
  setEstaFormularioEnUso: React.Dispatch<React.SetStateAction<boolean>>;
  cerrarModal: (options?: { recargar?: boolean }) => void;
}

export interface ModalActivo {
  titulo: string;
  componente: React.ReactNode;
}
// #endregion
