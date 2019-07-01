new IOService({
  name: 'Faq',
},
  function (self) {
    $.jMaskGlobals.SPMaskBehavior = function (val) {
      let isSP = val.replace(/\D/g, '').length === 11;
      if (typeof (arguments[4]) === 'function')
        arguments[4](isSP, arguments);
      if (isSP)
        return '(00) 00000-0000';

      return '(00) 0000-00009';
    };

    //Datatables initialization
    self.dt = $('#default-table').DataTable({
      ajax: self.path + '/list',
      initComplete: function () {
        //parent call
        let api = this.api();
        this.teste = 10;
        $.fn.dataTable.defaults.initComplete(this);
      },
      footerCallback: function (row, data, start, end, display) {
      },
      columns: [
        { data: 'id', name: 'id' },
        { data: 'pergunta', name: 'pergunta' },
        { data: 'actions', name: 'actions' }
      ],
      columnDefs:
        [
          { targets: '__dt_faq', searchable: true, orderable: true },
          {
            targets: '__dt_acoes', width: "7%", className: "text-center", searchable: false, orderable: false, render: function (data, type, row, y) {
              return self.dt.addDTButtons({
                buttons: [
                  { ico: 'ico-eye', _class: 'text-primary', title: 'preview' },
                  { ico: 'ico-edit', _class: 'text-info', title: 'editar' },
                  { ico: 'ico-trash', _class: 'text-danger', title: 'excluir' },
                ]
              });
            }
          }
        ]
    }).on('click', ".btn-dt-button[data-original-title=editar]", function () {
      var data = self.dt.row($(this).parents('tr')).data();
      self.view(data.id);
    }).on('click', '.ico-trash', function () {
      var data = self.dt.row($(this).parents('tr')).data();
      self.delete(data.id);
    }).on('click', '.ico-eye', function () {
      var data = self.dt.row($(this).parents('tr')).data();
      preview({ id: data.id });
    }).on('draw.dt', function () {
      $('[data-toggle="tooltip"]').tooltip();
    });

    $('.pickadate').pickadate({
      selectYears: 99,
      formatSubmit: 'yyyy-mm-dd 00:00:00',
      max: 'today'
    });
    
    $('#telefone,#celular').mask($.jMaskGlobals.SPMaskBehavior, {
      onKeyPress: function (val, e, field, options) {
        if ($(field).attr('id') == 'celular1')
          self.fv[1].revalidateField($(field).attr('id'));
        field.mask($.jMaskGlobals.SPMaskBehavior.apply({}, arguments), options);
      },
      onComplete: function (val, e, field) {
        $(field).parent().parent().next().find('input').first().focus();
      }
    });
    $('#cpf_sindico').mask('000.000.000-00', {reverse: true});
    $('#cnpj').mask('00.000.000/0000-00', {reverse: true});
    $('#cep').mask('00000-000');
    
    let form = document.getElementById(self.dfId);
    let fv1 = FormValidation.formValidation(
      form.querySelector('.step-pane[data-step="1"]'),
      {
        fields: {
          'pergunta': {
            validators: {
              notEmpty: {
                message: 'O Nome do Condomínio é obrigatório!'
              },
              stringLength: {
                min: 5,
                message: 'Mínimo de 5 caracteres'
              }
            }
          },
          'resposta': {
            validators: {
              notEmpty: {
                message: 'O Nome do Síndico é obrigatório!'
              },
              stringLength: {
                min: 5,
                message: 'Mínimo de 5 caracteres'
              }
            }
          }
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          submitButton: new FormValidation.plugins.SubmitButton(),
          // defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
          bootstrap: new FormValidation.plugins.Bootstrap(),
          icon: new FormValidation.plugins.Icon({
            valid: 'fv-ico ico-check',
            invalid: 'fv-ico ico-close',
            validating: 'fv-ico ico-gear ico-spin'
          }),
        },
      }).setLocale('pt_BR', FormValidation.locales.pt_BR)
      .on('core.validator.validated', function (event) {
        // console.log(event);
      });

    let fv2 = FormValidation.formValidation(
      form.querySelector('.step-pane[data-step="2"]'),
      {
        fields: {
          /*'celular': {
            validators: {
              stringLength: {
                min: 14,
                message: 'Celular inválido'
              },
              phone: {
                country: 'BR',
                message: 'Celular inválido'
              },
              notEmpty: {
                message: 'O telefone Celular é obrigatório',
              }
            },
          },
          'telefone': {
            validators: {
              phone: {
                country: 'BR',
                message: 'Telefone inválido'
              }
            },
          },*/
          'email': {
            validators: {
              notEmpty: {
                message: 'O E-mail é obrigatório',
              },
              emailAddress: {
                message: 'E-mail Inválido',
              }
            }
          },
          'cep': {
            validators: {
              promise: {
                notEmpty: {
                  message: 'O CEP é obrigatório!'
                },
                enabled: true,
                promise: function (input) {
                  return new Promise(function (resolve, reject) {
                    if (input.value.replace(/\D/g, '').length < 8)
                      resolve({
                        valid: false,
                        message: 'Cep Inválido!',
                        meta: {
                          data: null
                        }
                      })
                    else {
                      $.ajax({
                        url: `https://viacep.com.br/ws/${$('#cep').cleanVal()}/json`,
                        success: (data) => {
                          //console.log(data)
                          if (data.erro == true) {
                            resolve({
                              valid: false,
                              message: 'Cep não encontrado!',
                              meta: {
                                data: null
                              }
                            });
                          }
                          else
                            resolve({
                              valid: true,
                              meta: {
                                data
                              }
                            });
                        }
                      });
                    }
                  });
                }
              }
            }
          },
          'logradouro': {
            validators: {
              notEmpty: {
                message: 'O endereço é obrigatório!'
              },
            }
          },
          'numero': {
            validators: {
              notEmpty: {
                message: 'O número é obrigatório!'
              },
            }
          },
          'bairro': {
            validators: {
              notEmpty: {
                message: 'O endereço é obrigatório!'
              },
            }
          },
          'cidade': {
            validators: {
              notEmpty: {
                message: 'A cidade é obrigatória!'
              },
            }
          }
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          submitButton: new FormValidation.plugins.SubmitButton(),
          // defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
          bootstrap: new FormValidation.plugins.Bootstrap(),
          icon: new FormValidation.plugins.Icon({
            valid: 'fv-ico ico-check',
            invalid: 'fv-ico ico-close',
            validating: 'fv-ico ico-gear ico-spin'
          }),
        },
      }).on('core.validator.validated', function (e) {
        if (e.field === 'cep' && e.validator === 'promise') {
          setCEP(e.result.meta.data, self);
        }
      });

    self.fv = [fv1, fv2];

    //need to transform wizardActions in a method of Class
    self.wizardActions(function () {
      //if ($('name=["tipo"]').chekced)
      //alert(1);
    });

    self.callbacks.view = view(self);
    self.callbacks.update.onSuccess = () => {
      swal({
        title: "Sucesso",
        text: "Condomínio atualizado com sucesso!",
        type: "success",
        confirmButtonText: 'OK',
        onClose: function () {
          self.unload(self);
          location.reload();
        }
      });
    }

    self.callbacks.create.onSuccess = function () {
      self.tabs['listar'].tab.tab('show');
    }

    self.callbacks.unload = function (self) {

    }

    var citys = [];
    $CB.forEach(element => {
      citys.push({ value: element.c + ' / ' + element.u, data: element.i });
    });
    $('#cidade').autocomplete({
      lookup: citys,
      onSelect: function (_t) {
        //alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
        $('#cidade_id').val(_t.data);
      }
    });

    function setCEP(data, self) {
      const _conf = self.toView;

      if (self.toView !== null && $('#cep').val() == _conf.cep) {

        if ($('#logradouro').val() == "" && _conf.logradouro !== "") {
          $('#logradouro').val(_conf.logradouro);
        }

        if ($('#bairro').val() == "" && _conf.bairro !== "")
          $('#bairro').val(_conf.bairro);

        $('#cidade').val(data.localidade + " / " + data.uf);
        $('#cidade_id').val(data.ibge);
        $('#logradouro').focus();
      }
      else {
        if (data !== null) {
          //com logradouro   
          if (data.logradouro !== '') {
            $('#logradouro').val(`${data.logradouro}${data.complemento != '' ? ', ' + data.complemento : ''}`);
            $('#bairro').val(data.bairro);
          }

          $('#cidade').val(data.localidade + " / " + data.uf);
          $('#cidade_id').val(data.ibge);
          $('#logradouro').focus();
        }
        else
          $('#logradouro, #bairro, #cidade').val('');
      }

      self.fv[1].revalidateField('logradouro');
      self.fv[1].revalidateField('bairro');
    }

    //CRUD CallBacks
    function view(self) {
      return {
        onSuccess: function (data) {
          $("#__form_edit").val(data.id);
          $("#pergunta").val(data.pergunta);
          $('#resposta').val(data.resposta);
          $('#observacao').val(data.observacao);
        },
        onError: function (self) {
          console.log(self);
        }
      }
    }
  });