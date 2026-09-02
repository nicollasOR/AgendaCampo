DROP DATABASE AgendaCampoAtual
GO
CREATE DATABASE AgendaCampoAtual
GO
USE AgendaCampoAtual
 
GO
CREATE TABLE Usuario (
                         usuarioID     UNIQUEIDENTIFIER PRIMARY KEY NOT NULL DEFAULT NEWID(),
                         nome          NVARCHAR(60)     NOT NULL,
                         email         VARCHAR(60)      NOT NULL UNIQUE,
                         senha         VARBINARY(32)    NOT NULL,
                         telefone      VARCHAR(18)      NULL,
                         statusUsuario BIT              NOT NULL DEFAULT 1,
                         Imagem        VARBINARY(MAX)   NULL,

);
SELECT * FROM Visita
GO

CREATE TABLE StatusVisita
(
                        statusVisitaID INT PRIMARY KEY IDENTITY(1,1),
                        nomeStatus NVARCHAR(25) NOT NULL UNIQUE,

)
GO
CREATE TABLE Visita (
                        visitaID        INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
                        statusVisitaID  INT               NOT NULL,
                        cliente         NVARCHAR(50)      NOT NULL,
                        sedeVisitada    NVARCHAR(60)      NULL,
                        titulo          NVARCHAR(50)      NOT NULL,
                        descricao       NVARCHAR(MAX)     NULL,
                        dataInicio      DATETIME2         NOT NULL,
                        dataTermino     DATETIME2         NOT NULL,
                        logradouro      NVARCHAR(60)      NOT NULL,
                        bairro          NVARCHAR(40)      NOT NULL,
                        numero          INT               NOT NULL,
                        cep             NVARCHAR(9)       NOT NULL,
                        StatusVisitaBit BIT DEFAULT 1 NOT NULL

                        CONSTRAINT FK_Visita_StatusVisita FOREIGN KEY (statusVisitaID)
                            REFERENCES StatusVisita(statusVisitaID)
                            
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
SELECT * FROM Usuario


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

CREATE TRIGGER trg_softDelete_Visita
    ON Visita
    INSTEAD OF DELETE
    AS
    BEGIN
        UPDATE vst SET StatusVisitaBit = 0
            from Visita vst
                    INNER JOIN deleted d 
                            ON d.visitaID = vst.visitaID
END
GO
