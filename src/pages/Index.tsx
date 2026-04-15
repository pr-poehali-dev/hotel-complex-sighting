import { useState, useEffect, useRef } from "react";

const MAP_BG = "https://cdn.poehali.dev/projects/d1eb884b-21b9-408d-aa16-2678ff3c327c/files/d20ca139-c87c-49f5-ad13-3a508a8e7a50.jpg";

interface Stage {
  id: number;
  slug: string;
  emoji: string;
  title: string;
  subtitle: string;
  color: string;
  x: string;
  y: string;
  content: {
    description: string;
    details: string[];
  };
}

const stages: Stage[] = [
  {
    id: 1,
    slug: "research",
    emoji: "🔭",
    title: "Предпроектное исследование",
    subtitle: "Начало путешествия",
    color: "#8b2020",
    x: "12%",
    y: "22%",
    content: {
      description: "Анализ территории, климата, конкурентов и потребительского спроса — фундамент всего проекта.",
      details: [
        "Геологические и климатические условия побережья",
        "Анализ конкурентной среды в регионе",
        "Исследование туристических потоков",
        "Социально-демографический портрет аудитории",
        "Оценка инфраструктуры и транспортной доступности",
      ],
    },
  },
  {
    id: 2,
    slug: "norms",
    emoji: "📜",
    title: "Методички и нормативы",
    subtitle: "Законы и правила",
    color: "#2c6e49",
    x: "32%",
    y: "14%",
    content: {
      description: "Проектирование велось в строгом соответствии с действующими нормами и профессиональными методическими материалами.",
      details: [
        "СП 257.1325800.2016 — здания гостиниц",
        "СНиП 2.08.02-89 — общественные здания",
        "ГОСТ Р 54606-2011 — классификация гостиниц",
        "Нормативы прибрежного строительства",
        "Методички кафедры по проектированию курортных объектов",
      ],
    },
  },
  {
    id: 3,
    slug: "audience",
    emoji: "🧭",
    title: "Для кого проект",
    subtitle: "Целевая аудитория",
    color: "#4a7c8e",
    x: "55%",
    y: "20%",
    content: {
      description: "Комплекс создан для тех, кто ищет уединённый отдых у моря с высоким уровнем сервиса и единением с природой.",
      details: [
        "Семьи с детьми — изолированные виллы с приватным пляжем",
        "Пары — романтические бунгало над водой",
        "Корпоративные группы — конференц-зоны + тимбилдинг",
        "Eco-туристы — эко-тропы, органическое питание",
        "Аудитория 30–55 лет, средний+ класс",
      ],
    },
  },
  {
    id: 4,
    slug: "concept",
    emoji: "💎",
    title: "В чём фишка",
    subtitle: "Уникальная идея",
    color: "#c8952a",
    x: "74%",
    y: "30%",
    content: {
      description: "Концепция «живого берега» — комплекс, который растворяется в природном ландшафте, а не доминирует над ним.",
      details: [
        "Корпуса вписаны в рельеф — нет ни одного срытого холма",
        "100% возобновляемая энергия: солнечные панели + геотермика",
        "Приватные бухты для каждого корпуса",
        "Архитектура в стиле прибрежного вернакуляра",
        "Живая кровля и вертикальное озеленение фасадов",
      ],
    },
  },
  {
    id: 5,
    slug: "references",
    emoji: "🗺️",
    title: "Референсы",
    subtitle: "Источники вдохновения",
    color: "#6b4c9a",
    x: "82%",
    y: "55%",
    content: {
      description: "Вдохновение черпалось из лучших прибрежных курортов мира — тех, что стали эталоном гармонии архитектуры и природы.",
      details: [
        "Soneva Jani, Мальдивы — плавучие виллы над лагуной",
        "Amangiri, США — интеграция в скальный ландшафт",
        "Six Senses Zil Pasyon, Сейшелы — экологичность как стиль",
        "Kokomo Private Island, Фиджи — полная приватность",
        "Клубный отель «Приморье», Владивосток — российский опыт",
      ],
    },
  },
  {
    id: 6,
    slug: "result",
    emoji: "🏖️",
    title: "Итоговый проект",
    subtitle: "Сокровище найдено",
    color: "#8b2020",
    x: "60%",
    y: "68%",
    content: {
      description: "Гостиничный комплекс «Живой берег» — 8 корпусов, 120 номеров, 4 категории размещения на участке 6,2 га.",
      details: [
        "Главный корпус: ресторан, спа, конференц-зал",
        "4 жилых корпуса + 12 отдельных вилл",
        "Открытые и закрытые бассейны",
        "Протяжённость частного пляжа — 380 м",
        "Пешеходные эко-тропы протяжённостью 2,4 км",
      ],
    },
  },
];

