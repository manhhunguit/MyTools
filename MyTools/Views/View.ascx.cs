using DotNetNuke.Entities.Modules;
using System;
using System.Collections.Generic;
using System.IO;

namespace HN.MyTools.Views
{
    public partial class View : PortalModuleBase
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            // Load control
            var view = Request.Params["view"];
            var controlPath = TemplateSourceDirectory;

            if (view != null)
            {
                var viewPath = Server.MapPath("~").Replace("\\", "/") + controlPath + "/" + view + ".ascx";

                if (File.Exists(viewPath))
                {
                    controlPath += "/" + view + ".ascx";
                }
                else
                {
                    view = "NotFound";
                    controlPath += "/Subviews/NotFound.ascx";
                }
            }
            else
            {
                view = "Index";
                controlPath += "/Subviews/Index.ascx";
            }

            // Add control to View.ascx
            var control = LoadControl(controlPath) as PortalModuleBase;
            control.ModuleContext.Configuration = ModuleContext.Configuration;
            control.ID = view;
            UserControlPlaceHolder.Controls.Clear();
            UserControlPlaceHolder.Controls.Add(control);
        }
    }
}