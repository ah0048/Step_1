using Step1_Backend.DTOs.AuthDTOs;
using Step1_Backend.Helpers;

namespace Step1_Backend.Services.AuthService
{
    public interface IAuthService
    {
        Task<Result<string>> Register(RegisterDTO registerDTO);
        Task<Result<string>> Login(LoginDTO loginDTO);
    }
}