export default function Index() {
  const [activeStage, setActiveStage] = useState<Stage | null>(null);
  const [visitedStages, setVisitedStages] = useState<Set<number>>(new Set());
  const [headerVisible, setHeaderVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setHeaderVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const openStage = (stage: Stage) => {
    setActiveStage(stage);
    setVisitedStages((prev) => new Set([...prev, stage.id]));
  };

  const closeStage = () => setActiveStage(null);

  const goToNext = () => {
    if (!activeStage) return;
    const idx = stages.findIndex((s) => s.id === activeStage.id);
    openStage(stages[(idx + 1) % stages.length]);
  };

  const goToPrev = () => {
    if (!activeStage) return;
    const idx = stages.findIndex((s) => s.id === activeStage.id);
    openStage(stages[(idx - 1 + stages.length) % stages.length]);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeStage();
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: "var(--parchment)", fontFamily: "'Cormorant Garamond', serif" }}
    >
      {/* HEADER */}
      <header
        style={{
          position: "relative",
          zIndex: 20,
          textAlign: "center",
          paddingTop: "2.5rem",
          paddingBottom: "1.5rem",
          transition: "opacity 0.7s ease, transform 0.7s ease",
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(-24px)",
        }}
      >
        <div style={{ display: "inline-block", position: "relative" }}>
          <div
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              marginBottom: "0.5rem",
              color: "var(--gold)",
              fontFamily: "'Oswald', sans-serif",
            }}
          >
            ✦ &nbsp; Дипломный проект &nbsp; ✦
          </div>
          <h1
            style={{
              fontFamily: "'Cormorant', serif",
              color: "var(--ink)",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Гостиничный комплекс
            <br />
            <em style={{ color: "var(--gold)" }}>на берегу моря</em>
          </h1>
          <div
            style={{
              marginTop: "0.75rem",
              fontSize: "1.1rem",
              fontStyle: "italic",
              color: "var(--ink-light)",
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            Карта путешествия по проекту
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginTop: "1rem" }}>
            <div style={{ height: "1px", width: "5rem", background: "linear-gradient(to right, transparent, var(--gold))" }} />
            <span style={{ color: "var(--gold)", fontSize: "1.2rem" }}>⚓</span>
            <div style={{ height: "1px", width: "5rem", background: "linear-gradient(to left, transparent, var(--gold))" }} />
          </div>
        </div>

        {/* Progress tracker */}
        <div style={{ marginTop: "1.25rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}>
          <span style={{ fontSize: "0.8rem", fontStyle: "italic", color: "var(--ink-light)" }}>Открыто:</span>
          {stages.map((s) => (
            <button
              key={s.id}
              onClick={() => openStage(s)}
              title={s.title}
              style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "50%",
                fontSize: "0.65rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `2px solid ${visitedStages.has(s.id) ? s.color : "var(--gold)"}`,
                backgroundColor: visitedStages.has(s.id) ? s.color : "transparent",
                color: visitedStages.has(s.id) ? "white" : "var(--gold)",
                fontFamily: "'Oswald', sans-serif",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            >
              {visitedStages.has(s.id) ? "✓" : s.id}
            </button>
          ))}
          <span style={{ fontSize: "0.8rem", fontStyle: "italic", color: "var(--ink-light)", marginLeft: "0.25rem" }}>
            {visitedStages.size}/{stages.length}
          </span>
        </div>
      </header>

      {/* MAP */}
      <main style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", padding: "0 1rem 4rem" }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16/9",
            border: "3px solid var(--gold)",
            borderRadius: "6px",
            overflow: "hidden",
            boxShadow: "0 8px 40px rgba(44,24,16,0.2), inset 0 0 60px rgba(44,24,16,0.05)",
          }}
        >
          {/* Background */}
          <img
            src={MAP_BG}
            alt="Карта"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "sepia(30%) contrast(0.95) brightness(1.05)",
            }}
          />

          {/* Sea overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse at 80% 60%, rgba(74,124,142,0.18) 0%, transparent 60%)",
            }}
          />

          {/* Dotted path SVG */}
          <svg
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polyline
              className="path-svg"
              points="12,22 32,14 55,20 74,30 82,55 60,68"
              fill="none"
              stroke="var(--red-mark)"
              strokeWidth="0.5"
              strokeDasharray="2,1.5"
              strokeLinecap="round"
            />
          </svg>

          {/* Markers */}
          {stages.map((stage, idx) => (
            <button
              key={stage.id}
              onClick={() => openStage(stage)}
              title={stage.title}
              className="group"
              style={{
                position: "absolute",
                left: stage.x,
                top: stage.y,
                transform: "translate(-50%, -50%)",
                zIndex: 10,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <div
                className="map-marker"
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  animationDelay: `${idx * 0.4}s`,
                }}
              >
                {/* Visited badge */}
                {visitedStages.has(stage.id) && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-0.5rem",
                      right: "-0.5rem",
                      width: "1.1rem",
                      height: "1.1rem",
                      borderRadius: "50%",
                      backgroundColor: stage.color,
                      color: "white",
                      fontSize: "0.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 20,
                      border: "1.5px solid var(--parchment)",
                    }}
                  >
                    ✓
                  </div>
                )}

                {/* Pin circle */}
                <div
                  className="pin-circle"
                  style={{
                    width: "clamp(2.5rem, 4vw, 3.5rem)",
                    height: "clamp(2.5rem, 4vw, 3.5rem)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
                    backgroundColor: "var(--parchment)",
                    border: `3px solid ${stage.color}`,
                    boxShadow: `0 4px 16px rgba(44,24,16,0.25), 0 0 0 2px var(--parchment-dark)`,
                    transition: "transform 0.25s ease",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.2) translateY(-4px)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1) translateY(0)"; }}
                >
                  {stage.emoji}
                </div>

                {/* Pin stem */}
                <div
                  style={{
                    width: "4px",
                    height: "12px",
                    borderBottomLeftRadius: "4px",
                    borderBottomRightRadius: "4px",
                    backgroundColor: stage.color,
                    marginTop: "-2px",
                  }}
                />

                {/* Number badge */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "-4px",
                    left: "-4px",
                    width: "1.2rem",
                    height: "1.2rem",
                    borderRadius: "50%",
                    backgroundColor: stage.color,
                    color: "white",
                    fontSize: "0.6rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Oswald', sans-serif",
                    border: "1.5px solid var(--parchment)",
                  }}
                >
                  {stage.id}
                </div>

                {/* Tooltip */}
                <div
                  className="pin-tooltip"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                    opacity: 0,
                    transition: "opacity 0.2s",
                    zIndex: 50,
                  }}
                >
                  <div
                    style={{
                      padding: "0.3rem 0.75rem",
                      borderRadius: "2px",
                      backgroundColor: "var(--ink)",
                      color: "var(--parchment)",
                      fontFamily: "'Oswald', sans-serif",
                      fontSize: "0.7rem",
                      letterSpacing: "0.05em",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
                    }}
                  >
                    {stage.title}
                  </div>
                </div>
              </div>
            </button>
          ))}

          {/* Compass */}
          <div
            style={{
              position: "absolute",
              bottom: "1rem",
              right: "1rem",
              fontSize: "2.5rem",
              opacity: 0.6,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            🧭
          </div>

          {/* Scale bar */}
          <div
            style={{
              position: "absolute",
              bottom: "1rem",
              left: "1rem",
              opacity: 0.75,
              fontFamily: "'Caveat', cursive",
              color: "var(--ink)",
            }}
          >
            <div style={{ display: "flex" }}>
              <div style={{ width: "2rem", height: "0.5rem", backgroundColor: "var(--ink)" }} />
              <div style={{ width: "2rem", height: "0.5rem", border: "1px solid var(--ink)", backgroundColor: "var(--parchment)" }} />
            </div>
            <div style={{ fontSize: "0.7rem", marginTop: "0.15rem" }}>0 — 100 м</div>
          </div>

          {/* Cartouche hint */}
          <div
            style={{
              position: "absolute",
              top: "0.75rem",
              left: "50%",
              transform: "translateX(-50%)",
              padding: "0.3rem 1rem",
              backgroundColor: "rgba(244,232,204,0.9)",
              border: "1.5px solid var(--gold)",
              fontFamily: "'Caveat', cursive",
              color: "var(--ink)",
              fontSize: "0.85rem",
              borderRadius: "2px",
              backdropFilter: "blur(2px)",
              whiteSpace: "nowrap",
            }}
          >
            ⚓ Кликни на метку, чтобы открыть этап
          </div>
        </div>

        {/* Stage cards below map */}
        <div
          style={{
            marginTop: "2.5rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "1rem",
          }}
        >
          {stages.map((stage) => (
            <button
              key={stage.id}
              onClick={() => openStage(stage)}
              style={{
                textAlign: "left",
                padding: "1rem",
                borderRadius: "4px",
                backgroundColor: "rgba(244,232,204,0.7)",
                border: `2px solid ${visitedStages.has(stage.id) ? stage.color : "var(--gold)"}`,
                boxShadow: visitedStages.has(stage.id)
                  ? `0 4px 20px ${stage.color}30`
                  : "0 2px 8px rgba(44,24,16,0.1)",
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "1.5rem" }}>{stage.emoji}</span>
                <span
                  style={{
                    fontSize: "0.65rem",
                    padding: "0.15rem 0.5rem",
                    borderRadius: "9999px",
                    backgroundColor: stage.color,
                    color: "white",
                    fontFamily: "'Oswald', sans-serif",
                    letterSpacing: "0.05em",
                  }}
                >
                  Этап {stage.id}
                </span>
                {visitedStages.has(stage.id) && (
                  <span style={{ fontSize: "0.75rem", color: stage.color }}>✓</span>
                )}
              </div>
              <div
                style={{
                  fontFamily: "'Cormorant', serif",
                  color: "var(--ink)",
                  fontSize: "1rem",
                  fontWeight: 600,
                  lineHeight: 1.3,
                }}
              >
                {stage.title}
              </div>
              <div
                style={{
                  marginTop: "0.25rem",
                  fontSize: "0.85rem",
                  fontStyle: "italic",
                  color: "var(--ink-light)",
                  fontFamily: "'Cormorant Garamond', serif",
                }}
              >
                {stage.subtitle}
              </div>
            </button>
          ))}
        </div>
      </main>

      {/* MODAL */}
      {activeStage && (
        <div
          onClick={handleBackdropClick}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            backgroundColor: "rgba(44,24,16,0.65)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            ref={modalRef}
            className="animate-fade-in-up"
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "580px",
              maxHeight: "90vh",
              overflowY: "auto",
              background: "linear-gradient(135deg, var(--parchment) 0%, var(--parchment-dark) 100%)",
              border: `3px solid ${activeStage.color}`,
              borderRadius: "6px",
              boxShadow: `0 20px 60px rgba(44,24,16,0.4), 0 0 0 6px var(--parchment-dark), 0 0 0 8px ${activeStage.color}40`,
            }}
          >
            {/* Corner ornaments */}
            {["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"].map((pos, i) => (
              <span
                key={i}
                style={{
                  position: "absolute",
                  color: activeStage.color,
                  fontSize: "1rem",
                  opacity: 0.6,
                  pointerEvents: "none",
                  userSelect: "none",
                  ...(i === 0 ? { top: "0.5rem", left: "0.5rem" } :
                    i === 1 ? { top: "0.5rem", right: "0.5rem" } :
                    i === 2 ? { bottom: "0.5rem", left: "0.5rem" } :
                    { bottom: "0.5rem", right: "0.5rem" }),
                }}
              >
                ✦
              </span>
            ))}

            {/* Top row */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "1.5rem 1.5rem 0" }}>
              <div
                style={{
                  padding: "0.2rem 0.75rem",
                  borderRadius: "9999px",
                  backgroundColor: activeStage.color,
                  color: "white",
                  fontSize: "0.7rem",
                  fontFamily: "'Oswald', sans-serif",
                  letterSpacing: "0.08em",
                }}
              >
                Этап {activeStage.id} из {stages.length}
              </div>
              <button
                onClick={closeStage}
                style={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "50%",
                  backgroundColor: "var(--ink)",
                  color: "var(--parchment)",
                  fontSize: "0.9rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.1)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: "1rem 1.5rem 1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "3rem" }}>{activeStage.emoji}</span>
                <div>
                  <h2
                    style={{
                      fontFamily: "'Cormorant', serif",
                      color: "var(--ink)",
                      fontSize: "clamp(1.4rem, 4vw, 2rem)",
                      fontWeight: 700,
                      lineHeight: 1.1,
                      margin: 0,
                    }}
                  >
                    {activeStage.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: "'Caveat', cursive",
                      color: activeStage.color,
                      fontSize: "0.95rem",
                      margin: "0.25rem 0 0",
                    }}
                  >
                    ~ {activeStage.subtitle} ~
                  </p>
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  height: "1px",
                  background: `linear-gradient(to right, ${activeStage.color}, transparent)`,
                  marginBottom: "1rem",
                }}
              />

              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "var(--ink-light)",
                  fontSize: "1.05rem",
                  fontStyle: "italic",
                  lineHeight: 1.6,
                  marginBottom: "1.25rem",
                }}
              >
                {activeStage.content.description}
              </p>

              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {activeStage.content.details.map((detail, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <span
                      style={{
                        marginTop: "2px",
                        flexShrink: 0,
                        width: "1.25rem",
                        height: "1.25rem",
                        borderRadius: "50%",
                        backgroundColor: activeStage.color,
                        color: "white",
                        fontSize: "0.6rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "'Oswald', sans-serif",
                      }}
                    >
                      {i + 1}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        color: "var(--ink)",
                        fontSize: "1rem",
                        lineHeight: 1.5,
                      }}
                    >
                      {detail}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1rem 1.5rem",
                borderTop: `1px solid ${activeStage.color}40`,
              }}
            >
              <button
                onClick={goToPrev}
                style={{
                  padding: "0.4rem 1rem",
                  borderRadius: "3px",
                  backgroundColor: "transparent",
                  border: `1.5px solid ${activeStage.color}`,
                  color: activeStage.color,
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: "0.8rem",
                  letterSpacing: "0.05em",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
              >
                ← Назад
              </button>

              <div style={{ display: "flex", gap: "6px" }}>
                {stages.map((s) => (
                  <div
                    key={s.id}
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: s.id === activeStage.id ? activeStage.color : "#c4a97a",
                      transform: s.id === activeStage.id ? "scale(1.4)" : "scale(1)",
                      transition: "all 0.3s",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={goToNext}
                style={{
                  padding: "0.4rem 1rem",
                  borderRadius: "3px",
                  backgroundColor: activeStage.color,
                  border: `1.5px solid ${activeStage.color}`,
                  color: "white",
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: "0.8rem",
                  letterSpacing: "0.05em",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
              >
                Вперёд →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          paddingBottom: "2rem",
          fontSize: "0.9rem",
          fontStyle: "italic",
          color: "var(--ink-light)",
          fontFamily: "'Cormorant Garamond', serif",
        }}
      >
        <span style={{ color: "var(--gold)" }}>✦</span>
        &nbsp; Дипломный проект &nbsp;
        <span style={{ color: "var(--gold)" }}>✦</span>
      </footer>

      {/* Tooltip hover styles via global style tag */}
      <style>{`
        button:hover .pin-tooltip { opacity: 1 !important; }

        @keyframes pulse-glow {
          0%, 100% { filter: drop-shadow(0 0 0 rgba(200,149,42,0.4)); }
          50% { filter: drop-shadow(0 0 8px rgba(200,149,42,0.6)); }
        }
        .map-marker { animation: pulse-glow 2.5s ease-in-out infinite; }

        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
        .path-svg {
          stroke-dasharray: 1200;
          stroke-dashoffset: 1200;
          animation: dash 3s ease forwards;
          animation-delay: 0.5s;
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
