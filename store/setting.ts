import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { Week } from '~/types/setting'
import { SUNDAY } from '~/config/constant'

@Module({
  name: 'setting',
  stateFactory: true,
  namespaced: true
})
export default class SettingModule extends VuexModule {
  private firstDayOfWeek: Week = SUNDAY
  private calendarColor: string = '#ffbb00'

  public get getFirstDayOfWeek() {
    return this.firstDayOfWeek
  }

  public get getCalandarColor() {
    return this.calendarColor
  }

  @Mutation
  private setFirstDayOfWeek(week: Week) {
    this.firstDayOfWeek = week
  }

  @Mutation
  private setCalendarColor(color: string) {
    this.calendarColor = color
  }

  @Action({ rawError: true })
  public changeFirstDayOfWeek(week: Week) {
    this.setFirstDayOfWeek(week)
  }

  @Action({ rawError: true })
  public changeCalandarColor(color: string) {
    this.setCalendarColor(color)
  }
}
