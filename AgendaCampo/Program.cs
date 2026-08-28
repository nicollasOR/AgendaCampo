using AgendaCampo.Applications.Services;
using AgendaCampo.Applications.Autenticacao;
using AgendaCampo.Contexts;
using AgendaCampo.Interface;
using AgendaCampo.Repositories;
using DotNetEnv;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
using RoyalGamess.Aplications.Services;
using System.Text;
using AgendaCampo.Applications;

Env.Load();
var builder = WebApplication.CreateBuilder(args);

string conexaoBanco = Environment.GetEnvironmentVariable("CONNECTION_STRING");
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
// builder.Services.AddOpenApi();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Insira o token JWT desta forma: Bearer {seu_token}"
    });
    options.AddSecurityRequirement(document => new OpenApiSecurityRequirement
    {
        [new OpenApiSecuritySchemeReference("Bearer", document)] = []
    });
});

builder.Services.AddDbContext<AgendaCampoContext>(options => options.UseSqlServer(conexaoBanco));

builder.Services.AddScoped<IAgendamentoRepository, AgendamentoRepository>();
builder.Services.AddScoped<AgendamentoService>();

builder.Services.AddScoped<IVisitaRepository, VisitaRepository>();
builder.Services.AddScoped<VisitaService>();

builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<UsuarioService>();

builder.Services.AddScoped<IEnderecoRepository, EnderecoRepository>();
builder.Services.AddScoped<EnderecoService>();
// builder.Services.AddScoped<testeService>();


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
    app.UseSwaggerUI();
}
if (!app.Environment.IsDevelopment())
    app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseCors("CorsPolicy");

// ATENÇÃO: Autenticação SEMPRE ANTES da Autorização
app.UseAuthentication(); 
app.UseAuthorization();

app.MapControllers();

app.Run();
