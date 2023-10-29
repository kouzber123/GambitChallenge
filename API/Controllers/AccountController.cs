using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        public AccountController(UserManager<User> userManager, TokenService tokenService)
        {
            _tokenService = tokenService;
            _userManager = userManager;
        }

        /// <summary>
        /// handles user login
        /// </summary>
        /// <param name="loginDto"></param>
        /// <returns>if incorrect credentials return 401 else user dto</returns>
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {

            var user = await _userManager.FindByNameAsync(loginDto.Username);


            if (user is null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
                return Unauthorized();
            return new UserDto
            {
                Email = user.Email,
                Username = user.UserName,
                Token = await _tokenService.GenerateToken(user)
            };
        }
        /// <summary>
        ///  handles registration
        /// </summary>
        /// <param name="registerDto"></param>
        /// <returns>if  failure return details that went wrong else  201 </returns>
        [HttpPost("register")]

        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            var user = new User
            {
                UserName = registerDto.Username,
                Email = registerDto.Email
            };
            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {

                    ModelState.AddModelError(error.Code, error.Description);
                }
                return ValidationProblem();
            }

            await _userManager.AddToRoleAsync(user, "Member");
            return StatusCode(201);
        }
        /// <summary>
        /// client sends jwt token and check name if it exists then renew user
        /// </summary>
        /// <returns>user details</returns>
        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            return new UserDto
            {
                Email = user.Email,
                Username = user.UserName,
                Token = await _tokenService.GenerateToken(user)
            };

        }
    }
}
