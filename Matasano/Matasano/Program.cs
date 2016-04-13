using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Matasano
{
    class Program
    {
        static void Main(string[] args)
        {
            var str = "49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d";

            string converted = Set1.Challenge1.b64Encode(str);
            Console.WriteLine(converted);
            var success = String.Equals("SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t", converted);
        }
    }
}
