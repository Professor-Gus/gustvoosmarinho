import React, { useState } from "react";
import {
  Sprout,
  Award,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  ArrowLeft,
  Cpu,
  ShieldAlert,
  Trees,
  Sparkles,
  Trophy
} from "lucide-react";
import {
  BAMBUCAL_QUIZ_QUESTIONS,
  QUIZ_POINTS_PER_QUESTION,
  QUIZ_MAX_SCORE,
  getQuizResultFeedback
} from "../data/bambucalQuiz";
import { ThemeColors } from "../themes";

interface BambucalQuizProps {
  colors: ThemeColors;
  glowColor: string;
  onBackToPresentation: () => void;
}

interface AnswerRecord {
  questionId: string;
  topic: string;
  selectedIndex: number;
  correctIndex: number;
  isCorrect: boolean;
}

// Kahoot-inspired high-contrast accessible option styles with distinct geometric shapes
const OPTION_STYLES = [
  {
    letter: "A",
    shape: "▲",
    bg: "#dc2626",
    hoverBg: "#ef4444",
    border: "#fca5a5",
    label: "Vermelho"
  },
  {
    letter: "B",
    shape: "◆",
    bg: "#2563eb",
    hoverBg: "#3b82f6",
    border: "#93c5fd",
    label: "Azul"
  },
  {
    letter: "C",
    shape: "●",
    bg: "#ca8a04",
    hoverBg: "#eab308",
    border: "#fde047",
    label: "Amarelo"
  },
  {
    letter: "D",
    shape: "■",
    bg: "#16a34a",
    hoverBg: "#22c55e",
    border: "#86efac",
    label: "Verde"
  }
];

