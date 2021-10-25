const TeleBot = require('telebot');
const Api = require("./utils/api");
const apiMovie = new Api();
const fetch = require("node-fetch");

const ngrok = require('ngrok');
const mongoose = require("mongoose");
const UserSchema = require("./database/schema/User");
 require("dotenv").config();
 console.log(apiMovie.filmSearch)
 const bot = new TeleBot({
    token:process.env.TELEGRAM_BOT_TOKEN,
    usePlugins:["commandButton"]
});
 mongoose.connect('mongodb://localhost:27017/telegrambot');
 const yearArray = ["2002","2003"];
 const filter = {
     country:{
         id:"",
         country:""
     },
     genre:{
         id:"",
         genre:""
     },
     actor:"",
     director:"",
     release:""
 }
 const previousBotMessage = new Map();
 const pagginatorForCollection = new Map();
 const paginatorInformation = [ [
    [
        bot.inlineButton('❤️ Любовь', {callback: '/hello'}),bot.inlineButton("🧛‍♀️ Хиппи", {callback: '/hello'})
    ],
    [
        bot.inlineButton('🧛‍♀️ Вампиры', {callback: '/hello'}),bot.inlineButton("🧟 Зомби", {callback: '/hello'})
    ],
    [
        bot.inlineButton('🌪 Катастрофы', {callback: '/hello'}),bot.inlineButton("🌑 Конец света", {callback: '/hello'})
    ],
    [
        bot.inlineButton('🤠 Вестерны', {callback: '/hello'}),bot.inlineButton("👄 Самые сексуальные", {callback: '/hello'})
    ],
    [
        bot.inlineButton('💃 Танцы', {callback: '/hello'}),bot.inlineButton("🎼 Музыкальные", {callback: '/hello'})
    ],
    [
        bot.inlineButton('🐲 Драконы', {callback: '/hello'}),bot.inlineButton("🦕 Динозавры", {callback: '/hello'})
    ],
    [
        bot.inlineButton('🐶 Животные', {callback: '/hello'}),bot.inlineButton("🦈 Акулы", {callback: '/hello'})
    ],
    [
        bot.inlineButton('🚘 Автомобили', {callback: '/hello'}),bot.inlineButton("🛵 Мотоциклы", {callback: '/hello'})
    ],
    [
        bot.inlineButton('⛺️ Путешествия и туризм', {callback: '/hello'}),bot.inlineButton("💞 Романтические комедии", {callback: '/hello'})
    ],
    [
        bot.inlineButton('⚽️ Футбол', {callback: '/hello'}),bot.inlineButton("🏈 Регби", {callback: '/hello'})
    ],
    [
        bot.inlineButton('➡️', {callback: '/plus'})
    ],
],
[
    [
        bot.inlineButton('⚾️ Бейсбол', {callback: '/hello'}),bot.inlineButton("🏀 Баскетбол", {callback: '/hello'})
    ],
    [
        bot.inlineButton('🏂 Сноуборд', {callback: '/hello'}),bot.inlineButton("🏄‍♀️ Сёрфинг", {callback: '/hello'})
    ],
    [
        bot.inlineButton('🎾 Тенис', {callback: '/hello'}),bot.inlineButton("🏃🏻‍♀️ Конец света", {callback: '/hello'})
    ],
    [
        bot.inlineButton('🤼‍♀️ Единоборства', {callback: '/hello'}),bot.inlineButton("🥊 Бокс", {callback: '/hello'})
    ],
    [
        bot.inlineButton('🏒 Хоккей', {callback: '/hello'}),bot.inlineButton("🤸‍♀️ Гимнастика", {callback: '/hello'})
    ],
    [
        bot.inlineButton('🏴‍☠️ Пираты', {callback: '/hello'}),bot.inlineButton("👺 Дикие племена", {callback: '/hello'})
    ],
    [
        bot.inlineButton('👩🏻‍🚀 Великие личности', {callback: '/hello'}),bot.inlineButton("🎯 Мотивационные", {callback: '/hello'})
    ],
    [
        bot.inlineButton('🤖 Роботы', {callback: '/hello'}),bot.inlineButton("🦸‍♂️ По комиксам", {callback: '/hello'})
    ],
    [
        bot.inlineButton('👶 Для детей', {callback: '/hello'}),bot.inlineButton("👼🏻 Мультфильмы", {callback: '/hello'})
    ],
    [
        bot.inlineButton('🔫 Коммедийные боевики', {callback: '/hello'}),bot.inlineButton("👨‍👩‍👦‍👦 Семейные комедии", {callback: '/hello'})
    ],
    [
        bot.inlineButton('⬅️', {callback: '/minus'}),bot.inlineButton('➡️', {callback: '/plus'})
    ],
],
[
    [
        bot.inlineButton('📺 Отечественные новогодние', {callback: '/hello'}),bot.inlineButton("🎅 Иностранные новогодние", {callback: '/hello'})
    ],
    [
        bot.inlineButton('💥 О великой отечественной', {callback: '/hello'}),bot.inlineButton("🪐 Космос", {callback: '/hello'})
    ],
    [
        bot.inlineButton('👦🏻 Подростки', {callback: '/hello'}),bot.inlineButton("🏫 Школы", {callback: '/hello'})
    ],
    [
        bot.inlineButton('⬅️', {callback: '/minus'})
    ],
]];
bot.on(['/start'], async msg => {
    console.log(msg);
    let user = await UserSchema.findOne({
        channelId:msg.from.id,
        userId:msg.chat.id
    });
    if(!user){
        user = new UserSchema({
        channelId:msg.from.id,
        userId:msg.chat.id
        })
    }
    user.save();
    const replyMarkup = bot.keyboard([
        [
            bot.button('🔎 Найти фильм'),bot.button('🎞 Сериалы')
        ],
        [
            bot.button('🦄 Мультфильмы'),bot.button('🆕 Новинки')
        ],
        [
            bot.button('💫 Коллекция'),bot.button('🌟 Мои списки')
        ],
    ],{resize:true});
    return bot.sendMessage(msg.from.id, `Привет, я *Чуи — самый крупный бот для поиска фильмов и сериалов.*
В моей памяти содержится более 850000 картин, со мной вы всегда найдете что посмотреть!
@kinolug - cамые крутые подборки фильмов.`, {replyMarkup,parseMode:"Markdown"});
});
bot.on(["/plus"] , msg => {
    let number = pagginatorForCollection.get(msg.from.id);
    if(number >= 2) return;
    number++;
    pagginatorForCollection.set(msg.from.id,number);
    const replyMarkup = bot.inlineKeyboard(paginatorInformation[pagginatorForCollection.get(msg.from.id)]);
    return bot.sendMessage(msg.from.id, `*Коллекция фильмов*
Для вашего удобства, я собрал лучшие фильмы и распределил их по рубрикам.
Просто нажмите интересующую категорию и выбирайте фильмы из выпадающего списка 🥰.`, {replyMarkup,parseMode:"Markdown"}).then( mess => {
    if(previousBotMessage.has(mess.chat.id)) bot.deleteMessage(mess.chat.id,previousBotMessage.get(mess.chat.id));
    previousBotMessage.set(mess.chat.id,mess.message_id);
    
});
});
bot.on(["/minus"] , msg => {
    let number = pagginatorForCollection.get(msg.from.id);
    if(number <= 0) return;
    number--;
    pagginatorForCollection.set(msg.from.id,number);
    const replyMarkup = bot.inlineKeyboard(paginatorInformation[pagginatorForCollection.get(msg.from.id)]);
    return bot.sendMessage(msg.from.id, `*Коллекция фильмов*
Для вашего удобства, я собрал лучшие фильмы и распределил их по рубрикам.
Просто нажмите интересующую категорию и выбирайте фильмы из выпадающего списка 🥰.`, {replyMarkup,parseMode:"Markdown"}).then( mess => {
    if(previousBotMessage.has(mess.chat.id)) bot.deleteMessage(mess.chat.id,previousBotMessage.get(mess.chat.id));
    previousBotMessage.set(mess.chat.id,mess.message_id);
    
});
});
bot.on(["/filter"] , msg => {
    
    const replyMarkup = bot.inlineKeyboard([
        [
            bot.inlineButton('🌍 Страна', {inline:"#country "}),bot.inlineButton('🎭 Жанр', {inline:"#genre "}),bot.inlineButton('👤 Актер', {inline:"#actor "})
        ],
        [
            bot.inlineButton('📢 Режиссер', {inline:"#directors "}),bot.inlineButton('📆 Дата выпуска', {inline:"#release "})
        ],
        [
            bot.inlineButton('Очистить фильтр', {callback: '/clear'})
        ],
    ]);
    return bot.sendMessage(msg.from.id, `Укажите условия для фильтра`, {replyMarkup,parseMode:"Markdown"}).then( mess => {
    if(previousBotMessage.has(mess.chat.id)) bot.deleteMessage(mess.chat.id,previousBotMessage.get(mess.chat.id));
    previousBotMessage.set(mess.chat.id,mess.message_id);
    
});
});
bot.on(['text'], msg => {
    //bot.deleteMessage(msg.chat.id, msg.message_id);
    if(msg.text === "🔎 Найти фильм"){
        const replyMarkup = bot.inlineKeyboard([
            [
                bot.inlineButton('🔎 Поиск по названию фильма', {inlineCurrent:""})
            ],
            [
                bot.inlineButton('🔎 Кинопоиск', {callback: '/hello'}),bot.inlineButton('🔎 IMDb', {callback: '/hello'})
            ],
            [
                bot.inlineButton('🎯 Фильтр', {callback: '/filter'})
            ],
        ]);
        return bot.sendMessage(msg.from.id, `**Я помогу найти вам нужный фильм 😉

✅ Выберите «поиск по названию фильма». 
После нажатия, начните вводить название картины.
        
🔝 _Сортировка осуществляется по дате выпуска картины._
        
✅ _Для сортировки по рейтингу КиноПоиска или IMDb,_ *нажмите соответствующую кнопку ниже и начните вводить название фильма.*
Рейтинг основан на оценках пользователей КиноПоиска и IMDb.
В список входят фильмы имеющие более 70000 оценок.
        
✅ *А еще у меня есть чудо-фильтр*
С его помощью, вы сможете сузить круг поиска и найти то, что искали. 
*Например:* Вы знаете режиссёра и/или жанр, год выпуска, страну, актёра. 
Либо вы хотите вывести фильмы по жанру: *аниме, боевики, комедии.*
Фильтр выведет все фильмы, опираясь на входные данные.`, {replyMarkup, parseMode:"Markdown"}).then( mess => {
    if(previousBotMessage.has(mess.chat.id)) bot.deleteMessage(mess.chat.id,previousBotMessage.get(mess.chat.id));
    previousBotMessage.set(mess.chat.id,mess.message_id);
});
    }
    if(msg.text === "🎞 Сериалы"){
        const replyMarkup = bot.inlineKeyboard([
            [
                bot.inlineButton('🍿 NETFLIX', {callback: '/hello'}),bot.inlineButton("🍕 HBO", {callback: '/hello'})
            ],
            [
                bot.inlineButton('🔥 250 лучших сериалов', {callback: '/hello'})
            ],
            [
                bot.inlineButton('🇷🇺 Российские сериалы', {callback: '/hello'})
            ],
            [
                bot.inlineButton('🇯🇵 Азиатские сериалы', {callback: '/hello'})
            ],
            [
                bot.inlineButton('🔎 Поиск по названию сериала', {callback: '/hello'})
            ],
        ]);
        return bot.sendMessage(msg.from.id, `
        *Я помогу найти вам интересный сериал* 😉

Выберите поиск по названию сериала, либо воспользуйтесь нашими подборками.

🔝 _Сортировка сериалов осуществляется по рейтингу КиноПоиска._`, {replyMarkup,parseMode:"Markdown"}).then( mess => {
    if(previousBotMessage.has(mess.chat.id)) bot.deleteMessage(mess.chat.id,previousBotMessage.get(mess.chat.id));
    previousBotMessage.set(mess.chat.id,mess.message_id);
});;
    }
    if(msg.text === "🦄 Мультфильмы"){
        const replyMarkup = bot.inlineKeyboard([
            [
                bot.inlineButton('🦄 Найти мультфильм', {callback: '/hello'})
            ],
        ]);
        return bot.sendMessage(msg.from.id, `*Найди любимый мультфильм*
Как пользоваться:
👉🏻 Нажмите кнопку «Найти мультфильм».
⌨️  Начните вводить название мультфильма, например: #mult Том и Дже...
        
🔝 _Сортировка осуществляется по рейтингу КиноПоиска._`, {replyMarkup, parseMode:"Markdown"}).then( mess => {
    if(previousBotMessage.has(mess.chat.id)) bot.deleteMessage(mess.chat.id,previousBotMessage.get(mess.chat.id));
    previousBotMessage.set(mess.chat.id,mess.message_id);
});;
    }
    if(msg.text === "🆕 Новинки"){
        const replyMarkup = bot.inlineKeyboard([
            [
                bot.inlineButton('👌 Показать фильмы', {callback: '/hello'})
            ],
        ]);
        return bot.sendMessage(msg.from.id, `*Лучшие фильмы, вышедшие в российский кинопрокат за последний год*

🔝 _Сортировка осуществляется по рейтингу КиноПоиска._`, {replyMarkup, parseMode:"Markdown"}).then( mess => {
    if(previousBotMessage.has(mess.chat.id)) bot.deleteMessage(mess.chat.id,previousBotMessage.get(mess.chat.id));
    previousBotMessage.set(mess.chat.id,mess.message_id);
});;
    }
    if(msg.text === "💫 Коллекция"){
       
        pagginatorForCollection.set(msg.chat.id,0)
        const replyMarkup = bot.inlineKeyboard(paginatorInformation[pagginatorForCollection.get(msg.chat.id)]);
        return bot.sendMessage(msg.from.id, `*Коллекция фильмов*
Для вашего удобства, я собрал лучшие фильмы и распределил их по рубрикам.
Просто нажмите интересующую категорию и выбирайте фильмы из выпадающего списка 🥰.`, {replyMarkup,parseMode:"Markdown"}).then( mess => {
    if(previousBotMessage.has(mess.chat.id)) bot.deleteMessage(mess.chat.id,previousBotMessage.get(mess.chat.id));
    previousBotMessage.set(mess.chat.id,mess.message_id);
    
});
    }
    if(msg.text === "🌟 Мои списки"){
        const replyMarkup = bot.inlineKeyboard([
            [
                bot.inlineButton('💫 Буду смотреть', {callback: '/hello'})
            ],
            [
                bot.inlineButton('✅ Мой список', {callback: '/hello'})
            ],
            [
                bot.inlineButton('⤴️Поделиться списком фильмов', {callback: '/hello'})
            ],
        ]);
        return bot.sendMessage(msg.from.id, `*Мои списки фильмов:*
- Список фильмов ожидающие просмотра;
- Мой избранный список;
        
Для того, чтобы поделиться списком избранных фильмов, нажмите «Поделиться списком фильмов»`, {replyMarkup, parseMode:"Markdown"}).then( mess => {
    if(previousBotMessage.has(mess.chat.id)) bot.deleteMessage(mess.chat.id,previousBotMessage.get(mess.chat.id));
    previousBotMessage.set(mess.chat.id,mess.message_id);
});
    }
});

