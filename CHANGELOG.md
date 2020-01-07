# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.2.1](https://github.com/LyonDataViz/occupapp/compare/v1.2.0...v1.2.1) (2020-01-07)


### Features

* add commit information and link ([f14767c](https://github.com/LyonDataViz/occupapp/commit/f14767c3863a36e8efe83b9853c345144323b335))


### Bug Fixes

* create version info even without git ([9c11799](https://github.com/LyonDataViz/occupapp/commit/9c117997b7eba85242c6e0533fcd31d0d9d5f94b))
* downgrade typescript (asked by typescript-etree ([0fc424d](https://github.com/LyonDataViz/occupapp/commit/0fc424d8f963693cf421bce1297ce52047f55ddb))
* fix use of now.sh environment variables ([cbd9cd5](https://github.com/LyonDataViz/occupapp/commit/cbd9cd5790a8ed0a8b404dc70e436a7ba6137766))

## [1.2.0](https://github.com/severo/occupapp/compare/v1.1.0...v1.2.0) (2019-12-20)


### Features

* add a bar representing point voronoi area ([c77e308](https://github.com/severo/occupapp/commit/c77e3085a1a125cbd4d327b5c85b94238f02b4a4))
* add a picture (cuzco stones) to the examples ([7d90195](https://github.com/severo/occupapp/commit/7d901956f41ca823c9cc88c80b1efb3fa442cf3d))
* add a switch between color and grayscale background image ([81fb9a8](https://github.com/severo/occupapp/commit/81fb9a8d9fe8b41260c6f4340e860bf70609505b))
* add a Tables panel ([5b4053a](https://github.com/severo/occupapp/commit/5b4053a7e4573b73c5680d5ef4181cd1b0a51bde))
* add information about feedback and credits ([4c58050](https://github.com/severo/occupapp/commit/4c5805022b76e1b1331b59658638f352e71c1bf9))
* add number to points + in points handles ([e015233](https://github.com/severo/occupapp/commit/e015233ca21257d9aabb605c8b44ca7bdfa22a3e))
* add point number in points list ([324ea7d](https://github.com/severo/occupapp/commit/324ea7dfcd8509f66bfb215d5273a93b332971d9))
* add versions information in side bar ([a2e1d0b](https://github.com/severo/occupapp/commit/a2e1d0b2dfda05e94a92d92a820e0825a8101cfd))
* assign a different category on each point creation ([52334e7](https://github.com/severo/occupapp/commit/52334e7eca16362b150516557784d865199716ba))
* close the gallery when on image selection ([fc3c323](https://github.com/severo/occupapp/commit/fc3c32307346d851c4ba224ad95d92546c152aa1))
* compute, store and display area of every point ([d676249](https://github.com/severo/occupapp/commit/d6762490a77759e5d5ccdf36fb3efce353d44424))
* improve gallery style ([f1aeef3](https://github.com/severo/occupapp/commit/f1aeef3eac4c58f5f33ba1ce29351162f052ec44))
* improve the upload button (a lot simpler and faster) ([ace3ebc](https://github.com/severo/occupapp/commit/ace3ebcd31863ad0e4e0417079031fbf5b29d527))
* increase voronoi opacity to distinguish categories colors ([2c59bd2](https://github.com/severo/occupapp/commit/2c59bd2e0ff243476feb37e3a5c810b4c62a83a2))
* limit height of the image list ([da18131](https://github.com/severo/occupapp/commit/da18131326c4821e0143a5c9b77915169147bf1e))
* modify sidebar layout ([e19055c](https://github.com/severo/occupapp/commit/e19055c838ba6117a22d2106decb8d4b955b5509))
* move Image selector to a popup from menu image icon ([8a5d473](https://github.com/severo/occupapp/commit/8a5d473e103a97d56ecef2690cfa0aa6d65bd9a4))
* move the gallery to the side bar (instead of modal) ([f31e8d6](https://github.com/severo/occupapp/commit/f31e8d6ac2aa08c3e21e0d38eb195e2e3a4af4df))
* persist one composition per image ([d44f93c](https://github.com/severo/occupapp/commit/d44f93cbea335e95b9a6c1e64d2b7e6831286510))
* reduce base64 image size, using JPEG 0.92, instead of PNG ([b087ec3](https://github.com/severo/occupapp/commit/b087ec3db2ad964dffe5d47cc882f2ce4e5b0856))
* select points from list or svg handles ([e3f03f0](https://github.com/severo/occupapp/commit/e3f03f088ac5a511953d12528b5a8ce856c29386))
* show image colors by default ([26599e6](https://github.com/severo/occupapp/commit/26599e62319c32c9480e1b913126aaef84adc62a))
* show list of agents, with select checkboxes ([c953bdb](https://github.com/severo/occupapp/commit/c953bdb2e619ab7ab7cf78119c03bad03f7809f5))
* show Voronoi even if there is no background image ([be7933a](https://github.com/severo/occupapp/commit/be7933adaf13ca8606f1af9b70d3178102d87b53))
* slight UI improvements (Add images button, card separation) ([b9198b7](https://github.com/severo/occupapp/commit/b9198b71438c633b33707929076539de9d8d9f35))
* upload images (add to Gallery) ([09b0d13](https://github.com/severo/occupapp/commit/09b0d13ebe4224affa74a540d02004022336d8c4))


### Bug Fixes

* better name for the app ([1832056](https://github.com/severo/occupapp/commit/183205697d81a44a618b2c9e8c25230eb16aa285))
* clamp x & y points coordinates to [0,100] domain ([d6c245c](https://github.com/severo/occupapp/commit/d6c245cb054dd096bc26c5705a978a3b616c9fa4)), closes [#36](https://github.com/severo/occupapp/issues/36)
* close the navigation bar by default ([5eba3ff](https://github.com/severo/occupapp/commit/5eba3fffbe3f7d65ee8ee08a7e6e79ee7552d710)), closes [#42](https://github.com/severo/occupapp/issues/42)
* downgrade typescript to 3.6.4 ([cb14419](https://github.com/severo/occupapp/commit/cb14419bf75b41ca5df19166d9a177931ab8659f))
* fix component name ([f51707b](https://github.com/severo/occupapp/commit/f51707b192f4157c7cec92415e8c1d4f628aa3f4))
* fix components names ([c9186d4](https://github.com/severo/occupapp/commit/c9186d482c17db900080ffa0385d24c2cbe4d639))
* fix gallery title ([294f059](https://github.com/severo/occupapp/commit/294f0596e1598667dbf16dc1f9f70230916d77df))
* fix Typescript error ([932f4a9](https://github.com/severo/occupapp/commit/932f4a9e521d9a5a0fac5a92fa156ab3c356816a))
* hide the 'fullscreen' button on small screens ([ea28601](https://github.com/severo/occupapp/commit/ea28601d420818d252fc2050c0fabbf42180b855))
* improve footer style ([bee10d0](https://github.com/severo/occupapp/commit/bee10d087dc928c992c19dc172bcc94d23594983))
* improve reactivity on gray images ([71caefa](https://github.com/severo/occupapp/commit/71caefa364a17b4d40d8c8c1ccadae8e2f5c7f20))
* increase the size of images a bit ([ddf1703](https://github.com/severo/occupapp/commit/ddf1703af96b50af2600ecc6a9ebb0881534380e))
* remove field ([b3ce0e8](https://github.com/severo/occupapp/commit/b3ce0e8cdb5f4a9ec2948b3847c3922b14825b23))
* remove point handle highlight once it has been selected ([434070a](https://github.com/severo/occupapp/commit/434070a3902e8f7a18b7d801046fccda9bd8609d))
* remove useless case ([8a3357d](https://github.com/severo/occupapp/commit/8a3357db2dfc7fc8811d4e18994d87e7327fe949))
* rename component Main to MainPanel ([1d82fa1](https://github.com/severo/occupapp/commit/1d82fa1fc20469f6fc0619d65a0c8d06e91be44a))
* revert be7933ad partially ([598bb15](https://github.com/severo/occupapp/commit/598bb15d9c5ef409c18789a5249101b02f37b671))
* rotate/mirror uploaded images according to EXIF ([4aadb8b](https://github.com/severo/occupapp/commit/4aadb8b5418ab49e6a32940225a79f889dcc8737)), closes [#45](https://github.com/severo/occupapp/issues/45)
* store should be namespaced ([f736bfa](https://github.com/severo/occupapp/commit/f736bfad93e508dd280dcd1c16154dc6cf0d8b9b))
* white text on selected handles ([53963a8](https://github.com/severo/occupapp/commit/53963a848b92ca0aea60fe7053f97b77353b104e))

## 1.1.0 (2019-11-14)


### Features

* 4 random colors for Voronoi cells ([d6e1d3a](https://github.com/LyonDataViz/occupapp/commit/d6e1d3a75b4fb14b39487c5d49cacc2c8c12254a))
* add an image selector ([09ff2a8](https://github.com/LyonDataViz/occupapp/commit/09ff2a87191f76d303687a2c61d38bbc78401c2e))
* add image selection ([f6f47a9](https://github.com/LyonDataViz/occupapp/commit/f6f47a954f0770cc33a1d46cce3f1fe693af09d1))
* add images ([e91d4a2](https://github.com/LyonDataViz/occupapp/commit/e91d4a2c8d8391e67041e04344592eb6feca5624))
* add point button ([b6e41a9](https://github.com/LyonDataViz/occupapp/commit/b6e41a92259e0c33b070732b36f57b3c5596b4ca))
* add random points (circles) to the SVG ([09e0c3a](https://github.com/LyonDataViz/occupapp/commit/09e0c3ab476b31594fd669d27246f231bdb0e49d))
* add ResponsiveImage component ([a5b7786](https://github.com/LyonDataViz/occupapp/commit/a5b778674067066fe82bb56dc36ac3d04fa2da26))
* add shadows on hover and drag ([131b5e8](https://github.com/LyonDataViz/occupapp/commit/131b5e866b78b86408fe26e42be6cd8452dc0989))
* add SVG layer ([4b5264c](https://github.com/LyonDataViz/occupapp/commit/4b5264cfb2357d19d304c527f6c4f6b806cc017e))
* add Vuetify ([25c8311](https://github.com/LyonDataViz/occupapp/commit/25c8311e646019412cb5c1d9ef6720988d5ba207)), closes [/stackoverflow.com/questions/53452593/vue-cli-and-vuetify-how-to-use-with-local-roboto-font/58448107#58448107](https://github.com/LyonDataViz//stackoverflow.com/questions/53452593/vue-cli-and-vuetify-how-to-use-with-local-roboto-font/58448107/issues/58448107)
* basic layout, with image width adjusted to window size ([ab0ed63](https://github.com/LyonDataViz/occupapp/commit/ab0ed635eaa965dafe3ad94669ce7777c1fe4c90))
* big and ugly commit with new compositions store, pictures as utils, and manage Handles resize ([fecee7a](https://github.com/LyonDataViz/occupapp/commit/fecee7a7f4ed6b91e6093bc23d800c7989761e29))
* bootstrap the application ([2f70163](https://github.com/LyonDataViz/occupapp/commit/2f701638e306d6ddea4ee710465f8c02845a8662))
* default 7 points for petanque image, loaded on Home mount ([17f762f](https://github.com/LyonDataViz/occupapp/commit/17f762fa4389d4482851bd64dc809ee60cb84a37))
* delete points ([70eef6a](https://github.com/LyonDataViz/occupapp/commit/70eef6aabd976ff39a50e49a76839850f392d985))
* drag and drop the path ([3a17356](https://github.com/LyonDataViz/occupapp/commit/3a173568502320a5753d4c3cdbec8de4a18784ae))
* draw canvas and manage resize ([662f663](https://github.com/LyonDataViz/occupapp/commit/662f6636f8a571276d578d4498457523444a6e0e))
* flexible layout + adapt ResponsiveImage ([aa3f2d2](https://github.com/LyonDataViz/occupapp/commit/aa3f2d2f6052bc90d8122e244c59e5de1ce62427))
* force 1to1 matching between composition and picture. It requires more work, see todos ([03b9c33](https://github.com/LyonDataViz/occupapp/commit/03b9c3393e25e116e6c1b0c6b423f2e127cadc0d))
* hide the overlay elements (svg, canvas) when loading image ([00386ab](https://github.com/LyonDataViz/occupapp/commit/00386ab862784d85081476a8575ffca51c057707))
* implement canvas resizing ([348df48](https://github.com/LyonDataViz/occupapp/commit/348df4843832140669c62c049465c21054900a68))
* improve point style on hover and dragw ([7f82c27](https://github.com/LyonDataViz/occupapp/commit/7f82c2798badad91481f051472909c8cac6ea8eb))
* increase size of points ([0123b1d](https://github.com/LyonDataViz/occupapp/commit/0123b1db764a86b33d09781c9294f451286aebae))
* lower elevation shadow when dragging a point ([7a83f46](https://github.com/LyonDataViz/occupapp/commit/7a83f46182e7cae3278b9251fd510e652f86e3b2))
* pass a class to *Image components + move them ([877ee2b](https://github.com/LyonDataViz/occupapp/commit/877ee2bb0d26f2748ffc56afd06c009c32ac985b))
* place new points randomly, instead of at the center ([fcf2640](https://github.com/LyonDataViz/occupapp/commit/fcf26406df36f5cd9eedadc5f6c6ff7cf36f47db))
* placeholder for images ([56412f5](https://github.com/LyonDataViz/occupapp/commit/56412f55bd7e2ed563ea5f86b4c64ed93cd0a26a))
* scale canvas size with device pixel ratio ([c27fc8f](https://github.com/LyonDataViz/occupapp/commit/c27fc8f2a176f0482230982bdd58b54b4c6364c5))
* setup basic layout ([123b71e](https://github.com/LyonDataViz/occupapp/commit/123b71e6a1408cb6bced3ef758722646505dd1cb))
* show a random point in the handles layer ([70dc88e](https://github.com/LyonDataViz/occupapp/commit/70dc88e657b91ad224bec07ece741dd2e82a3952))
* show Image in canvas ([05bbd94](https://github.com/LyonDataViz/occupapp/commit/05bbd9418d2527264de855d416e1fe728e84c79e))
* show Voronoi on canvas ([63c12bf](https://github.com/LyonDataViz/occupapp/commit/63c12bff1c5653da58aa125357d5d9ac6d3c7775))
* static text ([b32cb49](https://github.com/LyonDataViz/occupapp/commit/b32cb491aff2d7fb379a84b5fe1f6ef41521df60))
* use router ([27d1dc5](https://github.com/LyonDataViz/occupapp/commit/27d1dc5b89d8d97ae02f1f05ee74ba8b7f17bbc3))


### Bug Fixes

* comment temporal code ([a8d6f8f](https://github.com/LyonDataViz/occupapp/commit/a8d6f8f4a5449f73ebf400e3442e7c1b75cfd8c8))
* ensure the canvas is displayed as a block ([c1f659d](https://github.com/LyonDataViz/occupapp/commit/c1f659d44bc99284cd24ca11d97c3dae59d1353f))
* fix class name ([c7e801e](https://github.com/LyonDataViz/occupapp/commit/c7e801eec0d8cc3d84b7c298a5f7f530214dfaed))
* fix hover on points ([d3d0241](https://github.com/LyonDataViz/occupapp/commit/d3d0241214fdd0139d4419cd09e23dcf7ae40f93))
* fix syntax ([f5f3d36](https://github.com/LyonDataViz/occupapp/commit/f5f3d3687c6debd4123898e14f168dafe695ea1e))
* fix the selection of a pomposition by pictureId ([8160ee4](https://github.com/LyonDataViz/occupapp/commit/8160ee484e2237eb31654dcf0b9745a235712e90))
* remove unnecessary code ([fceee4e](https://github.com/LyonDataViz/occupapp/commit/fceee4e7abc2f4a5c0f683a1603ceb8be9f4c6da))
* remove unnecessary code ([e1f2821](https://github.com/LyonDataViz/occupapp/commit/e1f282122377668421286d7f254f585deb185ffa))
* show the mage placeholder as soon as possible ([b8ce60d](https://github.com/LyonDataViz/occupapp/commit/b8ce60d25568c0355c9a80eab3d66a2ebcb2b64f))
* typo ([621b296](https://github.com/LyonDataViz/occupapp/commit/621b296c334cdeb1766e4aedc447ca7a16841de4))
