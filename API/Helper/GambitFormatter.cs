using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Newtonsoft.Json;

namespace API.Helper
{
    public static class GambitFormatter
    {
        /// <summary>
        /// Format data from the end point to proper json data
        /// </summary>
        /// <param name="rawData"></param>
        /// <returns></returns>
        public static List<ParsedData> FormatData(string rawData)
        {
            List<ParsedData> parsedDatas = new();
            var lines = rawData.Split('\n');
            var parsedData = new ParsedData
            {
                TimeStamp = lines[0],

                Registers = new List<RegisterModel>()
            };

            for (int i = 1; i < lines.Length; i++)
            {
                var parts = lines[i].Split(':');
                if (parts.Length == 2 && int.TryParse(parts[0], out int key) && float.TryParse(parts[1], out float value))
                {
                    var Register = new RegisterModel
                    {
                        Register = key,
                        Value = value
                    };
                    if (key == 21 || key == 22)
                    {
                        Register.Value = -Math.Round(value / 1000);
                        Register.Description = "Negative energy accumulator";
                    }
                    else if (key == 33 || key == 34)
                    {
                        Register.Value = Math.Round(value / 10000, 4);
                        Register.Description = "Temperature #1/inlet";
                        Register.Unit = "°C";
                    }
                    else if (key == 92)
                    {
                        var v = Math.Round(value / 10, 1);
                        Register.Value = Math.Round(v);
                        Register.Description = "Signal Quality";
                        Register.Unit = "%";
                    }
                    else
                    {
                        Register.Value = value;
                        Register.Description = null;
                        Register.Unit = null;
                    }

                    parsedData.Registers.Add(Register);

                };

            }
            parsedDatas.Add(parsedData);
            return parsedDatas;

        }
    }
}
