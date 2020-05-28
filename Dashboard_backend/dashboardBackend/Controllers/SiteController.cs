using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dashboardBackend.Models;

namespace dashboardBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SiteController : ControllerBase
    {
        private readonly DBContext _context;

        public SiteController(DBContext context)
        {
            _context = context;
        }

        // GET: api/Site
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Site>>> GetSites()
        {
            return await _context.Sites.ToListAsync();
        }

        [HttpGet]
        [Route("whereCompany")]
        public async Task<ActionResult<IEnumerable<Site>>> GetSitesWhereCompanyID(long companyID)
        {
            return await _context.Sites.Where(c => c.Company.CompanyID == companyID).ToListAsync();
        }

        // GET: api/Site/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Site>> GetSite(int id)
        {
            var site = await _context.Sites.FindAsync(id);

            if (site == null)
            {
                return NotFound();
            }

            return site;
        }

        // PUT: api/Site/5
        [HttpPut]
        public async Task<IActionResult> PutSite(Site site)
        {
            var updateSite = await _context.Sites.FindAsync(site.SiteID);
            updateSite.Name = site.Name;

            _context.Entry(updateSite);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetSite", new { id = updateSite.SiteID }, updateSite);
        }

        // POST: api/Site
        [HttpPost]
        public async Task<ActionResult<Site>> PostSite(Site site)
        {
            var insertSite = new Site
            {
                Name = site.Name,
                Company = await _context.Companies.FindAsync(site.Company.CompanyID)
            };

            _context.Sites.Add(insertSite);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSite", new { id = insertSite.SiteID }, insertSite);
        }

        // DELETE: api/Site/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Site>> DeleteSite(int id)
        {
            var site = await _context.Sites.Include(c => c.Cameras).FirstOrDefaultAsync(s => s.SiteID == id);
            if (site == null)
            {
                return NotFound();
            }

            _context.Sites.Remove(site);
            await _context.SaveChangesAsync();

            return site;
        }

        private bool SiteExists(int id)
        {
            return _context.Sites.Any(e => e.SiteID == id);
        }
    }
}
