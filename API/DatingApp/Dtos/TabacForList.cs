using DatingApp.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Dtos
{
    public class TabacForList
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int RealQuantity { get; set; }
        public int QuantityPerTable { get; set; }
        public double PriceInCfa { get; set; }
        public int categoryId { get; set; }
        public Category category { get; set; }
    }
}
