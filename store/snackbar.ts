import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { SnackbarPayload } from 'types/index'

@Module({
  name: 'snackbar',
  stateFactory: true,
  namespaced: true
})
export default class Snackbar extends VuexModule {
  public message: String = ''
  public color: String = 'success'
  public timeout: Number = 3000
  public appear: Boolean = false
  public escape: Boolean = false
  public top: Boolean = false
  public right: Boolean = false
  public left: Boolean = false
  public bottom: Boolean = false

  @Mutation
  private showSnackbar() {
    this.appear = true
  }

  @Mutation
  private hideSnackbar() {
    this.appear = false
  }

  @Mutation
  private setMessage(message: String) {
    this.message = message
  }

  @Mutation
  private setColor(color: String) {
    this.color = color
  }

  @Mutation
  private setEscape(escape: Boolean) {
    this.escape = escape
  }

  @Mutation
  private setTop(top: Boolean) {
    this.top = top
  }

  @Mutation
  private setRight(right: Boolean) {
    this.right = right
  }

  @Mutation
  private setLeft(left: Boolean) {
    this.left = left
  }

  @Mutation
  private setBottom(bottom: Boolean) {
    this.bottom = bottom
  }

  @Mutation
  private setTimeout(timeout: Number) {
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
