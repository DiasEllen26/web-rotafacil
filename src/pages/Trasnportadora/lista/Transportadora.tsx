// pages/Trasnportadora/lista/Transportadora.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lista from "../../../components/Lista/index";
import { ITrasnportadora } from "../../../types/ITrasnportadora";
import { getAllByCollection } from "../../../utils/firebase/getAllByCollection";
import { deleteById } from "../../../utils/firebase/deleteById";
import {
  ButtonCadastrar,
  ContainerButton,
} from "../../../components/Lista/style"; 

function Transportadora() {
  const navigate = useNavigate();
  const [transportadoras, setTransportadoras] = useState<ITrasnportadora[]>();

  async function getAllTransportadoras() {
    const data = (await getAllByCollection(
      "transportadora"
    )) as unknown as ITrasnportadora[];
    setTransportadoras(data);
  }

  async function handleDelete(id: string) {
    try {
      await deleteById("transportadora", id);
      const newTransportadoras = transportadoras?.filter(
        (transportadora) => transportadora.id !== id
      );
      setTransportadoras(newTransportadoras);
    } catch (error) {
      window.alert(error);
    }
  }

  useEffect(() => {
    getAllTransportadoras();
  }, []);

  const renderTransportadoraFields = (transportadora: ITrasnportadora) => [
    transportadora.nome,
    transportadora.endereco,
    transportadora.telefone,
    transportadora.sitio,
    transportadora.email,
  ];

  return (
    <>
      <Lista
        items={transportadoras || []}
        onDelete={handleDelete}
        editPath="editar"
        renderFields={renderTransportadoraFields}
      />

      <ContainerButton>
        <ButtonCadastrar
          onClick={() => {
            navigate("/transportadora/cadastrar");
          }}
        >
          Cadastrar
        </ButtonCadastrar>
      </ContainerButton>
    </>
  );
}

export default Transportadora;
