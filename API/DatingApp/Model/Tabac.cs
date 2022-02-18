using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Model
{
    public class Tabac
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int QuantityPerTable { get; set; }
        public double PriceInCfa { get; set; }
        public int categoryId { get; set; }
    }
}
