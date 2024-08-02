using CheckMateBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace CheckMateBackend;

public static class DatabaseSeeder
{
    public static void Initialize(IServiceProvider serviceProvider)
    {
        using var context = new TodoDb(
            serviceProvider.GetRequiredService<DbContextOptions<TodoDb>>());
        if (context.TodoItems.Any()) return;
        context.TodoItems.AddRange(
            new Todo { Name = "feed the cat", IsCompleted = false, Date = DateTime.Now.AddDays(-10) },
            new Todo { Name = "create backend", IsCompleted = true, Date = DateTime.Now.AddDays(-8) },
            new Todo { Name = "add database", IsCompleted = true, Date = DateTime.Now.AddDays(-7) },
            new Todo { Name = "buy train tickets", Date = DateTime.Now.AddDays(-7) },
            new Todo { Name = "feed the dog, too", IsCompleted = true, Date = DateTime.Now.AddDays(-5) },
            new Todo { Name = "call the plumber", Date = DateTime.Now.AddDays(-5) },
            new Todo { Name = "do presentation", Date = DateTime.Now.AddDays(-2) },
            new Todo { Name = "call Granny", Date = DateTime.Now.AddDays(-1) },
            new Todo { Name = "drink more water", Date = DateTime.Now },
            new Todo { Name = "write tests", Date = DateTime.Now.AddDays(1) },
            new Todo { Name = "frontend tests, too!!", Date = DateTime.Now.AddDays(3) }
        );
        context.SaveChanges();
    }
}