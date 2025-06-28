export type SectionType = "Опыт" | "Образование" | "Навыки" | "Сертификаты" | "О себе";

export interface BaseSection {
  id: string;
  type: SectionType;
}

export interface ExperienceSection extends BaseSection {
  type: "Опыт";
  position: string;
  company: string;
  period: string;
  description: string;
}

export interface EducationSection extends BaseSection {
  type: "Образование";
  institution: string;
  specialty: string;
  period: string;
}

export interface SkillsSection extends BaseSection {
  type: "Навыки";
  skills: string[];
}

export interface CertificatesSection extends BaseSection {
  type: "Сертификаты";
  certificates: string[];
}

export interface AboutSection extends BaseSection {
  type: "О себе";
  description: string;
}

export type Section =
  | ExperienceSection
  | EducationSection
  | SkillsSection
  | CertificatesSection
  | AboutSection;
