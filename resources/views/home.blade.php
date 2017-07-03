@extends('layouts.app')

@section('content')
    <Oseba ime="juske" v-bind:sirina="juske"></Oseba>
	<div  @click="addCount" class="expl" v-bind:style="{left: juske + '%'}">
		<p>@{{message}}</p>
	</div>
    <Oseba ime="myha" v-bind:sirina="myha"></Oseba>
@endsection
