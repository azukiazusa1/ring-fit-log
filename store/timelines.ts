import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { $axios } from '~/utils/api'
import { Timeline } from '~/types/timeline'

@Module({
  name: 'timelines',
  stateFactory: true,
  namespaced: true
})
export default class TimelinesModule extends VuexModule {
  private timelines: Timeline[] = []

  public get getRecords() {
    return this.timelines
  }

  @Mutation
  private addTimelines(timelines: Timeline[]) {
    this.timelines = [...this.timelines, ...timelines]
  }

  @Mutation
  private clearRecord() {
    this.timelines = []
  }

  @Action({ rawError: true })
  public async fetchTimelines() {
    const { data } = await $axios.get<Timeline[]>('/api/timelines')
    this.addTimelines(data)
  }
}
