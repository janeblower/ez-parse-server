const app = new Vue({
    el: "#app",
    data() {
        return {
            cooks: {
                cookie: "",
            },
            message: "",
            findInput: "",
            findOutput: [],
            data: {
                position: 0,
                ezwow: {
                    maxSt: 111000,
                },
                cookies: 0,
                characters: 0,
                races: [],
                classes: [],
            },
        };
    },
    computed: {
        percent() {
            const {
                position,
                ezwow: { maxSt },
            } = this.data;
            if (maxSt == 0) return 0;
            return Math.round((position / maxSt) * 100);
        },
    },
    methods: {
        async share() {
            try {
                await axios.post("/api/cookie/create", this.cooks);
                this.cooks.cookie = "";
                this.message = "Спасибо!";
            } catch (error) {
                console.log(error);
            }
        },
        async findByName() {
            let findInput = this.findInput.trim();
            findInput = findInput.charAt(0).toUpperCase() + findInput.slice(1);
            console.log(findInput);
            const { data } = await axios.get(`/api/character/findByName?name=${findInput}`);
            if (data === false) {
                alert("Не удалось найти персонажа по имени!");
                return;
            }
            this.findOutput = data;
            const x = document.getElementById("chars");
            x.style.visibility = "visible";
            x.style.opacity = "1";
            this.data.login = data[0].login;
        },
    },
    async mounted() {
        try {
            const { data } = await axios.get("/api/stat/get");

            data.races.sort((a, b) => b.value - a.value);
            data.classes.sort((a, b) => b.value - a.value);

            for (let i = 0; i < 10; i++) {
                data.races[i].width = (data.races[i].value / data.races[0].value) * 90;
                data.classes[i].width = (data.classes[i].value / data.classes[0].value) * 90;
            }
            document.body.classList.add("show-stats");
            this.data.login = "";
            this.data = data;
        } catch (error) {
            console.log(error);
        }
    },
});

function charsHide() {
    const x = document.getElementById("chars");
    x.style.visibility = "hidden";
    x.style.opacity = "0";
}
