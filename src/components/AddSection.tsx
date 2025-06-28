import type { Section, SectionType } from "../types";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";


interface Props {
  sections: Section[];
  setSections: (s: Section[]) => void;
}

export const AddSection = ({ sections, setSections }: Props) => {
  const addSection = (type: SectionType) => {
    const id = uuidv4();
    let newSection: Section;

    switch (type) {
      case "Опыт":
        newSection = { id, type, position: "", company: "", period: "", description: "" };
        break;
      case "Образование":
        newSection = { id, type, institution: "", specialty: "", period: "" };
        break;
      case "Навыки":
        newSection = { id, type, skills: [] };
        break;
      case "Сертификаты":
        newSection = { id, type, certificates: [] };
        break;
      case "О себе":
        newSection = { id, type, description: "" };
        break;
      default:
        return;
    }

    setSections([...sections, newSection]);
  };

  return (
    <Wrapper>
      <Select id="section-select">
        <option value="">Выберите секцию</option>
        <option value="Опыт">Опыт</option>
        <option value="Образование">Образование</option>
        <option value="Навыки">Навыки</option>
        <option value="Сертификаты">Сертификаты</option>
        <option value="О себе">О себе</option>
      </Select>
      <Button
        onClick={() => {
          const select = document.getElementById("section-select") as HTMLSelectElement;
          if (select.value) addSection(select.value as SectionType);
        }}
      >
        Добавить
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 20px;
`;

const Select = styled.select`
  padding: 8px;
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 8px 12px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
