using System;
using System.Collections.Generic;
using AgendaCampo.Models;
using Microsoft.EntityFrameworkCore;

namespace AgendaCampo.Contexts;

public partial class AgendaCampoContext : DbContext
{
    public AgendaCampoContext()
    {
    }

    public AgendaCampoContext(DbContextOptions<AgendaCampoContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Endereco> Enderecos { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=AgendaCampo;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Endereco>(static entity =>
        {
            entity.HasKey(e => e.EnderecoId).HasName("PK__Endereco__39DEFC6A671D2292");

            entity.ToTable("Endereco");

            object value = entity.Property(e => e.EnderecoId).HasColumnName("enderecoId");
            entity.Property(e => e.Bairro)
                .HasMaxLength(40)
                .IsUnicode(false)
                .HasColumnName("bairro");
            entity.Property(e => e.Cep)
                .HasMaxLength(9)
                .IsUnicode(false)
                .HasColumnName("cep");
            entity.Property(e => e.Logradouro)
                .HasMaxLength(60)
                .IsUnicode(false)
                .HasColumnName("logradouro");
            entity.Property(e => e.Numero).HasColumnName("numero");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
