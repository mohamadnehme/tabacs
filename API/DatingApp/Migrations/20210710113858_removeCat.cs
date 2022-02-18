using Microsoft.EntityFrameworkCore.Migrations;

namespace DatingApp.Migrations
{
    public partial class removeCat : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tabacs_Categories_categoryId",
                table: "Tabacs");

            migrationBuilder.DropIndex(
                name: "IX_Tabacs_categoryId",
                table: "Tabacs");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Tabacs_categoryId",
                table: "Tabacs",
                column: "categoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tabacs_Categories_categoryId",
                table: "Tabacs",
                column: "categoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
