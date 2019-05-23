using DotNetNuke.Services.Exceptions;
using DotNetNuke.Web.Api;
using HN.MyTools.Models;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.OData;

namespace HN.MyTools.Controllers
{
    [DnnAuthorize]
    public class TodoItemsController : DnnApiController
    {
        private readonly UnitOfWork _unitOfWork;

        public TodoItemsController()
        {
            _unitOfWork = new UnitOfWork();
        }

        [HttpGet]
        public HttpResponseMessage Get()
        {
            try
            {
                var items = _unitOfWork.TodoItemService
                    .GetByUserId(UserInfo.UserID)
                    .Select(x => new TodoItemModel(x))
                    .ToList();
                return Request.CreateResponse(items);
            }
            catch (Exception ex)
            {
                Exceptions.LogException(ex);
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }

        [HttpGet]
        public HttpResponseMessage Get(Guid id)
        {
            try
            {
                var item = _unitOfWork.TodoItemService.GetById(id);

                if (item == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                if (item.UserId != UserInfo.UserID)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest);
                }

                return Request.CreateResponse(new TodoItemModel(item));
            }
            catch (Exception ex)
            {
                Exceptions.LogException(ex);
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }

        [HttpPost]
        public HttpResponseMessage Post(TodoItemModel model)
        {
            try
            {
                var item = _unitOfWork.TodoItemService.Create(model.ToTodoItem(UserInfo.UserID));
                _unitOfWork.SaveChanges();

                var response = Request.CreateResponse(HttpStatusCode.Created, item);
                response.Headers.Location = GetTodoItemUri(item.Id);
                return response;
            }
            catch (Exception ex)
            {
                Exceptions.LogException(ex);
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }

        [HttpPatch]
        public HttpResponseMessage Patch(Guid id, Delta<TodoItemModel> delta)
        {
            try
            {
                var item = _unitOfWork.TodoItemService.GetById(id);

                if (item == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                if (item.UserId != UserInfo.UserID)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest);
                }

                var newItem = new TodoItemModel(item);
                delta.Patch(newItem);

                // Validate data
                if (string.IsNullOrWhiteSpace(newItem.Title)
                    || newItem.Title.Length > 100
                    || (!string.IsNullOrWhiteSpace(newItem.Description) && newItem.Description.Length > 300))
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest);
                }

                // These fields should not be updated
                newItem.UserId = item.UserId;
                newItem.CreatedBy = item.CreatedBy;
                newItem.CreatedDate = item.CreatedDate;
                newItem.LastModifiedBy = UserInfo.UserID;

                _unitOfWork.TodoItemService.Update(newItem.ToTodoItem());
                _unitOfWork.SaveChanges();

                return Request.CreateResponse(HttpStatusCode.NoContent);
            }
            catch (Exception ex)
            {
                Exceptions.LogException(ex);
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }

        [HttpDelete]
        public HttpResponseMessage Delete(Guid id)
        {
            try
            {
                var item = _unitOfWork.TodoItemService.GetById(id);

                if (item == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                if (item.UserId != UserInfo.UserID)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest);
                }

                _unitOfWork.TodoItemService.Delete(id);
                _unitOfWork.SaveChanges();

                return Request.CreateResponse(HttpStatusCode.NoContent);
            }
            catch (Exception ex)
            {
                Exceptions.LogException(ex);
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }

        private Uri GetTodoItemUri(Guid id)
        {
            return new Uri(string.Format("{0}://{1}/{2}/{3}",
                Request.RequestUri.Scheme,
                Request.RequestUri.Host,
                "DesktopModules/MTGet/API/TodoItems",
                id));
        }
    }
}