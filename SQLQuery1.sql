USE master;
GO

-- Drop seguro derrubando conexões ativas
IF EXISTS (SELECT name FROM sys.databases WHERE name = N'AgendaCampoAtual')
BEGIN
    ALTER DATABASE AgendaCampoAtual SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE AgendaCampoAtual;
END
GO

CREATE DATABASE AgendaCampoAtual;
GO

USE AgendaCampoAtual;
GO

-- 1. Criação das Tabelas
CREATE TABLE Usuario (
    usuarioID     UNIQUEIDENTIFIER PRIMARY KEY NOT NULL DEFAULT NEWID(),
    nome          NVARCHAR(60)     NOT NULL,
    email         VARCHAR(60)      NOT NULL UNIQUE,
    senha         VARBINARY(32)    NOT NULL,
    telefone      VARCHAR(18)      NULL,
    statusUsuario BIT              NOT NULL DEFAULT 1,
    imagem        VARBINARY(MAX)   NULL
);
GO

CREATE TABLE StatusVisita (
    statusVisitaID INT PRIMARY KEY IDENTITY(1,1),
    nomeStatus     NVARCHAR(25) NOT NULL UNIQUE
);
GO

CREATE TABLE Visita (
    visitaID       INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
    statusVisitaID INT               NOT NULL,
    cliente        NVARCHAR(50)      NOT NULL,
    sedeVisitada   NVARCHAR(60)      NULL,
    titulo         NVARCHAR(50)      NOT NULL,
    descricao      NVARCHAR(MAX)     NULL,
    dataInicio     DATETIME2         NOT NULL,
    dataTermino    DATETIME2         NOT NULL,
    logradouro     NVARCHAR(60)      NOT NULL,
    bairro         NVARCHAR(40)      NOT NULL,
    numero         INT               NOT NULL,
    cep            NVARCHAR(9)       NOT NULL,

    CONSTRAINT FK_Visita_StatusVisita FOREIGN KEY (statusVisitaID)
        REFERENCES StatusVisita(statusVisitaID)
        ON DELETE CASCADE
);
GO

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

-- 2. Criação do Trigger
CREATE TRIGGER trg_softDelete_Usuario
ON Usuario
INSTEAD OF DELETE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE usr 
    SET statusUsuario = 0
    FROM Usuario usr
    INNER JOIN deleted d ON d.usuarioID = usr.usuarioID;
END;
GO

-- 3. Carga Inicial de Dados
INSERT INTO Usuario (nome, email, senha, imagem, telefone)
VALUES ('admConfia', 'adm@adm.com', HASHBYTES('SHA2_256', 'adm'), NULL, '4002892211');

INSERT INTO StatusVisita (nomeStatus)
VALUES 
    ('Concluída'),
    ('Pendente'),
    ('Confirmada'),
    ('Cancelada');

-- 4. Inserção de Visitas e Vinculação ao Usuário
DECLARE @UsuarioID UNIQUEIDENTIFIER;
SELECT TOP 1 @UsuarioID = usuarioID FROM Usuario WHERE email = 'adm@adm.com';

DECLARE @NovasVisitas TABLE (visitaID INT);

INSERT INTO Visita (
    statusVisitaID, cliente, sedeVisitada, titulo, descricao, 
    dataInicio, dataTermino, logradouro, bairro, numero, cep
)
OUTPUT INSERTED.visitaID INTO @NovasVisitas
VALUES
    (
        (SELECT statusVisitaID FROM StatusVisita WHERE nomeStatus = 'Confirmada'),
        'Fazenda Sol Nascente', 'Matriz - Campo Novo', 'Vistoria de Colheita',
        'Acompanhamento técnico da colheita de soja da safra atual.',
        '2026-09-01 08:00:00', '2026-09-01 12:00:00',
        'Rodovia MT-358', 'Zona Rural', 100, '78390-000'
    ),
    (
        (SELECT statusVisitaID FROM StatusVisita WHERE nomeStatus = 'Pendente'),
        'Agropecuária Ouro Verde', 'Filial Sul', 'Reunião Comercial',
        'Apresentação do novo catálogo de insumos e maquinários.',
        '2026-09-03 14:00:00', '2026-09-03 16:30:00',
        'Av. das Palmeiras', 'Centro', 500, '78390-100'
    ),
    (
        (SELECT statusVisitaID FROM StatusVisita WHERE nomeStatus = 'Concluída'),
        'Cooperativa Agrícola', 'Unidade de Armazenamento', 'Auditoria de Silos',
        'Inspeção periódica das condições de armazenamento de grãos.',
        '2026-08-25 09:00:00', '2026-08-25 17:00:00',
        'Rua dos Cafezais', 'Distrito Industrial', 45, '78390-200'
    );

-- Associa as visitas criadas ao usuário capturado
INSERT INTO UsuarioVisita (usuarioID, visitaID)
SELECT @UsuarioID, visitaID FROM @NovasVisitas;
GO

-- Consultas de Verificação
SELECT * FROM Usuario;
SELECT * FROM StatusVisita;
SELECT * FROM Visita;
SELECT * FROM UsuarioVisita;