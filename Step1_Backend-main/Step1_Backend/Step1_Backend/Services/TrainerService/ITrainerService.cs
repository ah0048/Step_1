using Step1_Backend.DTOs.TrainerDTOs;
using Step1_Backend.Helpers;

namespace Step1_Backend.Services.TrainerService
{
    public interface ITrainerService
    {
        Task<Result<string>> AddNewTrainer(AddTrainerDTO addTrainerDTO);
        Task<Result<string>> UpdateTrainer(UpdateTrainerDTO updateTrainerDTO);
        Task<Result<string>> DeleteTrainer(int TrainerId);
        Task<Result<string>> RateTrainer(RateTrainerDTO rateTrainerDTO);
        Task<Result<List<TrainerHomeCardDTO>>> GetTrainerList();
    }
}
