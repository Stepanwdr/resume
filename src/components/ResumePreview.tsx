import type { Section } from "../types";
import styled from "styled-components";
import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const ResumePreview = ({ sections }: { sections: Section[] }) => {
  const previewRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!previewRef.current) return;

    const canvas = await html2canvas(previewRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = ((canvas.height - 100) * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("resume.pdf");
  };

  return (
    <div>
      <DownloadButton onClick={downloadPDF}>Скачать как PDF</DownloadButton>

      <PreviewWrapper ref={previewRef}>
        <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>Резюме</h1>
        {sections.map((s) => (
          <SectionBlock key={s.id}>
            <Title>{s.type}</Title>
            {s.type === "Опыт" && (
              <>
                <strong>{s.position}</strong> {s.period && 'в'} {s.company} {s.period && (s.period)}
                <p>{s.description}</p>
              </>
            )}
            {s.type === "Образование" && (
              <>
                {s.institution} {s.institution && ','} {s.specialty} {s.period && (s.period)}
              </>
            )}
            {s.type === "Навыки" && <>{s.skills.join(", ")}</>}
            {s.type === "Сертификаты" && <>{s.certificates.join(", ")}</>}
            {s.type === "О себе" && <p>{s.description}</p>}
          </SectionBlock>
        ))}
      </PreviewWrapper>
    </div>
  );
};

const PreviewWrapper = styled.div`
    padding: 20px;
    border: 1px solid #ddd;
    height: calc(100vh - 135px);
    margin-top: 20px;
    background: white;
`;

const SectionBlock = styled.div`
    margin-bottom: 20px;
`;

const Title = styled.h2`
    border-bottom: 1px solid #ccc;
    margin-bottom: 8px;
    font-size: 18px;
`;

const DownloadButton = styled.button`
    padding: 8px 16px;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;
