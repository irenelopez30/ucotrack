import { TfgRepository, Tfg } from '../domain/tfgRepository';
export declare class ModifyTfg {
    private repository;
    constructor(repository: TfgRepository);
    execute(tfg: Tfg): Promise<Tfg | null>;
}
export default ModifyTfg;
