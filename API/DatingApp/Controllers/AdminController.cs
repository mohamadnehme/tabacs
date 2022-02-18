using DatingApp.interfaces;
using DatingApp.Model;
using DatingApp.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService adminService;
        private readonly IEmployeService employeService;

        public AdminController(IAdminService adminService, IEmployeService employeService)
        {
            this.adminService = adminService;
            this.employeService = employeService;
        }
        [Authorize(Policy = "admin")]
        [HttpPost("Add")]
        public async Task<IActionResult> AddTabac(TabacForCreation t)
        {
            Category c = await adminService.GetCategory(t.Category == 1 ? "cigare" : "cigarette");

            Tabac tabac = new Tabac
            {
                Name = t.Name,
                PriceInCfa = t.PriceInCfa,
                QuantityPerTable = t.QuantityPerTable,
                Description = t.Description
            };

            adminService.Add(tabac);

            if (await adminService.SaveAll())
            {
                return Ok();
            }
            throw new Exception("Creating the tabac failed");
        }
        [Authorize(Policy = "admin")]
        [HttpPut("Update")]
        public async Task<IActionResult> UpdateTabac(TabacForCreation t)
        {
            Tabac tabac = await adminService.GetTabac(t.Id);

            if (tabac == null)
                return BadRequest("NotFound");

            tabac.Name = t.Name;
            tabac.PriceInCfa = t.PriceInCfa;
            tabac.Description = t.Description;
            tabac.QuantityPerTable = t.QuantityPerTable;

            adminService.Update(tabac);

            if (await adminService.SaveAll())
            {
                return Ok();
            }
            throw new Exception("Update the tabac failed");
        }
        [Authorize(Policy = "admin")]
        [HttpDelete("Delete")]
        public async Task<IActionResult> RemoveTabac(string id)
        {
            Tabac t = await adminService.GetTabac(id);

            if (t == null)
                return BadRequest("NotFound");

            adminService.Delete(t);

            if (await adminService.SaveAll())
            {
                return Ok(new
                {
                    tabac = t
                });
            }
            throw new Exception("Delete the tabac failed");
        }
        [Authorize(Policy = "admin")]
        [HttpGet("GetTabacs")]
        public async Task<IActionResult> GetTabacs(int category)
        {
            List<Tabac> t = await adminService.GetTabacs(category);
            if (t != null)
            {
                return Ok(new
                {
                    tabacs = t
                });
            }
            return BadRequest("NotFound");
        }
        [Authorize(Policy = "admin")]
        [HttpGet("GetTabac")]
        public async Task<IActionResult> GetTabac(string id)
        {
            Tabac t = await adminService.GetTabac(id);
            if (t != null)
            {
                return Ok(new
                {
                    tabac = t
                });
            }
            return BadRequest("NotFound");
        }
        [Authorize(Policy = "admin")]
        [HttpPut("updateCfa")]
        public async Task<IActionResult> UpdateCfa(double cfa)
        {
            adminService.UpdateCfa(cfa);
            if (await adminService.SaveAll())
            {
                return Ok(new
                {
                    cfa = cfa
                });
            }
            throw new Exception("Update the cfa failed");
        }
        [Authorize(Policy = "admin")]
        [HttpGet("SearchByName")]
        public async Task<IActionResult> search(string name, int category)
        {
            List<Tabac> tabacs;
            if (name == null)
            {
                tabacs = await adminService.GetTabacs(category);
                return Ok(new
                {
                    t = tabacs
                });
            }
            tabacs = await adminService.search(name, category);
            return Ok(new
            {
                t = tabacs
            });
        }
        [Authorize(Policy = "admin")]
        [HttpPost("AddTransaction")]
        public async Task<IActionResult> addTransaction([FromBody] Transaction t)
        {
            t.Date = DateTime.Now;
            t.Price = 0;
            adminService.AddTransaction(t);
            if (await adminService.SaveAll())
            {
                return Ok();
            }
            throw new Exception("Creating transaction failed");
        }
        [Authorize(Policy = "admin")]
        [HttpGet("GetTransactions")]
        public async Task<IActionResult> getTransactions()
        {
            List<Transaction> t = await adminService.GetTransactions();

            return Ok(new
            {
                t = t
            });
        }
        [Authorize(Policy = "admin")]
        [HttpGet("GetTransaction")]
        public async Task<IActionResult> getTransaction(int id)
        {
            Transaction t = await adminService.GetTransaction(id);
            if (t != null)
            {
                return Ok(new
                {
                    t = t
                });
            }
            return BadRequest();
        }
        [Authorize(Policy = "admin")]
        [HttpDelete("deleteTrans")]
        public async Task<IActionResult> deleteTrans(int id)
        {
            Transaction t = await adminService.GetTransaction(id);
            if (t != null)
            {
                adminService.deleteTrans(t);
                if (await adminService.SaveAll())
                {
                    return Ok(new { t = t });
                }
                throw new Exception("Delete Transaction failed");
            }
            return BadRequest("NotFound");
        }
        [HttpGet("getTabacsList")]
        public async Task<IActionResult> getTabacsDistinct()
        {
            List<Tabac> t = await adminService.GetTabacsList();
            return Ok(new { t = t });
        }
        [Authorize(Policy = "admin")]
        [HttpPost("addShipments/{transId}/{name}/{total}")]
        public async Task<IActionResult> addShipments(List<Tabac> tabacs, int transId, string name, double total)
        {
            Transaction t = await adminService.GetTransaction(transId);
            t.Price += total;
            Charge c = new Charge
            {
                CreatedAt = DateTime.Now,
                name = name,
                TransactionId = transId,
                Price = total,
                IsComplete = false
            };
            adminService.addCharge(c);

            if (!await adminService.SaveAll())
            {
                throw new Exception("Add Charge failed");
            }

            List<Shipment> shipments2 = new List<Shipment>();

            foreach (var tabac in tabacs)
            {
                shipments2.Add(new Shipment
                {
                    NameTabac = tabac.Name,
                    Category = tabac.categoryId,
                    Price = tabac.PriceInCfa,
                    Quantity = tabac.QuantityPerTable,
                    ChargeId = c.Id
                });
            }
            adminService.addShipment(shipments2);
            if (!await adminService.SaveAll())
            {
                throw new Exception("Add Shipment failed");
            }
            return Ok();
        }
        [Authorize(Policy = "admin")]
        [HttpGet("getShipments")]
        public async Task<IActionResult> getShipments(int chargeId)
        {
            Charge c = adminService.getCharge(chargeId);
            List<Shipment> s = await adminService.GetShipments(chargeId);
            return Ok(new
            {
                s = s,
                cid = chargeId,
                tid = c.TransactionId
            });
        }
        [Authorize(Policy = "admin")]
        [HttpGet("GetCharges")]
        public async Task<IActionResult> getCharges(int transId)
        {
            Transaction t = await adminService.GetTransaction(transId);
            if (t == null)
            {
                throw new Exception("Transaction not found");
            }

            List<Charge> charges = await adminService.getCharges(transId);

            return Ok(new
            {
                charges = charges
            });
        }
        [Authorize(Policy = "admin")]
        [HttpGet("GetChargesHistory")]
        public async Task<IActionResult> GetChargesHistory(int transId)
        {
            Transaction t = await adminService.GetTransaction(transId);
            if (t == null)
            {
                throw new Exception("Transaction not found");
            }

            List<Charge> charges = await adminService.getChargesHistory(transId);

            return Ok(new
            {
                charges = charges
            });
        }
        [Authorize(Policy = "admin")]
        [HttpPost("checkShipment/{chargeId}/{transId}")]
        public async Task<IActionResult> checkShipment(int chargeId, int transId)
        {
            List<Shipment> shipments = await adminService.GetShipments(chargeId);

            Charge c = adminService.getCharge(chargeId);

            adminService.completeCharge(c, shipments);

            if (!await adminService.SaveAll())
            {
                throw new Exception();
            }
            List<Charge> charges = await adminService.getCharges(transId);

            int complete = 1;

            foreach (var ch in charges)
            {
                if (ch.IsComplete == false)
                {
                    complete = 0;
                    break;
                }
            }
            if (complete == 1)
            {
                adminService.completeTrans(transId);
                if (!await adminService.SaveAll())
                {
                    throw new Exception();
                }
            }
            return Ok(new
            {
                complete = complete
            });
        }
        [Authorize(Policy = "admin")]
        [HttpGet("getHistory")]
        public async Task<IActionResult> getHistory()
        {
            List<Transaction> t = await adminService.getHistory();
            return Ok(new
            {
                t = t
            });
        }
        [Authorize(Policy = "admin")]
        [HttpPost("deleteShipment")]
        public async Task<IActionResult> deleteShipment([FromBody] Shipment s)
        {
            adminService.deleteShipment(s);
            if (!await adminService.SaveAll())
            {
                throw new Exception();
            }
            return Ok(new { s = s });
        }
        [Authorize(Policy = "admin")]
        [HttpPost("AddDepositor")]
        public async Task<IActionResult> addDepositor([FromBody] Depositor d)
        {
            adminService.addDepositor(d);
            if (await adminService.SaveAll())
            {
                return Ok();
            }
            throw new Exception("Add Depositor failed");
        }
        [Authorize(Policy = "admin")]
        [HttpGet("GetDepositors")]
        public async Task<IActionResult> getDepositors()
        {
            List<Depositor> d = await adminService.GetDepositors();
            return Ok(new
            {
                d = d
            });
        }
        [Authorize(Policy = "admin")]
        [HttpPost("AddDeposit/{depositorId}")]
        public async Task<IActionResult> addDeposit([FromBody] Deposit d, int depositorId)
        {
            Depositor dep = await adminService.GetDepositor(depositorId);
            d.depositor = dep;
            d.depositorId = depositorId;
            d.Date = DateTime.Now;
            if (d.operation == 1)
            {
                dep.Coins += d.Coins;
            }
            else
            {
                dep.Coins -= d.Coins;
            }
            adminService.updateDepositor(dep);

            adminService.addDeposit(d);

            if (await adminService.SaveAll())
            {
                return Ok(new { d = dep });
            }
            throw new Exception("Add Deposit failed");
        }
        [Authorize(Policy = "admin")]
        [HttpGet("GetDeposit/{idDepositor}")]
        public async Task<IActionResult> getDeposits(int idDepositor)
        {
            List<Deposit> d = await adminService.GetDeposits(idDepositor);
            return Ok(new { d = d });
        }
        [Authorize(Policy = "admin")]
        [HttpDelete("deleteCharge/{chargeId}")]
        public async Task<IActionResult> deleteCharge(int chargeId)
        {
            Charge c = adminService.getCharge(chargeId);
            Transaction t = await adminService.GetTransaction(c.TransactionId);
            t.Price -= c.Price;

            adminService.deleteCharge(c);

            if (await adminService.SaveAll())
            {
                return Ok(new { c = c });
            }
            throw new Exception("Delete Charge failed");
        }
        [HttpGet("getCustomers")]
        public async Task<IActionResult> getCustomers()
        {
            List<Customer> customers = await employeService.getCustomers();
            return Ok(new
            {
                customers = customers
            });
        }
    }
}
