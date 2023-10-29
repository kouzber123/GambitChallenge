using API.Helper;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Repository
{
    public class GambitRepository : IGambit
    {
        /// <summary>
        /// we handle get request for the gambit data and send it back to our client we do not save it  to our db
        /// </summary>
        /// <returns></returns>
        public async Task<ActionResult<List<ParsedData>>> GetDataAsync()
        {
            using HttpClient client = new();
            try
            {
                // Send an HTTP GET request to the URL
                HttpResponseMessage response = await client.GetAsync("https://tuftuf.gambitlabs.fi/feed.txt");
                // Check if the request was successful
                if (response.IsSuccessStatusCode)
                {
                    // Read the content as a string
                    string content = await response.Content.ReadAsStringAsync();

                    // Now, 'content' holds the data from the external URL
                    //use helper to format data  and return
                    var formatContent = GambitFormatter.FormatData(content);
                    return new OkObjectResult(formatContent);
                }
                else
                {
                    return new BadRequestObjectResult("Request failed with status code: " + response.StatusCode);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("An error occurred: " + e.Message);
            }
            return new NoContentResult();
        }
    }
}
