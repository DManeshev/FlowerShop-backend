import { Prisma } from "@prisma/client";
import { orderForTelegram } from "./return-order.object";

export type OrderType = Prisma.OrderGetPayload<{
    include: typeof orderForTelegram
}>