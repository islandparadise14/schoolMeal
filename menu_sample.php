<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script type="text/javascript">
jQuery(function() {
	// 맨 마지막의 callback=? 은 jQuery가 알아서 함수명으로 바꿔줍니다.
	// 자세한 내용은 http://api.jquery.com/jQuery.getJSON/ 를 참고하시기 바랍니다.
	//fkey 요일 월화수목금토 123456 비워두시면 오늘 메뉴를 불러옵니다.
	jQuery.getJSON('http://soongguri.com/menu/m_menujson.php?callback=?', {
		fkey: ''
	}, function(data, textStatus, jqXHR) {
		try {
			$('#menuList').html(jsonDump(data));
			console.log(data);
		} catch (e) {
		}
	});
});
function jsonDump(data) {
	if(typeof (data) == 'object') {
		var str = '<ul>';
		for(var i in data)
			str += '<li>[' + i + '] =&gt; ' + jsonDump(data[i]) + '</li>';
		str += '</ul>';
		return str;
	} else {
		return data.toString();
	}
}
</script>
</head>
<body>
<div id="menuList">
menu
</div>
</body>
</html>
