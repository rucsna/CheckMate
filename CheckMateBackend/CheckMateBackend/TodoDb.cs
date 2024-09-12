using CheckMateBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace CheckMateBackend;

public class TodoDb: DbContext
{
    public TodoDb(DbContextOptions<TodoDb> options) : base(options) {}
    public DbSet<Todo> TodoItems => Set<Todo>();
}