using AgendaCampo.Domains;
using AgendaCampo.DTOs.EnderecoDTO;
using AgendaCampo.DTOs.VisitaDTONN;

namespace AgendaCampo.Applications.Conversões;

public class visitaConversoes
{
    public static lerVisitaDTO lerVisitaDto(Visita visita)
    {
        return new lerVisitaDTO
        {
        visitaID = visita.visitaID,
        nomeEvento = visita.titulo,
        nomeCliente = visita.cliente,
        dataInicio = visita.dataInicio,
        dataTermino = visita.dataTermino,
        statusVisita = visita.statusVisita?.nomeStatus ?? "Pendente",
        descricao = visita.descricao,
        logadouroEndereco = visita.endereco.logradouro,
        Endereco = new lerEnderecoDTO
        {
            EnderecoId = visita.endereco.enderecoID,
            Cep = visita.endereco.cep,
            Numero = visita.endereco.numero,
            Bairro = visita.endereco.bairro,
            Logradouro = visita.endereco.logradouro
        },
        Tecnicos = visita.usuario.Select(varAux => new usuariosGET
        {
            usuarioID = varAux.usuarioID,
            nome = varAux.nome,
            email = varAux.email
        }).ToList()
        };
    }


    
    
}