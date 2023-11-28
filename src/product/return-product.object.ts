import { Prisma } from "@prisma/client";

export const returnProductObject: Prisma.ProductSelect = {
    id: true,
    name: true,
    slug: true,
    description: true,
    price: true,
    createdAt: true,
    images: true,
    categoryId: true,
    subcategoryId: true,
    status: true,
    isDelivery: true,
    flowers: true
}