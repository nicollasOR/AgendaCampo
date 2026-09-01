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

    public virtual DbSet<Usuario> Usuario { get; set; }

    public virtual DbSet<Visita> Visita { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {

    }
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
//        => optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=AgendaCampoNovo;Trusted_Connection=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Endereco>(entity =>
        {
            entity.HasKey(e => e.enderecoID).HasName("PK__Endereco__39DEFC4A07755703");

            entity.Property(e => e.enderecoID).ValueGeneratedNever();
            entity.Property(e => e.bairro).HasMaxLength(40);
            entity.Property(e => e.cep).HasMaxLength(8);
            entity.Property(e => e.logradouro).HasMaxLength(60);
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.usuarioID).HasName("PK__Usuario__A5B1ABAE07305A98");

            entity.ToTable(tb => tb.HasTrigger("trg_softDelete_Usuario"));

            entity.HasIndex(e => e.email, "UQ__Usuario__AB6E6164C011E9B8").IsUnique();

            entity.Property(e => e.usuarioID).HasDefaultValueSql("(newid())");
            entity.Property(e => e.email)
                .HasMaxLength(60)
                .IsUnicode(false);
            entity.Property(e => e.nome).HasMaxLength(60);
            entity.Property(e => e.senha).HasMaxLength(32);
            entity.Property(e => e.statusUsuario).HasDefaultValue(true);

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
                        j.HasKey("usuarioID", "visitaID").HasName("usuarioVisitaID");
                    });
        });

        modelBuilder.Entity<Visita>(entity =>
        {
            entity.HasKey(e => e.visitaID).HasName("PK__Visita__37DD75FD7FC67F36");

            entity.Property(e => e.sedeVisitada).HasMaxLength(60);
            entity.Property(e => e.titulo).HasMaxLength(50);

            entity.HasOne(d => d.endereco).WithMany(p => p.Visita)
                .HasForeignKey(d => d.enderecoID)
                .HasConstraintName("FK_Visita_Endereco");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
