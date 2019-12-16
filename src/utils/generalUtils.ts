export class GeneralUtils {

  public static getDate(date: string): string {
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth();
    const day = new Date(date).getDate();

    const fullDate = `${year}-${month + 1}-${day}`;
    return fullDate;
  }
}
