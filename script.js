$(document).ready(function(){
	
	$('#mainButton').on('click', getQuote);
	$('.rrssButton').on('click', rrssButton);

	
	function rrssButton(){
		var quote = $('#quote').text().replace(':',': ').substring(0, 101)+"...";
		var url = new Array();
		switch(event.target.id){
			case 'twtButton':
				url = ["https://twitter.com/intent/tweet?text="+quote+"&via=a_ahr1&url=https://quotesondesign.com/api-v4-0/", "Twitter", "width=690,height=253"];
				break
			case 'fbButton':
				url = ["https://www.facebook.com/sharer/sharer.php?u=https://antonio-hr.github.io/randomquote/", "_blank", "width=690,height=253"];
				break
		}
		return window.open(url[0], url[1],url[2]);
	}	

	$(window).on('load', getQuote);
		function getQuote(){
		$.ajax({
			method: 'GET',
			datatype:'json',
			url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=',
			async:'false',
			success: function(data){
				var aResStart = [];
				var aResEnd = [];
				var aContent = data[0].content.split(" ");
				var aStart = aContent[0].split("");
				var aEnd = aContent[aContent.length - 1].split("");
				for(i = 0; i < aStart.length; i++){
					if (i === 3){
						aResStart.push('"'+aStart[i]);
					}else{
						aResStart.push(aStart[i]);
					}
				}
				for(i = 0; i < aEnd.length; i++){
					if (aEnd[i] == "<"){
						aResEnd.push('"'+aEnd[i]);
					}else{
						aResEnd.push(aEnd[i]);
					}
				}

				aContent[0] = aResStart.join("");
				aContent[aContent.length - 1] = aResEnd.join("");
				
				var sRes = aContent.join(" ");
				document.getElementById('quote').innerHTML = '<p id="author">'+data[0].title+':</p>'+sRes+'';

				
			},
			cache: false
		})
	}
})