using CheckMateBackend;
using CheckMateBackend.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace CheckMateBackendUnitTests;

public class TodoEndpointsTests
{
    private static readonly DateTime TestDate = new (2024, 4, 11);
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
    public async Task GetTodosByDate_ReturnTodoWithTheGivenDate()
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
    public async Task GetTodosByDate_ReturnEmptyList_WhenDateNotFound()
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
    public async Task GetTodosByDate_ReturnBadRequest_WhenDate_EmptyInvalidOrNull(string date)
    {
        // Arrange
        await using var db = CreateDbContextWithTestData();

        // Act
        var result = await TodoEndpoints.GetTodosByDate(db, date);
        
        // Assert
        var badRequestResult = Assert.IsType<BadRequest<string>>(result);
        Assert.Equal("Invalid date format", badRequestResult.Value);
    }

    [Theory]
    [InlineData(4, 2)]
    [InlineData(11, 1)]
    public async Task GetTodosByMonth_ReturnAllTodos_ByGivenMonth(int month, int expectedTodoCount)
    {
        // Arrange
        await using var db = CreateDbContextWithTestData();

        db.TodoItems.Add(new Todo
            { Id = 3, Name = "Test todo3", IsCompleted = false, Date = new DateTime(2024, 11, 11) });
        await db.SaveChangesAsync();
        
        // Act
        var result = await TodoEndpoints.GetTodosByMonth(db, TestDate.Year, month);
        
        // Assert
        var okResult = Assert.IsType<Ok<List<Todo>>>(result);
        Assert.NotNull(okResult.Value);
        Assert.NotEmpty(okResult.Value);
        Assert.Equal(expectedTodoCount, okResult.Value.Count);

        foreach (var todo in okResult.Value)
        {
            Assert.Equal(month, todo.Date.Month);
        }
    }

    [Fact]
    public async Task GetTodosByMonth_ReturnEmpty_WhenNoMonthFound()
    {
        // Arrange
        await using var db = CreateDbContextWithTestData();

        // Act
        var result = await TodoEndpoints.GetTodosByMonth(db, TestDate.Year, 1);
        
        // Assert
        var okResult = Assert.IsType<Ok<List<Todo>>>(result);
        
        Assert.NotNull(okResult.Value);
        Assert.Empty(okResult.Value);
    }
    
    [Theory]
    [InlineData(0, 0)]
    [InlineData(0, 4)]
    [InlineData(1850, 4)]
    [InlineData(3000, 4)]
    [InlineData(2024, 0)]
    [InlineData(2024, 13)]
    [InlineData(100, 100)]
    public async Task GetTodosByMonth_ReturnBadRequest_WhenInvalid_YearOrMonth(int year, int month)
    {
        // Arrange
        await using var db = CreateDbContextWithTestData();

        // Act
        var result = await TodoEndpoints.GetTodosByMonth(db, year, month);
        
        // Assert
        var badRequestResult = Assert.IsType<BadRequest<string>>(result);
        Assert.Equal("Invalid year or month", badRequestResult.Value);
    }

    [Fact]
    public async Task GetTodo_ReturnCorrectTodoFromDatabase()
    {
        // Arrange
        await using var db = CreateDbContextWithTestData();
        
        // Act
        var result = await TodoEndpoints.GetTodo(db, 1);
        
        // Assert
        var okResult = Assert.IsType<Ok<Todo>>(result);
        
        Assert.NotNull(okResult.Value);
        Assert.Equal(1, okResult.Value.Id);
    }

    [Fact]
    public async Task GetTodo_ReturnNotFound_IfNotExist()
    {
        // Arrange
        await using var db = CreateDbContextWithTestData();
        
        // Act
        var result = await TodoEndpoints.GetTodo(db, 5);
        
        // Assert
        var notFoundResult = Assert.IsType<NotFound>(result);
        Assert.NotNull(notFoundResult);
    }

    [Fact]
    public async Task CreateTodo_CreateNewTodoInDatabase()
    {
        // Arrange
        await using var db = CreateDbContextWithTestData();

        var newTodo = new Todo { Name = "New test todo", IsCompleted = false, Date = new DateTime(2000, 1, 1) };

        // Act
        var result = await TodoEndpoints.CreateTodo(newTodo, db);
        
        // Assert
        var createdResult = Assert.IsType<Created<Todo>>(result);
        
        Assert.NotNull(createdResult);
        Assert.NotNull(createdResult.Location);
        
        Assert.Equal(3, db.TodoItems.Count());
        
        var createdTodo = await db.TodoItems.FindAsync(3);
        Assert.NotNull(createdTodo);
        Assert.Equal("New test todo", createdTodo.Name);
        Assert.Equal(new DateTime(2000,1,1), createdTodo.Date);
    }

    [Fact]
    public async Task UpdateTodo_UpdateTodoInDatabase()
    {
        // Arrange
        await using var db = CreateDbContextWithTestData();

        var updatedTodo = new Todo { Name = "Updated test todo", IsCompleted = true };

        // Act
        var result = await TodoEndpoints.UpdateTodo(db, 1, updatedTodo);
        
        // Assert
        var createdResult = Assert.IsType<Created<Todo>>(result);
        
        Assert.NotNull(createdResult);
        Assert.NotNull(createdResult.Location);
        
        var todoInDb = await db.TodoItems.FindAsync(1);
        Assert.NotNull(todoInDb);
        Assert.Equal("Updated test todo", todoInDb.Name);
        Assert.True(todoInDb.IsCompleted);
    }

    [Fact]
    public async Task UpdateTodo_ReturnNotFound_WhenTodoToUpdateNotInDatabase()
    {
        // Arrange
        await using var db = CreateDbContextWithTestData();

        var updatedTodo = new Todo { Name = "Updated test todo", IsCompleted = true };

        // Act
        var result = await TodoEndpoints.UpdateTodo(db, 4, updatedTodo);
        
        // Assert
        var notFoundResult = Assert.IsType<NotFound>(result);
        Assert.NotNull(notFoundResult);
    }

    [Fact]
    public async Task DeleteTodo_DeleteTodoFromDatabase()
    {
        // Arrange
        await using var db = CreateDbContextWithTestData();
        
        // Act
        var result = await TodoEndpoints.DeleteTodo(db, 1);
        
        // Assert
        var noContentResult = Assert.IsType<NoContent>(result);
        Assert.NotNull(noContentResult);
        Assert.Equal(1, db.TodoItems.Count());
        Assert.Collection(db.TodoItems, todo => Assert.Equal(2, todo.Id));
    }
    
    [Fact]
    public async Task DeleteTodo_ReturnNotFound_WhenTodoWithGivenId_NotInDatabase()
    {
        // Arrange
        await using var db = CreateDbContextWithTestData();

        // Act
        var result = await TodoEndpoints.DeleteTodo(db, 4);
        
        // Assert
        var notFoundResult = Assert.IsType<NotFound>(result);
        Assert.NotNull(notFoundResult);
    }
}