export class GeneralUtils {

  public static getDate(date: string): string {
    const year = new Date(date).getFullYear();
    const month = new Date(date).getUTCMonth();
    const day = new Date(date).getUTCDate();

    const fullDate = `${year}-${month + 1}-${day}`;
    return fullDate;
  }
}
