export function FormatarNome(nome: string) {
  return nome.trim().split(" ").slice(0, 2).join(" ");
}

export function FormatarIconNome(nome: string) {
  return nome
    .trim()
    .split(" ")
    .map((letra) => letra[0])
    .slice(0, 3)
    .join("")
    .toUpperCase();
}
