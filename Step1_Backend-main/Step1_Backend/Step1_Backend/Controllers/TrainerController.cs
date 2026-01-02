using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Step1_Backend.DTOs.AuthDTOs;
using Step1_Backend.DTOs.TrainerDTOs;
using Step1_Backend.Services.AuthService;
using Step1_Backend.Services.TrainerService;

namespace Step1_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainerController : ControllerBase
    {
        private readonly ITrainerService _trainerService;

        public TrainerController(ITrainerService trainerService)
        {
            _trainerService = trainerService;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllTrainers()
        {
            var result = await _trainerService.GetTrainerList();
            if (result.IsSuccess)
                return Ok(result);

            return BadRequest(result);
        }

        [Authorize]
        [HttpPost("add")]
        public async Task<IActionResult> AddNewTrainer([FromForm] AddTrainerDTO addTrainerDTO)
        {
            var result = await _trainerService.AddNewTrainer(addTrainerDTO);
            if (result.IsSuccess)
                return Created(string.Empty, result);

            return BadRequest(result);
        }

        [Authorize]
        [HttpPut("edit")]
        public async Task<IActionResult> UpdateTrainer([FromForm] UpdateTrainerDTO updateTrainerDTO)
        {
            var result = await _trainerService.UpdateTrainer(updateTrainerDTO);
            if (result.IsSuccess)
                return Ok(result);

            return BadRequest(result);
        }

        [Authorize]
        [HttpDelete("delete/{TrainerId}")]
        public async Task<IActionResult> DeleteTrainer(int TrainerId)
        {
            var result = await _trainerService.DeleteTrainer(TrainerId);
            if (result.IsSuccess)
                return Ok(result);

            return NotFound(result);
        }

        [HttpPost("rate")]
        public async Task<IActionResult> RateTrainer([FromBody] RateTrainerDTO rateTrainerDTO)
        {
            var result = await _trainerService.RateTrainer(rateTrainerDTO);
            if (result.IsSuccess)
                return Ok(result);

            return BadRequest(result);
        }
    }
}
