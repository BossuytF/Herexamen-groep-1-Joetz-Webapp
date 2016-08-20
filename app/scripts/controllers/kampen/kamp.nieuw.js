'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:NieuwkampCtrl
 * @description
 * # NieuwkampCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('NieuwkampCtrl', ['KampenService', '$stateParams', '$state', '$mdToast', '$mdDialog', '$timeout', '$q', '$log',
		function (KampenService, $stateParams, $state, $mdToast, $mdDialog, $timeout, $q, $log) {
			var nieuwKamp = this;

			nieuwKamp.simulateQuery = false;
			nieuwKamp.isDisabled = false;
			nieuwKamp.repos = loadAll();
			nieuwKamp.querySearch = querySearch;
			nieuwKamp.selectedItemChange = selectedItemChange;
			nieuwKamp.searchTextChange = searchTextChange;

			function querySearch(query) {
				var results = query ? nieuwKamp.repos.filter(createFilterFor(query)) : nieuwKamp.repos,
				deferred;
				if (nieuwKamp.simulateQuery) {
					deferred = $q.defer();
					$timeout(function () {
						deferred.resolve(results);
					}, Math.random() * 1000, false);
					return deferred.promise;
				} else {
					return results;
				}
			}

			function searchTextChange(text) {
				$log.info('Text changed to ' + text);
			}

			function selectedItemChange(item) {
				nieuwKamp.kamp.sfeerfoto = item.url;
			}

			function createFilterFor(query) {
				var lowercaseQuery = angular.lowercase(query);
				return function filterFn(item) {
					return (item.value.indexOf(lowercaseQuery) === 0);
				};
			}

			nieuwKamp.dateToday = new Date();

			isEdit();

			nieuwKamp.kamp = {
				naam : '',
				omschrijving : '',
				startDatum : undefined,
				eindDatum : undefined,
				aantalDagen : '6',
				aantalNachten : '7',
				vervoer : '',
				prijs : '',
				inbegrepenInPrijs : '',
				maxLeeftijd : '',
				minLeeftijd : '',
				maxDeelnemers : '',
				contact : '',
				sfeerfoto : '',
				straat : '',
				huisnummer : '',
				bus : '',
				gemeente : '',
				postcode : ''
			};

			function isEdit() {
				if ($state.includes('editKamp')) {
					KampenService.get($stateParams.kampId).then(function (response) {
						nieuwKamp.kamp = response.data;
						nieuwKamp.kamp.straat = response.data.adres.straat;
						nieuwKamp.kamp.huisnummer = response.data.adres.huisnummer;
						nieuwKamp.kamp.bus = response.data.adres.bus;
						nieuwKamp.kamp.gemeente = response.data.adres.gemeente;
						nieuwKamp.kamp.postcode = response.data.adres.postcode;
						nieuwKamp.kamp.startDatum = new Date(response.data.startDatum)
							nieuwKamp.kamp.eindDatum = new Date(response.data.eindDatum)
					});
				};
			}

			function invullen() {
				nieuwKamp.kamp.naam = 'Actievakantie';
				nieuwKamp.kamp.omschrijving = 'Durf jij het aan om samen met je nieuwe vrienden tot het uiterste te gaan? Wil je je grootste angsten overwinnen? In de avontuurlijke omgeving van Vieuxville trotseren we de grootste uitdagingen. Samen met ons professioneel actieteam plaatsen we activiteiten zoals deathride, rotsklimmen, rappel, kajak … op het programma. Hebben deze activiteiten voor jou geen geheimen? Kies dan zeker voor deze actievakantie. Onze activiteiten zijn aangepast aan de leeftijd van de deelnemers.',
				nieuwKamp.kamp.startDatum = new Date('jul 19, 2017');
				nieuwKamp.kamp.eindDatum = new Date('jul 26, 2017');
				nieuwKamp.kamp.aantalDagen = '6';
				nieuwKamp.kamp.aantalNachten = '7';
				nieuwKamp.kamp.vervoer = 'busVervoer';
				nieuwKamp.kamp.prijs = '311';
				nieuwKamp.kamp.inbegrepenInPrijs = 'Heen- en terugreis per autocar ,Verblijf in volpension, drank bij de maaltijden,  Dagelijks vieruurtje,  Begeleiding door ervaren, gebrevetteerde monitoren  , Volledig animatiepakket incl. spelmateriaal , Ongevallenverzekering';
				nieuwKamp.kamp.maxLeeftijd = '15';
				nieuwKamp.kamp.minLeeftijd = '11';
				nieuwKamp.kamp.maxDeelnemers = '20';
				nieuwKamp.kamp.contact = 'joetz.west@joetz.be';
				nieuwKamp.kamp.sfeerfoto = 'https://lh3.googleusercontent.com/psGXb3UGasBYC7CYg3Aj30kr9QkBv2Fy1xZjXPL1nLpwIMSkeI8_YJqT4Jmuqx_3L48S6zYwbRaQQdkFlKXY_j2gN9XOK7xPN66Ks3SPeMesWOqGJ7Jqb3lutcaaKXz7bkN-TzauTV6OUucUQtKShYG3KYuGEylZKYmIQqLKFeh-pRsT7EIV335gaU7pDyhkdXNNUlRB2M-xDh7nRhI0tmtAKw0d_MNJWAFOkfJB0pkmU32PoyvUiDyOZmLIY7Rf77mDgWxP4Fa50BVFpPFCXeFsDyf0WWrpuUXmCunmWLQB_v5IoCNynJy5RUAdz-j8JPAL0XSeq3DSEu4_nJrU0pqEWym88GGX6HNQCRFUwXQ0r8t6NPOWfnr8p2hQ9IBR_kfer4lRomL22rcKHYFVCsdhAx5PD3vMYMMFBoO_OJIiip_B0By0ddMzxw5G9pKa1QoZk1JjHGP0q7JHO2y0ge3aqpvn71g9m1ywUSY5V6ss0Ln9t5G287KV9aZ-mw6XIIFQDavmaJy3EqrJQjS_kw_WG9xwdfn96_x54RZFVU7ezW5GUn1m37ky0jmrid_705daBR2_l4AAWogWVPZVPnzJV5VvymM=w1263-h947-no';
				nieuwKamp.kamp.straat = 'Domain de la palogne';
				nieuwKamp.kamp.huisnummer = '5';
				nieuwKamp.kamp.bus = '';
				nieuwKamp.kamp.gemeente = 'Vieuxville';
				nieuwKamp.kamp.postcode = '9000'
			};

			function submitKamp() {
				if ($state.includes('nieuwKamp')) {
					KampenService.create(nieuwKamp.kamp).then(function (response) {
						$mdToast.show(toastAanmaken);
						$state.go('kampen');
					});
				} else if ($state.includes('editKamp')) {
					$mdDialog.show(confirm).then(function () {
						KampenService.update(nieuwKamp.kamp, $stateParams.kampId).then(function (response) {});
						KampenService.updateAdres(nieuwKamp.kamp, $stateParams.kampId).then(function (response) {
							$mdToast.show(toastAanpassen);
							$state.go('kampen')
						});
					});
				}
			}

			var confirm = $mdDialog.confirm()
				.title('Pas op!')
				.textContent('Wenst u deze wijzigingen op te slaan?')
				.ariaLabel('Pas op')
				.targetEvent()
				.ok('Ja')
				.cancel('Nee');

			var toastAanpassen = $mdToast.simple()
				.textContent('Kamp werd succesvol aangepast')
				.position('start')
				.capsule(true);

			var toastAanmaken = $mdToast.simple()
				.textContent('Kamp werd succesvol aangemaakt')
				.position('start')
				.capsule(true);

			nieuwKamp.submitKamp = submitKamp;

			nieuwKamp.fotos = [{
					name : 'BLABLABLA',
					url : 'https://lh3.googleusercontent.com/5A_7CpFAB0CtPClxfSguoQb6MGWunsEp6lmVzHOtVlwl_NrROeQddQ07o8aTre5Mwr9Ia6OcdAm2QS_Zs0ambfwt35flpQ-VcSanV9yZzpJ1zddPurp5B7BXbDY3s-dBD-4oTqcBWFaQd7-w-tDy3JHj679alZHe7lIgXZO7IPY2dTZwxznln_XYbAJmrBBLwbQOQ6Eeu2CdNfIcqBhcqgkpEHrJhV-P_IZwCNDeDfZVcmvGfir8LHcq3blX6ENFSAflFXkEFyHHYOHsKAuesC_kGYqT1tYfTbKDm2Ejw-UeTdbOyF-pUpnFnRhkkShzLO2Jx6RpZ0trn_vO6mUcZ_3At64AeQZqxkMC2uBIFe1E8bVOItEHGM8Qehokem--2TGef5k2Ff_ruKvRUzJJMgVrSEF8GZDd5sQLLMgt5v0wyzzo93n6RORsepjNzKYdh-dJUm18lxySdPSN_q-zhjL-igiWPeO-n2wzSHbzCKC0j5Sa3iyNZNYzU5FQUZwm7ZT6QeDlLGnyhziVqKZrLSszyqmo2Qe_nwjX8BDnzsSsErm-QPixNC1UugQH1vFedGkkB258W1iDry7gHsuqCGsqx5CwQZc=w958-h719-no'
				}
			];

			function loadAll() {
				var repos = [{
						name : 'BLABLABLA',
						url : 'https://lh3.googleusercontent.com/5A_7CpFAB0CtPClxfSguoQb6MGWunsEp6lmVzHOtVlwl_NrROeQddQ07o8aTre5Mwr9Ia6OcdAm2QS_Zs0ambfwt35flpQ-VcSanV9yZzpJ1zddPurp5B7BXbDY3s-dBD-4oTqcBWFaQd7-w-tDy3JHj679alZHe7lIgXZO7IPY2dTZwxznln_XYbAJmrBBLwbQOQ6Eeu2CdNfIcqBhcqgkpEHrJhV-P_IZwCNDeDfZVcmvGfir8LHcq3blX6ENFSAflFXkEFyHHYOHsKAuesC_kGYqT1tYfTbKDm2Ejw-UeTdbOyF-pUpnFnRhkkShzLO2Jx6RpZ0trn_vO6mUcZ_3At64AeQZqxkMC2uBIFe1E8bVOItEHGM8Qehokem--2TGef5k2Ff_ruKvRUzJJMgVrSEF8GZDd5sQLLMgt5v0wyzzo93n6RORsepjNzKYdh-dJUm18lxySdPSN_q-zhjL-igiWPeO-n2wzSHbzCKC0j5Sa3iyNZNYzU5FQUZwm7ZT6QeDlLGnyhziVqKZrLSszyqmo2Qe_nwjX8BDnzsSsErm-QPixNC1UugQH1vFedGkkB258W1iDry7gHsuqCGsqx5CwQZc=w958-h719-no'
					}, {
						name : 'BLABLABLA2',
						url : 'https://lh3.googleusercontent.com/R-si8XRHxjwugcYqhOl6Rc9b63os0ehpWunehiU1gKu-pWG0bc_03H7JO_gLAFFeH8PaJqWluj4HSd64shIPhPbHLK16Lvm4nFgxLbecDQd1McBzfZlnNIbsI2MtJveGEb3Tc3HwtpEt4fNzRnmrAQ-xrcgwNmpCsoUIz-FvrA7kpczFjkB5nOKLA9yn4B5nqNKxwDSzOdmgyG_G34-i9HxN2UZGtFYLdwdc1STJHbnvxclGMs3rJI2GuYACawvL8cRppuH-u1ngsoNgNKvAH1J2vwNSlVNZXmayFd8rhSTTU3zQ1MnG6UVO5qkfu5059RPiSHlEg92c31NSFWHp9Yq2Mkc_1rUAr3PqLwWR2hJEC1RtEEVYf5jmNBDmXMKSIfvQe8erYTa-Z54H2e7wsd3B-lTy3PlaL9U7WLg_7RX6BWlGfMtMm2FuGPJru3pBTl4zcbXtc65WUYoBMbCNb0HttEx2z5nLd5SVxdJmI-0d8pENsOB_ZYabZWoFT1GgdUO4nsmohyyF2WMM75uYM8oVXEIDa_t5N-gKCmgKf8obOpwbIuP_fupRuQqTL3Cz2FfNlQPwM3NPrApLAbC9HNF4K91Ytlc=w958-h719-no'
					}, {
						name : 'BLABLABLA3',
						url : 'https://lh3.googleusercontent.com/AXzShLeXOMKPnNcUoO0wsnJ6iCAAjGzmAVqEfOFw1Z7aYt8-c9zwWRJBQdeEDPNpAOg_SguExjk1ARnOI27xdn4kTYwlahodpSQbsGCL-shmh8SFOCIKh87aCRoQWqSm35OlWU6cPMnv45GXL2vYh1xn0UI0PTUjNZQmRwCN3AOOzw1XQU2My3myAKsGa0FgYVPnN8pfq64HgYp__Nhp6dCxtU1qXAzbvO72RrnTMwpFrEQXeVmkY-E4FJh16-VnQl5d5bI7fpY9Fuc6s0B4fJxsXdr1c_NWNZGypfBmlzpZa6daBMHBCavVjqYTofim83HZz3wQLZxbnZKkn0mks9KBOOnORqLWRZ_T_a0S-X8tFN0567LjYRh7u2cYo43dtgEjOqXHdmH_UQxCuzv0O1k_DsZqETmtwXxmY4TVVztvHoxAu4TkvWO8oIc91Lb-2yDHc1782S9yE9iopWAxYWS3vvnNphOz_bUAaWy7zgmqPqvBlW1AWaDo7fv3Ch79c1K5cWBgJhrSryzzVoKZuJLjktOxrgQR3lAs3UNYyvnPyLYEpdtlZRAMDS7YRKK7GzlaAL47WvW3JWyJxDt4noR7v3T_wBI=w958-h719-no'
					}, {
						name : 'BLABLABLA4',
						url : 'https://lh3.googleusercontent.com/tdjS0krfqByywbHVT7sdkGQvpJ95BRKgK5lky2n61WFpQkp4B52Gmv3IWU5yg3AtML5uVwy-N-Nwfb6ggKomSiviVT7mDiytrjft6ssptmI8o3vCq4gdrG3GQKHqu8S1Tk2sXlf8n3xS2wspbemhkd0yD3HgjEWScTQMOyJtV9UccyDMrk7d6vIjF_GKbVC1bKINYC9SDQWsTU04VGy1moEX84EGOjKD5pHSVsI2ETa50uu4YT4otBdzjotpZ1k3uIR0lkJaQKFJPGsOCbDm7bE6PV-1TeV12OSThJTHWZ3RqXMSWLIdrwpmkAx5vrCEnkJ83H1s14OgUQXPvRA50_kTXte8e6BIsg83Dl3LBy4O5BLSHwdexnLOCuYrKbPW-apFw1jEo0VmoI4AWP3ow2r2ySB2KajX8IGwZ6enJr3mcjmrM9Up1WPJ83cjCT0jnySvkbsks2HWbLnBMtcgTNLAlrLPd-nkEAHECdixLZHkf5QXlIk82uP8qsFiv7B2b88IyncWK5kpXVuRwDNhySTLalbsQQCFmFFAUnjorNvlmw532VjURPYckzKkMs_T6XnxPeKxeIV2r1kj_4dcXRNu_zDQUcg=w958-h719-no'
					}, {
						name : 'BLABLABLA5',
						url : 'https://lh3.googleusercontent.com/9kTJlEWJ8_RjPKLa1S76IOUheVhxrZQ2iz09PqiUxY_ooRAvdqSk3ocLqdbH3x_8nIvXdAYHq7j3UeVF219EkNLq7SaFQmtW4HoIQRsNIH2xP_G7NnqiWC_gseGe2LUxWY9-7kaeU4SBHZfaFsKLFXk3JkKoXlH05NwcLRCqDhAGtIEtyBhTXgd4yawuTt1a-kHmz2H2TUp5II5vpn4CYJKJgb7hCGy6yb6bT7kPacLSoECB_fe06WP_jqgn209Ssr8aUaPSGgWs4O-3_qHtVI0Z9E80TJ8jLph9eJmi94go04d2tM9GwGgS7cy7Ed2hR7Ks_cOjsCHOE-0nlBKRqitDnu5DVyzFt7LLAqvVZ-1YfMlziWoxQy1oqRX8DIhlKVYw1aJFm2nWcQDky3Cf-l2xhjFqKasgYVx8vQGdrffSGY5V6LLTwWggQuSM1lN_fzD5qxxxTRLk3gFKQazqWzw2NlukfGEnzFdo0GdTIbfpAEsdvxOpkD83UXQ73sX5EYDKT4bRg15-FCs7myS5PQMLRvpcVpo5Qk18kQ3DUfXMssyGAGXvadAPPfL6xep1sdwrrxYOS9pMOCO5B9L106kw8OyAjqg=w698-h930-no'
					}, {
						name : 'BLABLABLA5',
						url : 'https://lh3.googleusercontent.com/tFlKpjVD6qMyEgwPQ60u4nHQ_O9F5UPGNGFcVldDfGVdGkw0yLbamrtY6LNGxSxAR09QdOQZfKvgpEhyEPlGcEeKmln-wNTqbhazNLLSXQ_3VdYnS7UersKLnvm2-BQHSdPXFk5PriD9t8Q4-hBmzSFMnS_gJvmysg9-i1F_Few6RuwApTA2Hr1afrGwlLih2AS1lvvcIfmtg8_tbPu9O0WYzsUNyHIIuyHEJEzD8DIVjeTxz3KizozA2V0qshFOPOFxzi0oBHFBjYu7MBDMOX1lavHo09YvKrzIFnVRseGUJ9ZIMU9QNKrMeBcsXTpenRAbC7PDQC-SyMVDVAnxAlZtKyHHm9YZLQD6UXSoK7-Qkq9Lh90nERlnJp9g3vlVE7TbcZE5tCYd4EajIuZRJakrmQfuCWe89CMVx-w0mVKz8-rtPkwc16mhEEazuOdihdptP6MyZkWDCZyiOYdvPrp9VVpfvEaYzWrOau949SYI-tF_fNDdKL_9ee-t70q4F_s2WT_jw4mdxswRm_C8gTTfN15vY8GfjD-6Y4v2hDVTJi0rN7Z5DLfblakx4GOct04ORtyXgJWQc1u5o_inS8Ixtev7n58=w958-h719-no'
					}, {
						name : 'BLABLABLA5',
						url : 'https://lh3.googleusercontent.com/YKfyjNFiiFKhR7oFJovsDYF1BbbcXhkqdc-8nf_GqvSabrwEIyIlqbw0Josoiz6OXylMftS3BNQQ66Bx3TE2B559qemzy9mj-q_3Hz5ho7Zek7wQjutOtlmVi9qnXxL6tRh-bo51XbxdKA-Z5uHeABexzq7VqPaBja_FIXd_I1eF8vmGeC7B_fj6IJ3HqXYV7VyQnm--_j8_x5Qtdrpt_94S4pcmVGLdegqivZpbCiHjaaB1HUx0kXqtAok6v9BJn3cMg_ipJtQyLq4de4-swVy3GT54RYmNJWywYTJkcN5ly_TILGlmQqGGiQ61JvkHJdokpYiqIJOO9tgEB9izLKyqtznA-gjYtrnHuhCkHo58oL_iVzMBwLW_JJeujBMyiegiJHw3I9NAo160S_TZ_wsR8f2aEPgpM83Tuo-5FWW0GPlfwW_1K5wQgjzrTMOaxFSib4IvhrlPEye57bNjk5H-hqHW_ksQNDLkqu5hl8_li5Qzp9YMJa6iisfhB1-smqxVGu3SHxyxz16czRIF6TPdKlSk46KZO7d9qObSYuSFXowP7plHjokbGD7Nj2jV8-EzPM7YnuGDsImxV-NLf2Kk-Gn-AAU=w301-h226-no'
					}, {
						name : 'BLABLABLA5',
						url : 'https://lh3.googleusercontent.com/12hyVcHQjgOOBqtml-LZY-mGzCVWIS6EaoU35xC1-fYLGe5tY2Jf5M-yjWn0_rQ3zG2hYuGeQMkhlTpDy-lTjR73yySYU0shFLcU7urMpbfx-pBo7jn-QtvG6WfkkKTNYW4cFtlIt1fxYb5Qz7sTqSY7FD-5L7Y4CH7qMEG71XLjPEfvGdQCLTnuj3YaQw7lHMHETL_omnL2HOyulkiF_sqEfHXe3lM01v4Ohmaq0WN3uIg-_3Ux1kChCGsnXLvKB9UcuQxQ4L1o6MORTaHa12JK_XWUdL_BqOw0T235RiLT_r7WRGRL33e_oi1-GIGbZReIvGe4k-rwHIIv9cg2ex67tGdsqXFOLLMnwk6ZuAO39blhbxhq9KH_optrInCGy-p3t3XePnqNZ0lamIjcUqECLhuKI_BnQ1yLTKKu9hL7sIKasREiV6A6a6K74vS8QmBl_4tNJ2x_5_5Nx55iX5f6J0REPopyqQMGBtMT9JC2e4P9jLlrl3tmT15kNGzJTK4I67bbZd5-_454bWYtdUKCsdPAtVr_NqPsV0GjiHAHhdRpFQVAmwejsoLp35dgehq935YrDVKK9KxWrUfmZFNB3y6ENwk=w958-h719-no'
					}, {
						name : 'BLABLABLA5',
						url : 'https://lh3.googleusercontent.com/_neTPzLTsn-VdL7ElSrKVUp8Jg-0vgU7Us0gR-TXN5itxefgT3BMIBhPfk1mFIPe_q6rWerSbVNR3VjuQTjTphX1E9BaX-M6GE1t8x5D2zLr_LcayQm63-qRemJPe2JtR9bcHLqOahzPnx-uohAkJ8WucRYOpVSQNOS8engeSxwxhsAuvR6Wu9O9eKOJrZ21CgoMjGIVMqg8spOycVJs8bP2TdZkCjVqogCMU2gNJKujpb5CuePBU7ilKb4cyTkHC5x1Ljoll7fn7WiG_XaeCkd4u19mH7hesByqTRMLkh0pcbCbtdQOdg1VBa92IaAMnd3XtfvSin0TnI5M0ByUTqIKAqtRZeZU7xetkeyKLZ8YEh3VvLNfrXVEaXPSOgTLltbRsmT1oqMN4OfHuCoYL3Ie3jyA9XCWpi32Cfa7nrm262Jur0ONqQuvK0S-Jipa3XfdAjhHKTFPtUEWxTINSkKOBV5HdcvE3gGOphteZQHORJ3IgckTnjgqYQMq-UHEvQm-OrrIqTiyLOaLgcAfIxwa4eoJBTwaTnHK7eTJ3QjJ9NYSJrVeD9MUpG36afRPdVDI3SaV0Q6jzLASesE9HwDpDx7cg3k=w958-h719-no'
					}, {
						name : 'BLABLABLA5',
						url : 'https://lh3.googleusercontent.com/cigECg0ROc0Yrz8L-hq02zyEc0_wIs_B0UIVWcjpSBL-ziX5qA7lUdpRekvpou1AG70fkZPnmeVdSQHSpIhfzHNbi2wDcnVPCmpg9p1ePjhIfSkzOHdYoSCVu4-6aL1sANkr_0muiDo1jgBk2CmY7b730cb3orEX-Pr0DLvjPGCCPhBNDm2VS06WSu8gNu53IdNmBIXWvfugoAUeSYe0_CRZh41r2QZEmJ3e7RLmCqM3VRfU101R-7pQtrIMv1DCj57IrBQk3p36Uh_UMtkgPNVfafEIS4gv3XjFHhGBe-Re6SguaPQCDeopxeSlKiRnEh-Yq88d5DvgBoP__uKf_yY8zZ4WfdguAYO2HsjWlxNY6uwiqo_f19bJRGsdd4dMytpWtYq0OXNtz9CLzOdlzFRdcgKWMgkKsEes1pvdEof2OjaZ-Uz5PX6LH6mz8mDTBdC8mePRu8Isg83otasCWJ0aORRRQM_huDkJFGXkzosT6hDojVziUH8SvhiK5RJsW-ZL1qLQr2O_kWoAgZ71wI-9Tz8ulSscIqTzax50A3b3rwGAXnOE89Uj8f5CPhTziKfxYFP4jlh0xoqmHnpkk6xVEcj8D64=w958-h719-no'
					}, {
						name : 'BLABLABLA5',
						url : 'https://lh3.googleusercontent.com/D4Aj_DIMoYTEczRRsrpd-eYwbBAWScqMAuRxy4ktjbZ5zUrNvfM5lN8XGMlrDMYTBjcxVKwzGMOylEjoeiJkOhbrinQqXi0Izcz9MmlcL_Xw8f3nRleCzrCaE6dnHukDLARIUp5BTZ_HT72Ol8myoeUjlw3iggxKMlUm2Xy8cCPj0FP29dGMFDV2IQWE0spZEGQXSX5hup34CHMOBIRn8Gy9QE1dTdujhutFkMARssLXEAjpITNszCY6CWN5-HYVQ84FT71TSSMjjg8S67fjSI7IzVOlGRV1WoBETWiU6teh1ChOZRoHcvvrLsReohx5XJEuVpAdXCnq1m5mlJdjH5DkbB7Uf34UlKGFDncnW4p_zQ9M4IeNPG8QjejKX6f_9yRFHtmdTd7Z16D5AZDGQ0cBorFx-iVZTqcU-UsUtRe67H3y2nh_NkPTMItkNTxkRUAwJ62oAqohMDLvKrTbx1sswD4ghM0RqhinBzbd4hph7fIXRLvfDcinAsXKn49YmWU-BesNg6PYjUwc_ECkq9a7RNofp7WQPIVfFKB8lpD_o2jLd2qOWfXfHjuOV4MET0wojbtz3AGMfFX7LYOOHF8OZn2qrdg=w958-h719-no'
					}, {
						name : 'BLABLABLA5',
						url : 'https://lh3.googleusercontent.com/5lsKDWVA_pkbgeoUqVGdgoS_1PG_5VzrZw40PszK_B9DJL4p7mug7nNerNETRi8v_Zdt6Z9811R_4WuImOmoMfSkTVORYZzjYvlTXelta7ITmaFqBds2PjFPwN-cuxYVJ_nk9LCdJ6mXTiOQHtCcB4sbrRQhQcIIlVAJyIpiTEPawB4Zbpi4NO8Q4_RPbpoSKpd2UyF9XRedAI2KeOKQ_kEwkK7ilg0s_E3z_lmYhEGUn5_EChGn8FSuVvNZ4UFZ-VGRaCD0hw8ZyGfEbzqeq25zRJv5HqHm2DAyvKiPUqchsF2GtHk714vxyGEhuUCfA2d0mP4oAFkHLYbPOJOT2LFUAaOkEUV0Big3g8w0_Oy8BeWqNZV6Vq3TO3epZ4xxnzVAJnLHucT_7l2WVoNDNNxU3po57U2WBaw9D3wwWwqVtwfcNZ3n6_GHkbpLyPtJnnSmEkNrfYhzc46qVV9x-4tk1zCvIHUEdaWV-12G6yjz0LQRsO4HtNSy_eisndQ3mppQvUA711IZIdyYAfJ5nHhE6YdekIWfB2TaBwuZMzA_qNr99VwYCDmxBnnWs-guOdVvU5S-J8oy1ByiGQ6jMmvh8zaKKn8=w958-h644-no'
					}, {
						name : 'BLABLABLA5',
						url : 'https://lh3.googleusercontent.com/3ZPT_PKSEBVIxASn6ec1o5z5We0J7dvStyzOW1bLekoTiM11c_5tBsN1lSe791YVEeFPXQspop75oWhaTrRQhOzVQQK6yuCAQQhl9xKDukpnRzCeID51amk__1cltvDH3eMLlbjtHm5gKA4t-oCiQQUYvpgC09iBuqrGhVxFg2-cJH9tWUkdDuoBFrCKJkyTGg_GgMj5oQED_PcNbMY86IQLaz7Mf2E59zno9nPigcYOWWjtpaRw75JtSXDRKQPVoZZ3eQ4WGs88mJn5JDV8x2ppcVfka63lF7M1eb62QjsZkGbHjTXfuA-yZk_d_xNa5ZtQNy2dTqG1azSZRhUiqJHf4gyBleKH57daXhmFWUKmPbzetnMQkQngriHM_r_PzZvwIXo5s0xar0k7-yVz8eYSRqgDZNgaKiA8hTWiju0_zc0Qr_94TfMfJPwfEzPPRyDGaT-dPDy0V_0OoUT8cKD2ivZ_sr8V7Wd3ic1VCuHpEnSkNYz2M8gBG95EUq90lSbyfaTTccNTt03DMkl3HPtEXwEMbZL02vY88M3YLYtHP_s93EGxdvEV0r-Le89N8-hP2yVwklbvvMmgGuyScHEeTmhSkYA=w958-h644-no'
					}, {
						name : 'BLABLABLA5',
						url : 'https://lh3.googleusercontent.com/wDRd5kCJoR5sNkRNanbFv9uk0x2MM8KXrRhm61UXLNnZg_5o8fSOo_tIH8_35MuBCGKF-5Jv8uHun0VrojKvZrBUshp96HMLC2LH541ndiKiVFY6JawCyKAtH0wrkT8orv5NVg5T98OpoTINgwAV7_1wvzCMSweuG3DC6S8wtxMaCYYJuQATEG_2Yu9Y-ZPYUZoHB7Xp-lH5F53ecWyRYd5l7-iJlKMM8giCgHtuCUHA6BrHF-yGMMn_KhKRTbrWOYBQ4NniP2jk4xfrCMEPxmG0k8fd1TmK2BTze4wPZJbY2XThbltDjmu_tp4O4pbicNyrLJqTBrzRkMzXlNJzlzVz7iUnxalXBXGCer8zaA-IFf1a7W4OJEMovRH08xvOLH-QsN-wLpBYGknNBMmsawkn4IkIPsuHnqoeM-0UeYlTJenzjTeytOvZkHZ3FF8ysShnBETd0WlBFqh2yfKqiRmdG16dQwrUSc9DCimRvNwGxTbdtyLhLkuImorDgibzkomfygvwanzDk8fpmSeFKBELqNvMhUlRPKE15ymeEJ9S7AL7c1Qcd42uIS2DFTj5FWKagjMBsPQJiGhKk2xm6nSm1eFpbWU=w958-h719-no'
					}, {
						name : 'BLABLABLA5',
						url : 'https://lh3.googleusercontent.com/Wfrd61qyhqG_WEhXcLUlyjVM00EieLxZBLYeuE5UrYrW7vNfgRTEDkc2IsvB8ptwrdcVwnmjnILKx-7Gcb20ElI_56LnaWxkz09IxpVjfFa-Cuw3q9XOFCeBk6_KirYSDdQGQY3_O5fgp8LTsZr5dZIRxjtUmHO848ny56fI5hn3bjpizPPbajGI7TjIdc-4iegLOSO84c1HnDJhhGaq3LTxc1jaYyI-wqoqI07cjppQtvc-PuNsvty8SZsk1OcKrAeyz6vSMsFbhkegkmnfGB0g4GMrC4vSnLA03Evsu0O1kQOTQPYXNbEuiaV3JUedWMEeqiqlm1DXiN-NsxB9iChob6OACrSOANVQgd_65QAf1oCjAweg1zmP-n9vv85GHOi-GKny2UlyOdLqzknt5ikZdQ380csmqvV6OoOm9EszCoO3h-ybbyWQYGy6GkcbN0NRjeCxMqqLkqHdKXsWkadmwsjHeosp1AF4-Lau6jtVmj62qyXnks5aN4DXGHb7klsDPKfiENW3vuyLh6rwg3hJ49YVWexN900k9PWiIsw8a_ALwVCnprNZlbQlPsToIjRmx27_L7j73MjNyCm-klHhOTzCwWI=w958-h719-no'
					}, {
						name : 'BLABLABLA5',
						url : 'https://lh3.googleusercontent.com/1TIcM780xotIoxUhRcgHfq0H5sG2eG_7qE3YcIg-nx_0xsK92aWcQSNzDDV61AkYKH_ORrvqLKKmqsgZCOyX0bna6-AmZ8rSWboLV27Rs4vgY93DF8XzqJZ9th9VS4lPe7uDgSeqq180P2oNNunmtK8akpdOzCGJduutg_G01v1VdwjD3xZhRsmv-yM5x7GRmAs8MDl3aKopQt4rbx9CEOrUzPIjcJ-tp9dZDZaETTlvZ5eiDl25tiXJSIhkIcXmzaxZGe65M5nTBCK5I_2_uUCMwTRgSI9MMtKUmGB4ZRWkT4FXiwZ94lxIpykSVSre8e5STUvpJpiUHt6Qizx-yeCbh5v_cTLEsvkrzcXUkUYMRBG8bkG7RujhoOcdjzD9YmnIiSzd7dPQJVxpL6W5k9x01Y1_flGGckF-qJ5H_K_NCCOWK76vrsmABaNdYP3CI8AP_MPD66GWLLfHLkHoB6UjMkUGcvdTMT3SOVy7cwcCDqHTfrmqS5t0db2dUquTrxlhTkm85tu4S8Z97c3C0bwdZkKsIYoTZaBBoFUyDDMKC_RuECTc7eBmdyrNYwSVSS-W8kZQF11CYBy3riDictscedXeMG0=w958-h719-no'
					}
				];
				return repos.map(function (repo) {
					repo.value = repo.name.toLowerCase();
					return repo;
				});
			}

		}
	]);
