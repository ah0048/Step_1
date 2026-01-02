using Step1_Backend.DTOs.ReservationDTOs;
using Step1_Backend.DTOs.TrainerDTOs;
using Step1_Backend.Helpers;

namespace Step1_Backend.Services.ReservationService
{
    public interface IReservationService
    {
        Task<Result<string>> AddNewReservation(AddReservationDTO addReservationDTO);
    }
}
