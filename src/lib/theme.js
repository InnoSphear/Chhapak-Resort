export const UI_MODE = "luxury";

export const theme = {
  colors: {
    ivory: "#FFFEF9",
    cream: "#FAF7F0",
    sand: "#F5F0E8",
    champagne: "#E8DFD0",
    gold: {
      light: "#D4AF37",
      DEFAULT: "#C5A028",
      dark: "#A8871D",
    },
    charcoal: {
      light: "#2D2D2D",
      DEFAULT: "#1A1A1A",
      dark: "#0D0D0D",
    },
    champagne: {
      light: "#F7F3ED",
      DEFAULT: "#E8DFD0",
      dark: "#D4C9B8",
    },
  },
  fonts: {
    heading: "'Outfit', sans-serif",
    body: "'Outfit', sans-serif",
  },
  spacing: {
    section: "py-24 lg:py-32",
    container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  },
  animation: {
    duration: {
      fast: "150ms",
      normal: "300ms",
      slow: "500ms",
      slower: "800ms",
    },
    easing: {
      default: "cubic-bezier(0.4, 0, 0.2, 1)",
      bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      smooth: "cubic-bezier(0.25, 0.1, 0.25, 1)",
    },
  },
};

export const luxuryStyles = {
  button: {
    primary: "bg-[rgb(145,118,90)] hover:bg-[rgb(125,100,75)] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-xl",
    secondary: "bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-white hover:text-charcoal",
    outline: "border-2 border-[rgb(145,118,90)] text-[rgb(145,118,90)] px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-[rgb(145,118,90)] hover:text-white",
  },
  card: {
    luxury: "bg-white rounded-3xl shadow-xl shadow-charcoal/5 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2",
    glass: "bg-white/70 backdrop-blur-xl rounded-3xl border border-white/50 shadow-xl",
  },
  heading: {
    eyebrow: "text-sm font-semibold tracking-[0.3em] uppercase text-gold mb-4",
    main: "text-4xl lg:text-5xl font-bold text-charcoal leading-tight",
    sub: "text-xl text-charcoal/70 leading-relaxed",
  },
  section: {
    wrapper: "py-24 lg:py-32 bg-ivory",
    container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  },
};

export const dribbbleStyles = {
  button: {
    primary: "bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-105",
    secondary: "bg-white/20 backdrop-blur-xl text-white border border-white/20 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:bg-white/30 hover:backdrop-blur-2xl",
    outline: "border-2 border-violet-400 text-violet-400 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:bg-violet-500 hover:text-white hover:border-violet-500",
  },
  card: {
    glass: "bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl shadow-purple-500/10 transition-all duration-500 hover:bg-white/20 hover:shadow-purple-500/20",
  },
  gradient: {
    hero: "bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600",
    accent: "bg-gradient-to-r from-cyan-400 to-violet-500",
  },
};

export const getModeStyles = () => {
  return UI_MODE === "dribbble" ? dribbbleStyles : luxuryStyles;
};
