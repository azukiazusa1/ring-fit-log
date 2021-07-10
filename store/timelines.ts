import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
// import { $axios } from '~/utils/api'
import { PaginateResult } from 'mongoose'
import { Timeline, TimelineRequest } from '~/types/timeline'
import timelineFixture from '~/test/fixture/api/timelines/index.json'

@Module({
  name: 'timelines',
  stateFactory: true,
  namespaced: true
})
export default class TimelinesModule extends VuexModule {
  private timelines: Timeline[] = []
  private paginate: PaginateResult<Timeline> | null = null

  public get getTimelines() {
    return this.timelines
  }

  public get getPaginate() {
    return this.paginate
  }

  @Mutation
  private addTimelines(timelines: Timeline[]) {
    this.timelines = [...this.timelines, ...timelines]
  }

  @Mutation
  private setPaginagte(paginate: PaginateResult<Timeline>) {
    this.paginate = paginate
  }

  @Action({ rawError: true })
  public async fetchTimelines({ page = 1, limit = 10 }: TimelineRequest) {
    console.log(page, limit)
    function sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    }
    await sleep(3000)
    const data: Timeline[] = timelineFixture
    this.addTimelines(data)
  }
}
