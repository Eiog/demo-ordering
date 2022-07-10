//request拦截器
uni.addInterceptor('request', {
    invoke(args: UniApp.RequestOptions) {
        uni.showLoading({ title: '加载中' })
        args.header = {
            ...args.header,
            token: 'token'
        }
        return args
    },
    success(res) {

        console.log(res);

    },
    fail() {

    },
    complete() {
        uni.hideLoading()
    }
})
