using Step1_Backend.DTOs.PackageDTOs;
using Step1_Backend.DTOs.TrainerDTOs;
using Step1_Backend.Helpers;

namespace Step1_Backend.Services.PackageService
{
    public interface IPackageService
    {
        Task<Result<string>> AddNewPackage(AddPackageDTO addPackageDTO);
        Task<Result<string>> UpdatePackage(UpdatePackageDTO updatePackageDTO);
        Task<Result<string>> DeletePackage(int PackageId);
        Task<Result<List<PackageHomeCardDTO>>> GetPackageList();
    }
}
