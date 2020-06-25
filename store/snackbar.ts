import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { SnackbarPayload } from 'types/index'

@Module({
  name: 'snackbar',
  stateFactory: true,
  namespaced: true
})
export default class Snackbar extends VuexModule {
  public message: string = ''
  public color: string = 'success'
  public timeout: number = 3000
  public appear: boolean = false
  public escape: boolean = false
  public top: boolean = false
  public right: boolean = false
  public left: boolean = false
  public bottom: boolean = false

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
  private setColor(color: string) {
    this.color = color
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
    color = 'success',
    escape = false,
    top = false,
    right = false,
    left = false,
    bottom = false,
    timeout = 3000
  }: SnackbarPayload) {
    if (this.appear) return
    this.setMessage(message)
    this.setColor(color)
    this.setEscape(escape)
    this.setTop(top)
    this.setRight(right)
    this.setLeft(left)
    this.setBottom(bottom)
    this.setTimeout(timeout)
    this.showSnackbar()
  }

  @Action
  public close() {
    this.hideSnackbar()
  }
}
