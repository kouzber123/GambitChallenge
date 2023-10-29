using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    /// <summary>
    /// If our users face a problem we will serve our static file index.html
    /// we can now run our app from localhost 5048
    /// </summary>
    [AllowAnonymous]
    public class FallbackController : Controller
    {
        public IActionResult Index()
        {

            return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html"), "text/HTML");
        }
    }
}
