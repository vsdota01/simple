module.exports = {
	productionSourceMap: false,
	css: {
		loaderOptions: {
			css: {},
			postcss: {
				plugins: [
					require('./pxtorem')([
						{
							remUnit: 32,
							exclude: /node_modules/i
						},
						{
							remUnit: 16,
							include: /vant/i
						}
					])
         ]
			}
		},
		extract: false,
	}
}