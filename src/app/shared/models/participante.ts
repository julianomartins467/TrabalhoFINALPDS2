import { Projeto } from './projeto';

export interface Participante {
  id?: number;
  nome: string;
  projetoId: number;
  projeto: Projeto;  
}
