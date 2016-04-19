using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Matasano.Set1
{
    class Challenge1
    {
        public static bool solve()
        {
            var str = "49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d";

            string actual = Helpers.b64Encode(str);
            string expected= "SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t";
            bool success = Helpers.verify(expected, actual);
            if (success)
            {
                Console.WriteLine("Success!");
            }

            return success;
        }
    }
}
