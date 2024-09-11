


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
        pdf: 'camphor.pdf'
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
        pdf: 'chamomile.pdf'

    },
    {
        id: 3, 
        name: 'Crude Opium',
        latinName: 'Opium crudum',
        spanishName: 'Opio Crudo',
        price: 6,
        quantity: 3,
        humoralQualities: 'Cold & Dry',
        medicinalEffects: 'Powerful pain relief, sedative, and treatment for cough and diarrhea.',
        description: 'Dried latex obtained from the opium poppy. Most potent reliever of pain known.',
        emoji: '⚫️',
        citation: 'Benjamin Breen, *The Age of Intoxication* (Penn, 2019)',
        pdf: 'opium.pdf'
    },
    {
        id: 4, 
        name: 'Powdered millipedes',
        latinName: 'Pulvis millepedum',
        spanishName: 'Polvo de Milpiés',
        price: 3,
        quantity: 1,
        humoralQualities: 'Warm & Dry',
        medicinalEffects: 'For ear pain and inflammation.',
        description: 'Powdered millipedes:  well known as ready cures for many sorts of ear pain and inflammation.',
        emoji: '🐛',
        pdf: '/assets/pdfs/BuccaneerEthnography.pdf'
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
        pdf: 'pdfs/BuccaneerEthnography.pdf'
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
        pdf: 'pdfs/BuccaneerEthnography.pdf'
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
        description: 'It stings... but it also heals.',
        emoji: '🌾',
        pdf: '/assets/pdfs/BuccaneerEthnography.pdf'
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
        pdf: '/assets/pdfs/BuccaneerEthnography.pdf'
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
        pdf: '/assets/pdfs/BuccaneerEthnography.pdf'
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
        pdf: '/assets/pdfs/BuccaneerEthnography.pdf'
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
        pdf: '/assets/pdfs/BuccaneerEthnography.pdf'
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
        description: 'Sugar candies shipped from Seville. Extremely useful for compounding with noxious medicines.',
        emoji: '🍬',
        pdf: '/assets/pdfs/BuccaneerEthnography.pdf'
    }
];

// Define Mumia as a potential inventory item, but not part of initial inventory
const potentialInventoryItems = {
    mumia: {
        id: 13, 
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
