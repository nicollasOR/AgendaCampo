using AgendaCampo.Applications.Services;
using AgendaCampo.Contexts;
using AgendaCampo.Interfaces;
using AgendaCampo.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddDbContext<AgendaCampoContext>(options =>
options.UseSqlServer("Server=LocalDB\\MSSQLLocalDB;Database=AgendaCampo;TrustServerCertificate=True"));


builder.Services.AddScoped<IEnderecoRepository, EnderecoRepository>();
builder.Services.AddScoped<EnderecoService>();



var app = builder.Build();

// Configure the HTTP request pipeline.

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
