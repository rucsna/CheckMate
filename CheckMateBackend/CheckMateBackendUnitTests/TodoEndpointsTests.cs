using CheckMateBackend;
using CheckMateBackend.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace CheckMateBackendUnitTests;

public class TodoEndpointsTests
{
    private static readonly DateTime TestDate = DateTime.Now;
    private static TodoDb CreateDbContextWithTestData()
    {
        var options = new DbContextOptionsBuilder<TodoDb>().UseInMemoryDatabase(databaseName: $"TestDb-{Guid.NewGuid().ToString()}").Options;

        var dbContext = new TodoDb(options);
        
        dbContext.TodoItems.AddRange(
            new Todo{Id = 1, Name = "Test todo1", IsCompleted = false, Date = TestDate},
            new Todo{Id = 2, Name = "Test todo2", IsCompleted = true, Date = TestDate}
            );
        dbContext.SaveChanges();
        return dbContext;
    }
    
    [Fact]
    public async Task GetAllTodos_ReturnAllTodosFromDatabase()
    {
        // Arrange
        await using var db = CreateDbContextWithTestData();
        
        // Act
        var result = await TodoEndpoints.GetAllTodos(db);
        
        // Assert
        var okResult = Assert.IsType<Ok<List<Todo>>>(result);
        
        Assert.NotNull(okResult.Value);
        Assert.NotEmpty(okResult.Value);
        Assert.Collection(okResult.Value, todo1 =>
        {
            Assert.Equal(1, todo1.Id);
            Assert.Equal("Test todo1", todo1.Name);
            Assert.Equal(TestDate, todo1.Date);
            Assert.False(todo1.IsCompleted);
        }, todo2 =>
        {
            Assert.Equal(2, todo2.Id);
            Assert.Equal("Test todo2", todo2.Name);
            Assert.Equal(TestDate, todo2.Date);
            Assert.True(todo2.IsCompleted);
        });
    }
    
}