import type { Section } from "../types";
import styled from "styled-components";

export const ResumePreview = ({ sections }: { sections: Section[] }) => (
  <PreviewWrapper>
    <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>Резюме</h1>
    {sections.map((s) => (
      <SectionBlock key={s.id}>
        <Title>{s.type}</Title>
        {s.type === "Опыт" && (
          <>
            <strong>{s.position}</strong> в {s.company} ({s.period})
            <p>{s.description}</p>
          </>
        )}
        {s.type === "Образование" && (
          <>
            {s.institution}, {s.specialty} ({s.period})
          </>
        )}
        {s.type === "Навыки" && <>{s.skills.join(", ")}</>}
        {s.type === "Сертификаты" && <>{s.certificates.join(", ")}</>}
        {s.type === "О себе" && <p>{s.description}</p>}
      </SectionBlock>
    ))}
  </PreviewWrapper>
);

const PreviewWrapper = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  height: calc(100vh - 122px);  
`;

const SectionBlock = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h2`
  border-bottom: 1px solid #ccc;
  margin-bottom: 8px;
  font-size: 18px;
`;
