using DotNetNuke.Web.Api;
using System.Web.Http;

namespace HN.MyTools
{
    public class ServiceRouteMapper : IServiceRouteMapper
    {
        public void RegisterRoutes(IMapRoute mapRouteManager)
        {
            mapRouteManager.MapHttpRoute(
                moduleFolderName: "MTGet",
                routeName: "MTGetRoute",
                url: "{controller}/{id}",
                defaults: new { controller = "{controller}", action = "Get", id = RouteParameter.Optional },
                namespaces: new[] { "HN.MyTools.Controllers" });

            mapRouteManager.MapHttpRoute(
                moduleFolderName: "MTPost",
                routeName: "MTPostRoute",
                url: "{controller}",
                defaults: new { controller = "{controller}", action = "Post" },
                namespaces: new[] { "HN.MyTools.Controllers" });

            mapRouteManager.MapHttpRoute(
                moduleFolderName: "MTPatch",
                routeName: "MTPatchRoute",
                url: "{controller}/{id}",
                defaults: new { controller = "{controller}", action = "Patch" },
                namespaces: new[] { "HN.MyTools.Controllers" });

            mapRouteManager.MapHttpRoute(
                moduleFolderName: "MTDelete",
                routeName: "MTDeleteRoute",
                url: "{controller}/{id}",
                defaults: new { controller = "{controller}", action = "Delete" },
                namespaces: new[] { "HN.MyTools.Controllers" });
        }
    }
}