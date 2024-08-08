import { TfgRepository, Tfg } from '../domain/tfgRepository';
export declare class GetTfgs {
    private repository;
    constructor(repository: TfgRepository);
    execute(profesorId: string): Promise<Tfg[]>;
}
export default GetTfgs;
