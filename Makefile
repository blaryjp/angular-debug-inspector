all:
	rm -rf dist
	grunt prod --theme=textmate
	grunt prod --theme=monokai
	grunt prod --theme=terminal
	grunt prod --theme=eclipse