CREATE TABLE "SubcategoryMigrationMap" (
    "old_subcategory_id" INTEGER NOT NULL,
    "new_category_id" INTEGER NOT NULL,

    CONSTRAINT "SubcategoryMigrationMap_pkey"
        PRIMARY KEY ("old_subcategory_id")
);

CREATE UNIQUE INDEX "SubcategoryMigrationMap_new_category_id_key"
ON "SubcategoryMigrationMap"("new_category_id");