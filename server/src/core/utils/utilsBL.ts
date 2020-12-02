import { Logger } from '@nestjs/common';
import { UnprocessableEntityException } from '@nestjs/common/exceptions';
// import { transformAndValidate } from 'class-transformer-validator';

export class UtilsBL {
    /**
     * Check if string is empty after trimming leading & trailing
     * @param str
     */
    public static isEmptyString(str: string) {
        if (!str || str.trim().length == 0) {
            return true;
        }
        return false;
    }

    // public static async classValidate(classType: any, obj: any) {
    //     try {
    //         const res = await transformAndValidate(classType, obj);
    //         return true;
    //     } catch (errors) {
    //         const msg = 'Class Validation failed with Errors: ' + errors;
    //         Logger.error(msg, null, 'UtilsBL');
    //         throw new UnprocessableEntityException(msg);
    //     }
    // }
}
