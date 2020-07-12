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
  private smoothing = false
  private hiddenTotalTimeExercising = false
  private hidddenTotalCaloriesBurned = false
  private hiddenTotalDistanceRun = false

  public get getFirstDayOfWeek() {
    return this.firstDayOfWeek
  }

  public get getCalandarColor() {
    return this.calendarColor
  }

  public get isSmoothed() {
    return this.smoothing
  }

  public get isHiddenTotalTimeExercising() {
    return this.hiddenTotalTimeExercising
  }

  public get isHiddenTotalCaloriesBurned() {
    return this.hidddenTotalCaloriesBurned
  }

  public get isHiddenTotalDistanceRun() {
    return this.hiddenTotalDistanceRun
  }

  @Mutation
  private setFirstDayOfWeek(week: Week) {
    this.firstDayOfWeek = week
  }

  @Mutation
  private setsmoothing(smoothing: boolean) {
    this.smoothing = smoothing
  }

  @Mutation
  private showTotalTimeExercising() {
    this.hiddenTotalTimeExercising = false
  }

  @Mutation
  private hideTotalTimeExercising() {
    this.hiddenTotalTimeExercising = true
  }

  @Mutation
  private showTotalCaloriesBurned() {
    this.hidddenTotalCaloriesBurned = false
  }

  @Mutation
  private hideTotalCaloriesBurned() {
    this.hidddenTotalCaloriesBurned = true
  }

  @Mutation
  private showTotalDistanceRun() {
    this.hiddenTotalDistanceRun = false
  }

  @Mutation
  private hideTotalDistanceRun() {
    this.hiddenTotalDistanceRun = true
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

  @Action({ rawError: true })
  public toggleSmoothing(smoothing: boolean) {
    this.setsmoothing(smoothing)
  }

  @Action({ rawError: true })
  public toggleHiddenTotalTimeExercising() {
    if (this.isHiddenTotalTimeExercising) {
      this.showTotalTimeExercising()
    } else {
      this.hideTotalTimeExercising()
    }
  }

  @Action({ rawError: true })
  public toggleHiddenTotalCaloriesBurned() {
    if (this.isHiddenTotalCaloriesBurned) {
      this.showTotalCaloriesBurned()
    } else {
      this.hideTotalCaloriesBurned()
    }
  }

  @Action({ rawError: true })
  public toggleHiddenTotalDistanceRun() {
    if (this.isHiddenTotalDistanceRun) {
      this.showTotalDistanceRun()
    } else {
      this.hideTotalDistanceRun()
    }
  }
}
