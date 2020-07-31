export const routes = [
	{
		path: '/',
		component: require('@/layouts/default').default,
		children: [
			'/html'
		].map(path => ({
			path: '/',
			component: require('@/pages' + path).default
		})).concat([
			'/html',
			'/applets',
			'/css',
			'/dom',
			'/git',
			'/node',
			'/react',
			'/vue',
			'/js'
		].map(path => ({
			path,
			component: require('@/pages' + path).default
		})))
	},
	{
		path: '/err',
		component: require('@/pages/404').default
	},
	// {
	//     path: '/html',
	//     name: 'html',
	//     component: HtmlBox,
	//     // alias: '/abc',
	//     /*设置alias可以在访问路由为'/abc'重定向时候路由地址不会跳转，依然为abc，也就是别名，
	//     通过abc地址渲染的还是home，请结合下面redirect重定向设置查看，但有必要注意的是，
	//     如果你使用这种方式，router-link的高亮就失效了，可以地址栏输入'abc'回车测试*/
	//     meta: {
	//         title: 'html'
	//     }
	// },
	{
		path: '*',
		// component:404 //第一种方式 - 直接去渲染404-undefined组件

		// redirect: '/undefined'
		/* 第二种方式redirect - 路由重定向,值得注意的是：当前这个undefined必须是你在上面配置过的地址
			也就是说，重定向到达的页面必须是已经存在的路由，如果组件没在上面routes里面配置，直接去重定向一个组件是会报错
		*/

		//redirect:{path:'/undefined'}
		//第三种方式，对象写法，同样，还是通过上面配置过的路由地址进行跳转，不是直接渲染组件方式

		//redirect:{name:'nofind'}
		//第四种方式，对象通过name别名写法，同样，还是通过上面配置过的路由地址进行跳转，不是直接渲染组件方式

		// redirect:(to) => {//第四种方式：动态设置重定向目标
		//   /*console.log(to) //to，目标路由对象，当前访问的目标路由信息
		//   return '/undefined'//重定向到一个上面配置过的路由地址*/

		//当然，既然说是动态设置，那么肯定不能向上述那样简简单单return完事，如下：
		//   if(to.path == '/abc'){
		// return '/home' //如果目标路径是abc，那么我重定向到首页home
		//   }
		//   return '/undefined' //其他正常时候跳转到404
		// }
	}
	// {
	//     path: '/document',
	//     name: 'document',
	//     components: { //多个组件渲染到一个路由(命名视图技术)
	//         default: document, //默认渲染到router-view没有name的路由
	//         slide: slide
	//     },
	//     meta: {
	//         title: 'document'
	//     },
	//     beforeEnter(to, from, next) { //局部路由钩子函数beforeEnter/afterEnter
	//         console.log("路由钩子函数监听到：进入到document组件")
	//         next(true)
	//     }
	// },
]