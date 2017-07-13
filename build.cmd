rem /// This file requires nodejs, npm, postcss autoprefixer,
rem /// uglifycss, and uglifyjs to be installed globally.
rem /// -----------------------------------------------------

rem /// first run the css autoprefixer. ///
@ call postcss *.css --use autoprefixer -d build/

rem /// then run its uglifyer and replace the file. ///
@ call uglifycss build/style.css > build/style2.css
@ call move /Y build\style2.css build\style.css

rem /// then run the JavaScript uglifyer. ///
@ call uglifyjs main.js -o build/main.js

rem /// build complete. ///
@ pause
