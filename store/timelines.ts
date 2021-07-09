import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
// import { $axios } from '~/utils/api'
import { Timeline } from '~/types/timeline'
import timelineFixture from '~/test/fixture/api/timelines/index.json'

@Module({
  name: 'timelines',
  stateFactory: true,
  namespaced: true
})
export default class TimelinesModule extends VuexModule {
  private timelines: Timeline[] = []

  public get getTimelines() {
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
    function sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    }
    await sleep(3000)
    const data: Timeline[] = timelineFixture
    this.addTimelines(data)
  }
}
