using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Model
{
    public class Transaction
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public double Price { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public DateTime Date { get; set; }
        public bool IsComplete { get; set; }
    }
}
