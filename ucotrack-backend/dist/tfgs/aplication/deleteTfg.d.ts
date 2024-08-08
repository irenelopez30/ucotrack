import { TfgRepository } from '../domain/tfgRepository';
export declare class DeleteTfgById {
    private repository;
    constructor(repository: TfgRepository);
    execute(id: string): Promise<boolean>;
}
export default DeleteTfgById;
