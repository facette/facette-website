/*!
 * facette-website - Facette project website
 * Website: https://facette.io/
 */
!function(){"use strict";function handleOverlay(e){("keydown"==e.type&&27==e.which||"click"==e.type&&"IMG"!=e.target.tagName)&&$("#overlay").remove(),$body.off("keydown",handleOverlay)}var $body=$(document.body),$overlay=$("#overlay").detach();$body.on("click","[data-screenshot]",function(e){var img=document.createElement("img");img.src=e.target.getAttribute("data-screenshot"),$overlay.clone().appendTo($body).append(img).on("click",handleOverlay),$body.on("keydown",handleOverlay)})}();