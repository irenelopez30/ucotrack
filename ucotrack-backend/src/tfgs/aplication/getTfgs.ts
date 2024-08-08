import { TfgRepository, Tfg} from '../domain/tfgRepository';

export class GetTfgs {

  constructor(private repository: TfgRepository) {}

  async execute(profesorId: string): Promise<Tfg[]> {
    return await this.repository.findAll(profesorId);
  }
}

export default GetTfgs;
