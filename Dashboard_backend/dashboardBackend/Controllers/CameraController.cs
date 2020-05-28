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
    public class CameraController : ControllerBase
    {
        private readonly DBContext _context;

        public CameraController(DBContext context)
        {
            _context = context;
        }

        // GET: api/Camera
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Camera>>> GetCameras()
        {
            return await _context.Cameras.ToListAsync();
        }

        [HttpGet]
        [Route("whereCompany")]
        public async Task<ActionResult<IEnumerable<Camera>>> GetCamerasWhereCompany(int companyID)
        {
            return await _context.Cameras.Where(c => c.Site.Company.CompanyID == companyID).Include(s => s.Site).ToListAsync();
        }

        // GET: api/Camera/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Camera>> GetCamera(long id)
        {
            var camera = await _context.Cameras.FindAsync(id);

            if (camera == null)
            {
                return NotFound();
            }

            return camera;
        }

        // PUT: api/Camera/5
        [HttpPut]
        public async Task<IActionResult> PutCamera(Camera camera)
        {
            var updateCamera = await _context.Cameras.FindAsync(camera.CameraID);
            updateCamera.Name = camera.Name;
            updateCamera.Site = await _context.Sites.FindAsync(camera.Site.SiteID);
            updateCamera.Ip = camera.Ip;

            _context.Entry(updateCamera);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetCamera", new { id = updateCamera.CameraID }, camera);
        }

        // POST: api/Camera
        [HttpPost]
        public async Task<ActionResult<Camera>> PostCamera(Camera camera)
        {
            var insertCamera = new Camera
            {
                Name = camera.Name,
                Ip = camera.Ip,
                Site = await _context.Sites.FindAsync(camera.Site.SiteID)
            };
            _context.Cameras.Add(insertCamera);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCamera", new { id = insertCamera.CameraID }, insertCamera);
        }

        // DELETE: api/Camera/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Camera>> DeleteCamera(long id)
        {
            var camera = await _context.Cameras.FindAsync(id);
            if (camera == null)
            {
                return NotFound();
            }

            _context.Cameras.Remove(camera);
            await _context.SaveChangesAsync();

            return camera;
        }

        private bool CameraExists(long id)
        {
            return _context.Cameras.Any(e => e.CameraID == id);
        }
    }
}
