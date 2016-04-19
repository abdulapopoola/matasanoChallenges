using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Matasano.Set1
{
    class Helpers
    {
        public static string b64Encode(string input)
        {
            byte[] bytes = bytesFromHexString(input);
            return Convert.ToBase64String(bytes);
        }

        public static byte[] bytesFromHexString(string hex)
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

        public static byte[] xor(byte[] byte1, byte[] byte2)
        {
            int byte1Len = byte1.Length;
            if (byte1Len != byte2.Length)
            {
                throw new InvalidOperationException(String.Format("Unequal byte arrays: {0} and {1}", byte1, byte2));
            }

            byte[] xoredArray = new byte[byte1Len];
            for (int i = 0; i < byte1Len; i++)
            {
                xoredArray[i] = (byte)(byte1[i] ^ byte2[i]);
            }
            return xoredArray;
        }

        public static string stringFromByteArray(byte[] byteArray)
        {
            StringBuilder str = new StringBuilder();
            foreach (var byteVal in byteArray)
            {
                str.Append(byteVal.ToString("x2"));
            }

            return str.ToString();
        }

        public static bool verify<T>(T expected, T actual)
        {
            return expected.Equals(actual);
        }
    }
}
