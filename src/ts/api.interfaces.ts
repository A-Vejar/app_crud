export interface Audit {
  created_by: string;
  created_at: string;
  updated_by?: string;
  updated_at?: string;
  deleted_by?: string;
  deleted_at?: string;
}

export interface Usuario extends Audit {
  id: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  fecha_nacimiento: string;
  correo?: string;
  telefono?: number;
}

export interface PostUsuario extends Pick<Usuario, 'nombre' | 'apellido_paterno' | 'apellido_materno' | 'fecha_nacimiento'> {
  correo?: string;
  telefono?: number;
}

export interface PatchUsuario extends Partial<Pick<Usuario, 'nombre' | 'apellido_paterno' | 'apellido_materno' | 'fecha_nacimiento' | 'correo' | 'telefono'>> {
  id: number;
}
