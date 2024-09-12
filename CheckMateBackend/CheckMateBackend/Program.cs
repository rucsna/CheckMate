using CheckMateBackend;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("Todos");

if (builder.Environment.IsDevelopment())
{
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowSpecificOrigin",
            builder => builder.WithOrigins("http://localhost:5173")
                .AllowAnyHeader()
                .AllowAnyMethod());
    });
}
else
{
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowSpecificOrigin", policy =>
        {
            policy.WithOrigins("https://checkmate-client.onrender.com")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
    });
}

builder.Services.AddSqlite<TodoDb>(connectionString);
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowSpecificOrigin");

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var dbContext = services.GetRequiredService<TodoDb>();
        dbContext.Database.Migrate();
        DatabaseSeeder.Initialize(services);
    }
    catch (Exception e)
    {
        Console.WriteLine($"An error occured seeding the database {e.Message}");
    }
}

app.MapGroup("/api/todos").MapTodosApi().WithTags("Todo Endpoints");

app.UseHttpsRedirection();

app.Run();

public partial class Program
{ }