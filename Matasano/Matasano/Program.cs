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
            bool success = true;
            success = success && Set1.Challenge1.solve();
            success = success && Set1.Challenge2.solve();

            if (success)
            {
                Console.WriteLine("All GOOD!");
            }
        }
    }
}
