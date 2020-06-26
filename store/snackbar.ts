import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { SnackbarPayload, SnackbarTypePayload, Types } from 'types/index'

@Module({
  name: 'snackbar',
  stateFactory: true,
  namespaced: true
})
export default class Snackbar extends VuexModule {
  private message: string = ''
  private type: Types = 'info'
  private timeout: number = 3000
  private appear: boolean = false
  private escape: boolean = false
  private top: boolean = false
  private right: boolean = false
  private left: boolean = false
  private bottom: boolean = false

  public get getMessage() {
    return this.message
  }

  public get getType() {
    return this.type
  }

  public get getTimeout() {
    return this.timeout
  }

  public get isAppear() {
    return this.appear
  }

  public get isEscape() {
    return this.escape
  }

  public get isTop() {
    return this.top
  }

  public get isRight() {
    return this.right
  }

  public get isLeft() {
    return this.left
  }

  public get isBottom() {
    return this.bottom
  }

  @Mutation
  private showSnackbar() {
    this.appear = true
  }

  @Mutation
  private hideSnackbar() {
    this.appear = false
  }

  @Mutation
  private setMessage(message: string) {
    this.message = message
  }

  @Mutation
  private setType(type: Types) {
    this.type = type
  }

  @Mutation
  private setEscape(escape: boolean) {
    this.escape = escape
  }

  @Mutation
  private setTop(top: boolean) {
    this.top = top
  }

  @Mutation
  private setRight(right: boolean) {
    this.right = right
  }

  @Mutation
  private setLeft(left: boolean) {
    this.left = left
  }

  @Mutation
  private setBottom(bottom: boolean) {
    this.bottom = bottom
  }

  @Mutation
  private setTimeout(timeout: number) {
    this.timeout = timeout
  }

  @Action({ rawError: true })
  public setSnackbar({
    message = '',
    type = 'info',
    escape = false,
    top = false,
    right = false,
    left = false,
    bottom = false,
    timeout = 3000
  }: SnackbarTypePayload) {
    if (this.appear) return
    this.setMessage(message)
    this.setType(type)
    this.setEscape(escape)
    this.setTop(top)
    this.setRight(right)
    this.setLeft(left)
    this.setBottom(bottom)
    this.setTimeout(timeout)
    this.showSnackbar()
  }

  @Action({ rawError: true })
  public info(payload: SnackbarPayload) {
    this.setSnackbar({
      ...payload,
      type: 'info'
    })
  }

  @Action({ rawError: true })
  public error(payload: SnackbarPayload) {
    this.setSnackbar({
      ...payload,
      type: 'error'
    })
  }

  @Action({ rawError: true })
  public warning(payload: SnackbarPayload) {
    this.setSnackbar({
      ...payload,
      type: 'warning'
    })
  }

  @Action({ rawError: true })
  public success(payload: SnackbarPayload) {
    this.setSnackbar({
      ...payload,
      type: 'success'
    })
  }

  @Action({ rawError: true })
  public close() {
    this.hideSnackbar()
  }
}
