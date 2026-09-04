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

export function FormatarPrimeiroEUltimoNome(nome: string) {
  if (!nome) return "";

  const partes = nome.trim().split(/\s+/);

  if (partes.length === 1) {
    return partes[0];
  }

  return `${partes[0]} ${partes[partes.length - 1]}`;
}
