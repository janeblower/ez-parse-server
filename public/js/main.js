const app = new Vue({
    el: "#app",
    data() {
        return {
            cooks: {
                cookie: "",
            },
            message: "",
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
            this.data = data;
        } catch (error) {
            console.log(error);
        }
    },
});
