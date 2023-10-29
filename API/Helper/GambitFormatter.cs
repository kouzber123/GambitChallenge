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
        public static List<ParsedData> FormatData(string rawData)
        {
            List<ParsedData> parsedDatas = new();
            var lines = rawData.Split('\n');
            var parsedData = new ParsedData
            {
                TimeStamp = lines[0],
                RegisterValues = new Dictionary<int, float>(),
                Registers = new List<RegisterModel>()
            };

            for (int i = 1; i < lines.Length; i++)
            {
                var parts = lines[i].Split(':');
                if (parts.Length == 2 && int.TryParse(parts[0], out int key) && float.TryParse(parts[1], out float value))
                {
                    parsedData.RegisterValues[key] = value;

                    var Register = new RegisterModel
                    {
                        Register = key,
                        Value = value
                    };
                    parsedData.Registers.Add(Register);

                };
            }
            parsedDatas.Add(parsedData);

            return parsedDatas;

        }
    }
}
