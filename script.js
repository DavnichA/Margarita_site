$(function(){
	$("#gallery").galereya({
		load: function(next) {                
                var data = [{"lowsrc":"upload\/thumbnails\/1.jpg",
                             "fullsrc":"upload\/1.jpg",
                             "description":"work 1",
                             "category":"drawing"},
                             {"lowsrc":"upload\/thumbnails\/2.jpg",
                              "fullsrc":"upload\/2.jpg",
                              "description":"work 2",
                              "category":"photography"},
                             {"lowsrc":"upload\/thumbnails\/3.jpg",
                             "fullsrc":"upload\/3.jpg",
                             "description":"work 3",
                             "category":"drawing"},
                             {"lowsrc":"upload\/thumbnails\/4.jpg",
                              "fullsrc":"upload\/4.jpg",
                              "description":"work 4",
                              "category":"photography"},
                             {"lowsrc":"upload\/thumbnails\/5.jpg",
                             "fullsrc":"upload\/5.jpg",
                             "description":"work 5",
                             "category":"drawing"},
                             {"lowsrc":"upload\/thumbnails\/6.jpg",
                              "fullsrc":"upload\/6.jpg",
                              "description":"work 6",
                              "category":"photography"},
                             {"lowsrc":"upload\/thumbnails\/7.jpg",
                             "fullsrc":"upload\/7.jpg",
                             "description":"work 7",
                             "category":"drawing"},
                             {"lowsrc":"upload\/thumbnails\/8.jpg",
                              "fullsrc":"upload\/8.jpg",
                              "description":"work 8",
                              "category":"photography"},
                             {"lowsrc":"upload\/thumbnails\/9.jpg",
                             "fullsrc":"upload\/9.jpg",
                             "description":"work 9",
                             "category":"drawing"},
                             {"lowsrc":"upload\/thumbnails\/10.jpg",
                              "fullsrc":"upload\/10.jpg",
                              "description":"work 10",
                              "category":"photography"},
                             {"lowsrc":"upload\/thumbnails\/11.jpg",
                             "fullsrc":"upload\/11.jpg",
                             "description":"work 11",
                             "category":"drawing"},
                             {"lowsrc":"upload\/thumbnails\/12.jpg",
                              "fullsrc":"upload\/12.jpg",
                              "description":"work 12",
                              "category":"photography"},]
                next(data);
            }
	});

   $(".clckone").click(function(){
   	$("#nomer2").hide(function() {
   		$("#nomer1").show();
   	});
   });
   $(".clcktwo").click(function(){
   	$("#nomer1").hide(function() {
   		$("#nomer2").show();
   	});
   });
 
	var modalTriggerBts = $('a[data-type="cd-modal-trigger"]'),
		coverLayer = $('.cd-cover-layer');
	var duration = 600,
		epsilon = (1000 / 60 / duration) / 4,
		firstCustomMinaAnimation = bezier(.63,.35,.48,.92, epsilon);

	modalTriggerBts.each(function(){
		initModal($(this));
	});

	function initModal(modalTrigger) {
		var modalTriggerId =  modalTrigger.attr('id'),
			modal = $('.cd-modal[data-modal="'+ modalTriggerId +'"]'),
			svgCoverLayer = modal.children('.cd-svg-bg'),
			paths = svgCoverLayer.find('path'),
			pathsArray = [];
		//store Snap objects
		pathsArray[0] = Snap('#'+paths.eq(0).attr('id')),
		pathsArray[1] = Snap('#'+paths.eq(1).attr('id')),
		pathsArray[2] = Snap('#'+paths.eq(2).attr('id'));

		//store path 'd' attribute values	
		var pathSteps = [];
		pathSteps[0] = svgCoverLayer.data('step1');
		pathSteps[1] = svgCoverLayer.data('step2');
		pathSteps[2] = svgCoverLayer.data('step3');
		pathSteps[3] = svgCoverLayer.data('step4');
		pathSteps[4] = svgCoverLayer.data('step5');
		pathSteps[5] = svgCoverLayer.data('step6');
		
		//open modal window
		modalTrigger.on('click', function(event){
			event.preventDefault();
			modal.addClass('modal-is-visible');
			coverLayer.addClass('modal-is-visible');
			animateModal(pathsArray, pathSteps, duration, 'open');
		});

		//close modal window
		modal.on('click', '.modal-close', function(event){
			event.preventDefault();
			modal.removeClass('modal-is-visible');
			coverLayer.removeClass('modal-is-visible');
			animateModal(pathsArray, pathSteps, duration, 'close');
		});
	}

	function animateModal(paths, pathSteps, duration, animationType) {
		var path1 = ( animationType == 'open' ) ? pathSteps[1] : pathSteps[0],
			path2 = ( animationType == 'open' ) ? pathSteps[3] : pathSteps[2],
			path3 = ( animationType == 'open' ) ? pathSteps[5] : pathSteps[4];
		paths[0].animate({'d': path1}, duration, firstCustomMinaAnimation);
		paths[1].animate({'d': path2}, duration, firstCustomMinaAnimation);
		paths[2].animate({'d': path3}, duration, firstCustomMinaAnimation);
	}

	function bezier(x1, y1, x2, y2, epsilon){		
		var curveX = function(t){
			var v = 1 - t;
			return 3 * v * v * t * x1 + 3 * v * t * t * x2 + t * t * t;
		};

		var curveY = function(t){
			var v = 1 - t;
			return 3 * v * v * t * y1 + 3 * v * t * t * y2 + t * t * t;
		};

		var derivativeCurveX = function(t){
			var v = 1 - t;
			return 3 * (2 * (t - 1) * t + v * v) * x1 + 3 * (- t * t * t + 2 * v * t) * x2;
		};

		return function(t){

			var x = t, t0, t1, t2, x2, d2, i;			
			for (t2 = x, i = 0; i < 8; i++){
				x2 = curveX(t2) - x;
				if (Math.abs(x2) < epsilon) return curveY(t2);
				d2 = derivativeCurveX(t2);
				if (Math.abs(d2) < 1e-6) break;
				t2 = t2 - x2 / d2;
			}

			t0 = 0, t1 = 1, t2 = x;

			if (t2 < t0) return curveY(t0);
			if (t2 > t1) return curveY(t1);

			// Fallback to the bisection method for reliability.
			while (t0 < t1){
				x2 = curveX(t2);
				if (Math.abs(x2 - x) < epsilon) return curveY(t2);
				if (x > x2) t0 = t2;
				else t1 = t2;
				t2 = (t1 - t0) * .5 + t0;
			}			
			return curveY(t2);

		};
	};
	
//animate form
	function updateText(event){
    var input=$(this);
    setTimeout(function(){
      var val=input.val();
      if(val!="")
        input.parent().addClass("floating-placeholder-float");
      else
        input.parent().removeClass("floating-placeholder-float");
    },1)
  }
  $(".floating-placeholder input").keydown(updateText);
  $(".floating-placeholder input").change(updateText);

//send form
  $("#sendInfo").submit(function() {
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			alert("Спасибо за заявку! Скоро мы с вами свяжемся.");
			$("#form").trigger("reset");
		});
		return false;
	});
});

