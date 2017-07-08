<template>
    <div class="oseba" v-bind:style="{width: sirina + '%'}">
        <div class="inside">
            <h1>{{this.zmage}}</h1>
            <h2>{{this.ime}}</h2>
        </div>
        <div class="izgovori" v-bind:class="{active: showIzgovori }"> 
            <p class="active" v-on:click="showIzgovoriList" v-if="showIzgovori == true">Izgovori za poraze <i class="ion ion-ios-arrow-down"></i></p>
            <p class="inactive" v-on:click="showIzgovoriList" v-if="showIzgovori == false">Izgovori za poraze <i class="ion ion-ios-arrow-forward"></i></p>
            <div class="more" v-if="showIzgovori == true">
                <ul>
                    <li v-for="izgovor in izgovori">
                        <span>{{izgovor.izgovor}} - </span>
                        <small>{{izgovor.created_at | moment("from", "now")}}</small>
                        <a href="#" v-on:click="izbrisi(izgovor.id)">Izbriši</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="napaka">
            <p>{{this.napaka}}</p>
        </div>
        <div class="plus " v-bind:class="[{ active: add }, ime]">
            <span v-if="add == true" v-on:click="hideAdd">
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
                    <input autofocus v-model="izgovor" type="email" name="izgovor" class="form-control" id="izgovor" placeholder="Npr.: ti itak skos igraš">
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
                izgovori: {},
                showIzgovori: false,
                napaka: "",
                width: 0
            };
        },
        props: ['ime', 'sirina'],
        methods: {
            fetchScore: function() {
                var self = this;
                setInterval(function() {
                    axios.get('/zmage/' + self.ime).then(function(response) {
                        self.zmage = response.data.zmage;
                        self.izgovori = response.data.izgovori;
                    });
                }, 1000);
            },
            showAdd: function() {
                this.add = true;
            },
            showIzgovoriList: function() {
                this.showIzgovori = ! this.showIzgovori
            },
            hideAdd: function() {
                if (this.izgovor == "") {
                    this.napaka = "Vnesi izgovor za poraz!"
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
            },
            izbrisi: function(id) {
                axios.get('/izbrisi/' + id).then(function(response) {
                    console.log(response.data);
                    
                });
            }
        },
        created: function() {
            this.fetchScore();
            this.$refs.izgovor.focus();
        }
    }
</script>
