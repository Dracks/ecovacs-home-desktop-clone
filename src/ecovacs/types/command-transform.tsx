import { VacBotEvent, VacBotCommand } from "ecovacs-deebot";

export const TRANSFORM_HASH : Partial<Record<VacBotEvent, VacBotCommand>> = {
    CleanSpeed: "GetCleanSpeed",
    CleanReport: "GetCleanState",
    BatteryInfo: "GetBatteryState",
    MapImage: "GetMapImage",
    DeebotPosition: "GetPosition",
    ChargeState: "GetChargeState",
}