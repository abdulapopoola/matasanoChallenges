using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Matasano.Set1
{
    class Challenge2
    {
        public static string b64Encode(string input)
        {
            byte[] bytes = BytesFromHexString(input);
            return Convert.ToBase64String(bytes);
        }

        public static byte[] BytesFromHexString(string hex)
        {
            const int HEX_CHAR_LEN = 2; //hex strings are 2 chars long each
            if (hex.Length % 2 != 0)
            {
                throw new InvalidOperationException(String.Format("Badly formed hex string: {0}", hex));
            }

            int strLen = hex.Length;
            int bufferLen = strLen / HEX_CHAR_LEN;
            var buffer = new byte[bufferLen];
            for (int i = 0, j = 0; i < strLen; i += 2, j++)
            {
                buffer[j] = byte.Parse(hex.Substring(i, 2), NumberStyles.HexNumber);
            }

            return buffer;
        }
    }
}
