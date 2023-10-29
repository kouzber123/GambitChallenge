using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Repository
{
    public interface IGambit
    {

        //basic api for data

        //1. get request for client
        Task<ActionResult<List<ParsedData>>> GetDataAsync();
        //2. parses data to readable form
        //2.1 post request?

        //3. authentication > register and login
    }
}
