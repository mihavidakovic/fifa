<template>
    <div class="oseba">
        <div class="inside">
            <h1>{{this.zmage}}</h1>
            <h2>{{this.ime}}</h2>
        </div>
        <div class="napaka">
            <p>{{this.napaka}}</p>
        </div>
        <div class="plus " v-bind:class="[{ active: add }, ime]">
            <span v-if="add == true"  v-on:click="hideAdd">
                <p>Dodaj</p>
            </span>
            <span v-if="add == false" v-on:click="showAdd">
                <i class="ion ion-plus"></i>
            </span>
        </div>
        <transition name="fade">
            <div class="add" v-show="add" v-bind:class="[ime]">
                <div class="form-group">
                    <label for="izgovor">Izgovor za poraz:</label>
                    <input v-model="izgovor" type="email" name="izgovor" class="form-control" id="izgovor" placeholder="Npr.: ti itak skos igraš">
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                zmage: 0,
                add: false,
                izgovor: "",
                napaka: ""
            };
        },
        props: ['ime'],
        methods: {
            fetchScore: function() {
                var self = this;
                setInterval(function() {
                    axios.get('/zmage/' + self.ime).then(function(response) {
                        self.zmage = response.data.zmage;
                    });
                }, 1000);
            },
            showAdd: function() {
                this.add = true;
            },
            hideAdd: function() {
                if (this.izgovor == "") {
                    this.napaka = "Dodana ni bila nobena zmaga!"
                    this.add = false;
                    var self = this;
                    setInterval(function() {
                        self.napaka = ""
                    }, 2000);
                } else {
                    var api = "dodaj/" + this.ime;
                    axios.post(api, {
                        izgovor: this.izgovor,
                        oseba: this.ime
                    })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                    this.izgovor = "";
                    this.add = false;
                }
            }
        },
        created: function() {
            this.fetchScore();
        }
    }
</script>
