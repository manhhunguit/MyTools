using HN.MyTools.Domain;
using System;

namespace HN.MyTools.Models
{
    public class TodoItemModel
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

        public TodoItemModel()
        {

        }

        public TodoItemModel(TodoItem item)
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

        public TodoItem ToTodoItem()
        {
            return new TodoItem
            {
                Id = Id,
                UserId = UserId,
                Title = Title,
                Description = Description,
                Done = Done,
                IsDeleted = IsDeleted,
                CreatedBy = UserId,
                CreatedDate = CreatedDate,
                LastModifiedBy = LastModifiedBy,
                LastModifiedDate = LastModifiedDate
            };
        }

        public TodoItem ToTodoItem(int userId)
        {
            return new TodoItem
            {
                Id = Id,
                UserId = userId,
                Title = Title,
                Description = Description,
                Done = Done,
                IsDeleted = IsDeleted,
                CreatedBy = userId,
                CreatedDate = CreatedDate,
                LastModifiedBy = LastModifiedBy,
                LastModifiedDate = LastModifiedDate
            };
        }
    }
}