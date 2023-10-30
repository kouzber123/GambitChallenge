using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helper
{
    public class Valueformatter
    {
        public static double Real4formatter(float value)
        {


            return Math.Round(value / 10000, 4);
        }

        public static double LongFormatter(float value)
        {

            return Math.Round(value / 1000);
        }
        public static double IntegerFormatter(double value)
        {
            var v = Math.Round(value / 10, 1);
            return Math.Round(v);
        }


    }
}
