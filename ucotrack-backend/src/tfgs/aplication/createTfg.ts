import { TfgRepository , Tfg} from "../domain/tfgRepository";

export class CreateTfg {
  constructor(private tfgRepository: TfgRepository) {}

  async execute(tfgData: {
    id: string,
    id_profesor: string,
    titulo: string,
    año_academico: string,
    descripcion: string,
    nombre_alumno: string,
    correo_alumno: string,
    telefono_alumno: string,
    estado: string
  }): Promise<Tfg> {
    const tfg = new Tfg(
      tfgData.id,
      tfgData.id_profesor,
      tfgData.titulo,
      tfgData.año_academico,
      tfgData.descripcion,
      tfgData.nombre_alumno,
      tfgData.correo_alumno,
      tfgData.telefono_alumno,
      tfgData.estado
    );

    return await this.tfgRepository.create(tfg);
  }
}
