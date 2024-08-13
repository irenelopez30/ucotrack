export class Nota{
    id: string;
    id_tfg: string;
    fecha: Date;
    informacion: string;

    constructor(id: string, id_tfg: string, fecha: Date, informacion: string){
        this.id = id;
        this.id_tfg = id_tfg;
        this.fecha = fecha;
        this.informacion = informacion;
    }
    
}