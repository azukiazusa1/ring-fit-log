import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import moment from 'moment'
import { isEmpty } from 'lodash'
import { $axios } from '~/utils/api'
import toJSON from '~/utils/toJSON'
import { Record } from '~/types/record'

@Module({
  name: 'records',
  stateFactory: true,
  namespaced: true
})
export default class RecordsModule extends VuexModule {
  private records: Record[] = []

  public get getRecords() {
    return this.records
  }

  public get getRecordByDate() {
    return (date: Date) =>
      this.records.find((record) => moment(record.date).isSame(date, 'day'))
  }

  public get isRecoded() {
    return (date: Date) =>
      this.records.some((record) => moment(record.date).isSame(date, 'day'))
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
    this.records = this.records.filter(
      (record) => !moment(record.date).isSame(date, 'day')
    )
  }

  @Mutation
  private replaceRecord(payload: Record) {
    const index = this.records.findIndex((record) =>
      moment(record.date).isSame(payload.date, 'day')
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
    if (isEmpty(data)) {
      return
    }
    data.forEach((v) => {
      if (!this.isRecoded(new Date(v.date))) {
        this.addRecord(v)
      }
    })
  }

  @Action({ rawError: true })
  public async fetchRecord(date: Date) {
    const { data } = await $axios.get<Record>(
      `/api/record/${moment(date).format('YYYY-MM-DD')}`
    )
    if (isEmpty(data)) {
      return
    }
    if (!this.isRecoded(new Date(data.date))) {
      this.addRecord(data)
    }
  }

  @Action({ rawError: true })
  public async createRecord(record: Record) {
    const { data } = await $axios.post<Record>('/api/record', toJSON(record))
    this.addRecord(data)
  }

  @Action({ rawError: true })
  public async updateRecord(record: Record, date: Date) {
    const { data } = await $axios.put<Record>(
      `/api/record/${moment(date).format('YYYY-MM-DD')}`,
      toJSON(record)
    )
    this.replaceRecord(data)
  }
}
