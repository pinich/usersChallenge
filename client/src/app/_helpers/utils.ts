export class Utils {
  /**
   * Output: 2018-06-04T10:22:14
   * Format: yyyy-MM-ddTHH:mm
   * @param dateString data as timestamp string
   */
  public static timeStampToDateInput(dateString: string): string {
    return dateString.toString().slice(0, 19).toString().replace(' ', 'T');
  }
}
