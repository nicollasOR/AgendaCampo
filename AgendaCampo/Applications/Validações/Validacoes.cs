using System.Text.RegularExpressions;
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

    public static void validarCEP(string cep)
    {
        if (!string.IsNullOrEmpty(cep))
            throw new DomainException("Insira um cep!");

        if (!Regex.IsMatch(cep, @"^\d{5}-?\d{3}$")) // formula maluca do regex 
                                                                // para confirmar a formatacao
            throw new DomainException("Insira um cep válido");
    }


}