bot.on('inlineQuery', async msg => {

    let query = msg.query;
    query = query.split(" ")
    console.log(query);
    // Create a new answer list object
    const opt = {
        cacheTime: 200,
        nextOffset:64,
        pmText: "Перейти в бота",
        pmParameter: "start"
    };
    const answers = bot.answerList(msg.id, opt);

    // Article
    if(query[0] === "#release")
    {
    answers.addArticle({
        id: '2027',
        title: '2027',
        message_text: ' wd',
    });
    answers.addArticle({
        id: '2026',
        title: '2026',
        message_text: 'wd',
    });
    return bot.answerQuery(answers);
    } else if(query[0] === "#genre"){
        let genres = await apiMovie.getGenresAndCountries();
        console.log(genres.genres);
            genres.genres.map( film => {
                answers.addArticle({
                    id: `g${film.id}`,
                    title: film.genre,
                    message_text: `Вы установили в фильтре жанр ${film.genre}`,
                });
            })
            bot.answerQuery(answers);
        
    } if(query[0] === "#country"){
        let countries = await apiMovie.getGenresAndCountries();
            countries.countries.map( film => {
                answers.addArticle({
                    id: `c${film.id}`,
                    title: film.country,
                    message_text: `Вы установили в фильтре страну ${film.country}`,
                });
            });
            console.log(answers)
            bot.answerQuery(answers).catch(e => console.log(e));
        
    } else {
        apiMovie.searchFilm(query).then(async result => {
            result.films.sort((a,b) => b.year-a.year);
    result.films.map( async film => {
        if(film.rating === null) film.rating = 0;
        if(film.nameRu && film.type === "FILM")
        answers.addArticle({
            id:`${film.filmId}`,
            title: film.nameRu,
            message_text: `*бич*`,
            thumb_url: film.posterUrlPreview,
            description: `${film.rating}`,
        });
    })
    bot.answerQuery(answers);
        })
    }
    //return bot.answerQuery(answers);

});
bot.on('chosenInlineResult', async (userQuery,msg) => {
    if(userQuery.result_id[0] === "g"){
       let userQueryCur =  userQuery.result_id.slice(1);
       let genres = await apiMovie.getGenresAndCountries();
       genres = await  genres.genres.find( find => find.id === parseInt(userQueryCur));
       filter.genre.genre = genres.genre;
       filter.genre.id = genres.id;
       messageSendFilter(userQuery.from.id);
    }
});

