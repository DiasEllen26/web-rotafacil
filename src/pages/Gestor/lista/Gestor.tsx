import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IGestor } from "../../../types/IGestor";
import { getAllByCollection } from "../../../utils/firebase/getAllByCollection";
import { deleteById } from "../../../utils/firebase/deleteById";
import { Loading } from "../../../components/Loading/Loading";
import Lista from "../../../components/Lista";
import {
  StyledButtonContainer as GestorButtonContainer,
  StyledCadastrarButton as GestorCadastrarButton,
} from "../../../components/Lista/style";

export function Gestor() {
  const navigate = useNavigate();
  const [gestores, setGestores] = useState<IGestor[]>();
  const [isLoading, setLoading] = useState<boolean>(true);

  async function getAllGestores() {
    const data = (await getAllByCollection("gestor")) as unknown as IGestor[];
    setGestores(data);
    setLoading(false);
  }

  useEffect(() => {
    getAllGestores();
  }, []);

  async function handleDelete(id: string) {
    try {
      setLoading(true);
      await deleteById("gestor", id);
      const newGestores = gestores?.filter((gestor) => gestor.id !== id);
      setGestores(newGestores);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  const renderGestorFields = (gestor: IGestor) => [gestor.nome, gestor.email];

  return (
    <>
      {isLoading ? (
        <Loading visible={isLoading} />
      ) : (
        <>
          <Lista
            items={gestores || []}
            onDelete={handleDelete}
            editPath="editar"
            renderFields={renderGestorFields}
          />
          <GestorButtonContainer>
            <GestorCadastrarButton
              onClick={() => {
                navigate("/gestor/cadastrar");
              }}
            >
              Cadastrar
            </GestorCadastrarButton>
          </GestorButtonContainer>
        </>
      )}
    </>
  );
}
