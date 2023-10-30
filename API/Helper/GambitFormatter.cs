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
                    //add long formatter here
                    if (key >= 21 && key <= 22 || key >= 17 && key <= 18 || key >= 9 && key <= 10 || key >= 13 && key <= 14 || key >= 25 && key <= 26 || key >= 29 && key <= 30)
                    {

                        if (key == 9 || key == 10 || key == 13 || key == 14 || key == 21 || key == 22 || key == 17 || key == 18)
                        {

                            string extraWord = key >= 9 && key <= 10 || key >= 13 && key <= 14 ? "" : "energy";
                            string isPositive = key >= 13 && key <= 14 ? "Negative" : "Positive";
                            Register.Description = key >= 21 && key <= 22 ? "Negative energy accumulator" : $"{isPositive} {extraWord} accumulator ";
                        }
                        Register.Value = key >= 21 && key <= 22 ? -Valueformatter.LongFormatter(value) : Valueformatter.LongFormatter(value);
                        if (key >= 25 && key <= 26) Register.Description = "Net accumulator";
                        if (key >= 29 && key <= 30) Register.Description = "Net energy accumulator";
                    }

                    //real4 here
                    else if (key >= 31 && key <= 48 || key >= 1 && key <= 8
                    || key >= 19 && key <= 20 || key >= 23 && key <= 24
                     || key >= 15 && key <= 16 || key >= 11 && key <= 12
                     || key >= 77 && key <= 90 || key >= 27 && key <= 28
                     || key >= 37 && key <= 38 || key >= 27 && key <= 28
                     || key >= 99 && key <= 100 || key >= 97 && key <= 98
                     )
                    {
                        Register.Value = key >= 21 && key <= 22 || key >= 15 && key <= 16 || key >= 31 && key <= 32 ? -Valueformatter.Real4formatter(value) : Valueformatter.Real4formatter(value);
                        if (key >= 1 && key <= 2)
                        {
                            Register.Unit = "m3/h"; Register.Description = "Flow Rate";
                        }

                        if (key >= 3 && key <= 4)
                        {
                            Register.Unit = "GJ/h";
                            Register.Description = "Energy Flow Rate ";
                        }
                        if (key >= 5 && key <= 8)
                        {
                            Register.Unit = "m/s";
                            Register.Description = key >= 5 && key <= 6 ? "Velocity " : "Fluid sound speed";

                        };

                        if (key >= 33 && key <= 36)
                        {
                            Register.Unit = "°C";

                            if (key == 33 || key == 34) Register.Description = "Temperature #1/inlet";
                            else if (key == 35 || key == 36) Register.Description = "Temperature #2/outlet";

                        }
                        if (key >= 77 && key <= 80)
                        {
                            Register.Unit = "Ohm";

                            if (key == 77 || key == 78) Register.Description = "PT100 resistance of inlet";
                            else if (key == 79 || key == 80) Register.Description = "PT100 resistance of outlet ";

                        }
                        if (key == 11 || key == 12) Register.Description = "Positive decimal fraction ";
                        if (key == 15 || key == 16) Register.Description = "Negative decimal fraction";
                        if (key == 19 || key == 20) Register.Description = "Positive energy decimal fraction";
                        if (key == 27 || key == 28) Register.Description = "Net decimal fraction ";
                        if (key == 31 || key == 32) Register.Description = "Net energy decimal fraction";
                        if (key == 23 || key == 24) Register.Description = "Negative energy decimal fraction";
                        if (key == 25 || key == 26) Register.Description = "Net accumulator";
                        if (key == 27 || key == 28) Register.Description = "Net decimal fraction";
                        if (key == 37 || key == 38) Register.Description = "Analog input AI3 ";
                        if (key == 39 || key == 40) Register.Description = "Analog input AI4";
                        if (key == 39 || key == 40) Register.Description = "Analog input AI4";
                        if (key == 41 || key == 42) Register.Description = "Analog input AI5";

                        if (key >= 81 && key <= 88)
                        {
                            var unitKey = key >= 83 && key <= 84 ? "Nino" : "Micro";
                            var keyString = key >= 81 && key <= 82 ? "Total" : "Delta";
                            Register.Description = $"{keyString} travel time ";

                            Register.Unit = $"{unitKey}-second";
                        }
                        if (key >= 85 && key <= 86) Register.Description = "Upstream travel time ";
                        if (key >= 87 && key <= 88) Register.Description = "Downstream travel time";
                        if (key >= 89 && key <= 90)
                        {
                            Register.Description = "Output current";
                            Register.Unit = "mA";
                        };
                        if (key >= 43 && key <= 48)
                        {
                            if (key >= 43 && key <= 44)
                            {
                                Register.Unit = "mA";
                            }
                            Register.Description = "Current input at AI3 ";
                        };


                    }
                    else if (key == 92 || key >= 59 && key <= 62 || key >= 93 && key <= 96)
                    {

                        if (key == 59) Register.Description = "Key to input";
                        if (key == 60) Register.Description = "Go to Window #";
                        if (key == 61) Register.Description = "LCD Back-lit lights for number of seconds ";
                        if (key == 62) Register.Description = "Times for the beeper  or Pulses left for OCT";
                        if (key == 92) Register.Description = "Signal Quality";
                        if (key == 93) Register.Description = "Upstream strength ";
                        if (key == 94) Register.Description = "Downstream strength";
                        if (key == 95) Register.Description = null;
                        if (key == 96) Register.Description = "Language used in user interface ";
                        Register.Value = Valueformatter.IntegerFormatter(value);

                        if (key >= 93 && key <= 96) Register.Unit = "Range 0-2047";
                        else
                        {
                            Register.Unit = key >= 59 && key <= 62 ? " Writeable" : "%";
                        }

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
