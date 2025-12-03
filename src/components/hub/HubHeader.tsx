import { hubConfig } from "@/config/hubConfig";
import { useState } from "react";

export function HubHeader() {
  const [imgError, setImgError] = useState(false);
  const { appTitle, appSubtitle, logoUrl } = hubConfig.global;

  return (
    <header className="flex flex-col items-center pt-8 pb-6">
      {!imgError ? (
        <div className="w-20 h-20 mb-4 rounded-2xl bg-card flex items-center justify-center overflow-hidden border border-border">
          <img
            src={logoUrl}
            alt="Grupo FIOFORTE Logo"
            className="w-full h-full object-contain p-2"
            onError={() => setImgError(true)}
          />
        </div>
      ) : (
        <div className="w-20 h-20 mb-4 rounded-full bg-primary flex items-center justify-center">
          <span className="text-2xl font-bold text-primary-foreground">GF</span>
        </div>
      )}
      <h1 className="text-xl font-bold text-foreground">{appTitle}</h1>
      <p className="text-sm text-muted-foreground">{appSubtitle}</p>
    </header>
  );
}
