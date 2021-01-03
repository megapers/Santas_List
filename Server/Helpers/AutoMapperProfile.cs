using AutoMapper;
using Santa.Entities;
using Santa.Models;

namespace Santa.Helpers
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