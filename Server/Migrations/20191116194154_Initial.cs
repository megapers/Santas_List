using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Santa.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "X-MasUser",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Username = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    Role = table.Column<string>(nullable: true),
                    Token = table.Column<string>(nullable: true),
                    BirthDate = table.Column<DateTime>(nullable: false),
                    Street = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    Province = table.Column<string>(nullable: true),
                    PostalCode = table.Column<string>(nullable: true),
                    Latitude = table.Column<int>(nullable: false),
                    Longitude = table.Column<int>(nullable: false),
                    IsNaughty = table.Column<bool>(nullable: false),
                    PasswordHash = table.Column<byte[]>(nullable: true),
                    PasswordSalt = table.Column<byte[]>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_X-MasUser", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "X-MasUser",
                columns: new[] { "Id", "BirthDate", "City", "Email", "FirstName", "IsNaughty", "LastName", "Latitude", "Longitude", "Password", "PasswordHash", "PasswordSalt", "PostalCode", "Province", "Role", "Street", "Token", "Username" },
                values: new object[] { 1, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "santa@np.com", "Santa", false, "Claus", 0, 0, "P@$$w0rd", null, null, null, null, "Admin", null, null, "santa" });

            migrationBuilder.InsertData(
                table: "X-MasUser",
                columns: new[] { "Id", "BirthDate", "City", "Email", "FirstName", "IsNaughty", "LastName", "Latitude", "Longitude", "Password", "PasswordHash", "PasswordSalt", "PostalCode", "Province", "Role", "Street", "Token", "Username" },
                values: new object[] { 2, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "tim@np.com", "Tim", false, "Mak", 0, 0, "P@$$w0rd", null, null, null, null, "Child", null, null, "tim" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "X-MasUser");
        }
    }
}
