using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.Dtos;
using DatingApp.Model;
using hadi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration config;
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly RoleManager<Role> roleManager;

        public AuthController(IConfiguration config, UserManager<User> userManager, SignInManager<User> signInManager, RoleManager<Role> roleManager)
        {
            this.config = config;
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.roleManager = roleManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserForRegister userForRegister)
        {
            string[] role = new string[]
            {
                "employee"
            };

            User userToCreate = new User
            {
                UserName = userForRegister.username,
                FirstName = userForRegister.firstname,
                LastName = userForRegister.lastname,
                Email = userForRegister.email
            };
            var result = await userManager.CreateAsync(userToCreate, userForRegister.password);

            var result1 = await userManager.AddToRolesAsync(userToCreate, role);

            UserForList user = new UserForList
            {
                id = userToCreate.Id,
                username = userToCreate.UserName,
                firstName = userToCreate.FirstName,
                lastName = userToCreate.LastName,
                email = userToCreate.Email
            };

            if (result.Succeeded && result1.Succeeded)
            {
                return Ok(user);
            }
            return BadRequest(result.Errors);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserForLogin userForLogin)
        {
            var user = await userManager.FindByNameAsync(userForLogin.Username);

            if (user == null)
            {
                return Unauthorized();
            }

            var result = await signInManager.CheckPasswordSignInAsync(user, userForLogin.Password, false);
            if (result.Succeeded)
            {
                var appUser = await userManager.Users
                    .FirstOrDefaultAsync(u => u.NormalizedUserName == userForLogin.Username.ToUpper());


                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                    new Claim(ClaimTypes.Name,user.UserName)
                };

                var roles = await userManager.GetRolesAsync(user);

                foreach (var role in roles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, role));
                }

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.GetSection("AppSettings:Token").Value));

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.Now.AddDays(1),
                    SigningCredentials = creds
                };

                var tokenHandler = new JwtSecurityTokenHandler();

                var token = tokenHandler.CreateToken(tokenDescriptor);

                UserForList userToReturn = new UserForList
                {
                    id = user.Id,
                    username = user.UserName,
                    firstName = user.FirstName,
                    lastName = user.LastName,
                    email = user.Email
                };

                return Ok(new
                {
                    token = tokenHandler.WriteToken(token),
                    userToReturn = userToReturn
                });
            }
            return Unauthorized();
        }
        [HttpGet("isExist")]
        public async Task<bool> isEmailExist(string email)
        {
            User user = await userManager.FindByEmailAsync(email);
            if (user != null)
            {
                return true;
            }
            return false;
        }
    }
}
