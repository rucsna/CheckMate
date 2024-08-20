using CheckMateBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace CheckMateBackend;

public static class TodoEndpoints
{
    public static RouteGroupBuilder MapTodosApi(this RouteGroupBuilder groupBuilder)
    {
        groupBuilder.MapGet("/", GetAllTodos);
        groupBuilder.MapGet("/{year:int}/{month:int}", GetTodosByMonth);
        groupBuilder.MapGet("/{date}", GetTodosByDate);
        groupBuilder.MapGet("/{id:int}", GetTodo);
        groupBuilder.MapPost("/", CreateTodo);
        groupBuilder.MapPut("/{id:int}", UpdateTodo);
        groupBuilder.MapDelete("/{id:int}", DeleteTodo);

        return groupBuilder;
    }
    
    public static async Task<IResult> GetAllTodos(TodoDb db)
    {
        return TypedResults.Ok(await db.TodoItems.ToListAsync());
    }
    
    public static async Task<IResult> GetTodosByDate(TodoDb db, string date)
    {
        if (DateTime.TryParse(date, out var parsedDate))
        {
            var todos = await db.TodoItems.Where(todo => todo.Date.Date == parsedDate.Date).ToListAsync();
            return TypedResults.Ok(todos);
        }
        return TypedResults.BadRequest("Invalid date format");
    }
    
    public static async Task<IResult> GetTodosByMonth(TodoDb db, int year, int month)
    {
        if (year <= DateTime.Now.Year - 100 || year >= DateTime.Now.Year + 100 || month < 1 || month > 12)
        {
            return TypedResults.BadRequest("Invalid year or month");
        }
        var todos = await db.TodoItems.Where(todo => todo.Date.Year == year && todo.Date.Month == month)
            .ToListAsync();
        return TypedResults.Ok(todos);
    }
    
    public static async Task<IResult> GetTodo(TodoDb db, int id)
    {
        var todo = await db.TodoItems.FindAsync(id);
        if (todo != null)
        {
            return TypedResults.Ok(todo);
        }
        return TypedResults.NotFound();
    }
    
    public static async Task<IResult> CreateTodo(Todo todo, TodoDb db)
    {
        db.TodoItems.Add(todo);
        await db.SaveChangesAsync();
        return TypedResults.Created($"/api/todos/{todo.Id}", todo);
    }
    
    public static async Task<IResult> UpdateTodo(TodoDb db, int id, Todo inputTodo)
    {
        var todo = await db.TodoItems.FindAsync(id);
        if (todo is null) return TypedResults.NotFound();
    
        todo.Name = inputTodo.Name;
        todo.Date = inputTodo.Date;
        todo.IsCompleted = inputTodo.IsCompleted;
    
        await db.SaveChangesAsync();
        return TypedResults.NoContent();
    }
    
    public static async Task<IResult> DeleteTodo(TodoDb db, int id)
    {
        if (await db.TodoItems.FindAsync(id) is Todo todo)
        {
            db.TodoItems.Remove(todo);
            await db.SaveChangesAsync();
            return Results.NoContent();
        }
    
        return Results.NotFound();
    }
}