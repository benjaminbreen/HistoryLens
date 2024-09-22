import camphorImage from './assets/camphor.jpg';
import chamomileImage from './assets/chamomile.jpg';
import opiumImage from './assets/poppy.jpg';
import millipedeImage from './assets/millipede.jpg';
import wine from './assets/wine.jpg';
import nettle from './assets/nettle.jpg';
import senna from './assets/senna.jpg';
import rose from './assets/rose.jpg';
import saffron from './assets/saffron.jpg';
import horehound from './assets/horehound.jpg';
import sugar from './assets/sugar.jpg';
import honey from './assets/honey.jpg';
import crab from './assets/crab.jpg';
import sal from './assets/sal.jpg';
import ginger from './assets/ginger.jpg';
import bezoar from './assets/bezoar.jpg';
import coral from './assets/coral.jpg';
import mechoacan from './assets/mechoacan.jpg';
import cochineal from './assets/cochineal.jpg';


const initialInventoryData = [
    {
        id: 1, 
        name: 'Camphor',
        latinName: 'Cinnamomum camphora',
        spanishName: 'Alcanfor',
        price: 4,
        quantity: 2,
        humoralQualities: 'Cold & Moist',
        medicinalEffects: 'Relieves pain, anti-inflammatory, calming.',
        description: 'A fragrant resin obtained from the wood of the aromatic camphor tree. Cooling and resolutive.',
        emoji: '🌿',
        citation: 'Luís Gomes Ferreira, *Erário Mineral.Lisbon* Lisbon, 1735, pg 38.',
        pdf: 'camphor.pdf',
        image: camphorImage
    },
    {
        id: 2, 
        name: 'Chamomile',
        latinName: 'Matricaria chamomilla',
        spanishName: 'Manzanilla',
        price: 3,
        quantity: 30,
        humoralQualities: 'Warm & Dry',
        medicinalEffects: 'Calming, anti-inflammatory, aids digestion.',
        description: 'Used to reduce inflammation, soothe digestive issues, and calm the nerves.',
        emoji: '🌼',
         citation: 'Curvo Semmedo, João. *bservaçoens medicas doutrinaes de cem casos gravissimos.* Lisbon: 1707, pg 151, available at https://www.google.com/books/edition/Observa%C3%A7oens_medicas_doutrinaes_de_cem/QJ5dAAAAcAAJ?hl=en&gbpv=1&pg=PA151&printsec=frontcover',
        pdf: 'chamomile.pdf',
        image: chamomileImage

    },
    {
        id: 3, 
        name: 'Opium',
        latinName: 'Opium crudum',
        spanishName: 'Opio Crudo',
        price: 6,
        quantity: 3,
        humoralQualities: 'Cold & Dry',
        medicinalEffects: 'Powerful pain relief, sedative, and treatment for cough and diarrhea.',
        description: 'Dried latex obtained from the opium poppy. Most potent reliever of pain known.',
        emoji: '⚫️',
        citation: 'Benjamin Breen, *The Age of Intoxication* (Penn, 2019)',
        pdf: 'opium.pdf',
        image: opiumImage
    },
    {
        id: 4, 
        name: 'Powdered millipedes',
        latinName: 'Pulvis millepedum',
        spanishName: 'Polvo de Mil piés',
        price: 3,
        quantity: 1,
        humoralQualities: 'Warm & Dry',
        medicinalEffects: 'For ear pain and inflammation.',
        description: 'Powdered millipedes:  well known as ready cures for many sorts of ear pain and inflammation.',
        emoji: '🐛',
        pdf: 'millipedes.pdf',
        citation: 'Henry Banyer, *Pharmacopoeia Pauperum Or, The Hospital Dispensatory* (1718), pg 37',
        image: millipedeImage

    },
    {
        id: 5, 
        name: 'Saffron',
        latinName: 'Crocus sativus',
        spanishName: 'Azafrán',
        price: 15,
        quantity: 2,
        humoralQualities: 'Warm & Dry',
        medicinalEffects: 'Used to alleviate melancholy, improve digestion, and treat coughs.',
        description: 'Extremely valuable for treating gripes of all sorts.',
        emoji: '🌸',
        pdf: 'saffron.pdf',
        citation: 'Henry Banyer, *Pharmacopoeia Pauperum Or, The Hospital Dispensatory* (1718), pg 74',
        image: saffron
    },
    {
        id: 6, 
        name: 'White Horehound',
        latinName: 'Marrubium vulgare',
        spanishName: 'Marrubio Blanco',
        price: 3,
        quantity: 1,
        humoralQualities: 'Warm & Dry',
        medicinalEffects: 'Expectorant, bitter tonic, aids in respiratory issues.',
        description: 'Bitter... very bitter. Stimulates digestion and helps coughs.',
        emoji: '🍥',
        pdf: 'horehound.pdf',
        citation: 'John French, *The London-Distiller* (London, 1667), pg. 19',
        image: horehound
    },
    {
        id: 7, 
        name: 'Nettle',
        latinName: 'Urtica dioica',
        spanishName: 'Ortiga',
        price: 1,
        quantity: 5,
        humoralQualities: 'Warm & Dry',
        medicinalEffects: 'Anti-inflammatory, diuretic, treats allergies and arthritis.',
        description: 'It stings... but it also heals. Effective when used topically.',
        emoji: '🌾',
        pdf: 'nettle.pdf',
        image: nettle
    },
    {
        id: 8, 
        name: 'Powdered crab\'s eyes',
        latinName: 'Oculi cancrorum',
        spanishName: 'Ojos de Cangrejo',
        price: 4,
        quantity: 1,
        humoralQualities: 'Cold & Dry',
        medicinalEffects: 'Antacid and treatment for kidney stones.',
        description: 'Ground-up crab\'s eyes from the Indies. A singular remedy.',
        emoji: '🦀',
        pdf: 'crabseyes.pdf',
        citation: 'John French, *The Art of Distillation* (London, 1651), pg. 126',
        image: crab
    },
    {
        id: 9,
        name: 'Quicksilver',
        latinName: 'Argentum vivum',
        spanishName: 'Azogue',
        price: 1,
        quantity: 8,
        humoralQualities: 'Cold & Moist',
        medicinalEffects: 'Treatment for syphilis and skin conditions.',
        description: 'Quicksilver, the metal most beloved of alchemists. Commonly used for treating the French Pox.',
        emoji: '⚗️',
        pdf: 'quicksilver.pdf',
        citation: 'Jean de Renou, *A Medicinal Dispensatory Containing the Whole Body of Physick,* translated by Richard Tomlinson (London, 1657)'
    },
    {
        id: 10, 
        name: 'Rose Water',
        latinName: 'Aqua Rosae',
        spanishName: 'Agua de Rosas',
        price: 3,
        quantity: 9,
        humoralQualities: 'Cold & Moist',
        medicinalEffects: 'Soothes inflammation, cools the body, and calms the nerves.',
        description: 'Mixes well with almost anything. Useful in the treatment of melancholia.',
        emoji: '🌹',
        pdf: 'rosewater.pdf',
        citation: 'John French, *The Art of Distillation* (London, 1651), pgs. 19-21',
        image: rose
    },
    {
        id: 11, 
        name: 'Senna',
        latinName: 'Senna alexandrina',
        spanishName: 'Sena',
        price: 2,
        quantity: 2,
        humoralQualities: 'Warm & Dry',
        medicinalEffects: 'Laxative, cleanses the bowels, relieves constipation.',
        description: 'Most effective for purging of the bowels.',
        emoji: '🍂',
        pdf: 'senna.pdf',
        citation: 'Jean de Renou, *A Medicinal Dispensatory Containing the Whole Body of Physick,* translated by Richard Tomlinson (London, 1657)',
        image: senna
    },
    {
        id: 12, 
        name: 'Sugar',
        latinName: 'Saccharum',
        spanishName: 'Azúcar',
        price: 5,
        quantity: 4,
        humoralQualities: 'Warm & Dry',
        medicinalEffects: 'Used to soothe coughs, treat wounds, and improve digestion.',
        description: 'Sugar shipped from Seville. Useful for confectioning with noxious medicines to make juleps and treacles.',
        emoji: '🍬',
        pdf: 'sugar.pdf',
        citation: 'Jean de Renou, *A Medicinal Dispensatory Containing the Whole Body of Physick,* translated by Richard Tomlinson (London, 1657)',
        image: sugar
    },
{
    id: 13,
    name: 'Honey',
    latinName: 'Mel',
    spanishName: 'Miel',
    price: 1,
    quantity: 2,
    humoralQualities: 'Warm & Moist',
    medicinalEffects: 'Used to treat coughs, wounds, and digestive issues; also known for its ability to soothe inflammation and promote healing.',
    description: 'Golden honey harvested from local hives. Crucial ingredient in unguents via confectioning.',
    emoji: '🍯',
    pdf: 'honey.pdf',
    citation: 'John Woodall, *The Surgion’s Mate* (1617)',
    image: honey
},
{
    id: 14,
    name: 'Spanish Wine',
    latinName: 'Vinum',
    spanishName: 'Vino de España',
    price: 1,
    quantity: 5,
    humoralQualities: 'Warm & Dry',
    medicinalEffects: 'Used to aid digestion, invigorate the body, and treat wounds.',
    description: 'Sherry wine imported from southern Spain. Used for decoction or distillation with other drugs, or as an enema.',
    emoji: '🍷',
    pdf: 'wine.pdf',
    citation: 'George Bate, Pharmacopœia Bateana (London, 1694)',
    image: wine
},
{
    id: 15,
    name: 'Sal Ammoniac',
    latinName: 'Sal Ammoniacum',
    spanishName: 'Sal Amónica',
    price: 3,
    quantity: 4,
    humoralQualities: 'Cold & Dry',
    medicinalEffects: 'Used to dissolve phlegm, treat respiratory ailments, and as a purgative for excess humors.',
    description: 'A crystalline salt often used in alchemy. Try distilling or calcinating with other drugs.',
    emoji: '🧂',
    pdf: '/assets/pdfs/salammoniacmedicinaluses.pdf',
    citation: 'Nicholas Culpeper, The English Physician Enlarged (1653)',
    image: sal
},
 {
id: 16, 
        name: 'Ginger',
        latinName: 'Zingiber officinale',
        spanishName: 'Jengibre',
        price: 5,
        quantity: 4,
        humoralQualities: 'Warm & Dry',
        medicinalEffects: 'Stimulates digestion, relieves nausea, and soothes coughs.',
        description: 'A pungent spice used widely to stimulate digestion and cure respiratory ailments.',
        emoji: '🫚',
    pdf: 'ginger.pdf',
    citation: 'John Parkinson, *Theatrum Botanicum* (London, 1640), pg 1613',
    image: ginger
},
   {
        id: 17, 
        name: 'Bezoar Stone',
        latinName: 'Bezoar',
        spanishName: 'Piedra Bezoar',
        price: 50,
        quantity: 1,
        humoralQualities: 'Cold & Dry',
        medicinalEffects: 'Antidote to poisons, treats fevers, and balances the humors.',
        description: 'A rare and prized stone found in the stomachs of certain animals, known for its use as a universal antidote.',
        emoji: '🪨',
        pdf: 'bezoar.pdf',
        citation: 'José de Acosta, *Natural and Moral History of the Indies* (1604), p. 293. Link: https://www.google.com/books/edition/The_Natural_Moral_History_of_the_Indies/BXwRAwAAQBAJ?hl=en&gbpv=1&dq=bezoar&pg=PA293&printsec=frontcover',
        image: bezoar
    },
      {
        id: 18, 
        name: 'Red Coral',
        latinName: 'Corallium rubrum',
        spanishName: 'Coral Rojo',
        price: 12,
        quantity: 1,
        humoralQualities: 'Cold & Dry',
        medicinalEffects: 'Used in tonics to treat palpitations, bleeding, and melancholy.',
        description: 'Branches of red coral, prized for their ability to fortify the heart and calm nervous conditions.',
        emoji: '🪸',
        pdf: 'coral.pdf',
        citation: 'Jean de Renou, *A Medicinal Dispensatory Containing the Whole Body of Physick* (1657), pg 55',
        image: coral
    },
    {
    id: 19, 
    name: 'Mechoacan',
    latinName: 'Convolvulus mechoacana',
    spanishName: 'Mechoacán',
    price: 6,
    quantity: 3,
    humoralQualities: 'Cold & Dry',
    medicinalEffects: 'Powerful purgative, treats dropsy, and cleanses the bowels.',
    description: 'A root from New Spain similar to Jalap, widely used as a strong purgative.',
    emoji: '🍠',
    pdf: 'mechoacan.pdf',
    citation: 'make the citations be Pierre Pomet, *Complete History of Drugs*, London 1748, pg 32, url: https://www.google.com/books/edition/A_Complete_History_of_Drugs_Written_in_F/t2fHVm6UGJ4C?hl=en&gbpv=1&pg=PT1&printsec=frontcover',
    image: mechoacan
},
{
    id: 20, 
    name: 'Cochineal',
    latinName: 'Dactylopius coccus',
    spanishName: 'Cochinilla',
    price: 8,
    quantity: 2,
    humoralQualities: 'Warm & Dry',
    medicinalEffects: 'Used to treat fevers, sore throats, and to stop bleeding.',
    description: 'Dried female cochineal insects, valued for their vibrant red dye and medicinal properties.',
    emoji: '🐞',
    pdf: 'cochineal.pdf',
    citation: 'make the citations be Pierre Pomet, *omplete History of Drugs*, London 1748, pg 15, url: https://www.google.com/books/edition/A_Complete_History_of_Drugs_Written_in_F/t2fHVm6UGJ4C?hl=en&gbpv=1&pg=PA14&printsec=frontcover',
    image: cochineal
},
];

// Define Mumia as a potential inventory item, but not part of initial inventory
const potentialInventoryItems = {
    mumia: {
        id: 99, 
        name: 'Mumia',
        latinName: 'Mumia vera',
        spanishName: 'Mumia',
        price: 40,
        quantity: 1, // This will be given to Maria during the quest
        humoralQualities: 'Warm & Moist',
        medicinalEffects: 'For bruises, internal bleeding, and general healing.',
        description: 'The remains of Egyptian mummies. Potent healing properties. But can it be trusted to be real?',
        emoji: '⚰️',
        pdf: '/assets/pdfs/BuccaneerEthnography.pdf'
    },
};

export { initialInventoryData, potentialInventoryItems };
