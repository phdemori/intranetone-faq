new IOService({
  name: 'Faq',
},
  function (self) {
    
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
        { data: 'tipo', name: 'tipo' },
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
    }).on('draw.dt', function () {
      $('[data-toggle="tooltip"]').tooltip();
    });

    let form = document.getElementById(self.dfId);
    let fv1 = FormValidation.formValidation(
      form.querySelector('.step-pane[data-step="1"]'),
      {
        fields: {
          'tipo': {
            validators: {
              notEmpty: {
                message: 'A Categoria é obrigatória!'
              }
            }
          },
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

    self.fv = [fv1];

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

    //CRUD CallBacks
    function view(self) {
      return {
        onSuccess: function (data) {
          $("#__form_edit").val(data.id);
          $("#tipo").val(data.tipo);
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