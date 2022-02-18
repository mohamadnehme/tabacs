using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Model
{
    public class Deposit
    {
        public int Id { get; set; }
        public double Coins { get; set; }
        public int operation { get; set; } // 1 - deposit increase & 2 - deposit decrease
        public DateTime Date { get; set; }
        public int depositorId { get; set; }
        public Depositor depositor { get; set; }
    }
}
