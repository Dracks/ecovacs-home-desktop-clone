declare module 'ecovacs-deebot' {

    export interface EcovacsDevice {
        did: string,
        name: string,
        class: string,
        resource: string,
        nick?: string,
        company: string,
        service: {
            jmq: string,
            mqs: string,
        }
    }

    type VacBotEvent =  "ready" 
        | "ChargeState"
        | "CleanSpeed"
        | "CleanReport"
        | "BatteryInfo"
        | "LifeSpan_filter"
        | "LifeSpan_main_brush"
        | "LifeSpan_side_brush"
        | "WaterLevel"
        | "WaterBoxInfo"
        | "DustCaseInfo"
        | "Error"
        | "DoNotDisturbEnabled"
        | "ContinuousCleaningEnabled"
        | "Volume"
        | "ChargePosition"
        | "DeebotPosition"
        | "LastUsedAreaValues"
        | "Maps"
        | "MapSpotAreas"
        | "MapSpotAreaInfo"
        | "MapVirtualBoundaries"
        | "MapVirtualBoundaryInfo"
        | "MapDataObject"
        | "MapImage"
        | "CurrentMapName"
        | "CurrentMapMID"
        | "CurrentMapIndex"
        | "DeebotPositionCurrentSpotAreaID"
        | "CleanLog"

    type VacBotCommand = "Clean"
            | "Edge"
            | "Spot"
            | "SpotArea"
            | "CustomArea"
            | "Stop"
            | "Pause"
            | "Resume"
            | "Charge"
            | "Move"
            | "MoveBackward"
            | "MoveForward"
            | "MoveLeft"
            | "MoveRight"
            | "MoveTurnAround"
            | "Relocate"
            | "PlaySound"
            | "GetCleanState"
            | "GetCleanSpeed"
            | "GetCleanSum"
            | "GetChargeState"
            | "GetMapImage"
            | "GetMaps"
            | "GetSpotAreas"
            | "GetSpotAreaInfo"
            | "GetVirtualBoundaries"
            | "GetVirtualBoundaryInfo"
            | "DeleteVirtualBoundary"
            | "AddVirtualBoundary"
            | "GetError"
            | "GetBatteryState"
            | "GetNetInfo"
            | "GetLifeSpan"
            | "ResetLifeSpan"
            | "GetWaterlevel"
            | "GetWaterboxInfo"
            | "GetWaterInfo"
            | "GetPosition"
            | "GetSleepStatus"
            | "SetWaterLevel"
            | "SetCleanSpeed"
            | "GetCleanLogs"
            | "GetVolume"
            | "SetVolume"
            | "GetAutoEmpty"
            | "SetAutoEmpty"
            | "EnableDoNotDisturb"
            | "DisableDoNotDisturb"
            | "SetDoNotDisturb"

    export interface VacBotLoader {
        on(event: VacBotEvent, cb: (data: unknown)=>void):void
        run(command: VacBotCommand): void
        connect():void
        disconnect():void
    }
    export class EcoVacsAPI {
        uid: string
        static REALM: string
        resource: string
        user_access_token: string

        constructor(device: string, country: string, continent: string)
        static getDeviceId(machineId: string): string
        static md5(data: string): string


        connect(username: string, passowrd: string): Promise<{}>

        devices(): Promise<Array<EcovacsDevice>>
        getVacBot(uid: string, REALM: string, resource:string, user_access_token:string, vacuum: EcovacsDevice, continent: string): VacBotLoader;
    }

    export const countries: Record<string, {
        continent: string
    }>

}

declare module 'ecovacs-deebot/library/tools' {
    export interface DeviceInfo {
        name: string,
        "950type": boolean,
        main_brush: boolean,
        spot_area: boolean,
        custom_area: boolean,
        mopping_system: boolean,
        voice_report: boolean,
        single_room: boolean,
        auto_empty_station: boolean,
        clean_speed: boolean,
        map_image_supported: boolean
    }

    export const getSupportedDevices: ()=> Record<string, DeviceInfo>
}