using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class RegisterModel
    {
        public int Register { get; set; }
        public double Value { get; set; }
        public string Description { get; set; }
        public string Unit { get; set; }
    }
}
