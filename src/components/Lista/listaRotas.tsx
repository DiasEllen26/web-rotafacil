// components/Lista/ListaRota.tsx
import React from "react";
import { Link } from "react-router-dom";
import { FaPencil, FaRegTrashCan } from "react-icons/fa6";
import {
  StyledContainer,
  StyledListItem,
} from "./style";

interface IRotaResponse {
  id: string;
  id_transportadora: {
    id: string;
  };
  descricao: string;
  localPartida: string;
  destino: string;
  chegada: {
    seconds: number;
  };
  saida: {
    seconds: number;
  };
}

interface ListaRotaProps {
  rotas: IRotaResponse[];
  onDelete: (id: string) => void;
  editPath: string;
}

function ListaRota({ rotas, onDelete, editPath }: ListaRotaProps) {
  return (
    <>
      <StyledContainer>
        {rotas.map((rota) => (
          <StyledListItem key={rota.id}>
            <h1>{rota.localPartida + " A " + rota.destino}</h1>
            <h2>{rota.descricao}</h2>
            <h2>{"Saida" + " " + rota.saida.seconds}</h2>
            <h2>{"Chegada" + " " + rota.chegada.seconds}</h2>

            <div>
              <Link to={`${rota.id}/${editPath}/`}>
                <FaPencil />
              </Link>

              <button onClick={() => onDelete(rota.id)}>
                <FaRegTrashCan />
              </button>
            </div>
          </StyledListItem>
        ))}
      </StyledContainer>
    </>
  );
}

export default ListaRota;
