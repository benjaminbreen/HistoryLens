const imageMap = {
  anamariadesoto: {
    src: require('./assets/anamariadesoto.jpg'),
    tags: ['patient', 'Ana Maria de Soto', 'woman']
  },
  apothecary: {
    src: require('./assets/apothecary.jpeg'),
    tags: ['shop', 'apothecary', 'interior']
  },
  southwell: {
    src: require('./assets/southwell.jpg'),
    tags: ['patient', 'Sir Robert Southwell', 'man', 'English', 'foreign', 'diplomat']
  },
   sorjuanainesdelacruz: {
    src: require('./assets/sorjuanainesdelacruz.jpg'),
    tags: ['patient', 'nun', 'woman', 'scholar', 'genius', 'writer']
  },
  franciscodiasdearaujo: {
    src: require('./assets/franciscodiasdearaujo.jpg'),
    tags: ['patient', 'Francisco Dias de Araujo', 'man', 'merchant']
  },
  carlosenriquez: {
    src: require('./assets/carlosenriquez.jpg'),
    tags: ['patient', 'Carlos Enriquez', 'man', 'attorney']
  },
  countryside: {
    src: require('./assets/countryside.jpeg'),
    tags: ['outdoor', 'countryside', 'nature']
  },
  default: {
    src: require('./assets/default.jpeg'),
    tags: ['default', 'fallback', 'generic']
  },
  donalejandrocortez: {
    src: require('./assets/donalejandrocortez.jpg'),
    tags: ['patient', 'Don Alejandro Cortez', 'noble']
  },
  donluis: {
    src: require('./assets/donluis.jpeg'),
    tags: ['Don Luis', 'noble', 'man']
  },
  fraypatricio: {
    src: require('./assets/fraypatricio.jpg'),
    tags: ['Fray Patricio', 'friar', 'religious']
  },
  generichome: {
    src: require('./assets/generichome.jpeg'),
    tags: ['interior', 'home', 'generic']
  },
  inquisitorfernando: {
    src: require('./assets/inquisitorfernando.jpg'),
    tags: ['Inquisitor Fernando', 'religious', 'man']
  },
  isabeldelacruz: {
    src: require('./assets/isabeldelacruz.jpg'),
    tags: ['patient', 'Isabel de la Cruz', 'woman']
  },
  joao: {
    src: require('./assets/joao.jpeg'),
    tags: ['Joao', 'pet', 'cat']
  },
  juanbraga: {
    src: require('./assets/juanbraga.jpg'),
    tags: ['patient', 'Juan Braga', 'man']
  },
  mariacoelho: {
    src: require('./assets/mariacoelho.jpeg'),
    tags: ['patient', 'Maria Coelho', 'woman']
  },
  market: {
    src: require('./assets/market.jpeg'),
    tags: ['outdoor', 'market', 'busy']
  },
  marta: {
    src: require('./assets/marta.jpeg'),
    tags: ['Marta', 'herbalist', 'woman']
  },
  outsideday: {
    src: require('./assets/outsideday.jpg'),
    tags: ['outdoor', 'day', 'nature']
  },
  outsidenight: {
    src: require('./assets/outsidenight.jpg'),
    tags: ['outdoor', 'night', 'street']
  },
  rosamariaperez: {
    src: require('./assets/rosamariaperez.jpg'),
    tags: ['patient', 'Rosa Maria Perez', 'woman']
  },
  shopmorning: {
    src: require('./assets/shopmorning.jpeg'),
    tags: ['shop', 'morning', 'apothecary']
  },
  shopafternoon: {
    src: require('./assets/shopafternoon.jpeg'),
    tags: ['shop', 'afternoon', 'apothecary']
  },
  shopnight: {
    src: require('./assets/shopnight.jpeg'),
    tags: ['shop', 'night', 'apothecary']
  },
  tejedora: {
    src: require('./assets/tejedora.jpeg'),
    tags: ['woman', 'weaver', 'artisan']
  },
  paisano: {
    src: require('./assets/paisano.jpeg'),
    tags: ['peasant', 'worker', 'man']
  },
  dona: {
    src: require('./assets/dona.jpg'),
    tags: ['woman', 'noble', 'dona']
  },
  caballero: {
    src: require('./assets/caballero.jpg'),
    tags: ['man', 'noble', 'horseman']
  },
  manual: {
    src: require('./assets/manual.jpeg'),
    tags: ['document', 'book', 'instruction']
  },
  diegoperez: {
    src: require('./assets/diegoperez.jpg'),
    tags: ['patient', 'Diego Perez', 'man']
  },
  mushroom: {
    src: require('./assets/mushroom.jpeg'),
    tags: ['shaman', 'mushroom', 'curandera']
  },
  study: {
    src: require('./assets/study.jpeg'),
    tags: ['interior', 'study', 'scholar']
  },
  farm: {
    src: require('./assets/farm.jpeg'),
    tags: ['farm', 'outdoor', 'agriculture', 'irrigation', 'canals']
  },
  merchant: {
    src: require('./assets/merchant.jpeg'),
    tags: ['merchant', 'man', 'market']
  },
  street: {
    src: require('./assets/street.jpeg'),
    tags: ['outdoor', 'street', 'market']
  },
  codex: {
    src: require('./assets/codex.jpg'),
    tags: ['document', 'book', 'codex']
  },
  trippy: {
    src: require('./assets/trippy.jpeg'),
    tags: ['dream', 'fantasy', 'abstract']
  },
  herbs: {
    src: require('./assets/herbs.jpeg'),
    tags: ['herbs', 'plants', 'medicine']
  },
  herbalist: {
    src: require('./assets/herbalist.jpeg'),
    tags: ['herbalist', 'plants', 'woman']
  },
  arturohernandez: {
    src: require('./assets/arturohernandez.jpg'),
    tags: ['patient', 'Arturo Hernandez', 'man']
  },
  arturoramirez: {
    src: require('./assets/arturoramirez.jpg'),
    tags: ['patient', 'Arturo Ramirez', 'man']
  },
  cityday: {
    src: require('./assets/city_day.jpg'),
    tags: ['outdoor', 'city', 'day']
  },
  streetnight: {
    src: require('./assets/street_night.jpg'),
    tags: ['outdoor', 'street', 'night']
  },
  santiagovaldez: {
    src: require('./assets/santiagovaldez.jpg'),
    tags: ['antagonist', 'Inquisitor', 'Santiago Valdez', 'man', 'questNPC']
  },
  symptoms: {
    src: require('./assets/symptoms.jpg'),
    tags: ['diagnosis', 'patient', 'medicine']
  },
  tlacaelel: {
    src: require('./assets/tlacaelel.jpg'),
    tags: ['Nahuatl', 'scholar', 'man', 'questNPC']
  },
  outskirts: {
    src: require('./assets/outskirts.jpg'),
    tags: ['outdoor', 'outskirts', 'village']
  },
  village: {
    src: require('./assets/village.jpg'),
    tags: ['village', 'rural', 'outdoor']
  },
  dockside: {
    src: require('./assets/dockside.jpg'),
    tags: ['port', 'outdoor', 'dock']
  },
  port: {
    src: require('./assets/port.jpg'),
    tags: ['port', 'ocean', 'ship']
  },
  hills: {
    src: require('./assets/hills.jpg'),
    tags: ['outdoor', 'hills', 'landscape']
  },
  forest: {
    src: require('./assets/forest.jpg'),
    tags: ['outdoor', 'forest', 'nature']
  },
  frontier: {
    src: require('./assets/frontier.jpg'),
    tags: ['outdoor', 'frontier', 'village']
  },
  abandonedtemple: {
    src: require('./assets/abandonedtemple.jpg'),
    tags: ['temple', 'outdoor', 'ruins']
  },
  countrychurch: {
    src: require('./assets/countrychurch.jpg'),
    tags: ['church', 'rural', 'religion']
  },
  canyon: {
    src: require('./assets/canyon.jpg'),
    tags: ['outdoor', 'canyon', 'nature']
  },
  square: {
    src: require('./assets/square.jpg'),
    tags: ['square', 'outdoor', 'city']
  },
  herbshop: {
    src: require('./assets/herbshop.jpg'),
    tags: ['shop', 'herbs', 'interior']
  },
  citycenter: {
    src: require('./assets/citycenter.jpg'),
    tags: ['city', 'center', 'busy']
  },
  hacienda: {
    src: require('./assets/hacienda.jpg'),
    tags: ['hacienda', 'noble', 'interior']
  },
  taverna: {
    src: require('./assets/taverna.jpg'),
    tags: ['tavern', 'interior', 'night']
  },
  churchcourtyard: {
    src: require('./assets/churchcourtyard.jpg'),
    tags: ['church', 'courtyard', 'religion']
  },
  spanishnoble: {
    src: require('./assets/spanishnoble.jpg'),
    tags: ['noble', 'man', 'wealthy']
  },
  mestizo: {
    src: require('./assets/mestizo.jpg'),
    tags: ['mestizo', 'man', 'worker']
  },
  friar: {
    src: require('./assets/friar.jpg'),
    tags: ['friar', 'religious', 'man']
  },
  merchantman: {
    src: require('./assets/merchantman.jpg'),
    tags: ['merchant', 'man', 'market']
  },
  laborer: {
    src: require('./assets/laborer.jpg'),
    tags: ['worker', 'laborer', 'man']
  },
  soldier: {
    src: require('./assets/soldier.jpg'),
    tags: ['soldier', 'military', 'man']
  },
  ranchero: {
    src: require('./assets/ranchero.jpg'),
    tags: ['rancher', 'man', 'landowner']
  },
  curandera: {
    src: require('./assets/curandera.jpg'),
    tags: ['curandera', 'healer', 'woman']
  },
  scholar: {
    src: require('./assets/scholar.jpg'),
    tags: ['scholar', 'study', 'student', 'man']
  },
  physician: {
    src: require('./assets/physician.jpg'),
    tags: ['physician', 'doctor', 'man']
  },
  shopkeeper: {
    src: require('./assets/shopkeeper.jpg'),
    tags: ['shopkeeper', 'merchant', 'man']
  },
  child: {
    src: require('./assets/child.jpg'),
    tags: ['child', 'boy', 'girl']
  },
  priest: {
    src: require('./assets/priest.jpg'),
    tags: ['priest', 'religion', 'man']
  },
  enslavedperson: {
    src: require('./assets/enslavedperson.jpg'),
    tags: ['enslaved', 'laborer', 'person']
  },
  peasantwoman: {
    src: require('./assets/peasantwoman.jpg'),
    tags: ['peasant', 'woman', 'worker']
  },
  dons: {
    src: require('./assets/dons.jpg'),
    tags: ['noble', 'group', 'men']
  },
  sailor: {
    src: require('./assets/sailor.jpg'),
    tags: ['sailor', 'ship', 'man']
  },
  bandito: {
    src: require('./assets/bandito.jpg'),
    tags: ['bandit', 'outlaw', 'man']
  },
  frontierdweller: {
    src: require('./assets/frontierdweller.jpg'),
    tags: ['settler', 'man', 'frontier']
  },
  townsfolk: {
    src: require('./assets/townsfolk.jpg'),
    tags: ['townsfolk', 'group', 'people']
  },
  cobblestones: {
    src: require('./assets/cobblestones.jpg'),
    tags: ['street', 'cobblestones', 'outdoor']
  },
  rock: {
    src: require('./assets/rock.jpg'),
    tags: ['rock', 'nature', 'outdoor']
  },
  ocean: {
    src: require('./assets/ocean.jpg'),
    tags: ['ocean', 'water', 'nature']
  },
  turf: {
    src: require('./assets/turf.jpg'),
    tags: ['grass', 'nature', 'outdoor']
  },
  shipinterior: {
    src: require('./assets/shipinterior.jpg'),
    tags: ['ship', 'sea', 'interior', 'caravel']
  },
    shipexterior: {
    src: require('./assets/shipinterior.jpg'),
    tags: ['ship', 'sea', 'exterior', 'caravel', 'waves']
  },
  moon: {
    src: require('./assets/moon.jpg'),
    tags: ['moon', 'night', 'sky']
  },
  fire: {
    src: require('./assets/fire.jpg'),
    tags: ['fire', 'night', 'light']
  },
  horse: {
    src: require('./assets/horse.jpg'),
    tags: ['horse', 'animal', 'transport']
  },
  bottles: {
    src: require('./assets/bottles.jpg'),
    tags: ['bottles', 'medicine', 'container']
  },
  portalmercederes: {
    src: require('./assets/portalmercederes.jpg'),
    tags: ['market', 'outdoor', 'shop']
  },
  metropolitancathedral: {
    src: require('./assets/metropolitancathedral.jpg'),
    tags: ['cathedral', 'religious', 'city']
  },
  tenochtitlan: {
    src: require('./assets/tenochtitlan.jpg'),
    tags: ['Tenochtitlan', 'ruins', 'city']
  },
  lamerced: {
    src: require('./assets/lamerced.jpg'),
    tags: ['church', 'religious', 'interior']
  },
  plazamayor: {
    src: require('./assets/playamayor.jpg'),
    tags: ['plaza', 'outdoor', 'square']
  },
  alamedacentral: {
    src: require('./assets/alamedacentral.jpg'),
    tags: ['park', 'outdoor', 'city']
  },
  sebastianathayde: {
    src: require('./assets/sebastianathayde.jpg'),
    tags: ['patient', 'Sebastian Athayde', 'man']
  },
  drugs: {
    src: require('./assets/drugs.jpg'),
    tags: ['medicine', 'drugs', 'apothecary']
  },
  panchorodriguez: {
    src: require('./assets/panchorodriguez.jpg'),
    tags: ['patient', 'Pancho Rodriguez', 'man']
  },
  university: {
    src: require('./assets/university.jpg'),
    tags: ['university', 'building', 'education']
  },
  library: {
    src: require('./assets/library.jpg'),
    tags: ['library', 'books', 'study']
  },
  frayjordanes: {
    src: require('./assets/frayjordanes.jpg'),
    tags: ['Fray Jordanes', 'religious', 'friar']
  },
  antoniadeochoa: {
    src: require('./assets/antoniadeochoa.jpg'),
    tags: ['patient', 'Antonia de Ochoa', 'woman']
  },
  compounding: {
    src: require('./assets/compounding.jpg'),
    tags: ['apothecary', 'medicine', 'compounding']
  },
  tincture: {
    src: require('./assets/tincture.jpg'),
    tags: ['apothecary', 'medicine', 'liquid']
  },
  herbflowers: {
    src: require('./assets/herbflowers.jpg'),
    tags: ['herbs', 'flowers', 'nature']
  },
  spices: {
    src: require('./assets/spices.jpg'),
    tags: ['herbs', 'spices', 'medicine']
  },
  rocks: {
    src: require('./assets/rocks.jpg'),
    tags: ['outdoor', 'rocks', 'nature']
  },
  sand: {
    src: require('./assets/sand.jpg'),
    tags: ['outdoor', 'sand', 'nature']
  },
  weavecloseup: {
    src: require('./assets/weavecloseup.jpg'),
    tags: ['fabric', 'texture', 'weaving']
  },
  microscopicview: {
    src: require('./assets/microscopicview.jpg'),
    tags: ['science', 'microscope', 'closeup', 'naturalphilosophy', 'royalsociety']
  },
  rubble: {
    src: require('./assets/rubble.jpg'),
    tags: ['destruction', 'rubble', 'ruins']
  },
  rope: {
    src: require('./assets/rope.jpg'),
    tags: ['rope', 'tool', 'equipment']
  },
  tropicalrainforest: {
    src: require('./assets/tropicalrainforest.jpg'),
    tags: ['outdoor', 'rainforest', 'nature']
  },
  forestfloor: {
    src: require('./assets/forestfloor.jpg'),
    tags: ['outdoor', 'forest', 'nature']
  },
  foraging: {
    src: require('./assets/foraging.jpg'),
    tags: ['outdoor', 'foraging', 'nature']
  },
  berries: {
    src: require('./assets/berries.jpg'),
    tags: ['food', 'berries', 'foraging']
  },
  fungi: {
    src: require('./assets/fungi.jpg'),
    tags: ['nature', 'fungi', 'foraging']
  },
  leaf: {
    src: require('./assets/leaf.jpg'),
    tags: ['plant', 'nature', 'leaf']
  },
  villagechurch: {
    src: require('./assets/villagechurch.jpg'),
    tags: ['church', 'village', 'religion']
  },
  armedsoldiernight: {
    src: require('./assets/armedsoldiernight.jpg'),
    tags: ['soldier', 'night', 'military']
  },
  adobewindows: {
    src: require('./assets/adobewindows.jpg'),
    tags: ['architecture', 'adobe', 'windows']
  },
  corn: {
    src: require('./assets/corn.jpg'),
    tags: ['food', 'corn', 'agriculture']
  },
  cookingpot: {
    src: require('./assets/cookingpot.jpg'),
    tags: ['kitchen', 'pot', 'cooking']
  },
  well: {
    src: require('./assets/well.jpg'),
    tags: ['well', 'water', 'village']
  },
  family: {
    src: require('./assets/family.jpg'),
    tags: ['people', 'family', 'home']
  },
  peddler: {
    src: require('./assets/peddler.jpg'),
    tags: ['market', 'peddler', 'outdoor']
  },
  mexicotown: {
    src: require('./assets/mexicotown.jpg'),
    tags: ['town', 'Mexico City', 'architecture']
  },
  book: {
    src: require('./assets/book.jpg'),
    tags: ['book', 'knowledge', 'study']
  },
  pitcher: {
    src: require('./assets/pitcher.jpg'),
    tags: ['kitchen', 'vessel', 'water']
  },
  quillink: {
    src: require('./assets/quillink.jpg'),
    tags: ['writing', 'quill', 'ink']
  },
  manila: {
    src: require('./assets/manila.jpg'),
    tags: ['city', 'Manila', 'travel', 'Philippines']
  },
  china: {
    src: require('./assets/china.jpg'),
    tags: ['city', 'China', 'travel']
  },
  europe: {
    src: require('./assets/europe.jpg'),
    tags: ['city', 'Europe', 'travel', 'london']
  },
  india: {
    src: require('./assets/india.jpg'),
    tags: ['city', 'India', 'travel', 'cochin']
  },
  asiancity: {
    src: require('./assets/asiancity.jpg'),
    tags: ['city', 'Asia', 'China', 'Philippines']
  },
  middleeastcity: {
    src: require('./assets/middleeastcity.jpg'),
    tags: ['city', 'Middle East', 'Muslim']
  },
  europeancity: {
    src: require('./assets/europeancity.jpg'),
    tags: ['city', 'Europe', 'London', 'Paris']
  },
  lizard: {
    src: require('./assets/lizard.jpg'),
    tags: ['animal', 'lizard', 'chameleon']
  },
  windyship: {
    src: require('./assets/windyship.jpg'),
    tags: ['ship', 'wind', 'sea']
  },
  prophecy: {
    src: require('./assets/prophecy.jpg'),
    tags: ['prophecy', 'vision', 'supernatural']
  },
  arrivalinnewland: {
    src: require('./assets/arrivalinnewland.jpg'),
    tags: ['symbolic', 'arrival', 'new land']
  },
  decision: {
    src: require('./assets/decision.jpg'),
    tags: ['symbolic', 'decision', 'judgement', 'Janus']
  },
  angel: {
    src: require('./assets/angel.jpg'),
    tags: ['symbolic', 'religion', 'angel', 'supernatural']
  },
  dream: {
    src: require('./assets/dream.jpg'),
    tags: ['symbolic', 'dream', 'vision', 'supernatural', 'prophecy']
  },
  dragon: {
    src: require('./assets/dragon.jpg'),
    tags: ['symbolic', 'myth', 'dragon', 'creature']
  },
  mumia: {
    src: require('./assets/mumia.jpg'),
    tags: ['mummy', 'mumia', 'alchemicalsample', 'chemicalsample']
  },
  governmentbuilding: {
    src: require('./assets/governmentbuilding.jpg'),
    tags: ['building', 'government', 'authority']
  },
  writer: {
    src: require('./assets/writer.jpg'),
    tags: ['writer', 'quill', 'author']
  },
  lawyers: {
    src: require('./assets/lawyers.jpg'),
    tags: ['law', 'court', 'lawyers']
  },
  court: {
    src: require('./assets/court.jpg'),
    tags: ['court', 'law', 'justice']
  },
  azteccodex: {
    src: require('./assets/azteccodex.jpg'),
    tags: ['Aztec', 'codex', 'history']
  },
  tropicalmarket: {
    src: require('./assets/tropicalmarket.jpg'),
    tags: ['market', 'tropical', 'trade']
  },
  candle: {
    src: require('./assets/candle.jpg'),
    tags: ['candle', 'light', 'interior']
  },
  palace: {
    src: require('./assets/palace.jpg'),
    tags: ['building', 'palace', 'authority']
  },
  shipexterior: {
    src: require('./assets/shipexterior.jpg'),
    tags: ['ship', 'exterior', 'shipatsea', 'waves']
  },
  traveler: {
    src: require('./assets/traveler.jpg'),
    tags: ['traveler', 'journey', 'manwearinghat']
  },
  coins: {
    src: require('./assets/coins.jpg'),
    tags: ['coins', 'money', 'currency', 'reales']
  },
  manhand: {
    src: require('./assets/manhand.jpg'),
    tags: ['hand', 'man', 'diagnosis']
  },
  womanhand: {
    src: require('./assets/womanhand.jpg'),
    tags: ['hand', 'woman', 'diagnosis']
  },
  bark: {
    src: require('./assets/bark.jpg'),
    tags: ['bark', 'cinchona', 'medicinal', 'medicinebark']
  },
   nutmeg: {
    src: require('./assets/nutmeg.jpg'),
    tags: ['spice', 'ingredient', 'nutmeg']
  },
  unguents: {
    src: require('./assets/unguents.jpg'),
    tags: ['medicine', 'unguent', 'ointment']
  },
  newspaincityoutsidemexico: {
    src: require('./assets/newspaincityoutsidemexico.jpg'),
    tags: ['city', 'outdoor', 'urban']
  },
  citybackstreet: {
    src: require('./assets/citybackstreet.jpg'),
    tags: ['street', 'urban', 'city']
  },
  palacedoor: {
    src: require('./assets/palacedoor.jpg'),
    tags: ['palace', 'door', 'building']
  },
  abandonedhouseday: {
    src: require('./assets/abandonedhouseday.jpg'),
    tags: ['house', 'abandoned', 'outdoor']
  },
  villagelaneday: {
    src: require('./assets/villagelaneday.jpg'),
    tags: ['village', 'lane', 'outdoor']
  },
  textilemaking: {
    src: require('./assets/textilemaking.jpg'),
    tags: ['craft', 'textile', 'artisan']
  },
  backalleynight: {
    src: require('./assets/backalleynight.jpg'),
    tags: ['alley', 'night', 'urban']
  },
  backalleyday: {
    src: require('./assets/backalleyday.jpg'),
    tags: ['alley', 'day', 'urban']
  },
  ruinedpalacenight: {
    src: require('./assets/ruinedpalacenight.jpg'),
    tags: ['palace', 'ruins', 'night']
  },
  marketstallnight: {
    src: require('./assets/marketstallnight.jpg'),
    tags: ['market', 'night', 'stall']
  },
  clutteredhouseorshop: {
    src: require('./assets/clutteredhouseorshop.jpg'),
    tags: ['shop', 'cluttered', 'indoor', 'clutteredhouse', 'hoarder']
  },
  nightwarehouse: {
    src: require('./assets/nightwarehouse.jpg'),
    tags: ['warehouse', 'night', 'building']
  },
   familydusk: {
    src: require('./assets/familydusk.jpg'),
    tags: ['family', 'dusk', 'outdoor']
  },
  childevening: {
    src: require('./assets/childevening.jpg'),
    tags: ['child', 'evening', 'outdoor']
  },
  femalescholar: {
    src: require('./assets/femalescholar.jpg'),
    tags: ['scholar', 'woman', 'study']
  },
  eyecloseup: {
    src: require('./assets/eyecloseup.jpg'),
    tags: ['eye', 'closeup', 'person']
  },
  shipdeckdawnorsunset: {
    src: require('./assets/shipdeckdawnorsunset.jpg'),
    tags: ['ship', 'deck', 'dawn', 'sunset']
  },
  seacaptain: {
    src: require('./assets/seacaptain.jpg'),
    tags: ['captain', 'sea', 'man']
  },
  shipdawntropics: {
    src: require('./assets/shipdawntropics.jpg'),
    tags: ['ship', 'dawn', 'tropics']
  },
  palaceentryway: {
    src: require('./assets/palaceentryway.jpg'),
    tags: ['palace', 'entryway', 'building']
  },
  houseofamadman: {
    src: require('./assets/houseofamadman.jpg'),
    tags: ['house', 'madman', 'interior']
  },
  indigenoushutinteriorday: {
    src: require('./assets/indigenoushutinteriorday.jpg'),
    tags: ['hut', 'indigenous', 'interior', 'day']
  },
  shipembarkingoranchoring: {
    src: require('./assets/shipembarkingoranchoring.jpg'),
    tags: ['ship', 'embark', 'anchor']
  },
  embroidering: {
    src: require('./assets/embroidering.jpg'),
    tags: ['craft', 'woman', 'embroidering']
  },
  womanswork: {
    src: require('./assets/womanswork.jpg'),
    tags: ['work', 'woman', 'labor']
  },
  toymaker: {
    src: require('./assets/toymaker.jpg'),
    tags: ['toymaker', 'craft', 'workshop']
  },
  villacourtyard: {
    src: require('./assets/villacourtyard.jpg'),
    tags: ['villa', 'courtyard', 'outdoor']
  },
  italy: {
    src: require('./assets/italy.jpg'),
    tags: ['italy', 'city', 'europe']
  },
  houseinindies: {
    src: require('./assets/houseinindies.jpg'),
    tags: ['house', 'indies', 'colonial']
  },
  largehouseintown: {
    src: require('./assets/largehouseintown.jpg'),
    tags: ['house', 'town', 'urban']
  },
  houseintown: {
    src: require('./assets/houseintown.jpg'),
    tags: ['house', 'urban', 'town']
  },
  naturalphilosopherlaboratory: {
    src: require('./assets/naturalphilosopherlaboratory.jpg'),
    tags: ['laboratory', 'natural philosopher', 'study']
  },
  workshop: {
    src: require('./assets/workshop.jpg'),
    tags: ['workshop', 'craft', 'tools']
  },
  marketplacedawn: {
    src: require('./assets/marketplacedawn.jpg'),
    tags: ['market', 'dawn', 'outdoor']
  },
  dutchempire: {
    src: require('./assets/dutchempire.jpg'),
    tags: ['dutch', 'empire', 'map']
  },
  newspaincityoutsidemexico: {
    src: require('./assets/newspaincityoutsidemexico.jpg'),
    tags: ['city', 'outdoor', 'new spain']
  },
  motherandchildrentwilight: {
    src: require('./assets/motherandchildrentwilight.jpg'),
    tags: ['mother', 'children', 'twilight']
  },
  motherandchildrenday: {
    src: require('./assets/motherandchildrenday.jpg'),
    tags: ['mother', 'children', 'day']
  },
   tropicalplantation: {
    src: require('./assets/tropicalplantation.jpg'),
    tags: ['plantation', 'tropical', 'outdoor']
  },
  maritimeentrepottropics: {
    src: require('./assets/maritimeentrepottropics.jpg'),
    tags: ['maritime', 'entrepot', 'tropics', 'port']
  },
  europestreetday: {
    src: require('./assets/europestreetday.jpg'),
    tags: ['Europe', 'street', 'day', 'outdoor']
  },
  sunsetshopjoao: {
    src: require('./assets/sunsetshopjoao.jpg'),
    tags: ['shop', 'sunset', 'outdoor', 'Joao']
  },
  dawnshopjoao: {
    src: require('./assets/dawnshopjoao.jpg'),
    tags: ['shop', 'dawn', 'outdoor', 'Joao']
  },
  bannerimagegame: {
    src: require('./assets/bannerimagegame.jpg'),
    tags: ['banner', 'game', 'image']
  },
  cubacity: {
    src: require('./assets/cubacity.jpg'),
    tags: ['Caribbean', 'city', 'outdoor', 'day', 'Cuba', 'Spanish American port']
  },
  shipatdocks: {
    src: require('./assets/shipatdocks.jpg'),
    tags: ['ship', 'docks', 'port', 'outdoor']
  },
  boston: {
    src: require('./assets/boston.jpg'),
    tags: ['Boston', 'city', 'outdoor']
  },
  frontierbritishamerica: {
    src: require('./assets/frontierbritishamerica.jpg'),
    tags: ['frontier', 'British America', 'outdoor']
  },
  rainforestday: {
    src: require('./assets/rainforestday.jpg'),
    tags: ['rainforest', 'nature', 'day', 'outdoor']
  },
  frontieroutposttexas: {
    src: require('./assets/frontieroutposttexas.jpg'),
    tags: ['frontier', 'outpost', 'Texas', 'outdoor']
  },
  thievestalkingnight: {
    src: require('./assets/thievestalkingnight.jpg'),
    tags: ['thieves', 'stalking', 'night', 'outdoor']
  },
  britishamericanight: {
    src: require('./assets/britishamericanight.jpg'),
    tags: ['British America', 'night', 'outdoor']
  },
  europenight: {
    src: require('./assets/europenight.jpg'),
    tags: ['Europe', 'night', 'street', 'outdoor']
  },


  // Quest images
  quest0a: require('./assets/quest0a.jpg'),
  quest0b: require('./assets/quest0b.jpg'),
  quest0c: require('./assets/quest0c.jpg'),
  quest0d: require('./assets/quest0d.jpg'),
  quest0f: require('./assets/quest0f.jpg'),
  quest1a: require('./assets/quest1a.jpg'),
  quest1b: require('./assets/quest1b.jpg'),
  quest1c: require('./assets/quest1c.jpg'),
  quest1d: require('./assets/quest1d.jpg'),
  quest2a: require('./assets/quest2a.jpg'),
  quest2b: require('./assets/quest2b.jpg'),
  quest2c: require('./assets/quest2c.jpg'),
  quest2d: require('./assets/quest2d.jpg'),
  quest3a: require('./assets/quest3a.jpg'),
  quest3b: require('./assets/quest3b.jpg'),
  quest3c: require('./assets/quest3c.jpg'),
  quest3d: require('./assets/quest3d.jpg'),
  quest4a: require('./assets/quest4a.jpg'),
  quest4b: require('./assets/quest4b.jpg'),
  quest4c: require('./assets/quest4c.jpg'),
  quest4d: require('./assets/quest4d.jpg'),
  quest5a: require('./assets/quest5a.jpg'),
  quest5b: require('./assets/quest5b.jpg'),
  quest5c: require('./assets/donluis.jpeg'),
  quest5d: require('./assets/donluis.jpeg'),

  // Dream images
 dream1: require('./assets/dreams/dream1.jpg'),
dream4: require('./assets/dreams/dream4.jpg'),
dream5: require('./assets/dreams/dream5.jpg'),
dream6: require('./assets/dreams/dream6.jpg'),
dream8: require('./assets/dreams/dream8.jpg'),
dream10: require('./assets/dreams/dream10.jpg'),
    
};

export default imageMap;
