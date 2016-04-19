using System;

namespace Matasano.Set1
{
    class Challenge2
    {
        public static bool solve()
        {
            byte[] byteArr1 = Helpers.bytesFromHexString("1c0111001f010100061a024b53535009181c");
            byte[] byteArr2 = Helpers.bytesFromHexString("686974207468652062756c6c277320657965");

            byte[] xoredValues = Helpers.xor(byteArr1, byteArr2);
            string stringVal = Helpers.stringFromByteArray(xoredValues);
            bool success = Helpers.verify("746865206b696420646f6e277420706c6179", stringVal);
            if (success)
            {
                Console.WriteLine("Success!");
            }

            return success;
        }
    }
}
