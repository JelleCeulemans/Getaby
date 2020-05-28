using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dashboardBackend.Models;
using dashboardBackend.Services;
using System.Diagnostics;

namespace dashboardBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DBContext _context;
        private IUserService _userService;

        public UserController(DBContext context, IUserService userService)
        {
            _context = context;
            _userService = userService;
        }

        //Authenticate with email and password
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]UserAuth userParam)
        {
            var user = _userService.Authenticate(userParam.EmployeeNumber, userParam.Password);
            if (user == null)
                return BadRequest(new { message = "employeenumber or password is incorrect" });

            return Ok(user);
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.Include(c => c.Company).Include(r => r.Role).ToListAsync();
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(long id)
        {
            var user = await _context.Users.Include(r => r.Role).Include(g => g.Company).FirstOrDefaultAsync(u => u.UserID == id);


            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/User
        [HttpPut]
        public async Task<IActionResult> PutUser(User user)
        {
            var updateUser = await _context.Users.FirstOrDefaultAsync(u => u.UserID == user.UserID);
            updateUser.Name = user.Name;
            updateUser.EmployeeNumber = user.EmployeeNumber;
            updateUser.Role = await _context.Roles.FirstOrDefaultAsync(r => r.RoleID == user.Role.RoleID);

            _context.Entry(updateUser);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetUser", new { id = user.UserID }, user);
        }

        // POST: api/User
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            var insertUser = new User
            {
                Name = user.Name,
                Password = Cipher.Encrypt(user.Password, Cipher.secretKey),
                EmployeeNumber = user.EmployeeNumber,
                Role = _context.Roles.Single(r => r.RoleID == user.Role.RoleID),
                Company = _context.Companies.Single(c => c.CompanyID == user.Company.CompanyID)
            };
            _context.Users.Add(insertUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = insertUser.UserID }, insertUser);
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(long id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }

        [HttpGet]
        [Route("company/{companyID}")]
        public async Task<ActionResult<IEnumerable<User>>> GetWhereCompanyID(int companyID)
        {
            return await _context.Users.Where(t => t.Company.CompanyID == companyID).Include(r => r.Role).Include(g => g.Company).ToListAsync();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserID == id);
        }
    }
}