export const BambucalQuiz: React.FC<BambucalQuizProps> = ({
  colors,
  glowColor,
  onBackToPresentation
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const totalQuestions = BAMBUCAL_QUIZ_QUESTIONS.length;
  const currentQuestion = BAMBUCAL_QUIZ_QUESTIONS[currentIndex];
  const hasAnswered = selectedOption !== null;
  const isCurrentCorrect = hasAnswered && selectedOption === currentQuestion.correctIndex;

  const progressPercentage = isCompleted
    ? 100
    : Math.round(((currentIndex + (hasAnswered ? 1 : 0)) / totalQuestions) * 100);

  const handleSelectOption = (optionIndex: number) => {
    // Bloqueia novas seleções na mesma pergunta após resposta para evitar pontuação duplicada
    if (selectedOption !== null || isCompleted) return;

    const isCorrect = optionIndex === currentQuestion.correctIndex;
    setSelectedOption(optionIndex);

    if (isCorrect) {
      setScore((prev) => prev + QUIZ_POINTS_PER_QUESTION);
    }

    setAnswers((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        topic: currentQuestion.topic,
        selectedIndex: optionIndex,
        correctIndex: currentQuestion.correctIndex,
        isCorrect
      }
    ]);
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setAnswers([]);
    setIsCompleted(false);
  };

  const getTopicIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Sprout className="w-4 h-4 shrink-0" style={{ color: colors.primary }} />;
      case 1:
        return <Sparkles className="w-4 h-4 shrink-0" style={{ color: colors.accent }} />;
      case 2:
        return <Trees className="w-4 h-4 shrink-0" style={{ color: colors.primary }} />;
      case 3:
        return <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400" />;
      case 4:
        return <Cpu className="w-4 h-4 shrink-0" style={{ color: colors.primary }} />;
      default:
        return <Sprout className="w-4 h-4 shrink-0" />;
    }
  };

  const correctCount = answers.filter((a) => a.isCorrect).length;
  const incorrectCount = totalQuestions - correctCount;
  const accuracyPercent = Math.round((correctCount / totalQuestions) * 100);
  const encouragementMessage = getQuizResultFeedback(score);

  return (
    <div className="max-w-5xl mx-auto w-full space-y-5 animate-fade-in">
      {/* Top Quiz Header Bar */}
      <div
        className="rounded-2xl p-4 sm:p-5 border-2 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg"
        style={{
          backgroundColor: colors.bgSurface,
          borderColor: colors.borderSubtle,
          boxShadow: `0 0 24px ${glowColor}`
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center border shrink-0 shadow-sm"
            style={{
              backgroundColor: colors.primary,
              color: colors.primaryText,
              borderColor: colors.borderMain
            }}
          >
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <h1
              className="font-display font-black text-base sm:text-xl uppercase tracking-wider leading-tight"
              style={{ color: colors.textPrimary }}
            >
              QUIZ DO BAMBUÇAL
            </h1>
            <p className="text-xs font-mono mt-0.5" style={{ color: colors.textMuted }}>
              Gustavo e Isabely · Ecossistema Bambuçal · Monitoramento e Preservação
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Score Display */}
          <div
            className="px-3.5 py-2 rounded-xl border flex items-center gap-2 font-mono tabular-nums"
            style={{
              backgroundColor: colors.bgCard,
              borderColor: colors.borderMain
            }}
          >
            <Trophy className="w-4 h-4 shrink-0" style={{ color: colors.accent }} />
            <div className="text-xs font-bold" style={{ color: colors.textPrimary }}>
              {score.toLocaleString("pt-BR")} <span className="opacity-70">/ 5.000 pts</span>
            </div>
          </div>

          {/* Progress Counter */}
          {!isCompleted && (
            <div
              className="px-3 py-2 rounded-xl border font-mono text-xs font-bold tabular-nums"
              style={{
                backgroundColor: colors.bgCard,
                borderColor: colors.borderSubtle,
                color: colors.textSecondary
              }}
            >
              {currentIndex + 1}/{totalQuestions}
            </div>
          )}

          <button
            type="button"
            onClick={onBackToPresentation}
            className="px-3.5 py-2 rounded-xl border font-mono text-xs font-bold uppercase flex items-center gap-1.5 transition-all cursor-pointer hover:brightness-110 active:scale-95 whitespace-nowrap"
            style={{
              backgroundColor: colors.bgCard,
              borderColor: colors.borderSubtle,
              color: colors.textPrimary
            }}
          >
            <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
            <span>Apresentação</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div
        className="w-full rounded-full h-3 overflow-hidden border"
        style={{
          backgroundColor: colors.bgCard,
          borderColor: colors.borderSubtle
        }}
        role="progressbar"
        aria-valuenow={progressPercentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full transition-all duration-500 ease-out rounded-full"
          style={{
            width: `${progressPercentage}%`,
            backgroundColor: colors.primary,
            boxShadow: `0 0 12px ${glowColor}`
          }}
        />
      </div>

      {/* MAIN QUIZ BODY: Question Stage OR Results Screen */}
      {!isCompleted ? (
        <div
          key={currentQuestion.id}
          className="rounded-3xl p-5 sm:p-8 border-2 backdrop-blur-md space-y-6 shadow-2xl transition-all duration-300"
          style={{
            backgroundColor: colors.bgSurface,
            borderColor: colors.borderMain,
            boxShadow: `0 0 30px ${glowColor}`
          }}
        >
          {/* Question Topic & Step */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <div className="flex items-center gap-2" style={{ color: colors.textSecondary }}>
              {getTopicIcon(currentIndex)}
              <span className="font-bold">{currentQuestion.topic}</span>
            </div>
            <span className="tabular-nums font-bold" style={{ color: colors.textMuted }}>
              Pergunta {currentIndex + 1} de {totalQuestions} · Vale 1.000 pontos
            </span>
          </div>

          {/* Centered Featured Question */}
          <div
            className="rounded-2xl p-5 sm:p-8 border text-center"
            style={{
              backgroundColor: colors.bgCard,
              borderColor: colors.borderSubtle
            }}
          >
            <h2
              className="font-display font-bold text-lg sm:text-2xl md:text-[26px] leading-snug max-w-3xl mx-auto"
              style={{ color: colors.textPrimary, textWrap: "balance" as any }}
            >
              {currentQuestion.question}
            </h2>
          </div>

          {/* 4 Big Colorful Kahoot-Style Answer Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            {currentQuestion.options.map((optionText, idx) => {
              const style = OPTION_STYLES[idx];
              const isSelected = selectedOption === idx;
              const isCorrectOption = idx === currentQuestion.correctIndex;

              let opacityClass = "opacity-100";
              let ringStyle = "";
              if (hasAnswered) {
                if (isCorrectOption) {
                  opacityClass = "opacity-100 scale-[1.01]";
                  ringStyle = "ring-4 ring-white shadow-[0_0_25px_rgba(255,255,255,0.45)]";
                } else if (isSelected && !isCorrectOption) {
                  opacityClass = "opacity-90";
                  ringStyle = "ring-4 ring-red-300";
                } else {
                  opacityClass = "opacity-40";
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(idx)}
                  disabled={hasAnswered}
                  className={`group relative w-full min-h-[84px] sm:min-h-[100px] p-4 sm:p-5 rounded-2xl border-2 text-left text-white transition-all duration-200 flex items-center gap-3.5 shadow-lg ${
                    !hasAnswered
                      ? "cursor-pointer hover:scale-[1.015] hover:brightness-110 active:scale-[0.985]"
                      : "cursor-default"
                  } ${opacityClass} ${ringStyle}`}
                  style={{
                    backgroundColor: style.bg,
                    borderColor: isSelected || (hasAnswered && isCorrectOption) ? "#ffffff" : style.border
                  }}
                >
                  {/* Geometric Shape + Letter */}
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-black/25 border border-white/30 flex flex-col items-center justify-center shrink-0 font-mono font-black">
                    <span className="text-sm leading-none">{style.shape}</span>
                    <span className="text-[10px] leading-none mt-0.5 opacity-90">{style.letter}</span>
                  </div>

                  {/* Option Text */}
                  <span className="flex-1 font-sans font-bold text-sm sm:text-base leading-snug text-white drop-shadow-xs">
                    {optionText}
                  </span>

                  {/* Status Icon after Answering */}
                  {hasAnswered && isCorrectOption && (
                    <div className="shrink-0 flex items-center gap-1 bg-black/35 px-2.5 py-1 rounded-lg border border-white/40 text-[11px] font-mono font-black uppercase">
                      <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                      <span className="hidden md:inline">Correta</span>
                    </div>
                  )}
                  {hasAnswered && isSelected && !isCorrectOption && (
                    <div className="shrink-0 flex items-center gap-1 bg-black/35 px-2.5 py-1 rounded-lg border border-white/40 text-[11px] font-mono font-black uppercase">
                      <XCircle className="w-4 h-4 text-red-200 shrink-0" />
                      <span className="hidden md:inline">Sua escolha</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Immediate Explanatory Feedback + Next Question Button */}
          {hasAnswered && (
            <div
              className="rounded-2xl p-4 sm:p-5 border-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in"
              style={{
                backgroundColor: isCurrentCorrect ? "rgba(16, 185, 129, 0.14)" : "rgba(239, 68, 68, 0.14)",
                borderColor: isCurrentCorrect ? "#10b981" : "#ef4444"
              }}
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 font-mono font-black text-sm uppercase">
                  {isCurrentCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span className="text-emerald-300">Resposta Correta! +1.000 pontos</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                      <span className="text-red-300">Resposta Incorreta · 0 pontos</span>
                    </>
                  )}
                </div>
                <p className="text-xs sm:text-sm font-sans leading-relaxed" style={{ color: colors.textPrimary }}>
                  {isCurrentCorrect ? currentQuestion.feedbackCorrect : currentQuestion.feedbackIncorrect}
                </p>
              </div>

              <button
                type="button"
                onClick={handleNextQuestion}
                className="px-6 py-3.5 rounded-xl font-display font-black text-xs sm:text-sm uppercase tracking-wider border-2 flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-105 active:scale-95 shrink-0 shadow-md whitespace-nowrap"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.primaryText,
                  borderColor: colors.borderMain
                }}
              >
                <span>{currentIndex + 1 < totalQuestions ? "Próxima Pergunta" : "Ver Resultado Final"}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* RESULTS SCREEN */
        <div
          className="rounded-3xl p-6 sm:p-10 border-2 backdrop-blur-md space-y-6 shadow-2xl text-center animate-fade-in"
          style={{
            backgroundColor: colors.bgSurface,
            borderColor: colors.borderMain,
            boxShadow: `0 0 32px ${glowColor}`
          }}
        >
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center border-2 shadow-lg"
              style={{
                backgroundColor: colors.primary,
                color: colors.primaryText,
                borderColor: colors.borderMain
              }}
            >
              <Award className="w-9 h-9 sm:w-11 sm:h-11" />
            </div>

            <div className="space-y-1">
              <p className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: colors.textMuted }}>
                Resultado do Quiz do Bambuçal
              </p>
              <h2
                className="font-display font-black text-3xl sm:text-5xl tabular-nums"
                style={{ color: colors.textPrimary }}
              >
                {score.toLocaleString("pt-BR")} <span className="text-lg sm:text-2xl opacity-75">/ {QUIZ_MAX_SCORE.toLocaleString("pt-BR")} pontos</span>
              </h2>
            </div>

            <p
              className="font-display font-bold text-base sm:text-xl max-w-xl mx-auto mt-1"
              style={{ color: colors.accent }}
            >
              {encouragementMessage}
            </p>
          </div>

          {/* Metrics Grid: Acertos, Erros, Aproveitamento */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-2xl mx-auto">
            <div
              className="p-4 rounded-2xl border flex flex-col items-center gap-1"
              style={{
                backgroundColor: colors.bgCard,
                borderColor: colors.borderSubtle
              }}
            >
              <span className="text-[11px] font-mono uppercase font-bold" style={{ color: colors.textMuted }}>
                Respostas Corretas
              </span>
              <span className="font-display font-black text-2xl sm:text-3xl text-emerald-400 tabular-nums">
                {correctCount}
              </span>
            </div>

            <div
              className="p-4 rounded-2xl border flex flex-col items-center gap-1"
              style={{
                backgroundColor: colors.bgCard,
                borderColor: colors.borderSubtle
              }}
            >
              <span className="text-[11px] font-mono uppercase font-bold" style={{ color: colors.textMuted }}>
                Respostas Incorretas
              </span>
              <span className="font-display font-black text-2xl sm:text-3xl text-red-400 tabular-nums">
                {incorrectCount}
              </span>
            </div>

            <div
              className="p-4 rounded-2xl border flex flex-col items-center gap-1"
              style={{
                backgroundColor: colors.bgCard,
                borderColor: colors.borderSubtle
              }}
            >
              <span className="text-[11px] font-mono uppercase font-bold" style={{ color: colors.textMuted }}>
                Aproveitamento
              </span>
              <span className="font-display font-black text-2xl sm:text-3xl tabular-nums" style={{ color: colors.primary }}>
                {accuracyPercent}%
              </span>
            </div>
          </div>

          {/* Question Summary List */}
          <div
            className="max-w-2xl mx-auto rounded-2xl border p-4 text-left space-y-2"
            style={{
              backgroundColor: colors.bgCard,
              borderColor: colors.borderSubtle
            }}
          >
            <div className="text-xs font-mono font-bold uppercase tracking-wider pb-1 border-b" style={{ color: colors.textMuted, borderColor: colors.borderSubtle }}>
              Resumo por Tema
            </div>
            <div className="space-y-2">
              {answers.map((ans) => (
                <div key={ans.questionId} className="flex items-center justify-between gap-2 text-xs font-mono">
                  <div className="flex items-center gap-2 min-w-0">
                    {ans.isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                    )}
                    <span className="truncate" style={{ color: colors.textPrimary }}>
                      {ans.topic}
                    </span>
                  </div>
                  <span className={`font-bold shrink-0 tabular-nums ${ans.isCorrect ? "text-emerald-400" : "text-red-400"}`}>
                    {ans.isCorrect ? "+1.000 pts" : "0 pts"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Required Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              type="button"
              onClick={handleRestartQuiz}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl font-display font-black text-xs sm:text-sm uppercase tracking-wider border-2 flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-lg"
              style={{
                backgroundColor: colors.primary,
                color: colors.primaryText,
                borderColor: colors.borderMain
              }}
            >
              <RotateCcw className="w-4 h-4 shrink-0" />
              <span>JOGAR NOVAMENTE</span>
            </button>

            <button
              type="button"
              onClick={onBackToPresentation}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl font-display font-black text-xs sm:text-sm uppercase tracking-wider border-2 flex items-center justify-center gap-2 transition-all cursor-pointer hover:brightness-110 active:scale-95 shadow-lg"
              style={{
                backgroundColor: colors.bgCard,
                color: colors.textPrimary,
                borderColor: colors.borderSubtle
              }}
            >
              <ArrowLeft className="w-4 h-4 shrink-0" />
              <span>VOLTAR À APRESENTAÇÃO</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
