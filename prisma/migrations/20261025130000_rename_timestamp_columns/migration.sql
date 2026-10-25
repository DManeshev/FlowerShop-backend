ALTER TABLE "User"
RENAME COLUMN "create_at" TO "created_at";

ALTER TABLE "User"
RENAME COLUMN "update_at" TO "updated_at";

ALTER TABLE "Product"
RENAME COLUMN "create_at" TO "created_at";

ALTER TABLE "Product"
RENAME COLUMN "update_at" TO "updated_at";

ALTER TABLE "Category"
RENAME COLUMN "create_at" TO "created_at";

ALTER TABLE "Order"
RENAME COLUMN "create_at" TO "created_at";

ALTER TABLE "Order"
RENAME COLUMN "update_at" TO "updated_at";

ALTER TABLE "OrderItem"
RENAME COLUMN "create_at" TO "created_at";

ALTER TABLE "OrderItem"
RENAME COLUMN "update_at" TO "updated_at";