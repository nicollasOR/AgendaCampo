export const formatacoes = {
  formatarData(dt: string) {
    if (!dt) return "";
    try {
      const data = new Date(dt);
      return isNaN(data.getTime()) ? dt : data.toLocaleString("pt-BR");
    } catch {
      return dt;
    }
  },

  formatacaoPATCH(data: Date): string {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const dia = String(data.getDate()).padStart(2, "0");
    const horas = String(data.getHours()).padStart(2, "0");
    const minutos = String(data.getMinutes()).padStart(2, "0");
    const segundos = String(data.getSeconds()).padStart(2, "0");

    // Formato retornado: "YYYY-MM-DDTHH:mm:ss"
    return `${ano}-${mes}-${dia}T${horas}:${minutos}:${segundos}`;
  },

  formatarHora(dt: string) {
    if (!dt) return "";

    try {
      const data = new Date(dt);

      return isNaN(data.getTime())
        ? dt
        : data.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          });
    } catch {
      return dt;
    }
  },

  formatarDataSemHoras(dt: string) {
    if (!dt) return "";

    try {
      const data = new Date(dt);

      return isNaN(data.getTime()) ? dt : data.toLocaleDateString("pt-BR");
    } catch {
      return dt;
    }
  },
};
