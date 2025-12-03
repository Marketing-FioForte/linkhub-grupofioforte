import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 w-12 h-12 bg-primary hover:bg-fio-blue-glow active:scale-[0.95] transition-all duration-200 rounded-full flex items-center justify-center shadow-fio-glow z-50 tap-highlight-none animate-scale-in"
      aria-label="Voltar ao topo"
    >
      <ArrowUp className="w-5 h-5 text-primary-foreground" />
    </button>
  );
}
