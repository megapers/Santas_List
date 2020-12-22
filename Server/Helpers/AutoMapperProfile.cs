using AutoMapper;
using Assign2.Entities;
using Assign2.Models;

namespace Assign2.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserModel>();
            CreateMap<RegisterModel, User>();
            CreateMap<UpdateProfileModel, User>();
            CreateMap<UpdateUserModel, User>();
        }
    }
}