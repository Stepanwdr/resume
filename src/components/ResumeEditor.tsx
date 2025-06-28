import { Section } from "../types";
import { AddSection } from "./AddSection";
import { SectionForm } from "./SectionForm";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import styled from "styled-components";

interface Props {
  fullName: string;
  setFullName: (name: string) => void;
  sections: Section[];
  setSections: (s: Section[]) => void;
}

export const ResumeEditor = ({
  fullName,
  setFullName,
  sections,
  setSections,
}: Props) => {
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const reordered = Array.from(sections);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setSections(reordered);
  };

  const updateSection = (updated: Section) => {
    setSections(sections.map((s) => (s.id === updated.id ? updated : s)));
  };

  const deleteSection = (id: string) => {
    setSections(sections.filter((s) => s.id !== id));
  };

  return (
    <EditorContainer>
      <Label>Имя и фамилия:</Label>
      <Input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Введите имя и фамилию"
      />

      <AddSection setSections={setSections} sections={sections} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <SectionList ref={provided.innerRef} {...provided.droppableProps}>
              {sections.map((section, index) => (
                <Draggable key={section.id} draggableId={section.id} index={index}>
                  {(provided) => (
                    <SectionItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <SectionForm
                        section={section}
                        updateSection={updateSection}
                        deleteSection={deleteSection}
                      />
                    </SectionItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </SectionList>
          )}
        </Droppable>
      </DragDropContext>
    </EditorContainer>
  );
};

const EditorContainer = styled.div`
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const Label = styled.label`
    font-weight: 500;
    margin-bottom: 4px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const SectionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionItem = styled.div`
  background-color: #ffffff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
`;
