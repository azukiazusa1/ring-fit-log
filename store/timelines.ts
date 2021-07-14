import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { PaginateResult } from 'mongoose'
import { Timeline, TimelineRequest } from '~/types/timeline'
import { $axios } from '~/utils/api'

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

  public get getTimelineById() {
    return (id: string) =>
      this.timelines.find((timeline) => timeline._id === id)
  }

  public get getPaginate() {
    return this.paginate
  }

  @Mutation
  private addTimelines(timelines: Timeline[]) {
    this.timelines = [...this.timelines, ...timelines]
  }

  @Mutation
  private addLike(id: string) {
    this.timelines = this.timelines.map((timeline) => {
      if (timeline._id === id) {
        const { likeCount } = timeline
        return {
          ...timeline,
          isLiked: true,
          likeCount: likeCount + 1
        }
      } else {
        return timeline
      }
    })
  }

  @Mutation
  private removeLike(id: string) {
    this.timelines = this.timelines.map((timeline) => {
      if (timeline._id === id) {
        const { likeCount } = timeline
        return {
          ...timeline,
          isLiked: false,
          likeCount: likeCount - 1
        }
      } else {
        return timeline
      }
    })
  }

  @Mutation
  private clearTimelines() {
    this.timelines = []
  }

  @Mutation
  private setPaginagte(paginate: PaginateResult<Timeline> | null) {
    this.paginate = paginate
  }

  @Action({ rawError: true })
  public async fetchTimelines({ page = 1, limit = 10 }: TimelineRequest) {
    const { data } = await $axios.get<PaginateResult<Timeline>>(
      '/api/timelines',
      { params: { page, limit } }
    )
    this.addTimelines(data.docs)
    this.setPaginagte(data)
  }

  @Action({ rawError: true })
  public toggleLike({ id }: { id: string }) {
    $axios.put(`/api/timelines/${id}/like`)
    const timeline = this.getTimelineById(id)
    if (!timeline) {
      return
    }
    if (timeline.isLiked) {
      this.removeLike(id)
    } else {
      this.addLike(id)
    }
  }

  @Action({ rawError: true })
  public clear() {
    this.clearTimelines()
    this.setPaginagte(null)
  }
}
