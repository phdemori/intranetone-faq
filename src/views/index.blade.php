@extends('IntranetOne::io.layout.dashboard')

{{-- page level styles --}}
@section('header_styles')
  <link rel="stylesheet" type="text/css" href="{{ asset('css/pickadate-full.min.css') }}">
  <link rel="stylesheet" type="text/css" href="{{ asset('io/services/io-faq.min.css') }}">
@stop

@section('main-heading')
@stop

@section('main-content')
	<!--section ends-->
			@component('IntranetOne::io.components.nav-tabs',
			[
				"_id" => "default-tablist",
				"_active"=>0,
				"_tabs"=> [
					[
						"tab"=>"Listar",
						"icon"=>"ico ico-list",
						"view"=>"Faq::table-list"
					],
					[
						"tab"=>"Cadastrar",
						"icon"=>"ico ico-new",
						"view"=>"Faq::form"
					],
				]
			])
			@endcomponent
	<!-- content -->
  @stop

@section('footer_scripts')

<script src="{{ asset('io/services/io-faq-babel.min.js') }}" type="text/javascript"></script>
<script src="{{ asset('io/services/io-faq-mix.min.js') }}" type="text/javascript"></script>
<script src="{{ asset('io/services/io-faq.min.js') }}" type="text/javascript"></script>
@stop
