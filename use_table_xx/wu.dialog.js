/*
对话框
2015年9月1日 20:12:19
2015.09.08
2015.12.07
*/

// 用 table 居中这种方式即使没有 overlay 也无法点击后面的
+ function(wu) {
	var setting = {
		overlay: true, // 遮罩层
		isOverlayClickClose: true, // 遮罩层点击关闭
		title: 'title', // 标题
		content: 'dialog', // 内容
		icon: null, // 图标状态
		el: null, // 对话框元素 #id
		url: null, // 动态内容 'dialog.html'
		loading: null,
		ok: false, // 是否显示按钮, function 回调
		cancel: false, // 同上
		show: true, // 是否立即显示
		css: {}
	};

	var $overlay,
		$dialogTable,
		$dialogWrapper,
		$el,
		$flag,
		elDisplay;

	// 遮罩层
	$overlay = $('<div class="wu-dialog-overlay">');
	$('body').append($overlay.hide());

	// dialog-wp
	$dialogTable = $('' //
		+ '<div class="wu-dialog-table">' //
		+ '	<div class="wu-dialog-cell">' //
		+ '		<div class="wu-dialog-scroll">' //
		+ '			<div class="wu-dialog-wrapper">' //
		+ '			</div>' //
		+ '		</div>' //
		+ '	</div>' //
		+ '</div>' //
	);
	$dialogWrapper = $dialogTable.find('.wu-dialog-wrapper');
	$('body').append($dialogTable.hide());

	var Dialog = function(options) {
		options = options || {};
		this.options = options;
		var _this = this;

		for (var i in setting) {
			options[i] === undefined && (options[i] = setting[i]);
		}

		// 点击关闭
		if (options.isOverlayClickClose) {
			$dialogTable.click(function(e) {
				if (!$(e.target).closest('.wu-dialog-wrapper').length) {
					_this.close();
				};
			});
		};

		// el
		if (options.el) {
			$el = $(options.el);
			// 标记一下它原本在哪里
			if (!$flag) {
				$flag = $('<i style="display:none"></i>'); //标记
				$el.after($flag);
			};

			elDisplay = $el.css('display');
			if (elDisplay == 'none') {
				$el.show();
			};
			$dialogWrapper.append($el);
		};

		// url
		if (options.url) {
			$dialogWrapper.load(options.url);
		};

		if (options.show) {
			_this.open();
		};
	};
	Dialog.prototype = {
		open: function() {
			var options = this.options;

			$overlay.fadeIn();
			$dialogTable.show();

			return this;
		},
		close: function() {
			if ($flag) {
				$flag.before($el.css('display', elDisplay));
			};
			$overlay.fadeOut();
			$dialogTable.hide();

			return this;
		}
	};

	wu.dialog = function(options) {
		return new Dialog(options);
	};
}(this.wu || (wu = {}));
