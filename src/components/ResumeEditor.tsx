import { Section } from "../types";
import { AddSection } from "./AddSection";
import { SectionForm } from "./SectionForm";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

interface Props {
  sections: Section[];
  setSections: (s: Section[]) => void;
}

export const ResumeEditor = ({ sections, setSections }: Props) => {
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const reordered = Array.from(sections);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setSections(reordered);
  };

  const updateSection = (updated: Section) => {
    setSections(sections.map(s => (s.id === updated.id ? updated : s)));
  };

  const deleteSection = (id: string) => {
    setSections(sections.filter(s => s.id !== id));
  };

  return (
    <div>
      <AddSection setSections={setSections} sections={sections} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="mt-4 space-y-4">
              {sections.map((section, index) => (
                <Draggable key={section.id} draggableId={section.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-4 bg-white shadow rounded"
                    >
                      <SectionForm
                        section={section}
                        updateSection={updateSection}
                        deleteSection={deleteSection}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
