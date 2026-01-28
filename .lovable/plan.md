

## Plano: Remover Seção Institucional

Vou remover a seção "Institucional" que exibe os dois cards (Canal de Denúncias e Política de Privacidade) da página principal.

### Mudança necessária

**Arquivo: `src/pages/Index.tsx`**
- Remover a importação do componente `InstitutionalSection`
- Remover o componente `<InstitutionalSection />` do JSX

### Código atual:
```tsx
import { InstitutionalSection } from "@/components/hub/InstitutionalSection";
// ...
<SipatSchedule />
<InstitutionalSection />  // ← Será removido
<AdminAccessButton />
```

### Código após a mudança:
```tsx
// Importação removida
// ...
<SipatSchedule />
<AdminAccessButton />
```

### O que será mantido (para uso futuro):
- O arquivo `src/components/hub/InstitutionalSection.tsx` permanece no projeto
- O editor no admin `src/components/admin/InstitutionalEditor.tsx` permanece
- A configuração `institutional` no `HubConfigContext` permanece

Isso permite reativar a seção facilmente no futuro, se necessário.

