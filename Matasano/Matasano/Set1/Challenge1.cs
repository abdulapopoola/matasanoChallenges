using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Matasano.Set1
{
    class Challenge1
    {
        public static string toHexString(string input)
        {
            StringBuilder sb = new StringBuilder();

            byte[] bytes = Encoding.Default.GetBytes(input);
            foreach(var byteValue in bytes)
            {
                sb.Append(byteValue.ToString("X2"));
            }

            return sb.ToString();
        }

        public static string b64Encode(string input)
        {
            byte[] bytes = Encoding.ASCII.GetBytes(input);
            return Convert.ToBase64String(bytes);
        }
    }
}
