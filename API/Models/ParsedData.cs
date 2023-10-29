using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class ParsedData
    {
        public string TimeStamp { get; set; }
        public Dictionary<int, float> RegisterValues { get; set; }
        public List<RegisterModel> Registers { get; set; }

    }
}
