import { ELocales } from '../types/enums';

export const PROGRESSION_LEVELS = [
    { threshold: 100000, key: 'account.userLevels.legend' },
    { threshold: 50000, key: 'account.userLevels.artisan' },
    { threshold: 25000, key: 'account.userLevels.virtuoso' },
    { threshold: 10000, key: 'account.userLevels.specialist' },
    { threshold: 5000, key: 'account.userLevels.practitioner' },
    { threshold: 2500, key: 'account.userLevels.apprentice' },
    { threshold: 0, key: 'account.userLevels.enthusiast' },
];

export const KEEP_GOING_MESSAGES = [
    {
        lang: ELocales.EN,
        options: [
            'Keep the steam going!',
            "You're on a roll!",
            "Don't break the brew!",
            'Consistency is key!',
            'Stay caffeinated, stay focused!',
            'Another day, another cup of progress!',
            'Your streak is heating up!',
            'Perfect timing!',
            'Keep that momentum!',
            'One more day closer to mastery!',
        ],
    },
    {
        lang: ELocales.NL,
        options: [
            'Lekker bezig!',
            'Houd die streak warm!',
            'Je bent goed op dreef!',
            'Niet te stoppen!',
            'Elke dag telt!',
            'Blijf leren!',
            'Je streak wordt steeds sterker!',
            'Zet zo door!',
            'Koffie en discipline!',
            'Op naar de volgende mijlpaal!',
        ],
    },
    {
        lang: ELocales.FR,
        options: [
            'Continuez comme ça !',
            'Gardez le rythme !',
            'Ne cassez pas la série !',
            'La régularité est la clé !',
            'Restez caféiné, restez concentré !',
            'Un jour de plus, un pas de plus !',
            "Votre série s'enflamme !",
            'Timing parfait !',
            'Gardez cet élan !',
            'Un jour de plus vers la maîtrise !',
        ],
    },
];

export const START_STREAK_MESSAGES = [
    {
        lang: ELocales.EN,
        options: [
            'Time to start a new brew!',
            'Ready for your first cup of the week?',
            "Let's get that streak started!",
            'The first step to mastery starts here.',
            'Fresh start, fresh coffee!',
            "Don't let the beans wait!",
            'Your journey continues today.',
            'Time to heat up the machine!',
            'Start your day with a win.',
            'Ready to learn something new?',
        ],
    },
    {
        lang: ELocales.NL,
        options: [
            'Tijd voor een verse start!',
            'Klaar voor je eerste kopje?',
            'Laten we die streak beginnen!',
            'De eerste stap naar meesterschap.',
            'Nieuwe ronde, nieuwe kansen!',
            'Laat de bonen niet wachten!',
            'Je reis gaat vandaag verder.',
            'Tijd om de machine op te warmen!',
            'Begin je dag met een overwinning.',
            'Klaar om iets nieuws te leren?',
        ],
    },
    {
        lang: ELocales.FR,
        options: [
            "C'est l'heure de commencer !",
            'Prêt pour votre première tasse ?',
            'Lançons cette série !',
            'Le premier pas vers la maîtrise.',
            'Nouveau départ, nouveau café !',
            "N'attendez plus !",
            "Votre voyage continue aujourd'hui.",
            'Il est temps de chauffer la machine !',
            'Commencez la journée par une victoire.',
            'Prêt à apprendre quelque chose de nouveau ?',
        ],
    },
];

// const badges = [
//     {
//         status: EProgressStatus.COMPLETED,
//     },
//     {
//         status: EProgressStatus.COMPLETED,
//     },
//     {
//         status: EProgressStatus.COMPLETED,
//     },
//     {
//         status: EProgressStatus.INPROGRESS,
//     },
//     {
//         status: EProgressStatus.LOCKED,
//     },
//     {
//         status: EProgressStatus.LOCKED,
//     },
//     {
//         status: EProgressStatus.LOCKED,
//     },
//     {
//         status: EProgressStatus.LOCKED,
//     },
//     {
//         status: EProgressStatus.LOCKED,
//     },
//     {
//         status: EProgressStatus.LOCKED,
//     },
//     {
//         status: EProgressStatus.LOCKED,
//     },
//     {
//         status: EProgressStatus.LOCKED,
//     },
//     {
//         status: EProgressStatus.LOCKED,
//     },
//     {
//         status: EProgressStatus.LOCKED,
//     },
//     {
//         status: EProgressStatus.LOCKED,
//     },
// ];
