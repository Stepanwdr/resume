import type { Section } from "../types";
import styled from "styled-components";


interface Props {
  section: Section;
  updateSection: (s: Section) => void;
  deleteSection: (id: string) => void;
}

export const SectionForm = ({ section, updateSection, deleteSection }: Props) => {
  const handleChange = (field: string, value: any) => {
    updateSection({ ...section, [field]: value });
  };

  const insertHint = () => {
    if (section.type === "О себе") {
      handleChange("description", "Ответственный и мотивированный специалист с опытом работы.");
    }
    if (section.type === "Опыт") {
      handleChange("description", "Выполнял ключевые задачи по развитию проекта.");
    }
  };

  return (
    <div>
      <h3>{section.type}</h3>

      {section.type === "Опыт" && (
        <>
          <Label>Должность</Label>
          <Input value={section.position} onChange={(e) => handleChange("position", e.target.value)} />

          <Label>Компания</Label>
          <Input value={section.company} onChange={(e) => handleChange("company", e.target.value)} />

          <Label>Период</Label>
          <Input value={section.period} onChange={(e) => handleChange("period", e.target.value)} />

          <Label>Описание</Label>
          <Textarea value={section.description} onChange={(e) => handleChange("description", e.target.value)} />
        </>
      )}

      {section.type === "Образование" && (
        <>
          <Label>Учебное заведение</Label>
          <Input value={section.institution} onChange={(e) => handleChange("institution", e.target.value)} />

          <Label>Специальность</Label>
          <Input value={section.specialty} onChange={(e) => handleChange("specialty", e.target.value)} />

          <Label>Период</Label>
          <Input value={section.period} onChange={(e) => handleChange("period", e.target.value)} />
        </>
      )}

      {section.type === "Навыки" && (
        <>
          <Label>Навыки (через запятую)</Label>
          <Input
            value={section.skills.join(", ")}
            onChange={(e) => handleChange("skills", e.target.value.split(",").map((s) => s.trim()))}
          />
        </>
      )}

      {section.type === "Сертификаты" && (
        <>
          <Label>Сертификаты (через запятую)</Label>
          <Input
            value={section.certificates.join(", ")}
            onChange={(e) => handleChange("certificates", e.target.value.split(",").map((s) => s.trim()))}
          />
        </>
      )}

      {section.type === "О себе" && (
        <>
          <Label>Описание</Label>
          <Textarea
            value={section.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </>
      )}

      <div>
        <Button onClick={() => deleteSection(section.id)}>Удалить</Button>
        <HintButton onClick={insertHint}>AI-подсказка</HintButton>
      </div>
    </div>
  );
};

const Label = styled.label`
  display: block;
  margin: 8px 0 4px;
`;

const Input = styled.input`
  padding: 6px;
  width: 100%;
  margin-bottom: 10px;
`;

const Textarea = styled.textarea`
  padding: 6px;
  width: 100%;
  margin-bottom: 10px;
`;

const Button = styled.button`
  margin-right: 10px;
  padding: 6px 10px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const HintButton = styled.button`
  padding: 6px 10px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
