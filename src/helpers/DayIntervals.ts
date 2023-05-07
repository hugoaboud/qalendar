import { dayIntervalsStateType } from '../typings/config.interface';
import Time from './Time';

export type interval = {
  hidden?: boolean
  color?: string
  disabled?: boolean
  intervalStart: string
  intervalEnd: string
  hasBorder?: boolean
}
/**
 * Define the data for the clickable intervals to be viewed in a calendar day.
 * */
export default class DayIntervals extends Time {
  private readonly INTERVAL_MINUTES: 15 | 30 | 60
  private readonly DAY_START_DATE_TIME_STRING: string
  private readonly STATES: Record<number, dayIntervalsStateType>
  HOURS_PER_DAY = 24

  constructor(
    intervalMinutes: 15 | 30 | 60,
    dayStartDateTimeString: string,
    hoursPerDay = 24,
    intervalStates: Record<number, dayIntervalsStateType> = []
  ) {
    super()
    this.INTERVAL_MINUTES = intervalMinutes
    this.DAY_START_DATE_TIME_STRING = dayStartDateTimeString
    this.HOURS_PER_DAY = hoursPerDay
    this.STATES = intervalStates
  }

  getIntervals(): interval[] {
    const intervals = []
    const numberOfIntervalsInDay = this.HOURS_PER_DAY * (60 / this.INTERVAL_MINUTES)
    let iteratorDateTimeString = this.DAY_START_DATE_TIME_STRING

    while (intervals.length < numberOfIntervalsInDay) {
      const intervalEnd = this.addMinutesToDateTimeString(this.INTERVAL_MINUTES, iteratorDateTimeString)
      const i = intervals.length as number;
      intervals.push({
        disabled: this.STATES[i]?.disabled,
        color: this.STATES[i]?.color,
        hidden: this.STATES[i]?.hidden,
        intervalStart: iteratorDateTimeString,
        intervalEnd,
        // Only show a border at the bottom of an interval, when the upcoming interval is not the start of a new hour.
        // This prevents double borders
        hasBorder: intervalEnd.substring(14, 16) !== '00'
      })

      iteratorDateTimeString = intervalEnd
    }

    return intervals
  }
}
