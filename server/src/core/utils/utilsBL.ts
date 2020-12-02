import { Logger } from '@nestjs/common';
import { UnprocessableEntityException } from '@nestjs/common/exceptions';

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

}
