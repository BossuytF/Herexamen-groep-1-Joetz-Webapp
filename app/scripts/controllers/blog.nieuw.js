'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('NieuwBlogCtrl', ['blogService', '$mdToast', function (blogService, $mdToast) {

			var nieuwBlog = this;
			
			nieuwBlog.blog = {
				titel : '',
				tekst: '', 
				foto: ''
			};

			function nieuwBlogs(){
				blogService.create(nieuwBlog.blog).then(function(response){
					$mdToast.show(toastAanmaken);
					$state.go('home')
				});
			}
			nieuwBlog.nieuwBlogs = nieuwBlogs;
			
			var toastAanmaken = $mdToast.simple()
				.textContent('Artikel werd succesvol aangemaakt')
				.position('start')
				.capsule(true);
				
			nieuwBlog.invullen = function(){
				nieuwBlog.blog.foto = 'http://blog.joetz.be/wp-content/uploads/top_geaRRR_01-1-e1469626882275.jpg';
				nieuwBlog.blog.titel = 'TOP GEARRR 07/08 – 13/08/2016'; 
				nieuwBlog.blog.tekst = '<p><span id="selectionBoundary_1472591650965_0068569348904263805" class="rangySelectionBoundary">&#65279;</span><span id="selectionBoundary_1472591642775_556915623104578" class="rangySelectionBoundary">&#65279;</span></p><p><br/></p><p><br/></p><!--StartFragment--><p style="text-align: justify;font-size: 16px;"><strong>Roeien, roeien … trek aan de riemen dan gaan we vooruit!</strong></p><p style="text-align: justify;font-size: 16px;">Er is er (weeral) één jarig, hoera, hoera!!!<br/>Deze keer is het de beurt aan één van onze monitors. Ze wordt dan ook in de bloemetjes gezet.</p><p style="text-align: justify;font-size: 16px;">Voor vandaag in de rugzak: zwembroek, reserve kleren en een handdoekje want we gaan het water op!<br/>We varen met de kano de Dijle af tot in Muizen waar we onze boterhammen opeten.<br/>Terugkeren doen we niet te voet maar we proberen iets nieuws uit: de kickbike of fietsstep.</p><p style="text-align: justify;font-size: 16px;"><img class="lazy alignnone size-medium wp-image-4698" src="http://blog.joetz.be/wp-content/uploads/14012408_1186686774686265_975875720_o-320x427.jpg" alt="14012408_1186686774686265_975875720_o" width="320" height="427" style="text-align: center;"/></p><p style="text-align: justify;font-size: 16px;">Na veel inspanning volgt ontspanning.<br/>Fris gewassen en netjes gekleed treedt iedereen aan voor het afscheidsfeest (tevens verjaardagfuif).<br/>Samen feesten als afsluiter van een fijne vakantie. Morgen staan de ouders terug aan de poort!<br/>De monitoren willen alvast kwijt dat ze het een leuke periode met een heel toffe groep vonden!!! En we zeggen u geen vaarwel…</p><hr style="font-size: 16px;"/><p style="text-align: justify;font-size: 16px;"><strong>Karten</strong> <strong>met</strong> <strong>Mario</strong>!</p><p style="text-align: justify;font-size: 16px;">Vandaag richting stad om in het station een groot spel te spelen met enkele knotsgekke opdrachtjes zoals de polonaise!<br/>Voor het middagmaal geen gewoon lunchpakket maar wel voor ieder wat wils uit de broodjeszaak. Smullen!</p><p style="text-align: justify;font-size: 16px;"><img class="lazy alignnone size-medium wp-image-4675" src="http://blog.joetz.be/wp-content/uploads/14017679_1149180591808890_284019090_n-320x240.jpg" alt="14017679_1149180591808890_284019090_n" width="320" height="240" style="text-align: center;"/></p><p style="text-align: justify;font-size: 16px;">In de namiddag was iedereen erg enthousiast over de bestemming… <strong>de kartingbaan</strong>!<br/>Al onze kampioenen scheurden door de bochten…  vlamden over de finish!</p><p style="text-align: justify;font-size: 16px;">Na enkele vermoeiende dagen was het tijd voor een rustgevende filmavond met een lekker bakje popcorn #verwendag.<br/>Op naar onze laatste volle dag!!</p><!--EndFragment--><p><br/></p><p><br/></p>'
			}


		}
	]);