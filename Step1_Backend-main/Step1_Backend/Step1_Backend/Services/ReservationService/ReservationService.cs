using AutoMapper;
using Step1_Backend.DTOs.ReservationDTOs;
using Step1_Backend.DTOs.TrainerDTOs;
using Step1_Backend.Helpers;
using Step1_Backend.Models;
using Step1_Backend.Services.PhotoSercvice;
using Step1_Backend.Services.TelegramService;
using Step1_Backend.UnitOfWorks;

namespace Step1_Backend.Services.ReservationService
{
    public class ReservationService : IReservationService
    {
        private readonly IUnitOfWork _unit;
        private readonly IMapper _mapper;
        private readonly ITelegramService _telegramService;
        public ReservationService(IUnitOfWork unit, IMapper mapper, ITelegramService telegramService)
        {
            _unit = unit;
            _mapper = mapper;
            _telegramService = telegramService;
        }
        public async Task<Result<string>> AddNewReservation(AddReservationDTO addReservationDTO)
        {
            Reservation newReservation = _mapper.Map<Reservation>(addReservationDTO);
            var trainer = await _unit.TrainerRepo.GetByIdAsync(newReservation.TrainerId);
                if (trainer == null)
                    return Result<string>.Failure("the Selected Trainer is not found");

            newReservation.Trainer = trainer;
            try
            {
                newReservation.CreationDate = DateTime.UtcNow;
                await _unit.ReservationRepo.AddAsync(newReservation);
                await _unit.SaveAsync();
                await _telegramService.SendTelegramNotification(newReservation);
                return Result<string>.Success("Your Reservation was created successfully !!");
            }
            catch (Exception ex)
            {
                return Result<string>.Failure($"An error occurred while creating your reservation: {ex.Message}");
            }
        }
    }
}
