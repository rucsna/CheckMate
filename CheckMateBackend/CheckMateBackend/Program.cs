using CheckMateBackend;
using CheckMateBackend.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("Todos") ?? "Data Source=todo.db";

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

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

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        DatabaseSeeder.Initialize(services);
    }
    catch (Exception e)
    {
        Console.WriteLine($"An error occured seeding the database {e.Message}");
    }
}

app.UseCors("AllowSpecificOrigin");

var todoItems = app.MapGroup("/api/todos");

todoItems.MapGet("/", GetAllTodos);
todoItems.MapGet("/{year:int}/{month:int}", GetTodosByMonth);
todoItems.MapGet("/{date}", GetTodosByDate);
todoItems.MapGet("/{id:int}", GetTodo);
todoItems.MapPost("/", CreateTodo);
todoItems.MapPut("/{id:int}", UpdateTodo);
todoItems.MapDelete("/{id:int}", DeleteTodo);

app.UseHttpsRedirection();

app.Run();

static async Task<IResult> GetAllTodos(TodoDb db)
{
    return TypedResults.Ok(await db.TodoItems.ToListAsync());
}

static async Task<IResult> GetTodosByDate(TodoDb db, string date)
{
    if (DateTime.TryParse(date, out var parsedDate))
    {
        var todos = await db.TodoItems.Where(todo => todo.Date.Date == parsedDate.Date).ToListAsync();
        return TypedResults.Ok(todos);
    }
    return TypedResults.BadRequest("Invalid date format");
}

static async Task<IResult> GetTodosByMonth(TodoDb db, int year, int month)
{
    var todos = await db.TodoItems.Where(todo => todo.Date.Year == year && todo.Date.Month == month)
        .ToListAsync();
    return TypedResults.Ok(todos);
}

static async Task<IResult> GetTodo(TodoDb db, int id)
{
    return await db.TodoItems.FindAsync(id)
        is Todo todo
        ? TypedResults.Ok(todo)
        : TypedResults.NotFound();
}

static async Task<IResult> CreateTodo(Todo todo, TodoDb db)
{
    db.TodoItems.Add(todo);
    await db.SaveChangesAsync();
    return TypedResults.Created($"/api/todos/{todo.Id}", todo);
}

static async Task<IResult> UpdateTodo(TodoDb db, int id, Todo inputTodo)
{
    var todo = await db.TodoItems.FindAsync(id);
    if (todo is null) return TypedResults.NotFound();

    todo.Name = inputTodo.Name;
    todo.Date = inputTodo.Date;
    todo.IsCompleted = inputTodo.IsCompleted;

    await db.SaveChangesAsync();
    return TypedResults.NoContent();
}

static async Task<IResult> DeleteTodo(TodoDb db, int id)
{
    if (await db.TodoItems.FindAsync(id) is Todo todo)
    {
        db.TodoItems.Remove(todo);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    return Results.NotFound();
}