/*!
对话框
404315887@qq.com
2014.11.7
2015.12.19

var dialog = wu.dialog({
	css: {}, // 自定义 css
	overlay: true, // 遮罩层
	isOverlayClickClose: true, // 遮罩层点击关闭
	el: null, // 对话框元素 #id
	url: null, // 动态内容 'dialog.html'
	show: false // 是否立即显示
});
dialog.init({...})
dialog.open()
dialog.resize()
dialog.close()

var d2 = wu.dialog.new({...});

<a wu-dialog="{}" href="dialogUrl">dilaog</a>
*/
+ function(wu) {
	var setting = {
		css: {}, // 自定义 css
		overlay: true, // 遮罩层
		isOverlayClickClose: true, // 遮罩层点击关闭
		// title: 'title', // 标题
		// content: 'dialog', // 内容
		// icon: null, // 图标状态
		el: null, // 对话框元素 #id
		url: null, // 动态内容 'dialog.html'
		iframe: true, // url 是否用iframe
		// loading: null,
		// ok: false, // 是否显示按钮, function 回调
		// cancel: false, // 同上
		show: false // 是否立即显示
			// backClose: true // 返回关闭
	};

	var Dialog = function(options) {
		options = options || {};

		var $overlay,
			$dialogWp,
			$el,
			$flag,
			elDisplay;

		// overlay
		$overlay = $('<div class="wu-dialog-overlay">').css({
			position: 'fixed',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			background: '#111',
			opacity: 0.25,
			zIndex: 9999
		});
		$('body').append($overlay.hide());

		// overlay close
		var isOverlayClickClose;
		$overlay.click(function() {
			if (isOverlayClickClose) {
				close();
			};
		});

		// dialog-wp
		$dialogWp = $('<div class="wu-dialog-wp">');
		$('body').append($dialogWp.hide());

		var init = function(options) {
			options = options || {};
			for (var i in setting) {
				options[i] === undefined && (options[i] = setting[i]);
			}

			// isOverlayClickClose
			isOverlayClickClose = options.isOverlayClickClose;

			// 允许自定义 css
			$dialogWp.css('style', '').css({
				position: 'fixed',
				zIndex: 99999999,
				maxWidth: '100%',
				maxHeight: '100%',
				// transition: '.3s',
				// overflow: 'auto',
				// boxShadow: '0px 1px 10px #888',
			}).css(options.css)

			// url
			if (options.url) {
				// iframe
				if (options.iframe) {
					var $iframe = $('<iframe style="display:block;max-width:100%" src="' + options.url + '" scrolling="no" frameborder="0" allowtransparency="true"></iframe>');
					$iframe[0].onload = function() {
						try {
							var htmlEl = this.contentDocument.getElementsByTagName('html')[0];
							this.style.height = htmlEl.scrollHeight + 1.5 + 'px'; // 1.5 是因为 edge 浏览器会出现滚动条
							this.style.width = htmlEl.scrollWidth + 1.5 + 'px';
						} catch (e) {}
						// setTimeout(resize, 100);
						resize();
						this.setAttribute('scrolling', 'yes');
					};
					$dialogWp.html($iframe);
					open();
				} else {
					$dialogWp.load(options.url, function() {
						if (options.show) {
							open();
							setTimeout(function() {
								resize();
							}, 1000);
						};
					});
				}
			}
			// el
			else {
				$el = $(options.el);
				if (options.show) {
					open();
				};
			}
		};
		var open = function() {

			$overlay.fadeIn();
			$dialogWp.show();

			// hash 标记，使支持返回关闭
			// 支持 hash 路由 #!/home#id#dialog
			if (location.hash.lastIndexOf('#dialog') == -1) {
				location.hash += '#dialog';
			};

			// el
			if (options.el) {
				// 标记一下它原本在哪里
				if (!$flag) {
					$flag = $('<i style="display:none"></i>'); //标记
					$el.after($flag);
				};

				elDisplay = $el.css('display');
				if (elDisplay == 'none') {
					$el.show();
				};
				$dialogWp.append($el);
			};

			resize();
			return this;
		};
		var resize = function() {
			$dialogWp.css({
				left: (document.body.clientWidth - $dialogWp.outerWidth()) / 2,
				top: (window.innerHeight - $dialogWp.outerHeight()) / 5 * 2,
			});

			return this;
		};
		var close = function() {
			// 去除 hash 标记
			if (location.hash.lastIndexOf('#dialog') != -1) {
				history.go(-1);
			};

			// el
			if ($flag) {
				$flag.before($el.css('display', elDisplay));
			};
			// 移除
			$overlay.fadeOut();
			$dialogWp.hide();

			return this;
		};

		// 初始化
		init(options);
		// resize
		$(window).resize(function() {
			resize();
		});
		// 返回关闭
		$(window).on('hashchange', function() {
			if (location.hash.lastIndexOf('#dialog') == -1) {
				close();
			};
		});

		return {
			init: init,
			open: open,
			resize: resize,
			close: close
		}
	};

	// 单例
	var singleDialog;
	wu.dialog = function(options) {
		if (singleDialog) {
			singleDialog.init(options);
			return singleDialog;
		};
		singleDialog = Dialog(options);
		return singleDialog;
	};

	// new
	// wu.dialog.new YUI压缩时报错
	wu.dialog['new'] = function(options) {
		return Dialog(options);
	}

	// 属性
	$('body').on('click', '[wu-dialog]', function(e) {
		e.preventDefault();
		var options = eval('(' + ($(this).attr('wu-dialog') || '{}') + ')');
		var href = $(this).attr('href');
		if (href) {
			options.url = href;
		};
		options.show = true;
		wu.dialog(options);
	});

}(this.wu || (wu = {}));
