using AgendaCampo.Domains;
using AgendaCampo.DTOs.VisitaDTO;

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
        Cep = visita.cep,
        Numero = visita.numero,
        Bairro = visita.bairro,
        Logradouro = visita.logradouro,
        
        Tecnicos = visita.usuario.Select(varAux => new usuariosGET
        {
            usuarioID = varAux.usuarioID,
            nome = varAux.nome,
            email = varAux.email
            //imgURL = conversoesParaDTO.converterParaString(varAux.Imagem)

        }).ToList()
        };
    }



    public static lerVisitaDTO lerVisitaDtoPOST(Visita visita)
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
            Cep = visita.cep,
            Numero = visita.numero,
            Bairro = visita.bairro,
            Logradouro = visita.logradouro,
            statusVisitaBit = visita.StatusVisitaBit ? true : false,
            

            Tecnicos = visita.usuario.Select(varAux => new usuariosGET
            {
                usuarioID = varAux.usuarioID,
                nome = varAux.nome,
                email = varAux.email
                //imgURL = conversoesParaDTO.converterParaString(varAux.Imagem)

            }).ToList()
        };
    }




}