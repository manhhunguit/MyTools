using HN.MyTools.Domain;
using MyTools.Data;
using System;
using System.Collections.Generic;
using System.Linq;

namespace HN.MyTools.Services
{
    public class TodoItemService
    {
        private readonly MyToolsContext _context;

        public TodoItemService(MyToolsContext context)
        {
            _context = context;
        }

        public IEnumerable<TodoItem> GetByUserId(int userId)
        {
            return _context.MtTodoItems
                .Where(x => x.UserId == userId)
                .OrderByDescending(x => x.CreatedDate)
                .ToList()
                .Select(x => new TodoItem(x))
                .ToList();
        }

        public TodoItem GetById(Guid id)
        {
            var item = _context.MtTodoItems
                .Where(x => x.Id == id)
                .FirstOrDefault();
            return item != null ? new TodoItem(item) : null;
        }

        public TodoItem Create(TodoItem item)
        {
            var entity = new MtTodoItem
            {
                Id = Guid.NewGuid(),
                UserId = item.UserId,
                Title = item.Title,
                Description = item.Description,
                Done = item.Done,
                IsDeleted = item.IsDeleted,
                CreatedBy = item.CreatedBy,
                CreatedDate = DateTime.Now
            };

            _context.MtTodoItems.Add(entity);

            return new TodoItem(entity);
        }

        public void Update(TodoItem item)
        {
            var entity = _context.MtTodoItems.FirstOrDefault(x => x.Id == item.Id);
            entity.UserId = item.UserId;
            entity.Title = item.Title;
            entity.Description = item.Description;
            entity.Done = item.Done;
            entity.IsDeleted = item.IsDeleted;
            entity.CreatedBy = item.CreatedBy;
            entity.CreatedDate = item.CreatedDate;
            entity.LastModifiedBy = item.LastModifiedBy;
            entity.LastModifiedDate = DateTime.Now;
        }

        public void Delete(Guid id)
        {
            var entity = _context.MtTodoItems.FirstOrDefault(x => x.Id == id);
            _context.MtTodoItems.Remove(entity);
        }
    }
}