import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <div className="relative w-full max-w-2xl">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        type="search"
        placeholder="Buscar alunos, professores, cursos..."
        className="w-full h-10 pl-9 pr-4 rounded-full bg-card border border-border focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-sm placeholder:text-muted-foreground"
      />
    </div>
  );
}