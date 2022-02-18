using DatingApp.Dtos;
using DatingApp.interfaces;
using DatingApp.Model;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DatingApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly IEmailService mailService;
        private readonly IEmployeService employeService;

        public UsersController(UserManager<User> userManager, IEmailService mailService, IEmployeService employeService)
        {
            this.userManager = userManager;
            this.mailService = mailService;
            this.employeService = employeService;
        }
        [AllowAnonymous]
        [HttpGet("getEmail")]
        public async Task<IActionResult> getEmail(string id)
        {
            User user = await userManager.FindByIdAsync(id);
            if (user != null)
            {
                return Ok(new
                {
                    id = id,
                    email = user.Email
                });
            }
            return BadRequest();
        }
        [HttpPost("getUser")]
        public async Task<IActionResult> getUser([FromBody] string id)
        {
            User user = await userManager.FindByIdAsync(id);
            if (user != null)
            {
                UserForList userToReturn = new UserForList
                {
                    id = user.Id,
                    email = user.Email,
                    username = user.UserName,
                    firstName = user.FirstName,
                    lastName = user.LastName
                };
                return Ok(userToReturn);
            }
            return BadRequest();
        }
        [AllowAnonymous]
        [HttpPost("changePass")]
        public async Task<IActionResult> changePassword([FromBody] ChangePassword info)
        {
            var user = await userManager.FindByIdAsync(info.id);

            if (user != null)
            {
                user.PasswordHash = userManager.PasswordHasher.HashPassword(user, info.newPassword);
                var result = await userManager.UpdateAsync(user);

                if (result.Succeeded)
                {
                    return Ok();
                }
            }
            return BadRequest();
        }

        [AllowAnonymous]
        [HttpPost("sendEmail")]
        public async Task<IActionResult> SendMail([FromBody] EmailInfo emailInfo)
        {
            User user = await userManager.FindByEmailAsync(emailInfo.EmailTo);
            if (user != null)
            {
                emailInfo.Subject = "Enter the link to change your password";
                emailInfo.Body = "https://tabacs20210702101539.azurewebsites.net/editPassword/" + user.Id;
                try
                {
                    await mailService.SendEmailAsync(emailInfo);
                    return Ok();
                }
                catch (Exception ex)
                {
                    return BadRequest(ex);
                }
            }
            return BadRequest();
        }
        [Authorize(Policy = "admin")]
        [HttpPost("AddOrder")]
        public async Task<IActionResult> addOrder([FromBody] Order o)
        {
            string id = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            o.Price = 0;
            o.CreatedAt = DateTime.Now;
            o.isPayed = false;
            employeService.AddOrder(o);

            if (await employeService.SaveAll())
            {
                return Ok(new { o = o });
            }
            throw new Exception("Creating the order failed");
        }

        [HttpPost("addPayment/{orderId}")]
        public async Task<IActionResult> addPayment([FromBody] double coins, int orderId)
        {
            Order order = await employeService.GetOrderById(orderId);

            order.ReceivedPrice += coins;
            order.RemainingPrice -= coins;

            if (order.RemainingPrice == 0)
            {
                order.isPayed = true;
            }
            employeService.updateOrder(order);

            if (!await employeService.SaveAll())
            {
                throw new Exception();
            }

            OrderPayment o = new OrderPayment
            {
                Date = DateTime.Now,
                OrderId = orderId,
                Order = order,
                Price = coins
            };

            employeService.addPaymente(o);

            if (!await employeService.SaveAll())
            {
                throw new Exception();
            }
            return Ok();
        }

        [HttpGet("GetOrders")]
        public async Task<IActionResult> getOrders()
        {
            List<Order> orders = await employeService.GetOrders();

            return Ok(new
            {
                orders = orders
            });
        }
        [HttpGet("getTabacsList")]
        public async Task<IActionResult> getTabacsDistinct()
        {
            List<TabacForList> t = await employeService.GetTabacsList();
            return Ok(new { t = t });
        }
        [HttpGet("GetOrder/{id}")]
        public async Task<IActionResult> getOrder(int id)
        {
            Order order = await employeService.GetOrder(id);

            if (order != null)
            {
                return Ok(new
                {
                    order = order
                });
            }
            throw new Exception("Order not found");
        }
        [HttpPost("addToOrder/{cId}/{total}")]
        public async Task<IActionResult> addToOrder([FromBody] List<Tabac> tabacs, int cId, double total)
        {
            Customer c = employeService.getCustomer(cId);

            c.Price += total;

            List<OrderDetail> orderDetail = new List<OrderDetail>();

            Order o = new Order
            {
                CreatedAt = DateTime.Now,
                CustomerId = cId,
                IsComplete = false,
                isPayed = false,
                Price = total,
                ReceivedPrice = 0,
                RemainingPrice = total
            };

            employeService.AddOrder(o);

            if (!await employeService.SaveAll())
            {
                throw new Exception("Add Order failed");
            }

            foreach (var tabac in tabacs)
            {
                double quantityLimit = 0;

                Tabac realTabac = await employeService.GetTabac(tabac.Id);

                quantityLimit += tabac.QuantityPerTable;

                if (realTabac.QuantityPerTable < quantityLimit)
                {
                    employeService.deleteOrder(o);
                    if (!await employeService.SaveAll())
                    {
                        throw new Exception("Add Order failed");
                    }
                    throw new Exception("there is no enough tabacs");
                }

                orderDetail.Add(new OrderDetail
                {
                    NameTabac = tabac.Name,
                    Category = tabac.categoryId,
                    IsComplete = false,
                    Quantity = tabac.QuantityPerTable,
                    OrderId = o.Id,
                    Price = tabac.PriceInCfa
                });
            }

            employeService.addToOrder(orderDetail);

            if (!await employeService.SaveAll())
            {
                throw new Exception();
            }
            return Ok();
        }
        [HttpGet("getOrderDetails/{orderId}")]
        public async Task<IActionResult> getOrderDetails(int orderId)
        {
            Order order = await employeService.GetOrder(orderId);
            if (order != null)
            {
                Customer c = employeService.getCustomer(order.CustomerId);
                List<OrderDetail> orderDetails = await employeService.GetOrderDetails(orderId);

                return Ok(new
                {
                    orderDetails = orderDetails,
                    order = order,
                    c = c
                });
            }
            throw new Exception("Order not found");
        }
        [HttpPost("checkOrder/{orderId}")]
        public async Task<IActionResult> checkOrder(int orderId)
        {
            Order order = await employeService.GetOrder(orderId);
            employeService.completeOrder(orderId);
            if (!await employeService.SaveAll())
            {
                throw new Exception();
            }
            List<Order> orders = await employeService.getCustomersOrder(order.CustomerId);

            if (orders.Count == 0)
            {
                employeService.completeCustomer(order.CustomerId);
                if (!await employeService.SaveAll())
                {
                    throw new Exception();
                }
            }
            return Ok();
        }
        [HttpGet("GetOrderHistory")]
        public async Task<IActionResult> GetOrderHistory()
        {
            List<Order> o = await employeService.getOrderHistory();

            return Ok(new
            {
                o = o
            });
        }
        [HttpGet("GetOrderDetailHistory")]
        public async Task<IActionResult> GetOrderDetailHistory(int orderId)
        {
            Order order = await employeService.GetOrder(orderId);
            if (order != null)
            {
                List<OrderDetail> orderDetails = await employeService.GetOrderDetailHistory(orderId);

                return Ok(new
                {
                    orderDetails = orderDetails,
                    order = order
                });
            }
            throw new Exception("Order not found");
        }
        [Authorize(Policy = "admin")]
        [HttpDelete("deleteOrder/{id}")]
        public async Task<IActionResult> deleteOrder(int id)
        {
            Order o = await employeService.GetOrderById(id);
            if (o != null)
            {
                employeService.deleteOrder(o);
                if (await employeService.SaveAll())
                {
                    return Ok(new { o = o });
                }
                throw new Exception("Delete Order failed");
            }
            return BadRequest("NotFound");
        }
        [Authorize(Policy = "admin")]
        [HttpDelete("deleteOrderDetail/{id}")]
        public async Task<IActionResult> deleteOrderDetail(int id)
        {
            OrderDetail o = await employeService.GetOrderDetailById(id);
            if (o != null)
            {
                employeService.deleteOrderDetail(o);
                if (await employeService.SaveAll())
                {
                    return Ok(new { o = o });
                }
                throw new Exception("Delete Order failed");
            }
            return BadRequest("NotFound");
        }

        [HttpGet("getPaymentsHistory/{id}")]
        public async Task<IActionResult> getPaymentsHistory(int id)
        {
            Order o = await employeService.GetOrderById(id);
            Customer c = employeService.getCustomer(o.CustomerId);
            List<OrderPayment> orderPayments = await employeService.getOrderPayment(id);
            return Ok(new
            {
                p = orderPayments,
                cName = c.Name
            });
        }
        [HttpGet("getOrdersCustomer/{id}")]
        public async Task<IActionResult> getOrdersCustomer(int id)
        {
            Customer c = employeService.getCustomer(id);
            List<Order> orders = await employeService.getCustomersOrder(id);
            return Ok(new
            {
                orders = orders,
                c = c
            });
        }
        [HttpPost("addCustomer/{name}")]
        public async Task<IActionResult> addCustomer(string name)
        {
            Customer c = new Customer
            {
                Name = name,
                Date = DateTime.Now,
                IsComplete = false,
                Price = 0
            };
            employeService.AddCustomer(c);

            if (await employeService.SaveAll())
            {
                return Ok(new { c = c });
            }
            throw new Exception("Add Customer failed");
        }
        [HttpGet("getCustomersE")]
        public async Task<IActionResult> getCustomers()
        {
            List<Customer> customers = await employeService.getCustomers();
            return Ok(new
            {
                customers = customers
            });
        }

        [HttpGet("getCustomer/{id}")]
        public IActionResult getCustomer(int id)
        {
            Customer c = employeService.getCustomer(id);
            if (c == null)
            {
                throw new Exception("Customer not found");
            }
            else
            {
                return Ok(new
                {
                    c = c
                });
            }
        }

        [HttpPost("deleteCustomer/{id}")]
        public async Task<IActionResult> deleteCustomer(int id)
        {
            Customer c = employeService.getCustomer(id);
            if (c != null)
            {
                employeService.deleteCustomer(c);
            }

            if (await employeService.SaveAll())
            {
                return Ok(new { c = c });
            }
            throw new Exception("Delete Customer failed");
        }

        [HttpGet("getCustomersHistory")]
        public async Task<IActionResult> getCustomersHistory()
        {
            List<Customer> customers = await employeService.getCustomersHistory();
            return Ok(new
            {
                customers = customers
            });
        }

        [HttpGet("getOrdersCustomerHistory/{id}")]
        public async Task<IActionResult> getOrdersCustomerHistory(int id)
        {
            Customer c = employeService.getCustomer(id);
            List<Order> orders = await employeService.getCustomersOrderHistory(id);
            return Ok(new
            {
                orders = orders,
                c = c
            });
        }
        public static void ExportToExcel(DataTable dt, string filename)
        {
            StreamWriter wr = new StreamWriter(@"D:\\" + filename + ".xls");
            try
            {
                for (int i = 0; i < dt.Columns.Count; i++)
                {
                    wr.Write(dt.Columns[i].ToString().ToUpper() + "\t");
                }

                wr.WriteLine();

                //write rows to excel file
                for (int i = 0; i < (dt.Rows.Count); i++)
                {
                    for (int j = 0; j < dt.Columns.Count; j++)
                    {
                        if (dt.Rows[i][j] != null)
                        {
                            wr.Write(Convert.ToString(dt.Rows[i][j]) + "\t");
                        }
                        else
                        {
                            wr.Write("\t");
                        }
                    }
                    //go to next line
                    wr.WriteLine();
                }
                //close file
                wr.Close();
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        [HttpPost("export/{name}")]
        public IActionResult WriteExcelFile([FromBody] Object persons, string name)
        {
            //Directory.CreateDirectory("\\Majed\\Public\\");
            // Lets converts our object data to Datatable for a simplified logic.
            // Datatable is most easy way to deal with complex datatypes for easy reading and formatting. 
            DataTable table = (DataTable)JsonConvert.DeserializeObject(JsonConvert.SerializeObject(persons), (typeof(DataTable)));
            ExportToExcel(table, name);
            /*using (SpreadsheetDocument document = SpreadsheetDocument.Create("\\Majed\\Public\\" + name + ".xlsx", SpreadsheetDocumentType.Workbook))
            {
                WorkbookPart workbookPart = document.AddWorkbookPart();
                workbookPart.Workbook = new Workbook();

                WorksheetPart worksheetPart = workbookPart.AddNewPart<WorksheetPart>();
                var sheetData = new SheetData();
                worksheetPart.Worksheet = new Worksheet(sheetData);

                Sheets sheets = workbookPart.Workbook.AppendChild(new Sheets());
                Sheet sheet = new Sheet() { Id = workbookPart.GetIdOfPart(worksheetPart), SheetId = 1, Name = "Sheet1" };

                sheets.Append(sheet);

                Row headerRow = new Row();

                List<String> columns = new List<string>();
                foreach (System.Data.DataColumn column in table.Columns)
                {
                    columns.Add(column.ColumnName);

                    Cell cell = new Cell();
                    cell.DataType = CellValues.String;
                    cell.CellValue = new CellValue(column.ColumnName);
                    headerRow.AppendChild(cell);
                }

                sheetData.AppendChild(headerRow);

                foreach (DataRow dsrow in table.Rows)
                {
                    Row newRow = new Row();
                    foreach (String col in columns)
                    {
                        Cell cell = new Cell();
                        cell.DataType = CellValues.String;
                        cell.CellValue = new CellValue(dsrow[col].ToString());
                        newRow.AppendChild(cell);
                    }

                    sheetData.AppendChild(newRow);
                }

                workbookPart.Workbook.Save();
                return Ok();
            }*/
            return Ok();
        }
    }
}
