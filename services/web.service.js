import Gateway from "moleculer-web";

export default {
    name: "web",

    mixins: [Gateway],

    settings: {
        port: 3000,

        server: true,

        cors: {
            origin: "*",
        },

        assets: {
            folder: "./public",
            options: {},
        },

        routes: [
            {
                name: "api",
                path: "/api",
                aliases: {
                    "POST /cookie/create": "cookie.create",
                    "GET /cookie/count": "cookie.count",
                    "GET /pulser/position": "pulser.position",
                    "GET /ezwow/stat": "ezwow.stat",
                    "GET /ezwow/parse": "ezwow.parse",
                    "POST /character/list": "character.list",
                    "GET /character/find": "character.find",
                    "GET /character/findByName": "character.getOtherCharactersByName",
                    "GET /character/get": "character.get",
                    "GET /character/count": "character.count",
                    "GET /generator/json": "generator.json",
                    "GET /generator/sql": "generator.sql",
                    "GET /generator/addon": "generator.addon",
                    "GET /generator/addon80": "generator.addon80",
                    "GET /stat/get": "stat.get",
                },
                bodyParsers: {
                    json: true,
                    urlencoded: { extended: true },
                },
                mappingPolicy: "restrict",
            },
        ],
    },
};
