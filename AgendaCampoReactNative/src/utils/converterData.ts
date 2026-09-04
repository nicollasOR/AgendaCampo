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
