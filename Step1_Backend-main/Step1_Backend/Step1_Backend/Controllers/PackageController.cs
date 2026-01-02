using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Step1_Backend.DTOs.PackageDTOs;
using Step1_Backend.DTOs.TrainerDTOs;
using Step1_Backend.Services.PackageService;
using Step1_Backend.Services.TrainerService;

namespace Step1_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PackageController : ControllerBase
    {
        private readonly IPackageService _packageService;

        public PackageController(IPackageService packageService)
        {
            _packageService = packageService;
        }
        [HttpGet("all")]
        public async Task<IActionResult> GetAllPackages()
        {
            var result = await _packageService.GetPackageList();
            if (result.IsSuccess)
                return Ok(result);

            return BadRequest(result);
        }

        [Authorize]
        [HttpPost("add")]
        public async Task<IActionResult> AddNewPackage([FromForm] AddPackageDTO addPackageDTO)
        {
            var result = await _packageService.AddNewPackage(addPackageDTO);
            if (result.IsSuccess)
                return Created(string.Empty, result);

            return BadRequest(result);
        }

        [Authorize]
        [HttpPut("edit")]
        public async Task<IActionResult> UpdatePackage([FromForm] UpdatePackageDTO updatePackageDTO)
        {
            var result = await _packageService.UpdatePackage(updatePackageDTO);
            if (result.IsSuccess)
                return Ok(result);

            return BadRequest(result);
        }

        [Authorize]
        [HttpDelete("delete/{PackageId}")]
        public async Task<IActionResult> DeletePackage(int PackageId)
        {
            var result = await _packageService.DeletePackage(PackageId);
            if (result.IsSuccess)
                return Ok(result);

            return NotFound(result);
        }
    }
}
