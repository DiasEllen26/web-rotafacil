// components/Lista/Lista.tsx
import React from "react";
import { Link } from "react-router-dom";
import { FaPencil, FaRegTrashCan } from "react-icons/fa6";
import { ContainerContent, ButtonDeletar } from "./style";

interface ItemWithId {
  id: string;
}

interface ListaProps<T extends ItemWithId> {
  items: T[];
  onDelete: (id: string) => void;
  editPath: string;
  renderFields: (item: T) => React.ReactNode[];
}

function Lista<T extends ItemWithId>({ items, onDelete, editPath, renderFields }: ListaProps<T>) {
  return (
    <ContainerContent>
      {items.map((item) => (
        <div key={item.id}>
          {renderFields(item).map((field, index) => (
            <h2 key={index}>{field}</h2>
          ))}

          <div>
            <Link to={`${item.id}/${editPath}/`}>
              <FaPencil />
            </Link>
          </div>

          <div>
            <ButtonDeletar onClick={() => onDelete(item.id)}>
              <FaRegTrashCan />
            </ButtonDeletar>
          </div>
        </div>
      ))}
    </ContainerContent>
  );
}

export default Lista;
