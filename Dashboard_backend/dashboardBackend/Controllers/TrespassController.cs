using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dashboardBackend.Models;
using System.Diagnostics;

namespace dashboardBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrespassController : ControllerBase
    {
        private readonly DBContext _context;

        public TrespassController(DBContext context)
        {
            _context = context;
        }

        // GET: api/Trespass
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Trespass>>> GetTrespasses()
        {
            return await _context.Trespasses.Include(t => t.Camera).OrderByDescending(t => t.Moment).ToListAsync();
        }

        // GET: api/Trespass/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Trespass>> GetTrespass(int id)
        {
            var trespass = await _context.Trespasses.FindAsync(id);

            if (trespass == null)
            {
                return NotFound();
            }

            return trespass;
        }

        [HttpGet]
        [Route("byYearAndMonth")]
        public async Task<ActionResult<IEnumerable<Trespass>>> GetTrespassesByYearAndMonth(int year, int month)
        {
            Debug.WriteLine(year.ToString(), month.ToString());
            return await _context.Trespasses.Where(m => m.Moment.Year == year && m.Moment.Month == month)
                .Include(c => c.Camera.Site).ToListAsync();
        }

        [HttpGet]
        [Route("countYear")]
        public async Task<int> GetCountYear()
        {
            string currentYear = DateTime.Now.Year.ToString();
            var countTrespass = await _context.Trespasses.Where(m => m.Moment.Year.ToString() == currentYear).CountAsync();
            return countTrespass;
        }

        [HttpGet]
        [Route("countMonth")]
        public async Task<int> GetCountMonth()
        {
            string currentYear = DateTime.Now.Year.ToString();
            string currentMonth = DateTime.Now.Month.ToString();
            var countTrespass = await _context.Trespasses.Where(m => m.Moment.Year.ToString() == currentYear && m.Moment.Month.ToString() == currentMonth).CountAsync();
            return countTrespass;
        }

        [HttpGet]
        [Route("countWeek")]
        public async Task<int> GetCountWeek()
        {
            string currentYear = DateTime.Now.Year.ToString();
            string currentMonth = DateTime.Now.Month.ToString();
            var countTrespass = await _context.Trespasses.Where(m => m.Moment.Year.ToString() == currentYear && m.Moment.Month.ToString() == currentMonth).CountAsync();
            return countTrespass;
        }



        [HttpGet]
        [Route("countEachMonth")]
        public async Task<List<int>> GetCountEachMonth(string year)
        {
            List<int> countMonthList = new List<int>();
            for (int i = 1; i <= 12; i++)
            {
                countMonthList.Add(await _context.Trespasses.Where(m => m.Moment.Month.ToString() == i.ToString() && m.Moment.Year.ToString() == year).CountAsync());
            }
            
            return countMonthList;
        }

        [HttpGet]
        [Route("countEachMonthFilter")]
        public async Task<List<int>> GetCountEachMonthFilter(string year, long siteID)
        {
            List<int> countMonthList = new List<int>();
            for (int i = 1; i <= 12; i++)
            {
                countMonthList.Add(
                    await _context.Trespasses.Where(m => 
                    m.Moment.Month.ToString() == i.ToString() && 
                    m.Moment.Year.ToString() == year && 
                    m.Camera.Site.SiteID == siteID).CountAsync());
            }

            return countMonthList;
        }

        [HttpGet]
        [Route("countEachHour")]
        public async Task<List<int>> GetCountEachHour(string year)
        {
            List<int> countMonthList = new List<int>();
            for (int i = 0; i <= 23; i++)
            {
                countMonthList.Add(await _context.Trespasses.Where(m => m.Moment.Hour.ToString() == i.ToString() && m.Moment.Year.ToString() == year).CountAsync());
            }

            return countMonthList;
        }

        [HttpGet]
        [Route("countEachHourFilter")]
        public async Task<List<int>> GetCountEachHourFilter(string year, long siteID)
        {
            List<int> countMonthList = new List<int>();
            for (int i = 0; i <= 23; i++)
            {
                countMonthList.Add(await _context.Trespasses.Where(m => m.Moment.Hour.ToString() == i.ToString() && m.Moment.Year.ToString() == year && m.Camera.Site.SiteID == siteID).CountAsync());
            }

            return countMonthList;
        }

        /*[HttpGet]
        [Route("countWeek")]
        public async Task<int> GetCountWeek()
        {
            string currentYear = DateTime.Now.Year.ToString();
            string currentMonth = DateTime.Now.Year.ToString();
            var countTrespass = await _context.Trespasses.Where(m => m.Moment.Year.ToString() == currentYear && m.Moment.Month.ToString() == currentMonth).CountAsync();
            return countTrespass;
        }*/

        [HttpGet]
        [Route("countDay")]
        public async Task<int> GetCountDay()
        {
            string currentYear = DateTime.Now.Year.ToString();
            string currentMonth = DateTime.Now.Month.ToString();
            string currentDay = DateTime.Now.Day.ToString();
            var countTrespass = await _context.Trespasses.Where(m => 
                m.Moment.Year.ToString() == currentYear && 
                m.Moment.Month.ToString() == currentMonth &&
                m.Moment.Day.ToString() == currentDay).CountAsync();
            return countTrespass;
        }

        [HttpGet]
        [Route("everyMonthOfYear")]
        public async Task<List<int>> getEveryMonthOfYear(int year)
        {
            return await _context.Trespasses.Where(a => a.Moment.Year == year).Select(a => a.Moment.Month).Distinct().ToListAsync();
        }

        [HttpGet]
        [Route("getDistinctYear")]
        public async Task<List<int>> GetDistinctYear()
        {
            var years = await _context.Trespasses.OrderBy(m => m.Moment).Select(a => a.Moment.Year).Distinct().ToListAsync();
            return years;
        }

        [HttpPut]
        public async Task<IActionResult> AddToArchive(Trespass trespass)
        {
            var updateTrespass = await _context.Trespasses.FindAsync(trespass.TrespassID);
            updateTrespass.Archive = true;

            _context.Entry(updateTrespass);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetTrespass", new { id = updateTrespass.TrespassID }, updateTrespass);
        }

        // POST: api/Trespass
        [HttpPost]
        public async Task<ActionResult<Trespass>> PostTrespass(Trespass trespass)
        {
            var insertTrespass = new Trespass
            {
                Moment = trespass.Moment,
                Path = trespass.Path,
                Archive = trespass.Archive,
                // Site = _context.Sites.Single(s => s.SiteID == trespass.Site.SiteID)
            };
            _context.Trespasses.Add(insertTrespass);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTrespass", new { id = insertTrespass.TrespassID }, insertTrespass);
        }

        // DELETE: api/Trespass/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Trespass>> DeleteTrespass(int id)
        {
            var trespass = await _context.Trespasses.FindAsync(id);
            if (trespass == null)
            {
                return NotFound();
            }

            _context.Trespasses.Remove(trespass);
            await _context.SaveChangesAsync();

            return trespass;
        }

        [HttpGet]
        [Route("whereArchiveFalse")]
        public async Task<ActionResult<IEnumerable<Trespass>>> GetWhereArchiveIsFalse()
        {
            return await _context.Trespasses.Include(c => c.Camera).Where(t => t.Archive == false).ToListAsync();
        }

        [HttpGet]
        [Route("whereArchiveTrue")]
        public async Task<ActionResult<IEnumerable<Trespass>>> GetWhereArchiveIsTrue()
        {
            return await _context.Trespasses.Include(c => c.Camera).Where(t => t.Archive == true).ToListAsync();
        }

        private bool TrespassExists(int id)
        {
            return _context.Trespasses.Any(e => e.TrespassID == id);
        }
    }
}
