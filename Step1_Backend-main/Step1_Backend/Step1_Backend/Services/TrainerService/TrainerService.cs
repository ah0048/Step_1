using AutoMapper;
using CloudinaryDotNet.Actions;
using Microsoft.EntityFrameworkCore;
using Step1_Backend.DTOs.TrainerDTOs;
using Step1_Backend.Helpers;
using Step1_Backend.Models;
using Step1_Backend.Services.PhotoSercvice;
using Step1_Backend.UnitOfWorks;

namespace Step1_Backend.Services.TrainerService
{
    public class TrainerService : ITrainerService
    {
        private readonly IUnitOfWork _unit;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        public TrainerService(IUnitOfWork unit, IMapper mapper, IPhotoService photoService)
        {
            _unit = unit;
            _mapper = mapper;
            _photoService = photoService;
        }
        public async Task<Result<string>> AddNewTrainer(AddTrainerDTO addTrainerDTO)
        {
            Trainer newTrainer = _mapper.Map<Trainer>(addTrainerDTO);
            if (addTrainerDTO.Picture != null)
            {
                try
                {
                    var uploadResult = await _photoService.AddPhotoAsync(addTrainerDTO.Picture);
                    if (uploadResult.Error != null)
                        return Result<string>.Failure($"Failed to upload Trainer Image: {uploadResult.Error.Message}");

                    newTrainer.PictureUrl = uploadResult.SecureUrl.AbsoluteUri;
                    newTrainer.PicPublicId = uploadResult.PublicId;
                }
                catch (Exception ex)
                {
                    return Result<string>.Failure($"Trainer Image upload failed: {ex.Message}");
                }
            }

            try
            {
                await _unit.TrainerRepo.AddAsync(newTrainer);
                await _unit.SaveAsync();

                return Result<string>.Success("The new Trainer was added successfully !!");
            }
            catch (Exception ex)
            {
                return Result<string>.Failure($"An error occurred while adding the trainer: {ex.Message}");
            }
        }

        public async Task<Result<string>> DeleteTrainer(int TrainerId)
        {
            var trainer = await _unit.TrainerRepo.GetByIdAsync(TrainerId);
            if (trainer == null)
                return Result<string>.Failure("Trainer not found");

            // Delete old image first to save Cloudinary space
            if (!string.IsNullOrEmpty(trainer.PicPublicId))
            {
                await _photoService.DeletePhotoAsync(trainer.PicPublicId);
            }

            try
            {
                await _unit.TrainerRepo.DeleteAsync(trainer.Id);
                await _unit.SaveAsync();
                return Result<string>.Success("Trainer deleted successfully");
            }
            catch (Exception ex)
            {
                return Result<string>.Failure($"Trainer Delete failed: {ex.Message}");
            }
        }

        public async Task<Result<List<TrainerHomeCardDTO>>> GetTrainerList()
        {
            try
            {
                List<Trainer> trainerList = await _unit.TrainerRepo.GetAllAsync();
                if (trainerList == null)
                    return Result<List<TrainerHomeCardDTO>>.Failure("No trainers were Found");
                if (!trainerList.Any())
                    return Result<List<TrainerHomeCardDTO>>.Success(new List<TrainerHomeCardDTO>());

                List<TrainerHomeCardDTO> trainerHomeCards = _mapper.Map<List<TrainerHomeCardDTO>>(trainerList);
                return Result<List<TrainerHomeCardDTO>>.Success(trainerHomeCards);
            }
            catch (Exception ex)
            {
                return Result<List<TrainerHomeCardDTO>>.Failure($"An error occurred while fetching trainers data: {ex.Message}");
            }
        }

        public async Task<Result<string>> RateTrainer(RateTrainerDTO rateTrainerDTO)
        {
            var trainer = await _unit.TrainerRepo.GetByIdAsync(rateTrainerDTO.TrainerId);
            if (trainer == null)
                return Result<string>.Failure("Trainer not found");

            trainer.RatingCount++;
            trainer.AverageRating =
                ((trainer.AverageRating * (trainer.RatingCount - 1)) + rateTrainerDTO.Rating)
            / trainer.RatingCount;

            try
            {
                await _unit.SaveAsync();
                return Result<string>.Success("Trainer was rated successfully");
            }
            catch (Exception ex)
            {
                return Result<string>.Failure($"Adding rating failed: {ex.Message}");
            }
        }

        public async Task<Result<string>> UpdateTrainer(UpdateTrainerDTO updateTrainerDTO)
        {
            var trainer = await _unit.TrainerRepo.GetByIdAsync(updateTrainerDTO.TrainerId);
            if (trainer == null) 
                return Result<string>.Failure("Trainer not found");

            if (updateTrainerDTO.Picture != null)
            {
                // Delete old image first to save Cloudinary space
                if (!string.IsNullOrEmpty(trainer.PicPublicId))
                {
                    await _photoService.DeletePhotoAsync(trainer.PicPublicId);
                }

                // Upload new image
                var uploadResult = await _photoService.AddPhotoAsync(updateTrainerDTO.Picture);
                if (uploadResult.Error != null)
                    return Result<string>.Failure($"Failed to upload Trainer Image: {uploadResult.Error.Message}");

                trainer.PictureUrl = uploadResult.SecureUrl.AbsoluteUri;
                trainer.PicPublicId = uploadResult.PublicId;
            }

            // Only overwrite if the DTO has a value
            if (!string.IsNullOrWhiteSpace(updateTrainerDTO.ArabicName))
                trainer.ArabicName = updateTrainerDTO.ArabicName;

            if (!string.IsNullOrWhiteSpace(updateTrainerDTO.EnglishName))
                trainer.EnglishName = updateTrainerDTO.EnglishName;

            if (!string.IsNullOrWhiteSpace(updateTrainerDTO.Major))
                trainer.Major = updateTrainerDTO.Major;

            if (!string.IsNullOrWhiteSpace(updateTrainerDTO.Specilization))
                trainer.Specilization = updateTrainerDTO.Specilization;

            try
            {
                await _unit.SaveAsync();
                return Result<string>.Success("Trainer updated successfully");
            }
            catch (Exception ex)
            {
                return Result<string>.Failure($"Update failed: {ex.Message}");
            }
        }
    }
}
