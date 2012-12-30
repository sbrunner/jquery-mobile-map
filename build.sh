cp openlayers.cfg openlayers/build
cd openlayers/build
./buildUncompressed.py openlayers
cd -

#nodejs r.js -o baseUrl=. paths.jquery=jquery name=main out=app/scripts/app.build.js
cd app/scripts/
nodejs ../../r.js -o app.build.js
cd -

#nodejs r.js -o cssIn=app/css/main.css out=app-build/css/main.css
