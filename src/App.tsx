import { useState, useEffect } from "react";
import { ResumeEditor } from "./components/ResumeEditor";
import { ResumePreview } from "./components/ResumePreview";
import { Section } from "./types";
import { GlobalStyles } from "./styles/GlobalStyles";
import styled from "styled-components";


export default function App() {
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("resume");
    if (saved) setSections(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("resume", JSON.stringify(sections));
  }, [sections]);

  return (
    <>
      <GlobalStyles />
      <Container>
        <Panel>
          <ResumeEditor sections={sections} setSections={setSections} />
        </Panel>
        <Panel>
          <ResumePreview sections={sections} />
        </Panel>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  height: calc(100vh - 40px);
  padding: 20px;
  gap: 20px;
`;

const Panel = styled.div`
  flex: 1;
  overflow-y: auto;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
