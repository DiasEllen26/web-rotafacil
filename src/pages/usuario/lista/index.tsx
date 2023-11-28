import { useEffect, useState } from "react";
import { IUsuario } from "../../../types/IUsuario";
import { getAllByCollection } from "../../../utils/firebase/getAllByCollection";
import { deleteById } from "../../../utils/firebase/deleteById";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../../components/Loading/Loading";
import Lista from "../../../components/Lista";
import {
  StyledButtonContainer as UsuariosButtonContainer,
  StyledCadastrarButton as UsuariosCadastrarButton,
} from "../../../components/Lista/style";

export default function Usuarios() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState<IUsuario[]>();
  const [isLoading, setLoading] = useState<boolean>(true);

  async function getAllUsuarios() {
    const data = (await getAllByCollection("usuario")) as unknown as IUsuario[];
    setUsuarios(data);
    setLoading(false);
  }

  useEffect(() => {
    getAllUsuarios();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await deleteById("usuario", id);
      const newUsuarios = usuarios?.filter((usuario) => usuario.id !== id);
      setUsuarios(newUsuarios);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const renderUsuarioFields = (usuario: IUsuario) => [
    usuario.nome,
    usuario.email,
    usuario.telefone,
    usuario.endereco,
  ];

  return (
    <>
      <Loading visible={isLoading} />
      <Lista
        items={usuarios || []}
        onDelete={handleDelete}
        editPath="editar"
        renderFields={renderUsuarioFields}
      />
      <UsuariosButtonContainer>
        <UsuariosCadastrarButton
          onClick={() => {
            navigate("/usuario/cadastrar");
          }}
        >
          Cadastrar
        </UsuariosCadastrarButton>
      </UsuariosButtonContainer>
    </>
  );
}
