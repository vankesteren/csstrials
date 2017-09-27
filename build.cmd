rem /// This file requires nodejs, npm, uglifycss, and uglifyjs

rem /// run the css uglifyer. ///
@ call uglifycss style.css > build/style.css

rem /// then run the JavaScript uglifyer. ///
@ call uglifyjs main.js -o build/main.js
@ call uglifyjs mouse.js -o build/mouse.js
@ call uglifyjs utils.js -o build/utils.js

rem /// build complete. ///
@ pause
