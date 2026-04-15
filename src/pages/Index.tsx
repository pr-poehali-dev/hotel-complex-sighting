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
  const [headerVisible, setHeaderVisible] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const timer = setTimeout(() => setHeaderVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.15 }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToStage = (slug: string) => {
    const el = sectionRefs.current[slug];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className="min-h-screen relative"
      style={{ backgroundColor: "var(--parchment)", fontFamily: "'Cormorant Garamond', serif" }}
    >
      {/* HERO — map as full background */}
      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Map background — full bleed */}
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
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 80% 60%, rgba(74,124,142,0.18) 0%, transparent 60%)",
          }}
        />
        {/* Fade to parchment at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "120px",
            background: "linear-gradient(to bottom, transparent, var(--parchment))",
            pointerEvents: "none",
            zIndex: 5,
          }}
        />

        {/* Header overlay */}
        <header
          style={{
            position: "relative",
            zIndex: 20,
            textAlign: "center",
            paddingTop: "3rem",
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
                textShadow: "0 0 10px var(--parchment), 0 0 20px var(--parchment)",
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
                textShadow: "0 0 15px var(--parchment), 0 0 30px var(--parchment), 0 0 45px var(--parchment)",
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
                textShadow: "0 0 10px var(--parchment), 0 0 20px var(--parchment)",
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
        </header>

        {/* Map interactive area */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            aspectRatio: "16/9",
            zIndex: 10,
          }}
        >

          {/* Dotted path */}
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
              strokeWidth="1.4"
              strokeDasharray="3,2.5"
              strokeLinecap="round"
              strokeOpacity="0.85"
            />
          </svg>

          {/* X crosses on map */}
          {stages.map((stage, idx) => {
            const isLast = stage.id === 6;
            const labelBelow = idx % 2 === 0;
            return (
              <button
                key={stage.id}
                onClick={() => scrollToStage(stage.slug)}
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
                  <svg
                    width="76"
                    height="76"
                    viewBox="0 0 76 76"
                    style={{
                      filter: `drop-shadow(0 3px 8px rgba(44,24,16,0.6))`,
                      transition: "transform 0.25s ease",
                    }}
                    className="cross-svg"
                    onMouseEnter={(e) => { (e.currentTarget as SVGElement).style.transform = "scale(1.25) rotate(12deg)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as SVGElement).style.transform = "scale(1) rotate(0deg)"; }}
                  >
                    <line x1="10" y1="10" x2="66" y2="66" stroke="var(--ink)" strokeWidth={isLast ? "16" : "14"} strokeLinecap="round" opacity="0.4" />
                    <line x1="66" y1="10" x2="10" y2="66" stroke="var(--ink)" strokeWidth={isLast ? "16" : "14"} strokeLinecap="round" opacity="0.4" />
                    <line x1="10" y1="10" x2="66" y2="66" stroke={stage.color} strokeWidth={isLast ? "12" : "10"} strokeLinecap="round" />
                    <line x1="66" y1="10" x2="10" y2="66" stroke={stage.color} strokeWidth={isLast ? "12" : "10"} strokeLinecap="round" />
                    {isLast && (
                      <circle cx="38" cy="38" r="33" fill="none" stroke={stage.color} strokeWidth="4.5" strokeDasharray="6,5" />
                    )}
                  </svg>

                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      fontFamily: "'Cormorant', serif",
                      fontWeight: 700,
                      fontSize: "1.15rem",
                      color: "var(--parchment)",
                      textShadow: `0 0 6px ${stage.color}, 0 0 6px ${stage.color}, 0 0 6px ${stage.color}, 0 0 10px var(--ink)`,
                      pointerEvents: "none",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {["I", "II", "III", "IV", "V", "VI"][idx]}
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      ...(labelBelow ? { top: "calc(100% + 4px)" } : { bottom: "calc(100% + 4px)" }),
                      left: "50%",
                      transform: "translateX(-50%)",
                      pointerEvents: "none",
                      zIndex: 50,
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Caveat', cursive",
                        fontSize: "clamp(0.95rem, 1.8vw, 1.3rem)",
                        color: "var(--ink)",
                        textShadow: "0 0 8px var(--parchment), 0 0 8px var(--parchment), 0 0 8px var(--parchment), 0 0 16px var(--parchment), 0 0 20px var(--parchment)",
                        lineHeight: 1.2,
                        fontWeight: 700,
                        maxWidth: "140px",
                        whiteSpace: "normal",
                        transition: "color 0.2s",
                      }}
                      className="cross-label"
                    >
                      {stage.title}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}

          {/* Compass */}
          <div style={{ position: "absolute", bottom: "1rem", right: "1rem", fontSize: "2.5rem", opacity: 0.6, pointerEvents: "none", userSelect: "none" }}>
            🧭
          </div>

          {/* Scale */}
          <div style={{ position: "absolute", bottom: "1rem", left: "1rem", opacity: 0.75, fontFamily: "'Caveat', cursive", color: "var(--ink)" }}>
            <div style={{ display: "flex" }}>
              <div style={{ width: "2rem", height: "0.5rem", backgroundColor: "var(--ink)" }} />
              <div style={{ width: "2rem", height: "0.5rem", border: "1px solid var(--ink)", backgroundColor: "var(--parchment)" }} />
            </div>
            <div style={{ fontSize: "0.7rem", marginTop: "0.15rem" }}>0 — 100 м</div>
          </div>

          {/* Hint */}
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
            ⚓ Кликни на крестик — страница прокрутится к этапу
          </div>
        </div>{/* end map interactive area */}
      </section>{/* end hero */}

      {/* STAGES — full sections */}
      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 1rem 2rem" }}>
        {stages.map((stage, idx) => {
          const isVisible = visibleSections.has(stage.slug);
          const isEven = idx % 2 === 0;
          return (
            <div
              key={stage.id}
              id={stage.slug}
              ref={(el) => { sectionRefs.current[stage.slug] = el; }}
              style={{
                position: "relative",
                paddingLeft: "3rem",
                paddingBottom: "3rem",
                borderLeft: idx < stages.length - 1 ? "3px dashed var(--gold)" : "3px dashed transparent",
                marginLeft: "1.5rem",
                scrollMarginTop: "2rem",
              }}
            >
              {/* Timeline cross marker */}
              <div
                style={{
                  position: "absolute",
                  left: "-1.5rem",
                  top: "0",
                  width: "3rem",
                  height: "3rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="40" height="40" viewBox="0 0 40 40">
                  <line x1="6" y1="6" x2="34" y2="34" stroke={stage.color} strokeWidth="5" strokeLinecap="round" />
                  <line x1="34" y1="6" x2="6" y2="34" stroke={stage.color} strokeWidth="5" strokeLinecap="round" />
                </svg>
              </div>

              {/* Content card */}
              <div
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? "translateX(0)"
                    : isEven ? "translateX(-30px)" : "translateX(30px)",
                  transition: "opacity 0.7s ease, transform 0.7s ease",
                  background: "linear-gradient(135deg, var(--parchment) 0%, var(--parchment-dark) 100%)",
                  border: `2px solid ${stage.color}`,
                  borderRadius: "6px",
                  padding: "1.75rem 2rem",
                  boxShadow: `0 4px 20px ${stage.color}20, 0 2px 8px rgba(44,24,16,0.1)`,
                  position: "relative",
                }}
              >
                {/* Corner ornaments */}
                <span style={{ position: "absolute", top: "0.4rem", left: "0.5rem", color: stage.color, opacity: 0.5, fontSize: "0.8rem", pointerEvents: "none" }}>✦</span>
                <span style={{ position: "absolute", top: "0.4rem", right: "0.5rem", color: stage.color, opacity: 0.5, fontSize: "0.8rem", pointerEvents: "none" }}>✦</span>

                {/* Badge + Title */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "2.2rem" }}>{stage.emoji}</span>
                  <span
                    style={{
                      fontSize: "0.65rem",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "9999px",
                      backgroundColor: stage.color,
                      color: "white",
                      fontFamily: "'Oswald', sans-serif",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Этап {["I", "II", "III", "IV", "V", "VI"][idx]}
                  </span>
                </div>

                <h2
                  style={{
                    fontFamily: "'Cormorant', serif",
                    color: "var(--ink)",
                    fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
                    fontWeight: 700,
                    lineHeight: 1.15,
                    margin: "0 0 0.25rem",
                  }}
                >
                  {stage.title}
                </h2>
                <p
                  style={{
                    fontFamily: "'Caveat', cursive",
                    color: stage.color,
                    fontSize: "1rem",
                    margin: "0 0 1rem",
                  }}
                >
                  ~ {stage.subtitle} ~
                </p>

                <div style={{ width: "100%", height: "1px", background: `linear-gradient(to right, ${stage.color}, transparent)`, marginBottom: "1rem" }} />

                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "var(--ink-light)",
                    fontSize: "1.1rem",
                    fontStyle: "italic",
                    lineHeight: 1.6,
                    marginBottom: "1.25rem",
                  }}
                >
                  {stage.content.description}
                </p>

                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {stage.content.details.map((detail, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                      <span
                        style={{
                          marginTop: "3px",
                          flexShrink: 0,
                          width: "1.3rem",
                          height: "1.3rem",
                          borderRadius: "50%",
                          backgroundColor: stage.color,
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
                          fontSize: "1.05rem",
                          lineHeight: 1.5,
                        }}
                      >
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </main>

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

      <style>{`
        @keyframes pulse-cross {
          0%, 100% { filter: drop-shadow(0 0 0 rgba(200,149,42,0.3)); }
          50% { filter: drop-shadow(0 0 6px rgba(200,149,42,0.5)); }
        }
        .map-marker { animation: pulse-cross 3s ease-in-out infinite; }

        button.group:hover .cross-label {
          color: var(--red-mark) !important;
        }
        button.group:hover .cross-svg {
          filter: drop-shadow(0 0 8px rgba(139,32,32,0.5)) !important;
        }

        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
        .path-svg {
          stroke-dasharray: 1200;
          stroke-dashoffset: 1200;
          animation: dash 3s ease forwards;
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
}