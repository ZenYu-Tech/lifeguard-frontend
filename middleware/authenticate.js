export default function ({ store, redirect }) {
  if (store.getters['admin/user/getToken'] === null) {
    return redirect('/admin/login')
  }
}
