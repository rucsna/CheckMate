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
    
    [Fact]
    public async Task GetTodosByDate_ReturnsTodoWithTheGivenDate()
    {
        // Arrange
        await using var db = CreateDbContextWithTestData();
        db.TodoItems.Add(new Todo
            { Id = 3, Name = "Test todo3", IsCompleted = false, Date = new DateTime(2000, 11, 11) });
        await db.SaveChangesAsync();
        
        // Act
        var result = await TodoEndpoints.GetTodosByDate(db, "2000-11-11");
        
        // Assert
        var okResult = Assert.IsType<Ok<List<Todo>>>(result);
        
        Assert.NotNull(okResult.Value);
        Assert.NotEmpty(okResult.Value);
        Assert.Single(okResult.Value);
        Assert.Collection(okResult.Value, todo =>
        {
            Assert.Equal(new DateTime(2000, 11, 11), todo.Date);
        });
    }
    
    [Fact]
    public async Task GetTodosByDate_ReturnsEmptyList_WhenDateNotFound()
    {
        // Arrange
        await using var db = CreateDbContextWithTestData();

        // Act
        var result = await TodoEndpoints.GetTodosByDate(db, "2000-11-11");
        
        // Assert
        var okResult = Assert.IsType<Ok<List<Todo>>>(result);
        
        Assert.NotNull(okResult.Value);
        Assert.Empty(okResult.Value);
    }
    
    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("20001-112-11")]
    [InlineData("date")]
    public async Task GetTodosByDate_ReturnsBadRequest_WhenInvalidDate(string date)
    {
        // Arrange
        await using var db = CreateDbContextWithTestData();

        // Act
        var result = await TodoEndpoints.GetTodosByDate(db, date);
        
        // Assert
        var badRequestResult = Assert.IsType<BadRequest<string>>(result);
        Assert.Equal("Invalid date format", badRequestResult.Value);
    }
}