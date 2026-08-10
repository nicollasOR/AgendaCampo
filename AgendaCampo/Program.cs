using AgendaCampo.Contexts;
using AgendaCampo.Interface;
using AgendaCampo.Repositories;
using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using RoyalGamess.Aplications.Services;

Env.Load();
var builder = WebApplication.CreateBuilder(args);

string conexaoBanco = Environment.GetEnvironmentVariable("CONNECTION_STRING");
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
// builder.Services.AddOpenApi();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddDbContext<AgendaCampoContext>(options => options.UseSqlServer(conexaoBanco));

builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<UsuarioService>();


// cors btw

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseCors("CorsPolicy");

// ATENÇÃO: Autenticação SEMPRE ANTES da Autorização
app.UseAuthentication(); 
app.UseAuthorization();

app.MapControllers();

app.Run();
