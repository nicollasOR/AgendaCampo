using System;
using System.Collections.Generic;
using AgendaCampo.Domains;
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

    public virtual DbSet<Agendamento> Agendamento { get; set; }

    public virtual DbSet<Endereco> Endereco { get; set; }

    public virtual DbSet<TipoUsuario> TipoUsuario { get; set; }

    public virtual DbSet<Usuario> Usuario { get; set; }

    public virtual DbSet<Visita> Visita { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=localhost,1433;Database=AgendaCampo;User Id=sa;Password=Developer123@;Encrypt=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Agendamento>(entity =>
        {
            entity.HasKey(e => e.agendaID).HasName("PK__Agendame__04F591BBBB8801A9");

            entity.Property(e => e.empresaSede).HasMaxLength(50);
            entity.Property(e => e.statusAgenda).HasDefaultValue(true);

            entity.HasOne(d => d.usuario).WithMany(p => p.Agendamento)
                .HasForeignKey(d => d.usuarioID)
                .HasConstraintName("FK_Agendamento_Usuario");
        });

        modelBuilder.Entity<Endereco>(entity =>
        {
            entity.HasKey(e => e.enderecoID).HasName("PK__Endereco__39DEFC4A029C805B");

            entity.Property(e => e.bairro).HasMaxLength(40);
            entity.Property(e => e.cep).HasMaxLength(8);
            entity.Property(e => e.logradouro).HasMaxLength(60);
        });

        modelBuilder.Entity<TipoUsuario>(entity =>
        {
            entity.HasKey(e => e.tipoUsuarioID).HasName("PK__TipoUsua__AFBB8CF19D19A37E");

            entity.Property(e => e.nomeTipo).HasMaxLength(50);
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.usuarioID).HasName("PK__Usuario__A5B1ABAED3A02BFF");

            entity.ToTable(tb => tb.HasTrigger("trg_softDelete_Usuario"));

            entity.HasIndex(e => e.email, "UQ__Usuario__AB6E61642EA46F34").IsUnique();

            entity.Property(e => e.usuarioID).HasDefaultValueSql("(newid())");
            entity.Property(e => e.email)
                .HasMaxLength(60)
                .IsUnicode(false);
            entity.Property(e => e.nome).HasMaxLength(60);
            entity.Property(e => e.senha).HasMaxLength(32);
            entity.Property(e => e.statusUsuario).HasDefaultValue(true);

            entity.HasOne(d => d.tipoUsuario).WithMany(p => p.Usuario)
                .HasForeignKey(d => d.tipoUsuarioID)
                .HasConstraintName("FK_Usuario_TipoUsuario");
        });

        modelBuilder.Entity<Visita>(entity =>
        {
            entity.HasKey(e => e.visitaID).HasName("PK__Visita__37DD75FD54A9956A");

            entity.Property(e => e.sedeVisitada).HasMaxLength(60);
            entity.Property(e => e.titulo).HasMaxLength(50);

            entity.HasOne(d => d.agendamento).WithMany(p => p.Visita)
                .HasForeignKey(d => d.agendamentoID)
                .HasConstraintName("FK_Visita_AgendamentoID");

            entity.HasOne(d => d.endereco).WithMany(p => p.Visita)
                .HasForeignKey(d => d.enderecoID)
                .HasConstraintName("FK_Visita_Endereco");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
