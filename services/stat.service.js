export default {
    name: "stat",

    actions: {
        get: {
            cache: {
                ttl: 3600,
            },
            async handler(ctx) {
                const [position, ezwow, cookies, characters, racesValue, classesValue] = await Promise.all([
                    this.broker.cacher.get("start.point"),
                    ctx.call("ezwow.stat"),
                    ctx.call("cookie.count"),
                    ctx.call("character.count"),
                    ctx.call("character.races"),
                    ctx.call("character.classes"),
                ]);

                const races = [];
                const racesName = [
                    "Человек",
                    "Дворф",
                    "Найтэльф",
                    "Гном",
                    "Дреней",
                    "Орк",
                    "Нежить",
                    "Таурен",
                    "Тролль",
                    "Бладэльф",
                ];

                for (let i = 0; i < racesName.length; i++) {
                    races.push({ id: i, name: racesName[i], value: racesValue[i], width: 0 });
                }

                const classes = [];
                const classesName = [
                    "Охотник",
                    "Чернокнижник",
                    "Жрец",
                    "Паладин",
                    "Маг",
                    "Разбойник",
                    "Друид",
                    "Шаман",
                    "Воин",
                    "ДК",
                ];

                for (let i = 0; i < classesName.length; i++) {
                    classes.push({ id: i, name: classesName[i], value: classesValue[i], width: 0 });
                }

                return {
                    position,
                    ezwow,
                    cookies,
                    characters,
                    races,
                    classes,
                };
            },
        },
    },
};
