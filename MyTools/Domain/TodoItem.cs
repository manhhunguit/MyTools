using MyTools.Data;
using System;

namespace HN.MyTools.Domain
{
    public class TodoItem
    {
        public Guid Id { get; set; }

        public int UserId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public bool Done { get; set; }

        public bool IsDeleted { get; set; }

        public int CreatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? LastModifiedBy { get; set; }

        public DateTime? LastModifiedDate { get; set; }

        public TodoItem()
        {

        }

        public TodoItem(MtTodoItem item)
        {
            Id = item.Id;
            UserId = item.UserId;
            Title = item.Title;
            Description = item.Description;
            Done = item.Done;
            IsDeleted = item.IsDeleted;
            CreatedBy = item.CreatedBy;
            CreatedDate = item.CreatedDate;
            LastModifiedBy = item.LastModifiedBy;
            LastModifiedDate = item.LastModifiedDate;
        }
    }
}