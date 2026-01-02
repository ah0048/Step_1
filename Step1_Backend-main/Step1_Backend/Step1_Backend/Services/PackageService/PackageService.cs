using AutoMapper;
using Step1_Backend.DTOs.PackageDTOs;
using Step1_Backend.DTOs.TrainerDTOs;
using Step1_Backend.Helpers;
using Step1_Backend.Models;
using Step1_Backend.Services.PhotoSercvice;
using Step1_Backend.UnitOfWorks;

namespace Step1_Backend.Services.PackageService
{
    public class PackageService : IPackageService
    {
        private readonly IUnitOfWork _unit;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        public PackageService(IUnitOfWork unit, IMapper mapper, IPhotoService photoService)
        {
            _unit = unit;
            _mapper = mapper;
            _photoService = photoService;
        }
        public async Task<Result<string>> AddNewPackage(AddPackageDTO addPackageDTO)
        {
            Package newPackage = _mapper.Map<Package>(addPackageDTO);
            if (addPackageDTO.Picture != null)
            {
                try
                {
                    var uploadResult = await _photoService.AddPhotoAsync(addPackageDTO.Picture);
                    if (uploadResult.Error != null)
                        return Result<string>.Failure($"Failed to upload Package Image: {uploadResult.Error.Message}");

                    newPackage.PictureUrl = uploadResult.SecureUrl.AbsoluteUri;
                    newPackage.PicPublicId = uploadResult.PublicId;
                }
                catch (Exception ex)
                {
                    return Result<string>.Failure($"Package Image upload failed: {ex.Message}");
                }
            }

            try
            {
                await _unit.PackageRepo.AddAsync(newPackage);
                await _unit.SaveAsync();

                return Result<string>.Success("The new Package was added successfully !!");
            }
            catch (Exception ex)
            {
                return Result<string>.Failure($"An error occurred while adding the package: {ex.Message}");
            }
        }

        public async Task<Result<string>> DeletePackage(int PackageId)
        {
            var package = await _unit.PackageRepo.GetByIdAsync(PackageId);
            if (package == null)
                return Result<string>.Failure("Package not found");

            // Delete old image first to save Cloudinary space
            if (!string.IsNullOrEmpty(package.PicPublicId))
            {
                await _photoService.DeletePhotoAsync(package.PicPublicId);
            }

            try
            {
                await _unit.PackageRepo.DeleteAsync(package.Id);
                await _unit.SaveAsync();
                return Result<string>.Success("Package deleted successfully");
            }
            catch (Exception ex)
            {
                return Result<string>.Failure($"Package Delete failed: {ex.Message}");
            }
        }

        public async Task<Result<List<PackageHomeCardDTO>>> GetPackageList()
        {
            try
            {
                List<Package> packageList = await _unit.PackageRepo.GetAllAsync();
                if (packageList == null)
                    return Result<List<PackageHomeCardDTO>>.Failure("No packages were Found");
                if (!packageList.Any())
                    return Result<List<PackageHomeCardDTO>>.Success(new List<PackageHomeCardDTO>());

                List<PackageHomeCardDTO> packageHomeCards = _mapper.Map<List<PackageHomeCardDTO>>(packageList);
                return Result<List<PackageHomeCardDTO>>.Success(packageHomeCards);
            }
            catch (Exception ex)
            {
                return Result<List<PackageHomeCardDTO>>.Failure($"An error occurred while fetching packages data: {ex.Message}");
            }
        }

        public async Task<Result<string>> UpdatePackage(UpdatePackageDTO updatePackageDTO)
        {
            var package = await _unit.PackageRepo.GetByIdAsync(updatePackageDTO.PackageId);
            if (package == null)
                return Result<string>.Failure("Package not found");

            if (updatePackageDTO.Picture != null)
            {
                // Delete old image first to save Cloudinary space
                if (!string.IsNullOrEmpty(package.PicPublicId))
                {
                    await _photoService.DeletePhotoAsync(package.PicPublicId);
                }

                // Upload new image
                var uploadResult = await _photoService.AddPhotoAsync(updatePackageDTO.Picture);
                if (uploadResult.Error != null)
                    return Result<string>.Failure($"Failed to upload Package Image: {uploadResult.Error.Message}");

                package.PictureUrl = uploadResult.SecureUrl.AbsoluteUri;
                package.PicPublicId = uploadResult.PublicId;
            }

            // Only overwrite if the DTO has a value
            _mapper.Map(updatePackageDTO, package);

            try
            {
                await _unit.SaveAsync();
                return Result<string>.Success("Package updated successfully");
            }
            catch (Exception ex)
            {
                return Result<string>.Failure($"Update failed: {ex.Message}");
            }
        }
    }
}
