using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Step1_Backend.DTOs.ReservationDTOs;
using Step1_Backend.DTOs.TrainerDTOs;
using Step1_Backend.Services.ReservationService;
using Step1_Backend.Services.TrainerService;

namespace Step1_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly IReservationService _reservationService;

        public ReservationController(IReservationService reservationService)
        {
            _reservationService = reservationService;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddNewReservation([FromBody] AddReservationDTO addReservationDTO)
        {
            var result = await _reservationService.AddNewReservation(addReservationDTO);
            if (result.IsSuccess)
                return Created(string.Empty, result);

            return BadRequest(result);
        }
    }
}
