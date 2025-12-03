import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock, User } from "lucide-react";
import logoFioforte from "@/assets/logo-grupo-fioforte.png";
import { useToast } from "@/hooks/use-toast";

interface AdminLoginProps {
  onLogin: () => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simular delay de autenticação
    setTimeout(() => {
      if (username === "RH" && password === "1234") {
        sessionStorage.setItem("adminAuth", "true");
        toast({ title: "Login realizado com sucesso!" });
        onLogin();
      } else {
        setError("Usuário ou senha incorretos");
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <img
            src={logoFioforte}
            alt="Grupo FIOFORTE Logo"
            className="w-20 h-20 object-contain mb-4"
          />
          <h1 className="text-xl font-bold text-foreground">Painel RH</h1>
          <p className="text-sm text-muted-foreground">Acesso restrito</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 border border-border/50 space-y-4">
          <div>
            <Label htmlFor="username" className="text-sm text-muted-foreground">
              Usuário
            </Label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10"
                placeholder="Digite seu usuário"
                autoComplete="username"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password" className="text-sm text-muted-foreground">
              Senha
            </Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                placeholder="Digite sua senha"
                autoComplete="current-password"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-6">
          Acesso exclusivo para equipe de RH
        </p>
      </div>
    </div>
  );
}
