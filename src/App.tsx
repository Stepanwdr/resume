import { useState, useEffect } from "react";
import { ResumeEditor } from "./components/ResumeEditor";
import { ResumePreview } from "./components/ResumePreview";
import type { Section } from "./types";
import { GlobalStyles } from "./styles/GlobalStyles";
import styled from "styled-components";


export default function App() {
  const [sections, setSections] = useState<Section[]>([]);
  const [fullName, setFullName] = useState("");

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
          <ResumeEditor
            fullName={fullName}
            setFullName={setFullName}
            sections={sections}
            setSections={setSections}
          />
        </Panel>
        <Panel>
          <ResumePreview fullName={fullName} sections={sections} />
        </Panel>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  height: 100vh;
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
