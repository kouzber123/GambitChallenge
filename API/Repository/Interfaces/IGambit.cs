using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Repository
{
    public interface IGambit
    {

        //basic api for data
        Task<ActionResult<List<ParsedData>>> GetDataAsync();
    }
}
