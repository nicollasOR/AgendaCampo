DROP DATABASE AgendaCampo
CREATE DATABASE AgendaCampo
GO
USE AgendaCampo
CREATE TABLE [Usuario] (
                           [usuarioID] uniqueidentifier PRIMARY KEY NOT NULL default NEWID(),
                           [nome] nvarchar(60) NOT NULL,
                           [email] varchar(60) UNIQUE NOT NULL,
                           [senha] varbinary(32) NOT NULL,
                           [statusUsuario] bit default 1
)

INSERT INTO Usuario(nome, email, senha)
VALUES
    ('teste', 'teste@gmail.com', HASHBYTES('SHA2_256', 'teste'))
GO
SELECT * FROM Usuario

CREATE TABLE [Agendamento] (
    [agendaID] int PRIMARY KEY NOT NULL,
    [data] datetime2 NOT NULL,
    [empresaSede] nvarchar(50) NOT NULL,
                            [usuarioID] uniqueidentifier NOT NULL,
                            [statusAgenda] bit default 1 NOT NULL,
                               [data] datetime2,
                               [empresaSede] nvarchar(50) NOT NULL,
                               [usuarioID] uniqueidentifier NOT NULL,
                               [statusAgenda] bit default 1 NOT NULL,


                               CONSTRAINT FK_Agendamento_Usuario FOREIGN KEY(usuarioID) REFERENCES Usuario(usuarioID) ON DELETE CASCADE
)

go

CREATE TABLE [Endereco] (
                            [enderecoID] int PRIMARY KEY identity(1,1) not null,
                            [logradouro] nvarchar(60) NOT NULL,
                            [bairro] nvarchar(40) NOT NULL,
                            [numero] int NOT NULL,
                            [cep] nvarchar(8) not null
)
GO

-- CREATE TABLE StatusVisita(
--     [statusVisitaID] INT PRIMARY KEY IDENTITY(1,1),
--     [nomeStatus] NVARCHAR(30) NOT NULL
-- )

CREATE TABLE [Visita] (
                          [visitaID] int primary key identity(1,1) not null,
                          [agendamentoID] int NOT NULL,
                          [enderecoID] int NOT NULL,
                          --[statusVisitaID] int not null,
                          [sedeVisitada] NVARCHAR(60) null,
                          [titulo] nvarchar(50) NOT NULL,
                          [descricao] nvarchar(max),
                          [statusRealizado] bit default 0 NOT NULL,
                          [dataInicio] DATETIME2 NOT NULL,
                          [dataTermino] DATETIME2 NOT NULL,



                          CONSTRAINT FK_Visita_AgendamentoID FOREIGN KEY(agendamentoID)
                              REFERENCES Agendamento(agendaID) ON DELETE CASCADE,

                          CONSTRAINT FK_Visita_Endereco FOREIGN KEY(enderecoID)
                              REFERENCES Endereco(enderecoID) ON DELETE CASCADE,

                          --CONSTRAINT FK_Visita_statusVisita FOREIGN KEY(statusVisitaID)
                             -- REFERENCES StatusVisita(statusVisitaID) ON DELETE CASCADE
)
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

-- CREATE TRIGGER trg_checagem_Agendamento
--     ON Agendamento
--     AFTER INSERT, UPDATE
--     AS
--     BEGIN
--     UPDATE Agnd
--         SET Agnd.statusAgenda = 0
--         FROM Agendamento Agnd
--             INNER JOIN inserted updtBit ON Agnd.agendaID = updtBit.agendaID
--                 WHERE updtBit.data > SYSDATETIME();
--     END
--     GO
--
--
-- CREATE TRIGGER trg_checagem_Visita
--     ON Visita
--     AFTER INSERT, UPDATE
--     AS
-- BEGIN
--     UPDATE vis
--     SET vis.statusRealizado = 1
--     FROM Visita vis
--              INNER JOIN inserted updtBit ON vis.statusRealizado = updtBIT.statusRealizado
--     WHERE updtBit.statusRealizado > SYSDATETIME();
-- END
-- GO


-- CREATE TRIGGER trg_softDelete_Visita
--     ON Visita
--     INSTEAD OF DELETE
--     AS
--     BEGIN
--         UPDATE vis set statusRealizado = 0
--     end

-- ==========================================
-- USUÁRIOS
-- ==========================================

DECLARE @usuario1 UNIQUEIDENTIFIER = NEWID();
DECLARE @usuario2 UNIQUEIDENTIFIER = NEWID();
DECLARE @usuario3 UNIQUEIDENTIFIER = NEWID();

INSERT INTO Usuario
    (usuarioID, nome, email, senha, statusUsuario)
VALUES
    (@usuario1, 'João Silva', 'joao@agendacampo.com',
     HASHBYTES('SHA2_256', '123456'), 1),

    (@usuario2, 'Carlos Santos', 'carlos@agendacampo.com',
     HASHBYTES('SHA2_256', '123456'), 1),

    (@usuario3, 'Pedro Oliveira', 'pedro@agendacampo.com',
     HASHBYTES('SHA2_256', '123456'), 1);

     SELECT * FROM Usuario

-- ==========================================
-- ENDEREÇOS
-- ==========================================

INSERT INTO Endereco
    (enderecoID, logradouro, bairro, numero, cep)
VALUES
    (1, 'Rua das Flores', 'Centro', 100, '01000000'),

    (2, 'Avenida Brasil', 'Jardim America', 250, '02000000'),

    (3, 'Rua Sao Paulo', 'Vila Nova', 500, '03000000'),

    (4, 'Avenida Central', 'Centro', 1200, '04000000');


-- ==========================================
-- AGENDAMENTOS
-- ==========================================

INSERT INTO Agendamento
    (data, empresaSede, usuarioID, statusAgenda)
VALUES
    ('2026-08-15 08:30:00', 'Tech Solutions', 'A1C44FBA-7182-430C-B53E-2D419B3549A5', 1),

    ('2026-08-15 14:00:00', 'Empresa Alpha', 'C47E4AC5-51C9-43DB-A0CA-70BA445A2DF8', 1),

    ('2026-08-16 09:00:00', 'Beta Sistemas', 'C47E4AC5-51C9-43DB-A0CA-70BA445A2DF8', 1),

    ('2026-08-17 15:30:00', 'Gamma Tecnologia', '849AD641-8EDB-4E73-AAE5-A13B4410E6D3', 1);

    select * from Agendamento

-- ==========================================
-- VISITAS
-- ==========================================

INSERT INTO Visita
(agendamentoID, enderecoID, titulo, descricao, dataInicio, dataTermino)
VALUES
    (1, 1, 'Manutencao de servidor',
     'Realizar manutencao preventiva no servidor principal.', (SELECT data FROM Agendamento WHERE agendaID = 1), '2026-08-15 08:30:00')

GO
select * from Visita;
