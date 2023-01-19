import path from "path";
import { promises as fs } from "fs";
import _ from "lodash";
import Zip from "adm-zip";

export default {
    name: "generator",

    actions: {
        addon80: {
            async handler(ctx) {
                const characters = await ctx.call("character.find", { sort: "login" });
                const characters80 = [];
                for (let i = 0; i < characters.length; i++) {
                    if (characters[i].lvl == 80) {
                        characters80.push(characters[i]);
                    }
                }
                // сортировка по аккаунту
                const sorted = [];
                let login = "";
                let persons = [];

                _.map(characters80, (character) => {
                    if (character.login == login) persons.push(character);
                    else {
                        if (persons.length) {
                            sorted.push({
                                login,
                                persons,
                            });
                            persons = [];
                        }
                        login = character.login;
                        persons.push(character);
                    }
                });

                if (persons.length) {
                    sorted.push({
                        login,
                        persons,
                    });
                }

                const zip = new Zip();

                let index = 0;
                let sliced = [];
                for (index; index * 40000 < sorted.length; index++) {
                    sliced = sorted.slice(index * 40000, (index + 1) * 40000);
                    zip.addFile(
                        "IsengardArmory/DB" + index + ".lua",
                        Buffer.from(
                            this.LUADBTemplate({
                                sliced,
                                index,
                            }),
                            "utf8"
                        )
                    );
                }

                zip.addFile(
                    "IsengardArmory/IsengardArmory.toc",
                    Buffer.from(
                        this.TOCTemplate({
                            index,
                        }),
                        "utf8"
                    )
                );

                zip.addFile(
                    "IsengardArmory/IsengardArmory.lua",
                    Buffer.from(
                        this.LUATemplate({
                            date: new Date().toLocaleString("ru"),
                            accounts: sorted.length,
                            characters: characters80.length,
                            index,
                        }),
                        "utf8"
                    )
                );

                try {
                    zip.writeZip(path.resolve(process.cwd(), "public/files/IsengardArmoryLite.zip"));
                    console.log(`Created IsengardArmoryLite successfully`);
                } catch (e) {
                    console.log(`Something went wrong. ${e}`);
                }
            },
        },

        addon: {
            async handler(ctx) {
                ctx.meta.$responseType = "application/zip";
                ctx.meta.$responseHeaders = {
                    "Content-Disposition": `attachment; filename="IsengardArmory.zip"`,
                };
                const characters = await ctx.call("character.find", { sort: "login" });
                // сортировка по аккаунту
                const sorted = [];
                let login = "";
                let persons = [];
                _.map(characters, (character) => {
                    if (character.login == login) persons.push(character);
                    else {
                        if (persons.length) {
                            sorted.push({
                                login,
                                persons,
                            });
                            persons = [];
                        }
                        login = character.login;
                        persons.push(character);
                    }
                });

                if (persons.length) {
                    sorted.push({
                        login,
                        persons,
                    });
                }

                const zip = new Zip();

                let index = 0;
                let sliced = [];
                for (index; index * 40000 < sorted.length; index++) {
                    sliced = sorted.slice(index * 40000, (index + 1) * 40000);
                    zip.addFile(
                        "IsengardArmory/DB" + index + ".lua",
                        Buffer.from(
                            this.LUADBTemplate({
                                sliced,
                                index,
                            }),
                            "utf8"
                        )
                    );
                }

                zip.addFile(
                    "IsengardArmory/IsengardArmory.toc",
                    Buffer.from(
                        this.TOCTemplate({
                            index,
                        }),
                        "utf8"
                    )
                );

                zip.addFile(
                    "IsengardArmory/IsengardArmory.lua",
                    Buffer.from(
                        this.LUATemplate({
                            date: new Date().toLocaleString("ru"),
                            accounts: sorted.length,
                            characters: characters.length,
                            index,
                        }),
                        "utf8"
                    )
                );

                try {
                    zip.writeZip(path.resolve(process.cwd(), "public/files/IsengardArmory.zip"));
                    console.log(`Created IsengardArmory successfully`);
                } catch (e) {
                    console.log(`Something went wrong. ${e}`);
                }
            },
        },
    },

    async started() {
        this.TOCTemplate = _.template(Buffer.from(await fs.readFile(path.resolve(__dirname, "../templates/template.toc"))));
        this.LUATemplate = _.template(Buffer.from(await fs.readFile(path.resolve(__dirname, "../templates/template.lua"))));
        this.LUADBTemplate = _.template(Buffer.from(await fs.readFile(path.resolve(__dirname, "../templates/DBTemplate.lua"))));
    },
};
