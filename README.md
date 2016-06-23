Instargam module
Documentation: https://www.instagram.com/developer/embedding/

Preview:
HTML Structure (generate in PHP)
	<div class="instagram" data-embed="{dataEmbed}"></div>
	dataEmbed -- instargam unique part of url

	Ex.: https://www.instagram.com/p/{dataEmbed}/


	This structure is required by php logic of saving and rendering data.

	Important: library embeds.js need to be included. See Instagram documentation "Embedding for developers"


Js Structure
	instagram.amd.js -- module that includes once and loads all instargam posts on page