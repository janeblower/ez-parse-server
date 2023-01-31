import { Service as Database } from "@moleculer/database";

export default {
    name: "characterSearch",

    mixins: [
        Database({
            adapter: {
                type: "MongoDB",
                options: {
                    uri: process.env.DATABASE,
                },
            },
        }),
    ],

    settings: {
        fields: {
            _id: "string|primaryKey",
            login: "string|max:256",
            name: "string|max:256",
            guild: "string|max:256",
            class: "number",
            race: "number",
            lvl: "number",
            kills: "number",
            gs: "number",
            ap: "number",
            updated: {
                type: "number",
                onCreate: () => Date.now(),
                onUpdate: () => Date.now(),
            },
        },
    },

    actions: {
        getOtherCharactersByName: {
            cache: false,
            params: {
                name: "string|max:256",
            },
            async handler(ctx) {
                const { params } = ctx;
                const { name } = params;
                const character = (await ctx.call("characterSearch.find", { query: { name } }))[0];
                if (character && character.login) {
                    const characters = await ctx.call("characterSearch.find", { query: { login: character.login } });
                    return characters;
                } else {
                    return false;
                }
            },
        },

        races: {
            handler(ctx) {
                return Promise.all([
                    ctx.call("characterSearch.count", { query: { race: 0 } }),
                    ctx.call("characterSearch.count", { query: { race: 1 } }),
                    ctx.call("characterSearch.count", { query: { race: 2 } }),
                    ctx.call("characterSearch.count", { query: { race: 3 } }),
                    ctx.call("characterSearch.count", { query: { race: 4 } }),
                    ctx.call("characterSearch.count", { query: { race: 5 } }),
                    ctx.call("characterSearch.count", { query: { race: 6 } }),
                    ctx.call("characterSearch.count", { query: { race: 7 } }),
                    ctx.call("characterSearch.count", { query: { race: 8 } }),
                    ctx.call("characterSearch.count", { query: { race: 9 } }),
                ]);
            },
        },

        classes: {
            handler(ctx) {
                return Promise.all([
                    ctx.call("characterSearch.count", { query: { class: 0 } }),
                    ctx.call("characterSearch.count", { query: { class: 1 } }),
                    ctx.call("characterSearch.count", { query: { class: 2 } }),
                    ctx.call("characterSearch.count", { query: { class: 3 } }),
                    ctx.call("characterSearch.count", { query: { class: 4 } }),
                    ctx.call("characterSearch.count", { query: { class: 5 } }),
                    ctx.call("characterSearch.count", { query: { class: 6 } }),
                    ctx.call("characterSearch.count", { query: { class: 7 } }),
                    ctx.call("characterSearch.count", { query: { class: 8 } }),
                    ctx.call("characterSearch.count", { query: { class: 9 } }),
                ]);
            },
        },
    },
};