using API.Models;
using API.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class GambitController : BaseApiController
    {
        private readonly IGambit _gambit;
        public GambitController(IGambit gambit)
        {
            _gambit = gambit;
        }

        //basic api for data
        [Authorize]
        [HttpGet("gambits")]
        /// <summary>
        /// Returning as list as we never know if there is more objects
        /// </summary>
        /// <returns></returns>
        public async Task<ActionResult<List<ParsedData>>> GetApiData()
        {
            return await _gambit.GetDataAsync();

        }
    }
}
