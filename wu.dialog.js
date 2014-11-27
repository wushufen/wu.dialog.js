/*
对话框
by wushufen
wusfun@foxmail.com
2014.11.27
*/
/**

var dialog = wu.dialog({
	el: el
});

dialog.close();

*/
+function(wu){

	var dialog = function(options){
		var options = options||{};

		//遮罩层
		var overlay = $('<div class="_overlay"></div>');
		overlay.css({
			position: 'absolute',
			background: '#000',
			top: 0,
			left: 0,
			opacity: 0.5,
			width: '100%',
			height: $(document).height(),
			zIndex: 9999
		});

		//对话框
		var dialog = $('<div></div>');
		dialog.css({
			'position': 'fixed',
			'top': '40%',
			'left': '50%',
			'min-width': '200px',
			'max-width': '600px',
			'max-height': '100%',
			'_width': '400px',
			'overflow': 'auto',
			'z-index': '9999',
			// 'border-radius': '0.6em 0',
			// 'box-shadow': '0 3px 10px #333',
			'margin': '0 1em',
			'text-align': 'left',
			'background': '#fff',
		});


		// 对话框内容
		var el = $(options.el);
		var flag = $('<i style="display:none"></i>');//标记一下它原本在哪里
		var elDisplay = el.css('display');

		var open = function(){
			// 加上遮罩层
			$('body').append(overlay);
			overlay.hide().fadeIn();

			el.after(flag);

			if (elDisplay == 'none') {
				el.show();
			};
			dialog.append(el);

			// 加上对话框
			$('body').append(dialog);

			// 对话框居中
			dialog.css({
				marginLeft: -dialog.outerWidth()/2,
				marginTop: -dialog.outerHeight()/2
			});
		};

		var close = function(){
			// 对话框内容放回原位
			flag.after(el.css('display',elDisplay)).remove();

			// 移除对话框
			dialog.remove();

			// 移除遮罩层
			overlay.fadeOut(function() {
				$(this).remove();
			});
		};


		// 默认初始化则打开
		open();

		return {
			open: open,
			close: close
		};
	};

	wu.dialog = dialog;
}(window.wu || (window.wu={}) );
