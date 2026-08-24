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

builder.Services.AddScoped<ITipoUsuarioRepository, TipoUsuarioRepository>();
builder.Services.AddScoped<TipoUsuarioService>();

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

    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        options.RoutePrefix = string.Empty; // Exibe o Swagger na raiz da aplicação
    });
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseCors("CorsPolicy");

// ATENÇÃO: Autenticação SEMPRE ANTES da Autorização
app.UseAuthentication(); 
app.UseAuthorization();

app.MapControllers();

app.Run();
