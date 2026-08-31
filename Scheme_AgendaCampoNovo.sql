DROP DATABASE AgendaCampoNovo
GO
CREATE DATABASE AgendaCampoNovo
GO
USE AgendaCampoNovo
GO
CREATE TABLE Endereco (
                          enderecoID INT PRIMARY KEY NOT NULL IDENTITY(1,1),
                          logradouro NVARCHAR(60) NOT NULL,
                          bairro     NVARCHAR(40) NOT NULL,
                          numero     INT NOT NULL,
                          cep        NVARCHAR(8) NOT NULL,


);

GO
CREATE TABLE Usuario (
                         usuarioID     UNIQUEIDENTIFIER PRIMARY KEY NOT NULL DEFAULT NEWID(),
                         nome          NVARCHAR(60)     NOT NULL,
                         email         VARCHAR(60)      NOT NULL UNIQUE,
                         senha         VARBINARY(32)    NOT NULL,
                         telefone      VARCHAR(18)      NOT NULL,
                         statusUsuario BIT              NOT NULL DEFAULT 1,
                         Imagem        VARBINARY(MAX)   NULL,

);

GO

CREATE TABLE StatusVisita
(
                        statusVisitaID INT PRIMARY KEY IDENTITY(1,1),
                        nomeStatus NVARCHAR(25) NOT NULL UNIQUE,

)
GO
CREATE TABLE Visita (
                        visitaID        INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
                        enderecoID      INT               NOT NULL,
                        statusVisitaID  INT               NOT NULL,
                        cliente         NVARCHAR(50)      NOT NULL,
                        sedeVisitada    NVARCHAR(60)      NULL,
                        titulo          NVARCHAR(50)      NOT NULL,
                        descricao       NVARCHAR(MAX)     NULL,
                        dataInicio      DATETIME2         NOT NULL,
                        dataTermino     DATETIME2         NOT NULL,

                        CONSTRAINT FK_Visita_Endereco FOREIGN KEY (enderecoID)
                            REFERENCES Endereco (enderecoID)
                            ON DELETE CASCADE,

                        CONSTRAINT FK_Visita_StatusVisita FOREIGN KEY (statusVisitaID)
                            REFERENCES StatusVisita(statusVisitaID)
                            ON DELETE CASCADE
);
GO


-- tabela intermediária para relacionar usuario com visita
CREATE TABLE UsuarioVisita (
                               usuarioID UNIQUEIDENTIFIER NOT NULL,
                               visitaID  INT              NOT NULL,

                               CONSTRAINT PK_UsuarioVisita PRIMARY KEY (usuarioID, visitaID),
                               CONSTRAINT FK_UsuarioVisita_Usuario FOREIGN KEY (usuarioID)
                                   REFERENCES Usuario (usuarioID)
                                   ON DELETE CASCADE,
                               CONSTRAINT FK_UsuarioVisita_Visita FOREIGN KEY (visitaID)
                                   REFERENCES Visita (visitaID) ON DELETE NO ACTION
);

GO


INSERT INTO Endereco (logradouro, bairro, numero, cep)
VALUES
    ('Av. Central', 'Centro', 100, '78300000'),
    ('Rua das Palmeiras', 'Jardim Europa', 452, '78300010'),
    ('Rodovia BR-163, Km 45', 'Zona Rural', 0, '78300999');

GO


INSERT INTO Usuario (nome, email, senha, Imagem, telefone)
VALUES
    ('admConfia', 'adm@adm.com', HASHBYTES('SHA2_256', 'adm'), NULL, '4002892211'  )

GO

INSERT INTO StatusVisita(nomeStatus)
VALUES

    ('Concluída'),
    ('Pendente'),
    ('Confirmada'),
    ('Cancelada')



GO

-- 1. Declarar variável para capturar o ID do usuário existente
DECLARE @UsuarioID UNIQUEIDENTIFIER;
SELECT TOP 1 @UsuarioID = usuarioID FROM Usuario WHERE email = 'adm@adm.com';

-- 2. Tabela temporária para armazenar os IDs das visitas criadas
DECLARE @NovasVisitas TABLE (visitaID INT);

-- 3. Inserir as Visitas
INSERT INTO Visita (enderecoID, statusVisitaID, cliente, sedeVisitada, titulo, descricao, dataInicio, dataTermino)
OUTPUT INSERTED.visitaID INTO @NovasVisitas
VALUES
    (
        1,
        (SELECT statusVisitaID FROM StatusVisita WHERE nomeStatus = 'Confirmada'),
        'Fazenda Sol Nascente',
        'Matriz - Campo Novo',
        'Vistoria de Colheita',
        'Acompanhamento técnico da colheita de soja da safra atual.',
        '2026-09-01 08:00:00',
        '2026-09-01 12:00:00'
    ),
    (
        2,
        (SELECT statusVisitaID FROM StatusVisita WHERE nomeStatus = 'Pendente'),
        'Agropecuária Ouro Verde',
        'Filial Sul',
        'Reunião Comercial',
        'Apresentação do novo catálogo de insumos e maquinários.',
        '2026-09-03 14:00:00',
        '2026-09-03 16:30:00'
    ),
    (
        3,
        (SELECT statusVisitaID FROM StatusVisita WHERE nomeStatus = 'Concluída'),
        'Cooperativa Agrícola',
        'Unidade de Armazenamento',
        'Auditoria de Silos',
        'Inspeção periódica das condições de armazenamento de grãos.',
        '2026-08-25 09:00:00',
        '2026-08-25 17:00:00'
    );
GO

CREATE TRIGGER trg_softDelete_Usuario
    ON Usuario
    INSTEAD OF DELETE
    AS
BEGIN
    UPDATE usr SET statusUsuario = 0
    from Usuario usr
             INNER JOIN deleted d
                        ON d.usuarioID = usr.usuarioID
END
GO