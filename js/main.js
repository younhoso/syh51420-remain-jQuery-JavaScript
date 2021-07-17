$(document).ready(function(){
		$(function(){
			/**
				1. 광고영역 제거
				클래스 btn_close 태그가 클릭되면
				id adsLayer 태그를 숨긴다
			*/
			$(".btn_close").click(function(){
				$("#adsLayer").slideUp();
			})

            
			/*
				2. 이미지갤러리
				 (1)현재 인덱스를 의미하는 변수선언 후, 0을 대입
				 (2)애니메이션 동작시간을 설정하는 변수 선언 후, 0.5초(500) 정의
				 (3)클래스 sm_mv_bg 이미지 태그의 갯수를 구한 후, 변수에 대입
				setInterval 함수를 실행 : 실행시간은 3초(3000)으로 정의
					setInterval 함수 기능 설명
						(4) 클래스 sm_mv_slide 태그의 css 속성 중 넓이 값을 구하여 변수에 담는다

						(5) 다음 이미지의 인덱스번호를 구하기 위해 
							((1)+ 1) % (3) 에 대한 계산 공식을 통한 다음 새로운 변수에 담는다.

						(6) 클래스 sm_mv_slide 태그 안에 존재하는 dd 태그 중, (1) 의 값과 일치하는 태그에
						   애니메이션 기능을 정의 
						   - left 설정을 (4)에 담겨있는 변수값 만큼 좌측으로 이동
						    ex) left : -200px 과 같이 좌측으로 이동시키는 동작은 음수값으로 정의함

						(7) 클래스 sm_mv_slide 태그안에 존재하는 dd 태그 중 (5) 의 값과 일치하는 태그에 css 속성중 
							left 속성의 값을 (4) 의 값 만큼 적용 후, show함수를 통해서 보여준다

						(8) 클래스 sm_mv_slide 태그안에 존재하는 dd 태그 중 (5) 의 값과 일치하는 태그에 
							애니메이션 기능을 정의(동작시간은 (2)값으로 ..)  
							- left 설정을 (4)에 담겨있는 변수값 만큼 좌측으로 누적이동
							※ 일반적으로 animate 함수 사용 시, left : -200px 을 설정 했을 경우, left 값이 얼마가 되었든 간에 현재 위치에서 left -200px 위치만큼 이동하지만, 
							left : -=200px 의 경우는
							현재 위치로부터 좌측으로 200px 이동하라라는 의미 -기호와 -= 기호의 차이를 구분하라

						(9) 클래스 sm_mv_slide 태그안에 존재하는 dt 태그의 자식태그인 a 태그에 on 클래스를 제거
						(10) 클래스 sm_mv_slide 태그안에 존재하는 dt 태그 중, (5)에서 구한 인덱스번호와 일치하는 태그를 탐색 후, 직속자식인 a 태그에 on 클래스 추가
			*/
			var currentIndex = 0;  //(1)현재 인덱스를 의미하는 변수선언 후, 0을 대입
			var time = 500;        //(2)애니메이션 동작시간을 설정하는 변수 선언 후, 0.5초(500) 정의
			var imgCount = $(".sm_mv_bg").length;   //(3)클래스 sm_mv_bg 이미지 태그의 갯수를 구한 후, 변수에 대입
			setInterval(function() {
	  			var imgWidth = $(".sm_mv_slide").css("width"); //(4) 클래스 sm_mv_slide 태그의 css 속성 중 넓이 값을 구하여 변수에 담는다
	  			var nextIndex = (currentIndex + 1) % imgCount; //(5) 다음 이미지의 인덱스번호를 구하기 위해 ((1)+ 1) % (3) 에 대한 계산 공식을 통한 다음 새로운 변수에 담는다.
				
				$(".sm_mv .sm_mv_slide dd").eq(currentIndex).animate({ left: "-"+imgWidth }, time);  //(6) 클래스 sm_mv_slide 태그 안에 존재하는 dd 태그 중, (1) 의 값과 일치하는 태그에 애니메이션 기능을 정의 - left 설정을 (4)에 담겨있는 변수값 만큼 좌측으로 이동 ex) left : -200px 과 같이 좌측으로 이동시키는 동작은 음수값으로 정의함
                
				$(".sm_mv .sm_mv_slide dd").eq(nextIndex).css("left", imgWidth).show();
				$(".sm_mv .sm_mv_slide dd").eq(nextIndex).animate({ left: 0 }, time);

				$(".sm_mv_slide > dt > a").removeClass("on");
	  	      	$(".sm_mv_slide > dt:eq("+nextIndex+") > a").addClass("on");
		      	currentIndex = nextIndex;
			}, 3000);

			/**
				3. 탭바 클릭
				클래스 tablinks 클랙이 되면,
				※ a 태그의 버튼이므로 a태그의 기본기능을 막아줘야한다(상단으로 올라가는 현상)
				   해당 기능은 e.preventDefault() 함수를 사용하면 막을 수 있다.

				(1) 만약 클릭된 자신이 active라는 클래스가 존재하지 않을 경우 (false를 의미)
					- 조건문 기능
					(2)자신의 형제들을 탐색 하여 active 클래스를 제거
					(3)자신에 active 클래스 추가
					(4) 클릭된 자신의 index번호를 구한다음 변수에 담는다.
						- 첫번째를 클릭했으면 0
						- 두번째를 클릭했으면 1등이 나오게..
					(5) 클래스 tabcontent 태그들을 숨긴다
					(6) 클래스 tabcontent 태그들 중 (4) 에서 구한 인덱스번호와 일치하는 태그를 보여준다
			*/
			$(".tablinks").click(function(e){
				e.preventDefault();
				if($(this).hasClass("active")) {
					return;
				}
				else {
					$(this).siblings(".active").removeClass("active");
					$(this).addClass("active");
					
					var index = $(".tablinks").index(this);
					$(".tabcontent").hide();
					$(".tabcontent").eq(index).fadeIn(1000);
				}
			});

			/**
				4. 상위이동
				클래스 iconbutton을 클릭하면
					(1) 셀렉터(html,body) 에 애니메이션 함수를 동작시긴다
						속성은 scrollTop 속성에 0 값을 적용해주며, 실행시간은 0.5초로 정의
			*/
			$(".iconbutton").click(function(){
				// 바디 스크롤 제일 상위로 이동
				$("html,body").animate({
					scrollTop : 0
				}, 500)
			})

			/*
				5. 첫번째 탭 기능구현(더보기)
					(1) tag1, tag2, tag3, tag4 변수에 담긴 문자형 html 태그를 클릭된 자기자신 이전에 삽입한다.
					(2) 셀렉터 (html,body)에 애니메이션 함수를 동작시긴다
					    속성은 scrollTop이며, 설정해야 하는 값은 아래와 같은 공식을 이용한다.
					    $(document).height() - $(window).height() ▷ 좌측의 공식은 맨 하단의 위치를 의미하는 공식
					(3) 더보기버튼 자기자신을 숨긴다
			*/
			$(".view_more").click(function(){
				var tag1 = '<li class="item">'+
					 			'<div class="thumb_flip">'+
						 			'<div class="front"><img class="img" src="http://image2.megabox.co.kr/mop/poster/2017/D0/D558A7-DE6C-4178-B3F6-27A023AA5DEE.large.jpg" /></div>'+
						 			'<div class="back">'+
							    		'<div class="star-rating2" style="float:left;">'+
											'<span style="width:20%;"></span>'+
										'</div>'+
										'<p >괜히봤네요</p>'+
										'<span class="bg"></span>'+
									'</div>'+
					 			'</div>'+
					 			'<div class="title" title="위대한 쇼맨"><h3>위대한 쇼맨</h3></div>'+
					 			'<div class="infoBtn" >'+
					 				'<a  class="btn detail_btn" href="#" >상세정보</a>'+
					 				'<a  class="btn reserveBtn" href="#">예매하기</a>'+
					 				'<input type="hidden" class="openday" value="2017.12.20" />'+
		 							'<input type="hidden" class="director" value="마이클 그레이시" />'+
		 							'<input type="hidden" class="actors" value="휴 잭맨, 잭 에프런, 미쉘 윌리엄스, 레베카 퍼거슨, 젠다야 콜맨" />'+
		 							'<input type="hidden" class="still1" value="http://image2.megabox.co.kr/mop/poster/2017/D0/D558A7-DE6C-4178-B3F6-27A023AA5DEE.large.jpg" />'+
					 				'<input type="hidden" class="still2" value="http://image2.megabox.co.kr/mop/still/2017/3E/B467A2-FAA5-4CE5-BF83-EC1C2E9EE473.large.jpg" />'+
					 				'<input type="hidden" class="still3" value="http://image2.megabox.co.kr/mop/still/2017/42/8EAE28-9AD0-4CF2-A2F9-8732786BF1F3.large.jpg" />'+
					 				'<input type="hidden" class="still4" value="http://image2.megabox.co.kr/mop/still/2017/CA/5C4B2D-AD01-4853-9A17-DF3608F10F89.large.jpg" />'+
					 			'</div>'+
					 		'</li>';
		 		var tag2 = '<li class="item">'+
					 			'<div class="thumb_flip">'+
						 			'<div class="front"><img class="img" src="http://image2.megabox.co.kr/mop/poster/2017/E7/C57949-799B-49D6-B863-530500EAAD28.large.jpg" /></div>'+
						 			'<div class="back">'+
							    		'<div class="star-rating2" style="float:left;">'+
											'<span style="width:20%;"></span>'+
										'</div>'+
										'<p >괜히봤네요</p>'+
										'<span class="bg"></span>'+
									'</div>'+
					 			'</div>'+
					 			'<div class="title" title="다운사이징"><h3>다운사이징</h3></div>'+
					 			'<div class="infoBtn" >'+
					 				'<a  class="btn detail_btn" href="#" >상세정보</a>'+
					 				'<a  class="btn reserveBtn" href="#">예매하기</a>'+
					 				'<input type="hidden" class="openday" value="2018.01.11" />'+
		 							'<input type="hidden" class="director" value="알렉산더 페인" />'+
		 							'<input type="hidden" class="actors" value="맷 데이먼(폴 사프라넥), 크리스틴 위그(오드리 사프라넥), 크리스토프 왈츠(두샨 미르코비치), 제이슨 서디키스(데이브 존슨)" />'+
		 							'<input type="hidden" class="still1" value="http://image2.megabox.co.kr/mop/poster/2017/E7/C57949-799B-49D6-B863-530500EAAD28.large.jpg" />'+
		 							'<input type="hidden" class="still2" value="http://image2.megabox.co.kr/mop/still/2017/7F/AA34C8-F3A2-4719-98CF-0ECB7DAC0E1E.large.jpg" />'+
		 							'<input type="hidden" class="still3" value="http://image2.megabox.co.kr/mop/still/2017/9A/D41825-0800-4799-93FF-D427EDFB72D7.large.jpg" />'+
		 							'<input type="hidden" class="still4" value="http://image2.megabox.co.kr/mop/still/2017/C3/3288E7-3395-435A-BBD1-BB2CFD3D0BBF.large.jpg" />'+
					 			'</div>'+
					 		'</li>';
				var tag3 = '<li class="item">'+
					 			'<div class="thumb_flip">'+
						 			'<div class="front"><img class="img" src="http://image2.megabox.co.kr/mop/poster/2017/16/55EDB4-5660-435E-8D75-A533A8B8988A.large.jpg" /></div>'+
						 			'<div class="back">'+
							    		'<div class="star-rating2" style="float:left;">'+
											'<span style="width:20%;"></span>'+
										'</div>'+
										'<p >괜히봤네요</p>'+
										'<span class="bg"></span>'+
									'</div>'+
					 			'</div>'+
					 			'<div class="title" title="[라이브뷰잉] BanG Dream! 걸즈 밴드 파티! (GARUPA LIVE)"><h3>[라이브뷰잉] BanG Dream! 걸즈 밴드 파티! (GARUPA LIVE)</h3></div>'+
					 			'<div class="infoBtn" >'+
					 				'<a  class="btn detail_btn" href="#" >상세정보</a>'+
					 				'<a  class="btn reserveBtn" href="#">예매하기</a>'+
					 				'<input type="hidden" class="openday" value="2017.11.13" />'+
		 							'<input type="hidden" class="director" value="-" />'+
		 							'<input type="hidden" class="actors" value="-" />'+
		 							'<input type="hidden" class="still1" value="http://image2.megabox.co.kr/mop/poster/2017/16/55EDB4-5660-435E-8D75-A533A8B8988A.large.jpg" />'+
		 							'<input type="hidden" class="still2" value="http://image2.megabox.co.kr/mop/poster/2017/16/55EDB4-5660-435E-8D75-A533A8B8988A.large.jpg" />'+
		 							'<input type="hidden" class="still3" value="http://image2.megabox.co.kr/mop/poster/2017/16/55EDB4-5660-435E-8D75-A533A8B8988A.large.jpg" />'+
		 							'<input type="hidden" class="still4" value="http://image2.megabox.co.kr/mop/poster/2017/16/55EDB4-5660-435E-8D75-A533A8B8988A.large.jpg" />'+
					 			'</div>'+
					 		'</li>';
		 		var tag4 = '<li class="item">'+
					 			'<div class="thumb_flip">'+
						 			'<div class="front"><img class="img" src="http://image2.megabox.co.kr/mop/poster/2018/3F/B842DD-6816-4D7C-9EC8-87748E12D56B.large.jpg" /></div>'+
						 			'<div class="back">'+
							    		'<div class="star-rating2" style="float:left;">'+
											'<span style="width:20%;"></span>'+
										'</div>'+
										'<p >괜히봤네요</p>'+
										'<span class="bg"></span>'+
									'</div>'+
					 			'</div>'+
					 			'<div class="title" title="하이큐!! 콘셉트의 싸움"><h3>하이큐!! 콘셉트의 싸움</h3></div>'+
					 			'<div class="infoBtn" >'+
					 				'<a  class="btn detail_btn" href="#" >상세정보</a>'+
					 				'<a  class="btn reserveBtn" href="#">예매하기</a>'+
					 				'<input type="hidden" class="openday" value="2018.01.11" />'+
		 							'<input type="hidden" class="director" value="미츠나카 스스무" />'+
		 							'<input type="hidden" class="actors" value="-" />'+
		 							'<input type="hidden" class="still1" value="http://image2.megabox.co.kr/mop/poster/2018/3F/B842DD-6816-4D7C-9EC8-87748E12D56B.large.jpg" />'+
		 							'<input type="hidden" class="still2" value="http://image2.megabox.co.kr/mop/still/2018/49/67D285-BA49-4966-808D-6E1655FE74AC.large.jpg" />'+
		 							'<input type="hidden" class="still3" value="http://image2.megabox.co.kr/mop/still/2018/E2/398BB9-09B7-444E-BD8A-5860F90630DE.large.jpg" />'+
		 							'<input type="hidden" class="still4" value="http://image2.megabox.co.kr/mop/still/2018/2D/21D5AB-A504-4CF4-8E5D-104D08C8C38A.large.jpg" />'+
					 			'</div>'+
					 		'</li>';
		 		$(this).before(tag1,tag2,tag3,tag4);
		 		$("html,body").animate({
					scrollTop : $(document).height() - $(window).height()
				}, 300)
				$(this).hide();
			})
			
			/*
				6. 두번째 탭 기능 구현(카드뒤집기)
					(1) 클래스 thumb_flip 태그에 마우스 오버 시, 
							자기자신에 flipped 클래스 토글 적용

					(2) 클래스 thumb_flip 태그에 마우스 아웃 시, 
							자기자신에 flipped 클래스 토글 적용
			        ※ 탭1에 더보기 후 mouseover 시, flip 되지 않는 이유는 동적으로 생성된 태그이기 때문
			           그러므로 on 이벤트를 적용하여 문제해결
			*/
			$(document).on("mouseover",".thumb_flip",function(){
			//$(".thumb_flip").mouseover(function(){
				$(this).toggleClass("flipped");	
			});
			$(document).on("mouseout",".thumb_flip",function(){
			//$(".thumb_flip").mouseout(function(){
				$(this).toggleClass("flipped");	
			})

			/*
				7. 세번째 탭 - 무한스크롤기능 및 우측하단에 존재하는 아이콘 숨기고 나타내기

					(1) 무한스크롤 
						클래스 tabcontent 태그 중 3번째 태그의 display css 상태값을 획득하여 변수에 담는다
						조건1 . display 상태가 block이고 + ($(window).scrollTop() == $(document).height() - $(window).height())
							   두개의 조건이 모두 true일 경우 아래와 같은 기능을 실행한다.

							   1. 클래스 tabcontent 태그 중 3번째 태그안에 존재하는 자손태그 중,  class명이 item인 첫번째 태그의 html값을 획득하여 변수에 담는다
							   2. 1.에서 구한 값을 '<li class="item">'+1변수+'</li>'; 와 같이 감싸서 새로운 변수에 담는다.
							      li 태그 + class item을 추가로 감싸주는 이유는? 
							      1.에서 구한 html내용은 li태그를 포함한 html내용을 가져오는 것이 아니라 li태그안에 존재하는 html 태그만을 가져오기때문
							   3. class tabcontent 태그 중 3번째 태그의 직속자식태그인 ul태그에 2.에 담겨있는 변수를 4번 삽입한다(위치확인필요)

					(2) 우측하단 아이콘 숨기고 보여주기
						조건1 . 자신의 scrollTop()상태가 0보다 크면
							클래스 iconbutton 태그를 나타낸다
						조건2. 그외에는
							클래스 iconbutton 태그를 숨긴다
			*/

			// page 변수의 역할 : 영화 정보를 서버로부터 불러올때 게시판 페이지처럼  페이지번호를 담기위한 임의의 변수정의
			var page = 1;
			$(window).scroll(function(e) {
				// 최상위에 올라갔을 경우
				if($(this).scrollTop() > 0) {
					//아이콘 show
					$(".iconbutton").fadeIn();
				}
				// 기타
				else {
					//아이콘 hide
					$(".iconbutton").fadeOut();
				}
				/**
					무한스크롤 영화 더보기 기능
				*/
				var display = $(".tabcontent:eq(2)").css("display");
				/**
					탭중에서 3번째 탭이 무한스크롤에 해당되므로 해당 display 속성이 block 상태인지 체크 후, 서버 호출
				*/

				if(display == "block") {
					// 아래 조건에 해당되는 계산식은 브라우저 스크롤이 맨하단에 도착했는지 체크하기 위한 계산공식이다 추가로 3번째 탭의 숨어있는 "데이터불러오는중... " 버튼의 상태도 체크해야함
					// 해당 버튼이 상태는 현재 서버로부터 데이터를 받아오는 대기상태이기 때문에 해당 조건이 빠질 경우 무한정 서버에 호출을 하게 될것임
					if ((Math.ceil($(window).scrollTop()) >= $(document).height() - $(window).height()) && ($(".infinityDisplay").css("display") == "none")) {
						// 호출전 로딩버튼 보여줌 (더이상의 서버 호출을 막는다)
						$(".infinityDisplay").show();

						// 서버 api 호출 (아래 url 속성에 해당되는 주소값은 영화 목록을 불러오는 api 주소다)
						$.ajax({ 
							url :  "https://yts.am/api/v2/list_movies.json",
							dataType : "json",
							data : {"limit" : 4,"page" : page, "sort_by" : "download_count"},
							success : function(res){
								// 서버로 부터 데이터를 완료하면 동작되는 콜백함수 영역
								// page 변수를 1 증가 이유는 순차적으로 1페이지, 2페이지... 이어서 한화면에 표출해주기 위함
								page++;
								// 서버 통신이 완료되면 로딩버튼을 숨겨서 다음 페이지 호출이 가능하게 처리
								$(".infinityDisplay").hide();

								// e.keyCode 처럼 res 자체에 다양한 정보가 존재하지만, 우리가 필요한 값만 선택하여 변수에 담는다.
								// console.log(res);로 모든 결과값 확인 가능
								var list = res.data.movies;

								// 서버로 내려온 영화 목록은 한번에 4개를 내려주므로 each문을 통해서 각 아이템에 영화정보를 설정한다
								var tag = "";
								$.each(list,function(index,data){
									var image = data.medium_cover_image;
									var title = data.title;
									var rating = data.rating * 10;
									tag = '<li class="item">'+
								 			'<div class="thumb_flip">'+
									 			'<div class="front"><img class="img" src="'+image+'" /></div>'+
									 			'<div class="back">'+
										    		'<div class="star-rating2" style="float:left;">'+
														'<span style="width:'+rating+'%;"></span>'+
													'</div>'+
													'<p >괜히봤네요</p>'+
													'<span class="bg"></span>'+
												'</div>'+
								 			'</div>'+
								 			'<div class="title" title="'+title+'"><h3>'+title+'</h3></div>'+
								 			'<div class="infoBtn" >'+
								 				'<a  class="btn detail_btn" href="#" >상세정보</a>'+
								 				'<a  class="btn reserveBtn" href="#">예매하기</a>'+
								 			'</div>'+
								 		'</li>';
								 		// 설정된 영화정보는 추가시켜준다
								 		$(".tabcontent:eq(2) ul").append(tag);
								})
							}
						});
					}					
				}
			});

			/*
				8. 네번째 탭 - 어코디언 효과
				조건 - 자신이 가지고 있는 클래스 중, show가 존재하지 않을 경우
					클래스 accordion-toggle 태그에 show 클래스 제거
					자신에 show 클래스 추가

					클래스 panel-collapse 숨기면서 open 클래스 제거
					자신의 다음태그를 보여주면서 open 클래스 추가
			*/
			$(".accordion-toggle").click(function(e){
				e.preventDefault();
				if(!$(this).hasClass("show")) {
					// 타이틀 포커스
					$(".accordion-toggle").removeClass("show");
					$(this).addClass("show");

					$(".panel-collapse").slideUp().removeClass("open");
					$(this).next().slideDown().addClass("open");
				}
			})

			
			/*
				9. 상세정보 클릭

				클릭한 영화 관련정보 셋팅
					(1)자신으로부터 부모태그중 class item태그를 찾을때까지 올라가서 자손 class img태그의 속성값 src값을 구해서 변수에담는다
					(2)자신의 부모태그를 찾고 이전태그를 찾고 자식태그 중 h3태그의 html내용을 얻어서 변수에 담는다
					(3)자신의 부모태그를 찾고 자식 중 openday 클래스가 존재하는 태그의 value 값을 얻어서 변수에 담는다
					(4)자신의 부모태그를 찾고 자식 중 director 클래스가 존재하는 태그의 value 값을 얻어서 변수에 담는다
					(5)자신의 부모태그를 찾고 자식 중 actors 클래스가 존재하는 태그의 value 값을 얻어서 변수에 담는다

					(6)자신의 부모태그를 찾고 still1 클래스가 존재하는 태그의 value 값을 얻어서 변수에 담는다
					(7)자신의 부모태그를 찾고 still2 클래스가 존재하는 태그의 value 값을 얻어서 변수에 담는다
					(8)자신의 부모태그를 찾고 still3 클래스가 존재하는 태그의 value 값을 얻어서 변수에 담는다
					(9)자신의 부모태그를 찾고 still4 클래스가 존재하는 태그의 value 값을 얻어서 변수에 담는다

					클래스가 modal_movie_img 태그에 (1) 에 구한 경로값을 설정한다
					id가 movie_title 태그에 (2)에 구한 내용을 설정한다
					id가 openDay 태그에 (3)에서 구한 내용을 설정한다
					id가 director 태그에 (4)에서 구한 내용을 설정한다
					id가 actors 태그에 (5)에서 구한 태그를 설정한다

					modal 클래스의 자손 태그 중, stillLi 클래스인 태그를 찾아서 on 클래스를 제거한다
					modal 클래스의 자손 태그 중, 첫번째 stillLi 클래스인 태그의 img 자식태그의 src 값을 (6)에서 구한 값으로 변경한다
					modal 클래스의 자손 태그 중, 두번째 stillLi 클래스인 태그의 img 자식태그의 src 값을 (7)에서 구한 값으로 변경한다
					modal 클래스의 자손 태그 중, 세번째 stillLi 클래스인 태그의 img 자식태그의 src 값을 (8)에서 구한 값으로 변경한다
					modal 클래스의 자손 태그 중, 네번째 stillLi 클래스인 태그의 img 자식태그의 src 값을 (9)에서 구한 값으로 변경한다

					modal 클래스의 자손 중 still_img 클래스를 찾고 그 자식 img 태그를 탐색 후, src 속성을 (6)에서 구한 값으로 변경한다
					modal 클래스를 보여준다
			*/
			$(".tabcontent").on("click",".detail_btn",function(e){
				e.preventDefault();
				/*
					클릭한 영화 관련정보 셋팅
				*/
				var movie_img = $(this).closest(".item").find(".img").attr("src");
				var movie_title = $(this).parent().prev().children("h3").html();
				var openday = $(this).parent().children(".openday").val();
		 		var director = $(this).parent().children(".director").val();
		 		var actors = $(this).parent().children(".actors").val();

		 		var still1 = $(this).parent().children(".still1").val();
		 		var still2 = $(this).parent().children(".still2").val();
		 		var still3 = $(this).parent().children(".still3").val();
		 		var still4 = $(this).parent().children(".still4").val();

				$(".modal_movie_img").attr("src",movie_img);
				$("#movie_title").html(movie_title);
				$("#openDay").html(openday);
				$("#director").html(director);
				$("#actors").html(actors);

				$(".modal .still_slide  li.stillLi").removeClass("on");
				$(".modal .still_slide  li.stillLi").eq(0).addClass("on");
				$(".modal .still_slide  li.stillLi").eq(0).children("img").attr("src",still1);
				$(".modal .still_slide  li.stillLi").eq(1).children("img").attr("src",still2);
				$(".modal .still_slide  li.stillLi").eq(2).children("img").attr("src",still3);
				$(".modal .still_slide  li.stillLi").eq(3).children("img").attr("src",still4);

				$(".modal .still_img > img").attr("src",still1);
				$(".modal").fadeIn();
				// 댓글 목록을 초기화
				$("#movieCommentList > ul.item").empty();
			});    
			/*
				10. 모달닫기 클릭
				클래스 modal 을 숨긴다
			*/
			$(".close").click(function(){
				$(".modal").fadeOut();
			})

			/*
				11. 스틸이미지 클릭시, 해당 이미지 메인 이미지로 적용
				(1)class modal의 stillLi 클래스 자손 태그를 탐색 후, on 클래스 제거
			 	(2)자신에게 on 클래스 추가
			 	(3)자신의 자식태그 중 img 태그를 탐색 후, src 속성 값을 획득
			 	(4)클래스 modal의 자손 중 클래스 still_img 태그 탐색 후, 자식 img 태그를 탐색하고 숨긴다 + src 속성의 값을 (3)에서 구한 값으로 변경 후, 보여준다
			*/
			$(".modal .still_slide  li.stillLi").click(function(){
				$(".modal .still_slide  li.stillLi").removeClass("on");
				$(this).addClass("on");

				var src = $(this).children("img").attr("src");
				$(".modal .still_img > img").hide().attr("src",src).fadeIn();
			})
			/*
				12. 저장버튼 클릭하여 댓글 목록 삽입
				(1) 아이디 content 태그의 value 값을 가져와서 변수에 담는다
				(2) 조건 (1)에서 구한 값이 빈값이면 alert("댓글을 입력하세요");경고창 띄우고 return 으로 막는다
				(3) tag 변수에 담기 내용의 일부를 (1)에서 구한 변수로 변경해준다
				(4) id movieCommentList의 자식인 ul 태그에 (3) 문자태그 변수를 삽입한다(최신등록순으로) 
					- 삽입함수는 어떤걸 사용해야하나?
				(5) id movieCommentList 의 자손 li 태그를 탐색 후, 길이(length)를 구해서 변수에 담는다
				(6) (5)에서 구한 변수를 id movieCommentTotalCount 태그안에 내용으로 덮어씌운다
				(7) id content 태그를 빈값으로 적용 후, forcus() 함수를 추가 적용
			*/
			$("#saveBtn").click(function(){
				var content = $("#content").val();
				if(content =="") {
					alert("댓글을 입력하세요");
					return;
				}
				else {
					var tag = '<li>'+
								'<div class="photo_profile">'+
									'<img src="http://image2.megabox.co.kr/mop/home/user/profile_m.png" alt="interpret** 프로필사진 없음">'+
								'</div>'+
								'<div class="text">'+
									'<div class="name">'+
										'<strong>리메*</strong>'+
										'<span>17.10.28</span>'+
									'</div>'+
									'<p>'+
										'<span class="comment">'+content+'</span>'+
									'</p>'+
								'</div>'+
							'</li>';

					$("#movieCommentList > ul.item").prepend(tag);
					var size = $("#movieCommentList > ul.item > li").length;
					$("#movieCommentTotalCount").html(size)
					$("#content").val("").focus();
				}
			})


			/*
				13. 예매버튼 클릭
				(1)자신의 부모태그의 이전태그안에 존재하는 h3 자식태그의 내용을 가져온다
				(2)id reserveMovieName 태그에 (1)에서 구한 내용을 설정한다
				(3)자신으로부터 클래스 item인 조상태그를 탐색 후, 클래스 front의 자식인 클래스 img 태그의 src 속성을 획득하여 변수에 담는다
				(4)id reserveStillImg 태그의 src 속성값을 (3)에서 구한 값으로 변경
				(5)클래스 modal2 태그를 보여준다
			*/
			$(".tabcontent").on("click",".reserveBtn",function(e){
				e.preventDefault();

				var movieName = $(this).parent().prev().children("h3").html()
				$("#reserveMovieName").html(movieName);

		 		var movieImage = $(this).closest("li.item").find(".front > .img").attr("src")	
				$("#reserveStillImg").attr("src",movieImage)

				$(".modal2").fadeIn();

				// 예약관련 초기화
				$(".reserveCnt").html(0);
				$("#ticketTotalPrice").html(0);
				$(".modal2 td").removeClass("over");
			});

			/*
				14. 예매모달 닫기
				클래스 modal2 태그를 숨긴다
			*/
			$(".close2").click(function(){
				$(".modal2").fadeOut();
			})

			/*
				15. 추가버튼 클릭
				(1) 연령별 금액 획득 - 자신의 부모를 찾아서 직속자식인 첫번째 label 태그의 data 속성의 값을 획득하여 변수에 담는다 - 숫자변환 필요
				(2) 예약인원수 획득 -  자신의 부모를 찾아서 직속자식인 class reserveCnt 태그의 내용을 획득하여 변수에 담는다 - 숫자변환 필요
				(3) (2)에서 구한 변수를 1 증가 시킨 후 다시 (2)에서 구한 변수에 재대입(누적개념)
				(4) 자신의 부모를 찾아서 class reserveCnt 태그에 (3)의 변수를 내용으로 적용한다
				(5) 총액 1단계 - id ticketTotalPrice의 내용을 획득하여 변수에 담는다
				(6) 총액 2단계 - uncomma함수를 호출 후 (5)에서 구한 변수를 입력값으로 넣어주고 다시 변수에 재대입
				(7) 총액 3단계 - (6)에서 구한 값을 숫자로 변환해주고 다시 변수에 재대입
				(8) (1)과 (7) 에서 구한 변수를 더한 결과값을 아이디 ticketTotalPrice 태그의 내용으로 적용한다
				     선택기능 - 3자리 콤마를 적용하기 위해서는 comma 함수를 호출하여 (8)에서 구한 (1)과 (7) 을 더한 결과를 입력값으로 넣어준 후,
				     return 값을 아이디 ticketTotalPrice 태그의 내용으로 적용한다
			*/ 
			$(".modal2 .plus").click(function(){
				var price = Number($(this).parent().children("label:eq(0)").attr("data"));
				var cnt = Number($(this).parent().children(".reserveCnt").html());
				cnt = cnt + 1; 
				$(this).parent().children(".reserveCnt").html(cnt);
				var total = Number(uncomma($("#ticketTotalPrice").html()));
				$("#ticketTotalPrice").html(comma(total + price));
			})
			/*
				16. 빼기버튼 클릭
				(1) 연령별 금액 획득 - 자신의 부모를 찾아서 직속자식인 첫번째 label 태그의 data 속성의 값을 획득하여 변수에 담는다 - 숫자변환 필요
				(2) 예약인원수 획득 -  자신의 부모를 찾아서 직속자식인 class reserveCnt 태그의 내용을 획득하여 변수에 담는다 - 숫자변환 필요

				    조건문 추가 - (2)에서 구한 인원수가 0일경우 return으로 다음 줄의 명령어들을 실행시키지 못하게 막아준다
				    조건문을 주지 않게되는 경우 - -1.-2 등의 음수 인원이 생기므로 막아주어야 함

				(3) (2)에서 구한 변수를 1 감소 시킨 후 다시 (2)에서 구한 변수에 재대입(누적개념)
				(4) 자신의 부모를 찾아서 class reserveCnt 태그에 (3)의 변수를 내용으로 적용한다
				(5) 총액 1단계 - id ticketTotalPrice의 내용을 획득하여 변수에 담는다
				(6) 총액 2단계 - uncomma함수를 호출 후 (5)에서 구한 변수를 입력값으로 넣어주고 다시 변수에 재대입
				(7) 총액 3단계 - (6)에서 구한 값을 숫자로 변환해주고 다시 변수에 재대입
				(8) (1)과 (7) 에서 구한 변수를 뺀 결과값을 아이디 ticketTotalPrice 태그의 내용으로 적용한다
				     선택기능 - 3자리 콤마를 적용하기 위해서는 comma 함수를 호출하여 (8)에서 구한 (1)과 (7) 을 뺀 결과를 입력값으로 넣어준 후,
				     return 값을 아이디 ticketTotalPrice 태그의 내용으로 적용한다
			*/
			$(".modal2 .minus").click(function(){
				var price = Number($(this).parent().children("label:eq(0)").attr("data"));
				var cnt = Number($(this).parent().children(".reserveCnt").html());
				if(cnt == 0) {
					return;
				}
				cnt = cnt - 1; 
				$(this).parent().children(".reserveCnt").html(cnt);
				var total = Number(uncomma($("#ticketTotalPrice").html()));
				$("#ticketTotalPrice").html(comma(total - price));
			})
			/*
				17. 예매화면 선택
				(1)0을 변수에 담는다
				(2)클래스 reserveCnt 첫번째 태그의 내용을 가져와서 숫자로 변환 후 (1)에 변수에 누적시킨다
				(3)클래스 reserveCnt 두번째 태그의 내용을 가져와서 숫자로 변환 후 (1)에 변수에 누적시킨다
				(4)클래스 reserveCnt 세번째 태그의 내용을 가져와서 숫자로 변환 후 (1)에 변수에 누적시킨다
				(5)클릭한 자기자신의 index값을 구하여 변수에 담는다
				조건 - 예약인원이 0보다 클 경우
					서브조건 - 클래스 modal2의 class over 태그의 갯수가 예약인원보다 적을 경우
						클래스 modal2의 td 중 (5)에서 구한 index태그를 toggleClass함수를 이용하여 over 클래스를 추가/제거한다
					그외에는
						서브조건 - 클래스 modal2 의 자손 td 태그 중 (5)에 해당되는 태그에서 over 클래스가 있으면
							클래스 modal2 태그의 (5)에 해당되는 태그에 over클래스 삭제
				그외
					서브조건 - class modal2 의 자손중 td 태그 중 (5)에서 구한 index 태그 중 over 클래스가 존재하면
						class modal2 태그의 자손 td 태그 중 (5)에서 구한 index 태그에 over 클래스 제거
			*/
			$(".modal2 td").click(function(){
				// 어른,청소년,어린이에 대한 토탈 x명을 구한다
				var reserveCnt = 0;
				reserveCnt += parseInt($(".reserveCnt:eq(0)").text());
				reserveCnt += parseInt($(".reserveCnt:eq(1)").text());
				reserveCnt += parseInt($(".reserveCnt:eq(2)").text());
				
				// 클릭한 좌석에 대한 index 값을 구한다
				var index = $(".modal2 td").index(this);
				// 총 인원이 1명 이상일 경우,
				if(reserveCnt > 0) {
					// 선택되어있는 좌석의 수보다 예약인원수가 클 경우
					if($(".modal2 td.over").length < reserveCnt){
						// td에 over클래스에 대한 addClass/removeClass 토글기능 적용
						$(".modal2 td").eq(index).toggleClass("over");
					}
					// 그외에는
					else {
						// 클릭한 좌석에 over클래스가 적용되어있을 경우
						if($(".modal2 td").eq(index).hasClass("over")) {
							// over클래스 삭제(좌석예약 취소)
							$(".modal2 td").eq(index).removeClass("over");
						}
						// 기타는 존재하지 않는다
					}
				}
				else {
					if($(".modal2 td").eq(index).hasClass("over")){
						$(".modal2 td").eq(index).removeClass("over");
					}
				}
			})

			/**
				18. 별점 플러그인 적용
				    rateYo 플러그인은 단순히 $("셀렉터").rateYo() 만 호출하여도 기본 기능이 동작된다
				    내부 옵션으로 onChange 함수를 준 이유는 각 별점별 문구 변화를 주기 위함
				    우리가 실습했던 혈압 및 성적(수우미양가) 출력하는 방식을 떠올리자
			*/
			$(".star-rating").rateYo({
				   // mousemove 이벤트 발생, 첫번째 score 의 값으로 점수를 매길 수 있다
			        onChange: function (score, rateYoInstance) {
			        	// 점수에 따라 문자를 변경해준다
			        	var txt = "";
			        	if(score == 0) {
							txt = "평점을 입력해주세요";
						}
						else if(score > 0 && score <= 1) {
							txt = "괜히봤어요";
						}
						else if(score > 1 && score <= 2) {
							txt = "기대하진 말아요";
						}
						else if(score > 2 && score <= 3) {
							txt = "무난했어요";
						}
						else if(score > 3 && score <= 4) {
							txt = "기대해도 좋아요!";
						}
						else if(score > 4) {
							txt = "너무 멋진 영화였어요!";
						}
			        	$("#movieDetailStarScoreTxt").text(txt);
			        }
			  });

				/**
					=============== 19. sample 서버통신 예제 ===============
					vimeo 영상을 수집하여 간단한 플레이어 연동
				*/

				// 임의의 재생목록 
				var playList = [217149636,230719025,246375705,113334088];
				var player;

				var options = {
			        id: playList[0],
			        width: 640,
			        loop : true
			    };

			    // 아래 선언은 vimeo 플레이어 호출을 위한 필수 + 상단 include 한 js 파일이 기존에 존재하여야 사용가능
			    player = new Vimeo.Player('vimeo_payer', options);


				$.each(playList,function(index,data){
					$.ajax({ 
						url :  "http://vimeo.com/api/v2/video/" + data +".json",
						dataType : "jsonp",
						success : function(res){
							if((res != undefined) && (res != null) && (res.length > 0)) {
								res = res[0];
								var src = res['thumbnail_medium'];
								var list = $(".tabcontent").eq(4).find("li.stillLi").eq(index);
								list.find("img").attr("src",src)
							}
						}
					});	
				})
				/**
					서버에서 데이터를 받아온 비메오 썸네일을 각 클릭시,
					플레이어에 비디오 영상 변경
				*/
				$(".tabcontent:eq(4) li.stillLi").click(function(){
					$(this).siblings().removeClass("on");
					$(this).addClass("on");
					var index = $(".tabcontent:eq(4) li.stillLi").index(this);
					// 아래 함수는 vimeo api 에서 제공하는 플레이어 재생 함수
					player.loadVideo(playList[index])
				})
	});
});
