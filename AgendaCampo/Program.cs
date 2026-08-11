using AgendaCampo.Applications.Autenticacao;
using AgendaCampo.Applications.Services;
using AgendaCampo.Contexts;
using AgendaCampo.Interface;
using AgendaCampo.Repositories;
using DotNetEnv;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
using RoyalGamess.Aplications.Services;
using System.Text;

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

//JWT
builder.Services.AddScoped<GeradorTokenJwt>();
builder.Services.AddScoped<AutenticacaoService>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var chave = builder.Configuration["Jwt:Key"]!;

        var issuer = builder.Configuration["Jwt:Issuer"]!;

        var audience = builder.Configuration["Jwt:Audience"]!;

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,

            ValidateAudience = true,

            ValidateLifetime = true,

            ValidateIssuerSigningKey = true,

            ValidIssuer = issuer,

            ValidAudience = audience,

            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(chave)
            )
        };
    });

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
