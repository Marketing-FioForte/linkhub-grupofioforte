import { Link } from "react-router-dom";
import { ArrowLeft, Construction } from "lucide-react";

const Admin = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-[480px] mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="w-16 h-16 bg-card rounded-2xl flex items-center justify-center mb-6 border border-border">
            <Construction className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-foreground mb-2">
            Painel RH
          </h1>
          <p className="text-muted-foreground mb-8">
            Em desenvolvimento
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 
                       px-6 py-3 min-h-[44px]
                       bg-primary text-primary-foreground rounded-lg
                       text-sm font-medium
                       hover:bg-primary/90 active:scale-[0.98]
                       transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Hub
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Admin;
