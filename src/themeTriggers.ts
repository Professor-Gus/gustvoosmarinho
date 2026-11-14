import { ThemeId } from "./themes";

export interface ThemeTrigger {
  id: string;
  phrase: string;
  videoUrl: string;
  videoName: string;
  description: string;
  isFixed?: boolean;
}

export interface PresentationGroup {
  id: string;
  name: string;
  badge: string;
  biome: ThemeId;
  description: string;
  intro: {
    id: string;
    phrase: string;
    videoUrl: string;
    videoName: string;
    description: string;
    isFixed?: boolean;
  };
  triggers: ThemeTrigger[];
  suggestedQuestions: string[];
}

/**
 * ÚNICO GRUPO ATIVO DO APLICATIVO:
 * GUSTAVO E ISABELY — BAMBUÇAL
 * 1 Introdução + 4 Gatilhos de Voz Fixos
 */
export const BAMBUCAL_GROUP_GUSTAVO_ISABELY: PresentationGroup = {
  id: "bambucal_gustavo_isabely",
  name: "GUSTAVO E ISABELY",
  badge: "Bambuçal",
  biome: "bambucal",
  description: "ASSISTENTE VIRTUAL — BAMBUÇAL • Gustavo e Isabely",
  intro: {
    id: "intro",
    phrase: "introdução",
    videoUrl: "https://youtu.be/4aN7ljo_N_g?is=WPl-pi4KeHNP6to5",
    videoName: "INTRODUÇÃO",
    description: "Vídeo de introdução da apresentação de Gustavo e Isabely sobre o Bambuçal",
    isFixed: true,
  },
  triggers: [
    {
      id: "bambucal_g1",
      phrase: "Qual é a fauna?",
      videoUrl: "https://youtu.be/MZpKasOteTo?is=mN-OT08diaQbdNJm",
      videoName: "Qual é a fauna?",
      description: "Fauna e animais característicos do ecossistema Bambuçal",
      isFixed: true,
    },
    {
      id: "bambucal_g2",
      phrase: "Perigos nos Bambuzais.",
      videoUrl: "https://youtu.be/H8JXEd1HA-A",
      videoName: "Perigos nos Bambuzais.",
      description: "Perigos e cuidados nos bambuzais",
      isFixed: true,
    },
    {
      id: "bambucal_g3",
      phrase: "Ameaças do bambuzal.",
      videoUrl: "https://youtu.be/vySXIZqnsPU?is=t4ThOlbtHeX1MM3h",
      videoName: "Ameaças do bambuzal.",
      description: "Ameaças ambientais e impactos enfrentados pelo bambuçal",
      isFixed: true,
    },
    {
      id: "bambucal_g4",
      phrase: "Me fale mais sobre o bioma.",
      videoUrl: "https://youtu.be/xmKHOgpPEOQ?is=_31Hgz09eyXZXF6K",
      videoName: "Me fale mais sobre o bioma.",
      description: "Informações gerais e curiosidades sobre o bioma Bambuçal",
      isFixed: true,
    },
  ],
  suggestedQuestions: [
    "Qual é a fauna?",
    "Perigos nos Bambuzais.",
    "Ameaças do bambuzal.",
    "Me fale mais sobre o bioma.",
    "reiniciar apresentação"
  ]
};

/**
 * Normaliza strings para comparação fonética e por similaridade textual:
 * Remove acentos, pontuações, caracteres especiais e espaços extras.
 */
export function normalizeVoiceText(text: string): string {
  if (!text) return "";
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/[^a-z0-9\s]/g, " ")     // pontuações viram espaços
    .replace(/\s+/g, " ")             // normaliza espaços
    .trim();
}

/**
 * RECONHECEDOR DE VOZ EXCLUSIVO:
 * GUSTAVO E ISABELY — BAMBUÇAL
 *
 * 1. Introdução: "introdução", "apresentação", "início", "começar"
 * 2. Gatilho 1: "Qual é a fauna?"
 * 3. Gatilho 2: "Perigos nos Bambuzais."
 * 4. Gatilho 3: "Ameaças do bambuzal."
 * 5. Gatilho 4: "Me fale mais sobre o bioma."
 */
export function matchBambucalTrigger(input: string): string | null {
  const norm = normalizeVoiceText(input);
  if (!norm) return null;

  // 1. Introdução / Apresentação
  const introWords = ["introducao", "inicio", "iniciar", "apresentacao", "apresentar", "comecar", "comeco", "abrir", "voltar"];
  if (introWords.some(w => norm === w || norm.startsWith(w + " ") || norm.endsWith(" " + w) || norm.includes(w))) {
    return "intro";
  }

  // 2. Correspondências literais exatas
  if (
    norm === "qual e a fauna" ||
    norm === "qual a fauna" ||
    norm === "quais sao os animais" ||
    norm === "qual fauna"
  ) {
    return "bambucal_g1";
  }

  if (
    norm === "perigos nos bambuzais" ||
    norm === "perigo nos bambuzais" ||
    norm === "perigos no bambuzal" ||
    norm === "perigo no bambuzal" ||
    norm === "perigos bambuzais"
  ) {
    return "bambucal_g2";
  }

  if (
    norm === "ameacas do bambuzal" ||
    norm === "ameaca do bambuzal" ||
    norm === "ameacas nos bambuzais" ||
    norm === "ameacas dos bambuzais" ||
    norm === "ameacas bambuzal"
  ) {
    return "bambucal_g3";
  }

  if (
    norm === "me fale mais sobre o bioma" ||
    norm === "fale mais sobre o bioma" ||
    norm === "me fale sobre o bioma" ||
    norm === "fale sobre o bioma" ||
    norm === "mais sobre o bioma" ||
    norm === "sobre o bioma"
  ) {
    return "bambucal_g4";
  }

  // 3. Detecção por palavras-chave prioritárias (ordem evita colisão entre perigos/ameaças/bioma)
  // GATILHO 1: "Qual é a fauna?"
  if (
    norm.includes("fauna") ||
    norm.includes("animais") ||
    norm.includes("animal") ||
    norm.includes("bichos")
  ) {
    return "bambucal_g1";
  }

  // GATILHO 3: "Ameaças do bambuzal." (verificado antes de termos genéricos de bambuzal)
  if (
    norm.includes("ameaca") ||
    norm.includes("ameacas")
  ) {
    return "bambucal_g3";
  }

  // GATILHO 2: "Perigos nos Bambuzais."
  if (
    norm.includes("perigo") ||
    norm.includes("perigos") ||
    norm.includes("bambuzais")
  ) {
    return "bambucal_g2";
  }

  // GATILHO 4: "Me fale mais sobre o bioma."
  if (
    norm.includes("bioma") ||
    norm.includes("me fale") ||
    norm.includes("fale mais") ||
    norm.includes("ecossistema") ||
    norm.includes("bambucal") ||
    norm.includes("bambuzal")
  ) {
    return "bambucal_g4";
  }

  return null;
}

export function matchTriggerForGroup(input: string, _groupId?: string): string | null {
  return matchBambucalTrigger(input);
}
