using CloudinaryDotNet.Actions;

namespace Step1_Backend.Services.PhotoSercvice
{
    public interface IPhotoService
    {
        Task<ImageUploadResult> AddPhotoAsync(IFormFile file);
        Task<DeletionResult> DeletePhotoAsync(string publicId);
    }
}
