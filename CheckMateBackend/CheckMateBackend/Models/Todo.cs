namespace CheckMateBackend.Models;

public class Todo
{
    public int Id { get; set; }
    public string Name { get; set; }
    public bool IsCompleted { get; set; }
    public DateTime Date { get; set; }
}