const descriptionGenerator = (filmId) => {
    return apiMovie.getInformation(filmId).then( result => {
    
    });
}
const messageSendFilter = (id) => {
    let message = "*Ваш фильтр*";
    if(filter.country.country != "" ) message += "\n*Страна:*" + filter.country.country;
    if(filter.genre.genre != "" ) message += "\n*Жанр:*" + filter.genre.genre;
    if(filter.actor != "" ) message += "\n*Актер:*" + filter.actor;
    if(filter.director != "" ) message += "\n*Режиссер:*" + filter.director;
    if(filter.release != "" ) message += "\n*Дата выпуска:*" + filter.release;
    const replyMarkup = bot.inlineKeyboard([
        [
            bot.inlineButton('🌍 Страна', {inline:"#country "}),bot.inlineButton('🎭 Жанр', {inline:"#genre "}),bot.inlineButton('👤 Актер', {inline:"#actor "})
        ],
        [
            bot.inlineButton('📢 Режиссер', {inline:"#directors "}),bot.inlineButton('📆 Дата выпуска', {inline:"#release "})
        ],
        [
            bot.inlineButton('Очистить фильтр', {callback: '/clear'})
        ],
        [
            bot.inlineButton('Отобразить результаты', {inlineCurrent: '#result '})
        ],
    ]);
    bot.sendMessage(id,message,{replyMarkup,parseMode:"Markdown"}).then( mess => {
        if(previousBotMessage.has(mess.chat.id)) bot.deleteMessage(mess.chat.id,previousBotMessage.get(mess.chat.id));
        previousBotMessage.set(mess.chat.id,mess.message_id);
    });
}
bot.start();