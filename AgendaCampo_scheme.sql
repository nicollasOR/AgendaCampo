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
GO


CREATE TABLE [Agendamento] (
    [agendaID] int PRIMARY KEY NOT NULL,
    [data] datetime2,
    [empresaSede] nvarchar(50) NOT NULL,
                            [usuarioID] uniqueidentifier NOT NULL,
                            [statusAgenda] bit default 1 NOT NULL,


                            CONSTRAINT FK_Agendamento_Usuario FOREIGN KEY(usuarioID) REFERENCES Usuario(usuarioID) ON DELETE CASCADE
)

go

CREATE TABLE [Endereco] (
    [enderecoID] int PRIMARY KEY,
    [logradouro] nvarchar(60) NOT NULL,
                         [bairro] nvarchar(40) NOT NULL,
                         [numero] int NOT NULL,
                         [cep] nvarchar(8) not null
)
GO

CREATE TABLE [Visita] (
    [agendamentoID] int NOT NULL,
    [enderecoID] int NOT NULL,
    [titulo] nvarchar(50) NOT NULL,
                       [descricao] nvarchar(max),
                       [statusRealizado] bit default 0 NOT NULL,


                       CONSTRAINT FK_Visita_AgendamentoID FOREIGN KEY(agendamentoID)
                       REFERENCES Agendamento(agendaID) ON DELETE CASCADE,

                       CONSTRAINT FK_Visita_Endereco FOREIGN KEY(enderecoID)
                       REFERENCES Endereco(enderecoID) ON DELETE CASCADE


)



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

