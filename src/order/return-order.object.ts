import { Prisma } from "@prisma/client";
import { returnProductObject } from "../product/return-product.object";

export const orderForTelegram = {
    items: {
        include: {
            product: {
                select: returnProductObject
            }
        }
    }
} satisfies Prisma.OrderInclude