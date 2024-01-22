import { AxiosResponse } from "axios";
import { PatchUsuario, PostUsuario, Usuario } from "../ts/api.interfaces";
import { instanciaAxios } from "./call";

/**
 * Api Methods
 */
export namespace Usuarios {
  export const obtenerUsuarios = async (): Promise<AxiosResponse<Usuario[]>> => {
    return await instanciaAxios.get<Usuario[]>(`/usuarios`);
  };

  export const obtenerUsuario = async (id: Usuario['id']): Promise<AxiosResponse<Usuario>> => {
    return await instanciaAxios.get<Usuario>(`/usuarios/${id}`);
  };

  export const ingresarUsuario = async (body: PostUsuario): Promise<AxiosResponse<Usuario>> => {
    return await instanciaAxios.post<Usuario>(`/usuarios`, body);
  }

  export const editarUsuario = async (body: PatchUsuario): Promise<AxiosResponse<Usuario>> => {
    const { id } = body;
    return await instanciaAxios.patch<Usuario>(`/usuarios/${id}`, body);
  }

  export const eliminarUsuario = async (id: Usuario['id']): Promise<AxiosResponse<Usuario>> => {
    return await instanciaAxios.delete<Usuario>(`/usuarios/${id}`);
  }
}
