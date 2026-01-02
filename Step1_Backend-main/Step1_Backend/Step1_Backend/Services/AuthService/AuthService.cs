using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Step1_Backend.DTOs.AuthDTOs;
using Step1_Backend.Helpers;
using Step1_Backend.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Step1_Backend.Services.AuthService
{
    public class AuthService : IAuthService
    {
        private UserManager<ApplicationUser> _userManager { get; }
        private readonly IMapper _mapper;
        private readonly JwtSettings jwtSettings;
        public AuthService(UserManager<ApplicationUser> userManager, IMapper mapper, IOptions<JwtSettings> options)
        {
            _userManager = userManager;
            _mapper = mapper;
            jwtSettings = options.Value;
        }
        public async Task<Result<string>> Login(LoginDTO loginDTO)
        {
            try
            {
                var user = await _userManager.FindByNameAsync(loginDTO.UserName);
                if (user == null)
                    return Result<string>.Failure("Invalid username or password");

                var result = await _userManager.CheckPasswordAsync(user, loginDTO.Password);
                if (!result)
                    return Result<string>.Failure("Invalid username or password");

                var token = GenerateToken(user);
                return Result<string>.Success(token);
            }
            catch (Exception ex)
            {
                return Result<string>.Failure($"An unexpected error occurred during login: {ex.Message}");
            }
        }

        public async Task<Result<string>> Register(RegisterDTO registerDTO)
        {
            try
            {
                var existingUser = await _userManager.FindByNameAsync(registerDTO.UserName);
                if (existingUser != null)
                    return Result<string>.Failure("This Username is already registered");

                var user = _mapper.Map<ApplicationUser>(registerDTO);

                var createResult = await _userManager.CreateAsync(user, registerDTO.Password);
                if (!createResult.Succeeded)
                {
                    var errors = createResult.Errors.Select(e => e.Description).ToList();
                    return Result<string>.Failure(errors);
                }
                return Result<string>.Success("User was registered successfully!");
            }
            catch (Exception ex)
            {
                return Result<string>.Failure($"An unexpected error occurred during registration: {ex.Message}");
            }
        }
        private string GenerateToken(ApplicationUser user)
        {
            var userData = new List<Claim>();
            userData.Add(new Claim(ClaimTypes.NameIdentifier, user.Id));
            userData.Add(new Claim(ClaimTypes.Name, user.UserName));

            #region SigningCredentials
            var key = jwtSettings.Key;
            var secreteKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key));
            var signingCredentials = new SigningCredentials(secreteKey, SecurityAlgorithms.HmacSha256);
            #endregion

            JwtSecurityToken tokenObject = new JwtSecurityToken(
                issuer: jwtSettings.Issuer,
                audience: jwtSettings.Audience,
                claims: userData,
                expires: DateTime.UtcNow.AddDays(jwtSettings.ExpiresInDays),
                signingCredentials: signingCredentials
                );

            var token = new JwtSecurityTokenHandler().WriteToken(tokenObject);

            return token;
        }
    }
}
