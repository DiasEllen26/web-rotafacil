import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAllByCollection } from "../../../utils/firebase/getAllByCollection";
import { deleteById } from "../../../utils/firebase/deleteById";
import { ButtonCadastrar, ButtonDeletar, ContainerButton, ContentContainer, ListContainer } from "../../../components/Lista/style";
import { IGestor } from "../../../types/IGestor";
import { FaPencil, FaRegTrashCan } from "react-icons/fa6";
import { Loading } from "../../../components/Loading/Loading";
import Swal from "sweetalert2";
import Lista from "../../../components/Lista";

export default function Gestores() {
  const navigate = useNavigate();

  const [gestores, setGestores] = useState<IGestor[]>();
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllGestores();
  }, []);

  async function getAllGestores() {
    try {
      const data = await getAllByCollection("gestor") as unknown as IGestor[];
      setGestores(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      setLoading(true);
      await deleteById("gestor", id);
      const newGestores = gestores?.filter((gestor) => gestor.id !== id);
      setGestores(newGestores);
      setLoading(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: String(error),
      });
      setLoading(false);
    }
  }

  const renderGestorFields = (gestor: IGestor) => [
    <h1 key="nome">{gestor.nome}</h1>,
    <h2 key="email">{gestor.email}</h2>,
    <div key="editar">
      <Link to={`/gestor/${gestor.id}/editar/`}>
        <FaPencil />
      </Link>
    </div>,
    <div key="deletar">
      <ButtonDeletar onClick={() => handleDelete(gestor.id)}>
        <FaRegTrashCan />
      </ButtonDeletar>
    </div>,
  ];

  return (
    <>
      <Loading visible={isLoading} />
      <ContentContainer>
        <ListContainer>
          <Lista
            items={gestores || []}
            onDelete={handleDelete}
            editPath="editar"
            renderFields={renderGestorFields}
          />
        </ListContainer>
      </ContentContainer>

      <ContainerButton>
        <ButtonCadastrar
          onClick={() => {
            navigate("/gestor/cadastrar");
          }}
        >
          Cadastrar
        </ButtonCadastrar>
      </ContainerButton>
    </>
  );
}
