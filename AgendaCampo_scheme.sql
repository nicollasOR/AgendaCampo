CREATE DATABASE AgendaCampo
GO
USE AgendaCampo
CREATE TABLE [Usuario] (
  [usuarioID] uniqueidentifier PRIMARY KEY NOT NULL default NEWID(),
  [nome] nvarchar(60) NOT NULL,
  [email] varchar(60) UNIQUE NOT NULL,
  [senha] varbinary(32) NOT NULL,
  [statusUsuario] bit
)
GO


CREATE TABLE [Agendamento] (
  [agendaID] int PRIMARY KEY NOT NULL,
  [data] datetime2,
  [empresaSede] nvarchar(50) NOT NULL,
  [usuarioID] uniqueidentifier NOT NULL,
  [statusAgenda] bit,


  CONSTRAINT FK_Agendamento_Usuario FOREIGN KEY(usuarioID) REFERENCES Usuario(usuarioID) ON DELETE CASCADE
)

go

CREATE TABLE [Endereco] (
  [enderecoID] int PRIMARY KEY,
  [logradouro] nvarchar(60) NOT NULL,
  [bairro] nvarchar(40) NOT NULL,
  [numero] int,
  [cep] nvarchar(8) not null
)
GO

CREATE TABLE [Visita] (
  [agendamentoID] int NOT NULL,
  [enderecoID] int NOT NULL,
  [titulo] nvarchar(50) NOT NULL,
  [descricao] nvarchar(max),
  [statusRealizado] bit,


  CONSTRAINT FK_Visita_AgendamentoID FOREIGN KEY(agendamentoID) 
  REFERENCES Agendamento(agendaID) ON DELETE CASCADE,
  
  CONSTRAINT FK_Visita_Endereco FOREIGN KEY(enderecoID) 
  REFERENCES Endereco(enderecoID) ON DELETE CASCADE


)
GO

