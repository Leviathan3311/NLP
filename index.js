document.querySelector("html").classList.add('js');


let fileInput  = document.getElementById("my-file")
let uploaded_block  = document.getElementById("uploaded-block")
let upload_block  = document.getElementById("upload-block")
let remove_file  = document.getElementById("remove-file")
let file_name  = document.getElementById("file-name")
let porcion1_c  = document.getElementById("porcion1-c")
let donut_chart  = document.getElementById("donut-chart")
let switch_button  = document.getElementsByClassName("switch-button")
let ctx2 = document.getElementById('myDoubleBarChart').getContext('2d');
const ctx = document.getElementById('myPieChart').getContext('2d');


data = {
	"Fashion":{
		"pos":0,
		"neg":0
	},
	"Film":{
		"pos":30,
		"neg":20
	},
	"Food":{
		"pos":100,
		"neg":20
	}
}



let myPieChart = new Chart(ctx, {
	type: 'pie',
	data: {
		labels: ['positive', 'negative'],
		datasets: [{
			data: [],
			backgroundColor: ['green', 'red']
		}]
	}
});

let doubleBarChart = new Chart(ctx2, {
	type: 'bar',
	data: {
		labels: ["Fashion","Film","Food"],
		datasets: [
			{
				label: 'Positive',
				data: [0,0,0],
				backgroundColor: 'rgba(75, 192, 192, 0.2)',
				borderColor: 'rgba(75, 192, 192, 1)',
				borderWidth: 1
			},
			{
				label: 'Negative',
				data: [0,0,0],
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1
			}
		]
	},
	options: {
		scales: {
			y: {
				beginAtZero: true
			}
		}
	}
});

let click_chart = function(data,type) {  
	myPieChart.data.datasets[0].data = [data[type]["pos"], data[type]["neg"]];
	myPieChart.update();
}



let check_data = function(data) {  
	new_data = {}
	for (const [key, value] of Object.entries(data)) {
		if (value['pos'] >0 || value['neg'] >0){
			new_data[key] = value
		}
	  }
	return new_data
}



let active_PieChart = function(data) {  
	new_data = check_data(data)
	new_type = Object.keys(new_data)
	Array.from(switch_button).forEach(function myFunction(item, i) {
		type = item.getAttribute("name")
		if (new_type.includes(type)){
			item.style.display = "block"
			item.addEventListener("click", function(event){
				click_chart(new_data,item.getAttribute("name"))
			})
		} else {
			item.style.display = "none"
		}
	  })
	click_chart(data,new_type[0])
	
	
}
active_PieChart(data)

let active_doubleBarChart = function(data) {  
	new_data = check_data(data)
	new_type = Object.keys(new_data)
	doubleBarChart.data.labels = new_type
	doubleBarChart.data.datasets[0].data = Object.values(new_data).map(value =>  value["pos"])
	doubleBarChart.data.datasets[1].data = Object.values(new_data).map(value =>  value["neg"])
	doubleBarChart.update()
}
active_doubleBarChart(data)


fileInput.addEventListener("change", function( event ) {  
    upload_block.style.visibility = "hidden"
    uploaded_block.style.visibility = "visible"
    file_name.innerText = this.value

	let reader = new FileReader();
  
	reader.readAsDataURL(fileInput.files[0]);
	reader.onload = function () {
	  let fileEncoded = {"file":reader.result};
	  $.ajax({
			url: "http://127.0.0.1:8000/predict",
			type: 'POST',
			data: JSON.stringify(fileEncoded),
			contentType: 'application/json',
		
		}).done(function(result) {
			// alert( "success" );
			console.log("Success")
			console.log(result)
			result = {
				"Fashion":{
					"pos":10,
					"neg":20
				},
				"Film":{
					"pos":30,
					"neg":20
				},
				"Food":{
					"pos":100,
					"neg":20
				}
			}


			update_new_pie_chart(result)
	
		  })
		  .fail(function() {
			alert( "error" );
		  })
	};
  
	reader.onerror = function (error) {
	  console.log('Error: ', error);
	};

	

});  

remove_file.addEventListener("click", function( event ) {  
    uploaded_block.style.visibility = "hidden"
    upload_block.style.visibility = "visible"
    fileInput.value = ''
});  


(function($) { "use strict";

	$(function() {
		var header = $(".start-style");
		$(window).scroll(function() {    
			var scroll = $(window).scrollTop();
		
			if (scroll >= 10) {
				header.removeClass('start-style').addClass("scroll-on");
			} else {
				header.removeClass("scroll-on").addClass('start-style');
			}
		});
	});		
		
	
	$(document).ready(function() {
		$('body.hero-anime').removeClass('hero-anime');
	});

		
	$('body').on('mouseenter mouseleave','.nav-item',function(e){
			if ($(window).width() > 750) {
				var _d=$(e.target).closest('.nav-item');_d.addClass('show');
				setTimeout(function(){
				_d[_d.is(':hover')?'addClass':'removeClass']('show');
				},1);
			}
	});	
	

	
  })(jQuery); 