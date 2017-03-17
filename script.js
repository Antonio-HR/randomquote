$(document).ready(function(){
	
	$('#mainButton').on('click', getQuote);
	$('.rrssButton').on("click",function(event){
		var titular = $('#titular').text().replace("%", "%25");
		var url = new Array();
		event.preventDefault();
		var id = $(this).attr('id');
		switch(id){
			case 'twtButton':
				url = ["https://twitter.com/intent/tweet?text="+titular+"&via=anerodata&url=http://sampledmining.esy.es", "Twitter", "width=690,height=253"];
				break
			case 'fbButton':
				url = ["https://www.facebook.com/sharer/sharer.php?u=http://sampledmining.esy.es", "_blank", "width=690,height=253"];
				break
		}
		return window.open(url[0], url[1],url[2]);
	});	

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
