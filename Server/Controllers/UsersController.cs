using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Santa.Services;
using Auth.Models;
using Santa.Models;
using Santa.Helpers;
using Santa.Entities;

namespace Santa.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("SantaPolicy")] 
    public class UsersController : ControllerBase
    {
        private IUserService _userService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public UsersController(
            IUserService userService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }
        
        [AllowAnonymous]
        [Route("authenticate")]
        [HttpPost]
        public IActionResult Authenticate([FromBody]AuthenticateModel model)
        {
            var user = _userService.Authenticate(model.Username, model.Password);
            var mappedUser = _mapper.Map<UserModel>(user);
            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(mappedUser);
        }

        [AllowAnonymous]
        [Route("register")]
        [HttpPost]
        public IActionResult Register([FromBody]RegisterModel model)
        {
            // map model to entity
            var user = _mapper.Map<User>(model);

            try
            {
                // create user
                _userService.Create(user, model.Password);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [Route("getall")]
        [Authorize(Roles = Role.Admin)]
        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll();
            var mapedUsers = _mapper.Map<IEnumerable<UserModel>>(users);

            return Ok(mapedUsers);
        }
        
        [Route("getuser/{id}")]
        [HttpGet]
        public IActionResult GetById(int id)
        {
            // only allow admins to access other user records
            var currentUserId = int.Parse(User.Identity.Name);
            if (id != currentUserId && !User.IsInRole(Role.Admin))
                return Forbid();

            var user =  _userService.GetById(id);
            var mapedUser = _mapper.Map<UserModel>(user);

            if (user == null)
                return NotFound();

            return Ok(mapedUser);
        }

        [Route("updateprofile/{id}")]
        [HttpPut]
        public IActionResult UpdateProfile(int id, [FromBody]UpdateProfileModel model)
        {
            // map model to entity and set id
            var user = _mapper.Map<User>(model);
            user.Id = id;

            try
            {
                // update user 
                _userService.Update(user, model.Password);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [Route("updateuser/{id}")]
        [Authorize(Roles = Role.Admin)]
        [HttpPut]
        public IActionResult UpdateUser(int id, [FromBody]UpdateUserModel model)
        {
            // map model to entity and set id
            var user = _mapper.Map<User>(model);
            user.Id = id;

            try
            {
                // update user 
                _userService.Update(user, model.Password);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [Route("deleteuser/{id}")]
        [Authorize(Roles = Role.Admin)]
        [HttpDelete]
        public IActionResult DeleteUser(int id)
        {
            _userService.Delete(id);
            return Ok();
        }
    }
}