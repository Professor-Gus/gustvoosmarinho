export interface QuizQuestion {
  id: string;
  topic: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  feedbackCorrect: string;
  feedbackIncorrect: string;
}

export const QUIZ_POINTS_PER_QUESTION = 1000;
export const QUIZ_MAX_SCORE = 5000;

export const BAMBUCAL_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1_caracteristicas",
    topic: "1. Características do Bambuçal",
    question: "Qual é uma das principais características do bambu que torna o bambuçal um ecossistema especial?",
    options: [
      "É uma gramínea gigante de crescimento rápido, com colmos ocos e raízes que ajudam a fixar o solo.",
      "É uma árvore conífera de crescimento muito lento que só sobrevive abaixo de zero grau.",
      "É um tipo de cacto sem folhas que armazena água salgada no interior do tronco.",
      "É uma planta aquática flutuante que não cria raízes no solo."
    ],
    correctIndex: 0,
    feedbackCorrect:
      "Correto! O bambu é uma gramínea gigante de crescimento acelerado. Seus colmos ocos formam um dossel que mantém a umidade, enquanto seus rizomas protegem o solo contra erosão.",
    feedbackIncorrect:
      "A resposta correta é a primeira opção: o bambu é uma gramínea gigante de crescimento rápido, com colmos ocos e raízes (rizomas) que estabilizam e protegem o solo."
  },
  {
    id: "q2_fauna",
    topic: "2. Fauna do Bambuçal",
    question: "Qual animal é símbolo mundial dos bambuçais por depender diretamente do bambu para alimentação e abrigo?",
    options: [
      "Urso-polar, que utiliza colmos de bambu para construir abrigos no Ártico.",
      "Panda-gigante, cuja dieta é baseada principalmente em brotos e folhas de bambu.",
      "Peixe-boi-marinho, que se alimenta de bambu no fundo dos oceanos.",
      "Pinguim-imperador, que constrói ninhos com fibras secas de bambu na Antártida."
    ],
    correctIndex: 1,
    feedbackCorrect:
      "Correto! O panda-gigante (assim como o panda-vermelho, aves e pequenos mamíferos) depende dos bambuçais como fonte principal de alimento e refúgio natural.",
    feedbackIncorrect:
      "A resposta correta é o panda-gigante! Ele depende dos bambuzais para se alimentar de brotos e folhas e encontra abrigo seguro entre a vegetação densa."
  },
  {
    id: "q3_importancia",
    topic: "3. Importância Ecológica",
    question: "Como os bambuçais contribuem para o equilíbrio ambiental e a proteção da biodiversidade?",
    options: [
      "Impedem a infiltração de água das chuvas e secam os lençóis freáticos.",
      "Aumentam o aquecimento global ao liberar grandes volumes de gás carbônico durante o dia.",
      "Absorvem gás carbônico, protegem nascentes contra erosão e servem de habitat para várias espécies.",
      "Eliminam todos os nutrientes da terra, impedindo o desenvolvimento de outros seres vivos."
    ],
    correctIndex: 2,
    feedbackCorrect:
      "Correto! Os bambuçais sequestram carbono rapidamente, ajudam a conservar a água no solo, evitam deslizamentos e sustentam diversas cadeias alimentares.",
    feedbackIncorrect:
      "A resposta correta é a terceira opção: os bambuçais absorvem gás carbônico, protegem o solo e as nascentes contra a erosão e oferecem abrigo para muitas espécies."
  },
  {
    id: "q4_ameacas",
    topic: "4. Perigos e Ameaças",
    question: "Quais ações humanas representam as maiores ameaças à conservação dos bambuzais e da fauna local?",
    options: [
      "O monitoramento climático com sensores e a criação de corredores ecológicos.",
      "A pesquisa científica sobre bioacústica e a educação ambiental nas escolas.",
      "O desmatamento, as queimadas e a fragmentação do habitat natural.",
      "A preservação de áreas verdes e a proteção de nascentes próximas."
    ],
    correctIndex: 2,
    feedbackCorrect:
      "Correto! Queimadas, desmatamento e expansão urbana desordenada destroem o habitat natural, fragmentam a vegetação e colocam a fauna em risco.",
    feedbackIncorrect:
      "A resposta correta é a terceira opção: o desmatamento, as queimadas e a fragmentação do habitat são os principais fatores humanos que degradam os bambuçais."
  },
  {
    id: "q5_tecnologia",
    topic: "5. Preservação e Tecnologia",
    question: "De que forma a tecnologia atual pode ajudar na preservação e no monitoramento dos bambuçais?",
    options: [
      "Substituindo todas as plantas naturais por estruturas artificiais de plástico.",
      "Usando sensores ambientais, drones e câmeras inteligentes para detectar incêndios, umidade e fauna em tempo real.",
      "Desligando estações meteorológicas para evitar que o vento movimente os bambus.",
      "Retirando toda a vegetação nativa para facilitar a passagem de veículos pesados."
    ],
    correctIndex: 1,
    feedbackCorrect:
      "Correto! Sensores de umidade, detectores de CO₂, drones e câmeras inteligentes permitem identificar queimadas e mudanças ambientais rapidamente para proteger o bioma.",
    feedbackIncorrect:
      "A resposta correta é a segunda opção: sensores ambientais, drones e câmeras inteligentes auxiliam no monitoramento em tempo real de incêndios, clima e biodiversidade."
  }
];

export function getQuizResultFeedback(score: number): string {
  if (score >= 5000) {
    return "Excelente! Você domina o conhecimento sobre o Bambuçal!";
  }
  if (score >= 3000) {
    return "Muito bem! Você demonstrou ótimos conhecimentos!";
  }
  if (score >= 1000) {
    return "Continue aprendendo! Você está evoluindo!";
  }
  return "Não desanime! Conhecer a natureza é o primeiro passo para protegê-la!";
}
