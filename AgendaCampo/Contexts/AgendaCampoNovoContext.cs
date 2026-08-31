using System;
using System.Collections.Generic;
using AgendaCampo.Domains;
using Microsoft.EntityFrameworkCore;

namespace AgendaCampo.Contexts;

public partial class AgendaCampoNovoContext : DbContext
{
    public AgendaCampoNovoContext()
    {
    }

    public AgendaCampoNovoContext(DbContextOptions<AgendaCampoNovoContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Endereco> Endereco { get; set; }

    public virtual DbSet<StatusVisita> StatusVisita { get; set; }

    public virtual DbSet<Usuario> Usuario { get; set; }

    public virtual DbSet<Visita> Visita { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        // #warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
//         => optionsBuilder.UseSqlServer("Server=localhost,1433;Database=AgendaCampoNovo;User Id=sa;Password=Developer123@;Encrypt=True;TrustServerCertificate=True");
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Endereco>(entity =>
        {
            entity.HasKey(e => e.enderecoID).HasName("PK__Endereco__39DEFC4AAFA4816A");

            entity.Property(e => e.bairro).HasMaxLength(40);
            entity.Property(e => e.cep).HasMaxLength(8);
            entity.Property(e => e.logradouro).HasMaxLength(60);
        });

        modelBuilder.Entity<StatusVisita>(entity =>
        {
            entity.HasKey(e => e.statusVisitaID).HasName("PK__StatusVi__0C06C5FE482C9219");

            entity.HasIndex(e => e.nomeStatus, "UQ__StatusVi__127B2F2F491E9121").IsUnique();

            entity.Property(e => e.nomeStatus).HasMaxLength(25);
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.usuarioID).HasName("PK__Usuario__A5B1ABAEE6CA6899");

            entity.HasIndex(e => e.email, "UQ__Usuario__AB6E61643D80EA0F").IsUnique();

            entity.Property(e => e.usuarioID).HasDefaultValueSql("(newid())");
            entity.Property(e => e.email)
                .HasMaxLength(60)
                .IsUnicode(false);
            entity.Property(e => e.nome).HasMaxLength(60);
            entity.Property(e => e.senha).HasMaxLength(32);
            entity.Property(e => e.statusUsuario).HasDefaultValue(true);
            entity.Property(e => e.telefone)
                .HasMaxLength(18)
                .IsUnicode(false);

            entity.HasMany(d => d.visita).WithMany(p => p.usuario)
                .UsingEntity<Dictionary<string, object>>(
                    "UsuarioVisita",
                    r => r.HasOne<Visita>().WithMany()
                        .HasForeignKey("visitaID")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK_UsuarioVisita_Visita"),
                    l => l.HasOne<Usuario>().WithMany()
                        .HasForeignKey("usuarioID")
                        .HasConstraintName("FK_UsuarioVisita_Usuario"),
                    j =>
                    {
                        j.HasKey("usuarioID", "visitaID");
                    });
        });

        modelBuilder.Entity<Visita>(entity =>
        {
            entity.HasKey(e => e.visitaID).HasName("PK__Visita__37DD75FD89AF8352");

            entity.Property(e => e.cliente).HasMaxLength(50);
            entity.Property(e => e.sedeVisitada).HasMaxLength(60);
            entity.Property(e => e.titulo).HasMaxLength(50);

            entity.HasOne(d => d.endereco).WithMany(p => p.Visita)
                .HasForeignKey(d => d.enderecoID)
                .HasConstraintName("FK_Visita_Endereco");

            entity.HasOne(d => d.statusVisita).WithMany(p => p.Visita)
                .HasForeignKey(d => d.statusVisitaID)
                .HasConstraintName("FK_Visita_StatusVisita");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
