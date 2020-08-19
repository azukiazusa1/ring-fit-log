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
  private gridLineX = true
  private gridLineY = false
  private hiddenTotalTimeExercising = false
  private totalTimeExercisingColor = '#1976d2'
  private hiddenTotalCaloriesBurned = false
  private totalCaloriesBurnedColor = '#f87979'
  private hiddenTotalDistanceRun = false
  private totalDistanceRunColor = '#69F0AE'

  public get getFirstDayOfWeek() {
    return this.firstDayOfWeek
  }

  public get getCalandarColor() {
    return this.calendarColor
  }

  public get isSmoothed() {
    return this.smoothing
  }

  public get getGridLineX() {
    return this.gridLineX
  }

  public get getGridLineY() {
    return this.gridLineY
  }

  public get isHiddenTotalTimeExercising() {
    return this.hiddenTotalTimeExercising
  }

  public get getTotalTimeExercisingColor() {
    return this.totalTimeExercisingColor
  }

  public get isHiddenTotalCaloriesBurned() {
    return this.hiddenTotalCaloriesBurned
  }

  public get getTotalCaloriesBurnedColor() {
    return this.totalCaloriesBurnedColor
  }

  public get isHiddenTotalDistanceRun() {
    return this.hiddenTotalDistanceRun
  }

  public get getTotalDistanceRunColor() {
    return this.totalDistanceRunColor
  }

  @Mutation
  private setFirstDayOfWeek(week: Week) {
    this.firstDayOfWeek = week
  }

  @Mutation
  private setSmoothing(smoothing: boolean) {
    this.smoothing = smoothing
  }

  @Mutation
  private setGridLineX(gridLineX: boolean) {
    this.gridLineX = gridLineX
  }

  @Mutation
  private setGridLineY(gridLineY: boolean) {
    this.gridLineY = gridLineY
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
  private setTotalTimeExercisingColor(color: string) {
    this.totalTimeExercisingColor = color
  }

  @Mutation
  private showTotalCaloriesBurned() {
    this.hiddenTotalCaloriesBurned = false
  }

  @Mutation setTotalCaloriesBurnedColor(color: string) {
    this.totalCaloriesBurnedColor = color
  }

  @Mutation
  private hideTotalCaloriesBurned() {
    this.hiddenTotalCaloriesBurned = true
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
  private setToitalDistanceRunColor(color: string) {
    this.totalDistanceRunColor = color
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
    this.setSmoothing(smoothing)
  }

  @Action({ rawError: true })
  public toggleGridLineX(grigLineX: boolean) {
    this.setGridLineX(grigLineX)
  }

  @Action({ rawError: true })
  public toggleGridLineY(gridLineY: boolean) {
    this.setGridLineY(gridLineY)
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
  public changeTotalTimeExercisingColor(color: string) {
    this.setTotalTimeExercisingColor(color)
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
  public changeTotalCaloriesBurnedColor(color: string) {
    this.setTotalCaloriesBurnedColor(color)
  }

  @Action({ rawError: true })
  public toggleHiddenTotalDistanceRun() {
    if (this.isHiddenTotalDistanceRun) {
      this.showTotalDistanceRun()
    } else {
      this.hideTotalDistanceRun()
    }
  }

  @Action({ rawError: true })
  public changeTotalDistanceRunColor(color: string) {
    this.setToitalDistanceRunColor(color)
  }
}
