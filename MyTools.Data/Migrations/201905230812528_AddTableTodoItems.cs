namespace MyTools.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddTableTodoItems : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.MT_TodoItems",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        UserId = c.Int(nullable: false),
                        Title = c.String(nullable: false, maxLength: 100),
                        Description = c.String(maxLength: 300),
                        Done = c.Boolean(nullable: false),
                        IsDeleted = c.Boolean(nullable: false),
                        CreatedBy = c.Int(nullable: false),
                        CreatedDate = c.DateTime(nullable: false),
                        LastModifiedBy = c.Int(),
                        LastModifiedDate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.MT_TodoItems");
        }
    }
}
