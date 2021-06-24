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
    export class EcoVacsAPI {
        constructor(device: string, country: string, continent: string)
        static getDeviceId(machineId: string): string
        static md5(data: string): string

        connect(username: string, passowrd: string): Promise<{}>

        devices(): Promise<Array<EcovacsDevice>>
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