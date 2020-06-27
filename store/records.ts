import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import moment from 'moment'
import { $axios } from '~/utils/api'
import { Record } from '~/types/record'

@Module({
  name: 'record',
  stateFactory: true,
  namespaced: true
})
export default class RecordsModule extends VuexModule {
  private records: Record[] = []

  public get getRecords() {
    return this.records
  }

  public get getRecordByDate() {
    return (date: Date) => this.records.find((record) => record.date === date)
  }

  public get isRecoded() {
    return (date: Date) => this.records.some((record) => record.date === date)
  }

  public get getRecordByMonth() {
    // TODO
    return this.records
  }

  @Mutation
  private addRecord(record: Record) {
    this.records.push(record)
  }

  @Mutation
  private removeRecord(date: Date) {
    this.records = this.records.filter((record) => record.date !== date)
  }

  @Mutation
  private replaceRecord(payload: Record) {
    const index = this.records.findIndex(
      (record) => record.date === payload.date
    )
    if (index === -1) {
      this.addRecord(payload)
      return
    }
    this.records.splice(index, 1, payload)
  }

  @Action({ rawError: true })
  public async fetchRecords() {
    const { data } = await $axios.get<Record[]>('/api/records')
    data.forEach((v) => {
      if (!this.isRecoded(v.date)) {
        this.addRecord(v)
      }
    })
  }

  @Action({ rawError: true })
  public async fetchRecord(date: Date) {
    const { data } = await $axios.get<Record>(
      `/api/records/${moment(date).format('YYYY-MM-DD')}`
    )
    if (!this.isRecoded(data.date)) {
      this.addRecord(data)
    }
  }
}
