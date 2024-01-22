import { SweetAlertIcon, SweetAlertPosition } from "sweetalert2";

// #region alertas
export interface Alert {
  titulo?: string | null;
  texto?: string | null;
  icono?: SweetAlertIcon;
}

export interface ToastAlert extends Alert {
  posicion?: SweetAlertPosition;
  temporizador?: number;
}
// #endregion