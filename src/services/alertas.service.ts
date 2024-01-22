import Swal, { SweetAlertResult } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Alert, ToastAlert } from "../ts/services.interfaces";

const swal = withReactContent(Swal);

export const alertaConfirmacion = async ({
  titulo,
  texto,
}: Alert = {}): Promise<SweetAlertResult> => {
  return await swal.fire({
    title: titulo ?? "Confirme la acción",
    text: texto ?? "",
    showConfirmButton: true,
    confirmButtonText: "Aceptar",
    showDenyButton: true,
    denyButtonText: "Cancelar",
  });
};

export const alertaExito = async ({
  titulo,
  texto,
}: Alert = {}): Promise<SweetAlertResult> => {
  return await swal.fire({
    icon: "success",
    title: titulo ?? "La acción se a realizado con éxito",
    text: texto ?? "",
  });
};

export const alertaError = async ({
  titulo,
  texto,
  icono,
}: Alert = {}): Promise<SweetAlertResult> => {
  return await swal.fire({
    icon: icono ?? "error",
    title: titulo ?? "Ha ocurrido un error inesperado",
    text:
      texto ??
      "Por favor vuelva a intentar, si el problema persiste comuníquese con la unidad de informática",
    showConfirmButton: false,
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    customClass: {
      container: "permitir-saltos-linea",
    },
  });
};

export const alertaToast = async ({
  titulo,
  icono,
  posicion,
  temporizador,
}: ToastAlert = {}): Promise<SweetAlertResult> => {
  return await Swal.fire({
    position: posicion ?? "bottom-end",
    icon: icono ?? "success",
    title: titulo ?? "Acción realizada",
    showConfirmButton: false,
    toast: true,
    timer: temporizador ?? 3000,
  });
};
