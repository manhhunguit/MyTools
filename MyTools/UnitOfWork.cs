using HN.MyTools.Services;
using MyTools.Data;
using System;

namespace HN.MyTools
{
    public class UnitOfWork : IDisposable
    {
        private readonly MyToolsContext _context;

        private TodoItemService _todoItemService;

        public UnitOfWork()
        {
            _context = new MyToolsContext();
        }

        public int SaveChanges()
        {
            return _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public TodoItemService TodoItemService
        {
            get
            {
                if (_todoItemService == null)
                {
                    _todoItemService = new TodoItemService(_context);
                }
                return _todoItemService;
            }
        }
    }
}