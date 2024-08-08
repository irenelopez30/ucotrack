import { TfgRepository, Tfg } from '../domain/tfgRepository';
export declare class GetTfg {
    private repository;
    constructor(repository: TfgRepository);
    execute(id: string): Promise<Tfg | null>;
}
export default GetTfg;
