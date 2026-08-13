using AgendaCampo.Exceptions;

namespace AgendaCampo.Applications.Validações;

public class Validacoes
{
    public static void validarNome(string nome)
    {
        if (string.IsNullOrEmpty(nome))
            throw new DomainException("Nome invalido");
    }

    public static void validarEmail(string email)
    {
        if (string.IsNullOrEmpty(email) || !email.Contains('@'))
            throw new DomainException("Email invalido");
    }



}